# Varun Sai Portfolio — Spring Boot 3 Backend Service

A Java Spring Boot 3 REST API backend service built with `spring-boot-starter-web`, `spring-boot-starter-mail`, and Bean Validation.

## Endpoints

- `POST /api/contact` — Receives contact form inquiries and dispatches them via SMTP to `varunsaiv0713@gmail.com`.
- `GET /api/contact/health` — Backend health check.

## Payload (`POST /api/contact`)

```json
{
  "name": "Jane Doe",
  "email": "jane@example.com",
  "message": "We would like to discuss a Software Engineer position on our team."
}
```

## Running Locally

Use the full-stack PowerShell launcher described in the repository's main README. It securely prompts for `MAIL_APP_PASSWORD`, starts this API, verifies its health endpoint, and starts the frontend. The API listens on `http://localhost:8080`.

Use a Google App Password for `varunsaiv0713@gmail.com`, not the regular account password. Never commit the App Password to source files.

The deployed Vercel portfolio sends contact-form submissions through the root `api/contact.js` function. It does not require this Spring Boot service to run online; this backend remains part of the local development setup.
