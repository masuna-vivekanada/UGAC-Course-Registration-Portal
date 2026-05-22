# IITB-Course-Regisration-Portal
A full-stack Course Registration Portal built for UGAC Web Convener Assignment 2026-27. Features LDAP-style authentication, role-based access control, course enrollment with seat management, and an admin panel for managing courses and registrations. Built with React, Node.js, Express, and MongoDB.

## Tech Stack

- **Frontend:** React, Tailwind CSS, DaisyUI
- **Backend:** Node.js, Express.js
- **Database:** MongoDB Atlas

## Project Structure
UGAC_ASSIGNMENT/
├── BACKEND/
│   ├── middleware/
│   │   └── auth.js
│   ├── models/
│   │   ├── Course.js
│   │   ├── Registration.js
│   │   └── User.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── courses.js
│   │   └── registrations.js
│   ├── index.js
│   └── package.json
└── FRONTEND/
├── src/
│   ├── Components/
│   │   ├── CourseCard.jsx
│   │   ├── Navbar.jsx
│   │   └── Footer.jsx
│   ├── context/
│   │   └── Authcontext.jsx
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Login.jsx
│   │   ├── Dashboard.jsx
│   │   ├── CourseDetail.jsx
│   │   └── Admin.jsx
│   ├── api.js
│   └── App.jsx
└── package.json

## Setup Instructions

### Prerequisites
- Node.js (v18 or above)
- Git

### 1. Clone the Repository

```bash
git clone https://github.com/masuna-vivekanada/UGAC-Course-Registration-Portal.git
cd UGAC_ASSIGNMENT
```

### 2. Backend Setup

```bash
cd BACKEND
npm install
```

Create a `.env` file in the BACKEND folder with the following contents:
```
PORT = 4001
MONGO_URI=mongodb+srv://masunavivekanandaiitb:XJY2aJO2bRp0tJqO@ugacassignment.pxu8b68.mongodb.net/?appName=UGACassignment
JWT_SECRET=iitb_course_portal_secret_2024

```
Start the backend server:

```bash
node index.js
```

Server runs on `http://localhost:4001`

### 3. Frontend Setup

Open a new terminal:

```bash
cd FRONTEND
npm install
npm run dev
```

App runs on `http://localhost:5173`

## Default Credentials

| Role  |  Name       | LDAP ID  | Password  |
|-------|-------------|----------|-----------|
| Admin | Admin       | admin    | admin123  |
| User  | Arjun Mehta | 24b1052  | iitb2024  |
| User  | Priya Nair  | 24d2089  | iitb2024  |
| User  | Rohan Verma | 24b3341  | iitb2024  |

## Features

- LDAP-style authentication with JWT
- Role-based access control (Admin/User)
- Course listing and detail pages
- Course enrollment with seat management
- Admin panel — add/edit/delete courses
- Accept/reject registrations
- Responsive UI
