# Todo App with Express and MongoDB

This is a simple to-do list application built using Express.js and MongoDB. It allows users to manage tasks by adding them to a pending list and moving them to a completed list.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## Overview

The application consists of an Express.js server that connects to a MongoDB Atlas database to manage tasks. Tasks can be added to a pending list, moved to a completed list, and moved back to the pending list if necessary.

## Features

- Add tasks to the pending list
- Move tasks from pending to completed
- Move tasks from completed back to pending
- Serve static files and a main HTML page

## Installation

1. **Clone the repository:**
    ```bash
    git clone https://github.com/PARASMANI-KHUNTE/To-Do-App-New.git
    cd To-Do-App-New
    ```

2. **Install dependencies:**
    ```bash
    npm install
    ```

3. **Set up environment variables:**
    Create a `.env` file in the root directory and add the following:
    ```plaintext
    PORT=3000
    MONGODB_URI=your_mongodb_uri
    ```

4. **Run the application:**
    ```bash
    npm start
    ```

## Environment Variables

- `PORT`: The port number on which the server will run (default is 3000).
- `MONGODB_URI`: The connection string for your MongoDB Atlas database.

## API Endpoints

### Get Home Page

- **Endpoint:** `GET /`
- **Description:** Serves the main HTML page.
- **Response:** Returns the `index.html` file with tasks data.

### Add Task to Pending List

- **Endpoint:** `POST /tasks/pending`
- **Description:** Adds a new task to the pending list.
- **Request Body:**
    ```json
    {
        "taskInput": "Task description"
    }
    ```
- **Response:**
    ```json
    {
        "message": "Task added to pending list successfully",
        "taskId": "the_id_of_the_created_task"
    }
    ```

### Move Task to Completed List

- **Endpoint:** `PUT /tasks/:id/complete`
- **Description:** Moves a task from the pending list to the completed list.
- **Request Parameters:**
    - `id`: The ID of the task to move.
- **Response:**
    ```json
    {
        "message": "Task moved to completed list successfully"
    }
    ```

### Move Task Back to Pending List

- **Endpoint:** `PUT /tasks/:id/undo`
- **Description:** Moves a task from the completed list back to the pending list.
- **Request Parameters:**
    - `id`: The ID of the task to move.
- **Response:**
    ```json
    {
        "message": "Task moved to pending list successfully"
    }
    ```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

### Steps to Contribute

1. **Fork the repository.**
2. **Create a new branch:**
    ```bash
    git checkout -b feature/your-feature-name
    ```
3. **Make your changes.**
4. **Commit your changes:**
    ```bash
    git commit -m 'Add some feature'
    ```
5. **Push to the branch:**
    ```bash
    git push origin feature/your-feature-name
    ```
6. **Open a pull request.**

## License

This project is licensed under the MIT License.

## Contact

If you have any questions or suggestions, feel free to contact me at:

- GitHub: [PARASMANI-KHUNTE](https://github.com/PARASMANI-KHUNTE)

Thank you for using this Todo App!
