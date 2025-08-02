Mini LinkedIn
A full-stack, single-page application built with the MERN stack, designed to simulate a simple professional community platform. Users can register, log in, create text-based posts, and view a public feed of all posts.

Stack Used
This project is a classic MERN stack application, leveraging the following technologies:

Frontend:

React: For building a dynamic and responsive user interface.

Vite: A fast-performing build tool for an optimized development experience.

React Router DOM: For handling client-side navigation and routing.

Axios: A promise-based HTTP client for making API requests to the backend.

CSS: A custom, modern stylesheet with a mobile-first approach for a polished and fully responsive UI.

Backend:

Node.js & Express.js: A powerful and flexible framework for building RESTful APIs.

MongoDB: A NoSQL database for storing application data (users, posts).

Mongoose: An Object Data Modeling (ODM) library for MongoDB, providing schema-based data management.

JSON Web Tokens (JWT): For secure, stateless user authentication and authorization.

bcryptjs: For securely hashing and salting user passwords.

dotenv: To manage environment variables in development.

⚙️ Setup Instructions
Follow these steps to get the project up and running on your local machine.

1. Prerequisites
Node.js (v18 or higher)

npm (v8 or higher)

A MongoDB database (local instance or a cloud service like MongoDB Atlas)

2. Clone the Repository

git clone https://github.com/itsvishu0070/mini-linkedin.git
cd mini-linkedin


3. Backend Setup
Navigate into the server directory:

cd server


Install the backend dependencies:

npm install


Create a .env file in the server directory with the following content, replacing the placeholder values with your own:

NODE_ENV=development
PORT=5000
MONGO_URI=your_mongodb_connection_string_here
JWT_SECRET=a_very_long_and_random_secret_key


MONGO_URI: Your MongoDB connection string (e.g., from MongoDB Atlas).

JWT_SECRET: A secure, random string for signing JWTs.

Start the backend server in development mode:

npm run dev


The server should start on http://localhost:5000 and connect to your database.

4. Frontend Setup
Navigate to the client directory:

cd ../client


Install the frontend dependencies:

npm install


Create a .env file in the client directory with the following content:

VITE_API_URL=http://localhost:5000/api


Start the frontend development server:

npm run dev


The app should be accessible in your browser, typically at http://localhost:5173.

 Admin / Demo User Logins
You can either register a new user directly from the application's /register page, or use Postman to create a user first.

To register a new user via the app:

Navigate to http://localhost:5173/register in your browser.

Fill in the registration form with a unique email and a password.

Upon successful registration, you will be automatically logged in and redirected to the home page.

Extra Features & Core Functionality
User Authentication: Secure registration, login, and logout.

Protected Routes: Only logged-in users can access the main feed and profile pages.

Public Post Feed: View all posts from all users, sorted by most recent.

Create Post: Logged-in users can create new posts directly from the home page.

Dynamic Profile Pages: Each user has a profile page displaying their details and all of their posts.

Fully Responsive UI: A modern and intuitive design with a mobile-friendly hamburger menu for seamless navigation on all screen sizes.
