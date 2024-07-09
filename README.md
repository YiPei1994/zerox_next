# Zerox | The Exercise Note

**Overview:**

Zerox is a comprehensive exercise tracking application that allows users to manage their gym workouts efficiently. It provides a digital alternative to traditional paper-based workout logs, offering enhanced features and security.

**Key Features:**

**Secure Authentication**:

- **Log in** using a Google provider for secure authentication.
- **Sign up** using JWT and encryption to create account in mongoDb.
- **Password Reset** user can reset password if forgotten.

**Exercise Management**:

- Full CRUD (Create, Read, Update, Delete) operations for exercises.

**Performance Tracking**:

- Detailed CRUD operations for exercise data and performance metrics.

**Technologies Used:**

- **Frontend**:Next.js with App Router, leveraging Server-Side Rendering (SSR) and Server Actions
- **Styling**:Tailwind CSS for responsive and utility-first design
- **Language**:TypeScript for enhanced type safety and code maintainability
- **Backend**:Next.js API routes with MongoDB integration
- **Authentication**:NextAuth.js for OAuth and JWT-based authentication
- **Deployment**:Vercel

**Motivation:**

This project was conceived as a digital replacement for traditional gym notebooks, offering enhanced functionality, accessibility, and data security.

**Quick start:**

- clone the repo:git clone https://github.com/your-username/zerox.git
- Navigate to the project directory and install dependencies:
  cd zerox
  npm install

- Create a .env.local file in the root directory with the following environment variables:
  MONGO_URI=your_mongodb_connection_string
  NEXTAUTH_SECRET=your_nextauth_secret
  NEXTAUTH_URL=http://localhost:3000
  AUTH_GOOGLE_ID=your_google_oauth_client_id
  AUTH_GOOGLE_SECRET=your_google_oauth_client_secret
  JWT_SECRET=your_jwt_secret
  JWT_EXPIRESIN=your_jwt_expiration_time
  MAILTRAP_USER=your_mailtrap_username
  MAILTRAP_PASS=your_mailtrap_password

- Start the development server:
  npm run dev

**Live Demo:**

- Link: [The Zerox](https://zerox-next.vercel.app/)

**Additonal resources**

- For developers looking to expand the exercise database, refer to this comprehensive exercise dataset compatible with our MongoDB schema. https://github.com/wrkout/exercises.json
