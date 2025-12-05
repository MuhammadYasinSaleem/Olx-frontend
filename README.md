# OLX Clone - Frontend (React + Vite)

A modern, responsive **frontend application for the OLX Clone platform**, built with **React, Vite, and Tailwind CSS**.

## Project Overview

This frontend application replicates the **core user experience of OLX**:

- Browse and search products
- View product details
- Manage user profile
- Create, update, and delete products
  It is designed to integrate seamlessly with the **OLX Clone Django REST backend** using a clean API-driven architecture.

## Tech Stack

- **React 18+**
- **Vite** - fast build tooling
- **Tailwind CSS** - utility-first styling
- **Axios / Fetch API** - API communication
- **React Router** - client-side routing
- **ESLint + Prettier** - code quality
- **GitFlow** - branch management

## Features (Planned & Implemented)

### User Capabilities

A user can:

- View all listed products
- Filter and paginate products
- View detailed product pages
- Sign up & log in (session-based auth via backend)
- Create, edit, and delete own listings
- View and update profile
- Place orders for selected products
- View order history
- Confirm orders as a buyer

## API Integration

This frontend consumes the **Django DRF backend API**:

- Base API URL (local):
  ```
  http://localhost:8000/api/
  ```
- All responses follow the unified backend format:

```json
{
  "success": true,
  "message": "string or null",
  "data": object | array | null,
  "errors": object | array | null
}
```

## Authentication

- Uses **session-based authentication**
- CSRF token is handled automatically via backend cookies
- Protected routes are guarded on the frontend using:
  - Auth context / state
  - Route protection via React Router

## Requirements

- **Node.js 18+**
- **npm** or **pnpm** or **yarn**
- Backend server running locally or remotely

## Quick Start (Development)

### 1. Clone the Repository

```bash
git clone git@github.com:Azhar-Sharif/Olx-Clone-Frontend.git
cd olx-clone-frontend
```

### 2. Install Dependencies

```bash
npm install
```

or

```bash
pnpm install
```

### 3. Environment Variables

Create a `.env` file in the root:

```env
VITE_API_BASE_URL=http://localhost:8000/api/
```

### 4. Run Development Server

```bash
npm run dev
```

- App will run at:
  ```
  http://localhost:5173/
  ```

## Build for Production

```bash
npm run build
```

Preview production build:

```bash
npm run preview
```

## Branching Model

This project follows **GitFlow**:

- `production` → Stable release
- `staging` → Pre-production testing
- `development` → Active development
- `feature/*` → Feature branches
  All features must be merged into `development` via pull requests.

## Code Quality

- ESLint for linting
- Prettier for formatting
- Strict component structure
- Reusable and composable UI components

## UI & Styling

- Tailwind CSS for styling
- Responsive layout (mobile-first)
- Accessible and clean UI
- Reusable design system components

## License

This project is for **educational and portfolio purposes only**.
Not affiliated with OLX.
