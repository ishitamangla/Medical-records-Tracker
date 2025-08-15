# Medical Tracker

**Medical Tracker** is a web application that helps users manage their medical records efficiently.
Users can add, view, and update medical records in a simple and organized way.

---

## Table of Contents

1. [Project Overview](#project-overview)
2. [Features](#features)
3. [Technologies Used](#technologies-used)
4. [Installation](#installation)
5. [Setup Environment Variables](#setup-environment-variables)
6. [Usage](#usage)
7. [Project Structure](#project-structure)
8. [Contributing](#contributing)
9. [License](#license)

---

## Project Overview

Medical Tracker is a MERN stack application that allows users to maintain their personal medical records. It provides:

* Secure login for users
* Ability to add, update, and delete medical records
* Easy-to-use interface to track health data

---

## Features

* **User Authentication**: Secure login and signup system.
* **CRUD Operations**: Create, Read, Update, Delete medical records.
* **Responsive Design**: Works smoothly on desktop and mobile devices.
* **Data Persistence**: Records are stored safely in MongoDB.
* **Search & Filter**: Quickly find records by patient name or date.

---

## Technologies Used

* **Frontend**: React.js, Bootstrap
* **Backend**: Node.js, Express.js
* **Database**: MongoDB
* **State Management**: React Hooks
* **Version Control**: Git & GitHub

---

## Installation

**1. Clone the repository**

```bash
git clone https://github.com/ishitamangla/Medical-records-Tracker.git
```

**2. Navigate to the project directory**

```bash
cd Medical-records-Tracker
```

**3. Install backend dependencies**

```bash
cd backend
npm install
```

**4. Install frontend dependencies**

```bash
cd ../frontend
npm install
```

---

## Setup Environment Variables

Create a `.env` file in your `backend/` folder with the following content:

```env
# MongoDB connection string placeholder
MONGO_URI=your_mongodb_connection_string

# Backend server port
PORT=5000
```

**Notes:**

* Replace `your_mongodb_connection_string` with your actual MongoDB URI locally.
* Do **not** push the `.env` file to GitHub.
* Ensure `.gitignore` includes:

```text
node_modules/
.env
```

---

## Usage

1. Open your browser at `http://localhost:3000`.
2. Sign up or log in.
3. Add, edit, or delete medical records.
4. Use the search and filter options to find records quickly.

---


## Contributing

1. Fork the repository.
2. Create a branch: `git checkout -b feature-name`.
3. Make changes and commit: `git commit -m "Description of change"`.
4. Push the branch: `git push origin feature-name`.
5. Open a Pull Request.

---

