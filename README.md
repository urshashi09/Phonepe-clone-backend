# PhonePe Clone Backend API

This is the backend API for a PhonePe clone, built with Node.js, Express, and MongoDB. It handles user authentication, wallet management, money transfers, bill payments, and transaction history.

## 🚀 Features

- **User Authentication**: Secure signup and login using JWT.
- **Wallet & MPIN Management**: Users can set up an MPIN for secure transactions and manage wallet balances.
- **Transactions**:
  - Deposit money into the wallet.
  - Send money to other users via their phone number.
  - Pay bills (e.g., electricity, mobile).
- **Transaction History**: View a complete ledger of all incoming and outgoing transactions.
- **API Documentation**: Auto-generated interactive Swagger API documentation.

## 🛠️ Technology Stack

- **Node.js** & **Express.js** - Server framework
- **MongoDB** & **Mongoose** - Database and ODM
- **JSON Web Tokens (JWT)** - Authentication
- **Bcrypt** - Password and MPIN hashing
- **Swagger UI Express** & **Swagger Autogen** - API Documentation

## ⚙️ Prerequisites

- Node.js (v14 or higher)
- MongoDB account or local installation

## 📦 Installation & Setup

1. **Clone the repository** (if applicable) or navigate to the project directory:
   ```bash
   cd "phonepe backend"
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Environment Variables Configuration**:
   Create a `.env` file in the root directory and add the following keys:
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   ```

4. **Generate Swagger Docs** (optional, as `swagger-output.json` is already present):
   ```bash
   npm run swagger
   ```

5. **Start the server**:
   For development (uses nodemon):
   ```bash
   npm run dev
   ```

   The server will start on `http://localhost:5000`.

## 📚 API Documentation

Once the server is running, you can access the interactive API documentation at:
**[http://localhost:5000/api-docs](http://localhost:5000/api-docs)**

From there, you can explore all available endpoints and test them out directly.
*Note: For authenticated routes, click the "Authorize" button and enter your JWT token in the format `Bearer <your_token>`.*

## 🛣️ Available Endpoints

### Auth
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login to receive a JWT token
- `POST /api/auth/setmpin` - Set or reset the MPIN (Requires Auth)
- `GET /api/auth/user` - Get details of the currently logged-in user (Requires Auth)

### Wallet
- `GET /api/wallet/balance` - Check current wallet balance (Requires Auth)
- `POST /api/wallet/paybill` - Pay a bill using wallet balance and MPIN (Requires Auth)

### Transactions
- `POST /api/transaction/deposit` - Deposit money into the wallet (Requires Auth)
- `POST /api/transaction/send` - Send money to another user by phone number (Requires Auth)
- `GET /api/transaction/history` - View all past transactions (Requires Auth)

## 🗄️ Database Seeding

To populate the database with initial dummy data:
```bash
npm run seed
```


