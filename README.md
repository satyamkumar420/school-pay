# School Payment and Dashboard Application

A backend application for managing school payments and viewing transaction dashboards. It includes user authentication, payment gateway integration, and webhook handling for real-time updates.

## Features

- **JWT Authentication:** Secure endpoints using JSON Web Tokens.
- **Payment Gateway Integration:** Create and manage payment requests.
- **Webhooks:** Handle real-time payment status updates.
- **Transactional Queries:** Fetch transaction data with pagination and sorting.
- **Input Validation:** Middleware to validate request bodies.
- **Centralized Error Handling:** A single place to handle all errors.

## Folder Structure

```
.
├── config
│   └── db.js
├── middleware
│   ├── auth.js
│   └── errorHandler.js
├── models
│   ├── Order.js
│   ├── OrderStatus.js
│   ├── User.js
│   └── WebhookLog.js
├── routes
│   ├── auth.js
│   ├── payment.js
│   └── transaction.js
├── validators
│   ├── authValidator.js
│   └── paymentValidator.js
├── .env
├── .gitignore
├── index.js
└── package.json
```

## API Endpoints

| Method | Path                                       | Description                               | Protected | Request Body/Params                                                                                             | Success Response                                                         |
| :----- | :----------------------------------------- | :---------------------------------------- | :-------- | :-------------------------------------------------------------------------------------------------------------- | :----------------------------------------------------------------------- |
| `POST` | `/api/auth/register`                       | Register a new user                       | No        | `name` (string), `email` (string), `password` (string)                                                          | `{ "msg": "User registered successfully" }`                              |
| `POST` | `/api/auth/login`                          | Authenticate a user and get a token       | No        | `email` (string), `password` (string)                                                                           | `{ "token": "JWT_TOKEN" }`                                               |
| `POST` | `/api/payment/create-payment`              | Create a new payment request              | Yes       | `amount` (number), `student_info` (object)                                                                      | Redirects to the payment gateway URL.                                    |
| `POST` | `/api/payment/webhook`                     | Handle payment status updates             | No        | `order_info` (object)                                                                                           | `{ "status": "OK" }`                                                     |
| `GET`  | `/api/transactions`                        | Get all transactions                      | Yes       | `page` (number, optional), `limit` (number, optional), `sort` (string, optional), `order` (string, optional)    | `{ "total": 1, "page": 1, "limit": 10, "totalPages": 1, "data": [...] }` |
| `GET`  | `/api/transactions/school/:schoolId`       | Get transactions for a school             | Yes       | `schoolId` (string, required), `page` (number, optional), `limit` (number, optional), `sort` (string, optional) | `{ "total": 1, "page": 1, "limit": 10, "totalPages": 1, "data": [...] }` |
| `GET`  | `/api/transaction/status/:custom_order_id` | Get transaction status by custom order ID | Yes       | `custom_order_id` (string, required)                                                                            | `{ "status": "success" }`                                                |

## Environment Variables

Create a `.env` file in the root of the project and add the following variables:

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PG_KEY=your_payment_gateway_key
PAYMENT_API_KEY=your_payment_api_key
SCHOOL_ID=your_school_id
CALLBACK_URL=your_callback_url
```

## Setup and Installation

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/your-username/your-repo-name.git
    cd your-repo-name
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    ```

3.  **Create a `.env` file** in the root directory and add the environment variables listed above.

4.  **Run the development server:**
    ```bash
    npm run dev
    ```

## Postman Collection

It is recommended to use a Postman collection for testing the API endpoints. You can create a collection with the following structure:

- **Auth**
  - `POST` Register
  - `POST` Login
- **Payment**
  - `POST` Create Payment
- **Transactions**
  - `GET` Get All Transactions
  - `GET` Get Transactions by School
  - `GET` Get Transaction Status
