param(
    [switch]$RestartBackend
)

$ErrorActionPreference = 'Stop'

$projectRoot = Split-Path -Parent $PSScriptRoot
$backendRoot = Join-Path $projectRoot 'spring-boot-backend'
$pomPath = Join-Path $backendRoot 'pom.xml'
$portfolioHealthUrl = 'http://localhost:3000/api/health'
$springHealthUrl = 'http://localhost:8080/api/contact/health'

function Get-HealthResponse([string]$url) {
    try {
        $response = Invoke-RestMethod -Uri $url -TimeoutSec 3
        return $response
    } catch {
        return $null
    }
}

$portfolioHealth = Get-HealthResponse $portfolioHealthUrl
$springHealth = Get-HealthResponse $springHealthUrl

if ($portfolioHealth -and $portfolioHealth.status -eq 'UP' -and
    $springHealth -and $springHealth.status -eq 'UP' -and -not $RestartBackend) {
    Write-Host 'The portfolio and Spring Boot are already running.'
    Write-Host 'Open http://localhost:3000 and use the existing servers.'
    Write-Host 'If SMTP credentials changed, run this script with -RestartBackend.'
    exit 0
}

if ($portfolioHealth -and $portfolioHealth.status -eq 'UP' -and
    -not ($springHealth -and $springHealth.status -eq 'UP') -and -not $RestartBackend) {
    throw 'The portfolio is already running, but Spring Boot is unavailable. Start it with -RestartBackend or stop the existing portfolio before restarting both services.'
}

$portfolioPortInUse = Get-NetTCPConnection -LocalPort 3000 -State Listen -ErrorAction SilentlyContinue
if (-not ($portfolioHealth -and $portfolioHealth.status -eq 'UP') -and $portfolioPortInUse) {
    throw 'Port 3000 is already in use by another process. Stop that app or choose another port before starting the portfolio.'
}

$reuseSpringBackend = $springHealth -and $springHealth.status -eq 'UP' -and -not $RestartBackend

if (-not (Get-Command java -ErrorAction SilentlyContinue)) {
    throw 'Java 17 or newer is required. Install Java and reopen PowerShell.'
}

$mavenCommand = Get-Command mvn.cmd -ErrorAction SilentlyContinue
$mavenPath = if ($mavenCommand) { $mavenCommand.Source } else { $null }

if (-not $mavenPath -and $env:MAVEN_HOME) {
    $candidate = Join-Path $env:MAVEN_HOME 'bin\mvn.cmd'
    if (Test-Path $candidate) {
        $mavenPath = $candidate
    }
}

if (-not $mavenPath) {
    $candidate = Join-Path $HOME '.maven\maven-3.10.0\bin\mvn.cmd'
    if (Test-Path $candidate) {
        $mavenPath = $candidate
    }
}

if (-not $mavenPath -and -not $reuseSpringBackend) {
    throw 'Maven was not found. Install Maven or set MAVEN_HOME, then run this script again.'
}

$securePassword = $null
$mailPassword = $null
$backendProcess = $null
$keepBackendRunning = $false

if (-not $reuseSpringBackend) {
    $securePassword = Read-Host 'Enter the Gmail App Password for varunsaiv0713@gmail.com' -AsSecureString
    $mailPassword = ([System.Net.NetworkCredential]::new('', $securePassword).Password -replace '\s', '')
    if ([string]::IsNullOrWhiteSpace($mailPassword)) {
        throw 'The Gmail App Password cannot be empty.'
    }

    $env:MAIL_APP_PASSWORD = $mailPassword
}

$backendProcessIds = @()
$backendPortInUse = Get-NetTCPConnection -LocalPort 8080 -State Listen -ErrorAction SilentlyContinue
if ($backendPortInUse) {
    if (-not ($springHealth -and $springHealth.status -eq 'UP')) {
        throw 'Port 8080 is already in use by a process that was not confirmed as the Spring Boot API. Stop it manually before continuing.'
    }

    if ($RestartBackend) {
        $backendProcessIds = @($backendPortInUse | Select-Object -ExpandProperty OwningProcess -Unique)
    }
}

try {
    foreach ($processId in $backendProcessIds) {
        Write-Host "Restarting the existing Spring Boot process (PID $processId)..."
        Stop-Process -Id $processId -Force
    }

    if ($backendProcessIds.Count -gt 0) {
        $deadline = (Get-Date).AddSeconds(20)
        do {
            Start-Sleep -Seconds 1
            $backendPortInUse = Get-NetTCPConnection -LocalPort 8080 -State Listen -ErrorAction SilentlyContinue
        } while ($backendPortInUse -and (Get-Date) -lt $deadline)

        if ($backendPortInUse) {
            throw 'The existing Spring Boot process did not release port 8080.'
        }
    }

    if (-not $reuseSpringBackend) {
        Write-Host 'Starting Spring Boot email backend...'
        $backendProcess = Start-Process `
            -FilePath $mavenPath `
            -ArgumentList @('-f', $pomPath, 'spring-boot:run') `
            -WorkingDirectory $backendRoot `
            -NoNewWindow `
            -PassThru

        $deadline = (Get-Date).AddMinutes(2)
        $backendReady = $false

        while ((Get-Date) -lt $deadline) {
            if ($backendProcess.HasExited) {
                throw 'Spring Boot stopped before becoming healthy. Review the Maven output above.'
            }

            $springHealth = Get-HealthResponse $springHealthUrl
            if ($springHealth -and $springHealth.status -eq 'UP') {
                $backendReady = $true
                break
            }

            Start-Sleep -Seconds 2
        }

        if (-not $backendReady) {
            throw 'Spring Boot did not become healthy within two minutes. Review the Maven output above.'
        }
    } else {
        Write-Host 'Spring Boot is already healthy; reusing the running backend.'
    }

    if ($portfolioHealth -and $portfolioHealth.status -eq 'UP') {
        Write-Host 'Spring Boot has restarted with the new credentials. The portfolio is still available at http://localhost:3000.'
        $keepBackendRunning = $true
    } else {
        Write-Host 'Spring Boot is healthy. Starting the portfolio at http://localhost:3000.'
        Set-Location $projectRoot
        & npm.cmd run dev
    }
} finally {
    if ($backendProcess -and -not $backendProcess.HasExited -and -not $keepBackendRunning) {
        Stop-Process -Id $backendProcess.Id -Force
    }

    if (-not $reuseSpringBackend) {
        Remove-Item Env:MAIL_APP_PASSWORD -ErrorAction SilentlyContinue
    }
    Remove-Variable mailPassword, securePassword -ErrorAction SilentlyContinue
}
