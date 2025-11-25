# 🍔 Fast Food Backend (MERN Stack Online Delivery System)

A robust and scalable backend system for a startup online food delivery service, emphasizing *real-time order management* and secure, efficient data handling.

[![MERN Stack](https://img.shields.io/badge/Stack-MERN-blueviolet)](https://www.mongodb.com/mern-stack)
[![Backend: Node/Express](https://img.shields.io/badge/Backend-Node.js%2FExpress.js-success)]()
[![Database: MongoDB](https://img.shields.io/badge/Database-MongoDB-47A248)]()
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![GitHub Repo](https://img.shields.io/badge/Repository-MAN00J%2FFastFood-blue)](https://github.com/MAN00J/FastFood)

---

## 📖 Table of Contents

* [Project Overview](#-project-overview)
* [Core Features](#-core-features)
* [Technology Stack](#-technology-stack)
* [Prerequisites](#-prerequisites)
* [Installation and Setup](#-installation-and-setup)
* [Contribution & Contact](#-contribution--contact)

---

## 🚀 Project Overview

This project provides the **core backend and database logic (Node.js/Express with MongoDB)** for a modern online food delivery system.
It is engineered to be a *secure, efficient, and user-friendly platform* that handles all API transactions for both consumers and sellers/restaurants.

This repository primarily contains the **backend (Node.js/Express)** and **database (MongoDB)** logic.
The APIs are designed to be consumed by a separate frontend (React) application to complete the MERN stack.

---

## ✨ Core Features

The system is engineered for speed, security, and simplicity, offering the following functionalities:

* **Fast, Secure, and Simple:** Optimized for performance and protected with secured API endpoints.
* **Easy Order Management:** Sellers can *track, process, and update orders efficiently.*
* **Secured API:** Uses modern security protocols and *JSON Web Tokens (JWT)* for authentication and authorization.
* **Multiple Sub-Seller Accounts:** Restaurant owners can create and manage *sub-accounts for staff* with role-based permissions.
* **Reliable & Efficient Data Handling:** Implements *MongoDB* for flexible and reliable NoSQL data storage.
* **Seller Tools:** Includes features for adding discounts, updating products, and managing inventory.
* **Live Order Tracking (Consumer Feature):** APIs support *real-time updates* for consumers to track their orders.

---

## 🛠 Technology Stack

| Component    | Technology           | Role                                                    |
| ------------ | -------------------- | ------------------------------------------------------- |
| **Frontend** | ReactJS              | User Interface and Interaction                          |
| **Backend**  | Node.js / Express.js | Server-side logic, routing, and RESTful API development |
| **Database** | MongoDB              | NoSQL data storage and management                       |

---

## ⚙ Prerequisites

Before you begin, ensure you have the following installed:

* **Node.js and npm** – [Download Node.js](https://nodejs.org/en/download/)
* **MongoDB** – Local installation or [MongoDB Atlas](https://www.mongodb.com/atlas)
* **Git** – For cloning the repository

---

## 📥 Installation and Setup

Follow these steps to set up the backend locally.

### Step 1: Clone the Repository

```bash
git clone https://github.com/MAN00J/FastFood.git
```

### Step 2: Navigate to the Project Directory

```bash
cd FastFood
```

### Step 3: Install Dependencies

```bash
npm install
# OR
yarn install
```

### Step 4: Configure Environment Variables

Create a `.env` file in the root of your project directory and add the following:

```bash
# MongoDB Connection String
MONGO_URI=mongodb+srv://<username>:<password>@clustername.mongodb.net/fastfooddb?retryWrites=true&w=majority

# Secret Key for JWT Authentication
JWT_SECRET_KEY=your_very_strong_and_long_jwt_secret

# Server Port
PORT=5000
```

### Step 5: Start the Server

```bash
npm start
# OR
npm run dev   # If a development script is configured
```

The backend server should now be running at:
👉 **[http://localhost:5000](http://localhost:5000)**

---

## 🤝 Contribution & Contact

This project was developed by **Manoj Bhattarai** with ❤️.
For any inquiries or contributions, visit the main repository:
🔗 [https://github.com/MAN00J/FastFood](https://github.com/MAN00J/FastFood)
