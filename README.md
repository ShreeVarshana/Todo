TODO List App (MERN)
A simple TODO List app built with the MERN stack (MongoDB, Express, React, Node.js) that lets users add, edit, and delete tasks.

Features
Add Tasks: Create new tasks with a title and description.
Edit Tasks: Update task information.
Delete Tasks: Remove tasks when they’re done.
Responsive Design: Works on mobile and desktop.
Tech Stack
Frontend: React.js
Backend: Node.js, Express.js
Database: MongoDB
Setup
Clone the repository:

bash
Copy code
git clone https://github.com/your-username/todo-list-mern.git
cd todo-list-mern
Install dependencies:

bash
Copy code
# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install
Set environment variables:

In backend/.env:

env
Copy code
MONGO_URI=your_mongodb_uri
PORT=5000
Run the app:

bash
Copy code
# Backend
cd backend
npm run server

# Frontend
cd ../frontend
npm start
Frontend: http://localhost:3000
Backend: http://localhost:5000
API Endpoints
Method	Endpoint	Description
GET	/api/todos	Get all tasks
POST	/api/todos	Add a new task
PUT	/api/todos/:id	Update a task
DELETE	/api/todos/:id	Delete a task
