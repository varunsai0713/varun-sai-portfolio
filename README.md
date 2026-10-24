# Varun Sai

**Software Engineer | Java, Spring Boot, React**

I build full-stack applications and REST APIs, with a focus on secure backend services, practical user experiences, and reliable software.

- **Location:** India
- **Email:** [varunsaiv0713@gmail.com](mailto:varunsaiv0713@gmail.com)
- **LinkedIn:** [Varun Sai](https://www.linkedin.com/in/varun-sai-6379aa242/)
- **GitHub:** [varunsai0713](https://github.com/varunsai0713)
- **Portfolio:** [View my portfolio](https://github.com/varunsai0713/varun-sai-portfolio)

## Skills

- **Languages:** Java, Python, JavaScript
- **Frontend:** React.js, HTML5, CSS3, Tailwind CSS, Figma
- **Backend:** Spring Boot, Spring Security, Hibernate, REST APIs
- **Databases:** MySQL, PostgreSQL
- **Cloud and DevOps:** Google Cloud, Git, GitHub, Jenkins, Docker, Kubernetes
- **Testing and monitoring:** Postman, JUnit, Prometheus
- **Concepts:** Object-oriented programming, microservices, logging, and monitoring

## Experience

### Associate Software Engineer — Oppty Techhub Private Limited
**October 2025 – September 2026**

- Built a full-stack HRMS with React, Spring Boot, and MySQL for employee records, attendance, leave, and payroll workflows.
- Delivered more than 10 REST APIs using Spring Boot and Hibernate.
- Implemented JWT authentication and role-based access control with Spring Security.
- Worked with Git and Agile sprint workflows.

### Data Analysis Intern — Allied Market Research
**May 2024 – July 2024**

- Used Python and SQL for exploratory data analysis and market research.
- Presented market trends and patterns using Matplotlib visualizations.
- Prepared structured findings to support data-informed decisions.

## Projects

### DevConnect — Developer Collaboration Platform

**React, Tailwind CSS, Java, Spring Boot, PostgreSQL, JWT**

- Developed REST APIs with Spring Boot and Hibernate, with backend validation and a normalized PostgreSQL schema.
- Added JWT authentication and role-based access control.
- Built a responsive React interface from Figma designs.

### TaskFlow — Team Task Management System

**React, Tailwind CSS**

- Built responsive dashboards and reusable interface components.
- Created task cards, progress indicators, and team views.

## Education

### GITAM Institute of Technology
**B.Tech, Electronics and Communication Engineering** — 2021–2025  
Bengaluru, India

### Vignan Junior College
**Higher Secondary (12th)** — 2019–2021  
Guntur, India

## Currently Learning

- Data structures and algorithms
- Cloud-native microservices and Kubernetes
- Spring Boot observability and Grafana

## Contact form deployment

The Vercel deployment sends contact messages from the `api/contact.js` serverless
function using Gmail SMTP. Configure these variables in **Vercel → Project
Settings → Environment Variables**:

| Variable | Value |
| --- | --- |
| `MAIL_USER` | The Gmail address used to send messages (for this portfolio, `varunsaiv0713@gmail.com`) |
| `CONTACT_TO` | The inbox that should receive contact messages |
| `MAIL_APP_PASSWORD` | A Gmail App Password for `MAIL_USER` (not the normal Gmail password) |

Create the App Password from the Google Account security settings after enabling
2-Step Verification. Add the variables to the environments where the site is
deployed (at least **Production**), save them, and redeploy so the serverless
function receives them. Do not add the App Password to source code or commit it.

The Vercel function sends mail directly; it does not use `SPRING_API_URL` or
require the Spring Boot backend to be hosted. If sending still fails, check the
Vercel deployment's Function Logs for `/api/contact`. A “not configured” response
means `MAIL_APP_PASSWORD` is missing; an authentication response means the
Gmail App Password or `MAIL_USER` is incorrect.
