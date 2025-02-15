# Hospital App

A modern healthcare management web application built with Angular, TypeScript that streamlines hospital operations and patient care management.

## Screenshots

### Users Page

![Users Page](/screenshots/user-page.png)

### User Detail

![User Detail](/screenshots/user-detail-page.png)

### Posts Page

![Posts Page](/screenshots/posts-page.png)

### Post Detail

![Post Detail](/screenshots/post-detail-page.png)

### Create Post

![Create Post](/screenshots/post-create-page.png)

### Edit Post

![Edit Post](/screenshots/post-editing-page.png)

## Features

- 👥 User Management

  - Register users
  - Login users

- 🏥 Patient/Doctors Management

  - Patient/Doctors details
  - List Patients/DoctorsDoctors

- 🎨 Modern UI
  - Angular Material
  - SCSS styling
  - Responsive design
  - Loading states

## Technologies

- Angular 18
- TypeScript
- Angular Material
- SCSS
- RxJS
- Angular Router
- HttpClient

## Getting Started

1. Clone the repository:

```bash
git clone https://github.com/danielortega30/hospital-app
cd hospital-app
```

2. Install dependencies:

```bash
npm install
```

3. Run the development server:

```bash
ng serve
```

4. Open http://localhost:4000 in your browser.

## Project Structure

```plaintext
src/
├── app/
│   ├── auth/              # Authentication components and services
│   │   ├── login/
│   │   └── register/
│   ├── core/             # Core modules, guards, and interceptors
│   ├── doctors/          # Doctor management module
│   │   ├── components/
│   │   ├── services/
│   │   └── models/
│   ├── patients/         # Patient management module
│   │   ├── components/
│   │   ├── services/
│   │   └── models/
│   ├── shared/          # Shared components, pipes, and directives
│   └── layout/          # Layout components (header, footer, etc.)
├── assets/             # Images, fonts, and other static files
├── environments/       # Environment configuration
└── styles/            # Global SCSS styles
```

## API

This project uses JSONPlaceholder for demonstration purposes.

## License

MIT License && Daniel Ortega
