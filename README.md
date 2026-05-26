# Task Gate

Task Gate is a modern task management web application focused on clean architecture, responsive user experience, and maintainable frontend engineering practices.

Built as a portfolio and engineering showcase project, it demonstrates modern frontend architecture, reactive data handling, role-based workflows, and production deployment practices.

## Live Demo

[Live Website](https://taskgate.antipotion.com)

---

# Tech Stack

## Frontend

- Angular 21+
- TypeScript (Strict Mode)
- SCSS
- RxJS

## Backend

- Firebase

## Tooling

- Angular CLI
- npm
- ESLint
- Prettier

## Deployment

- Firebase Hosting

---

# Features

- Real-time task updates
- Submission-based progression
- Team collaboration workflows
- Role and permission management
- Reactive data synchronization

---

# Project Goals

This project was built to:

- Practice scalable frontend architecture
- Improve engineering workflow discipline
- Explore UI system consistency
- Simulate production-level application structure
- Serve as a public portfolio project for recruiters and collaborators

---

# Installation

Clone the repository:

```bash
git clone https://github.com/antipotion/task-gate.git
```

Navigate into the project:

```bash
cd task-gate
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm start
```

The application will usually run at:

```txt
http://localhost:4200
```

---

# Production Build

To generate a production build:

```bash
npm run build
```

Build artifacts will be generated inside the `dist/` directory.

---

# Folder Structure

```txt
src/
├── app/
│   ├── application/
│   ├── authentication/
│   ├── infrastructure/
│   ├── project/
│   ├── team/
└── environment/
```

> Folder structure may evolve as the project grows.

---

# Architectural Highlights

- Feature-based modular structure
- Reactive observable pipelines
- Centralized domain modeling
- Strongly typed API contracts
- Scalable component composition

---

# Architecture Notes

The architecture intentionally prioritizes long-term maintainability, domain separation, and predictable state flow over short-term convenience.

The goal is not only functionality, but also coherence and maintainability as the application evolves.

---

# Current Limitations

Some features and refinements are still in progress, including:

- Additional accessibility improvements
- Responsive UX refinements
- Expanded task management capabilities
- Feature integration
- Performance optimizations
- Cross-domain workflow and routing integration
- Relationship consistency between users, projects, and tasks
- Ownership and permission flow refinements

---

# Roadmap

Planned future improvements include:

- File submission
- Interaction and workflow refinements
- Full implementation of projects and tasks domains
- Advanced filtering and search
- Simplified invitation process

---

# License

This project is licensed under the MIT License.

See the [LICENSE](./LICENSE) file for details.

---

# Author

**Antipotion**

- Portfolio: [https://antipotion.com](https://antipotion.com)
- GitHub: [https://github.com/antipotion](https://github.com/antipotion)

```