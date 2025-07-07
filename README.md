🛒 Ecommerce Website







An end‑to‑end MERN stack ecommerce platform built with Vite + React on the frontend and Express.js + MongoDB on the backend. It supports full product catalog, shopping cart, secure checkout, order tracking, and an admin dashboard.

✨ Demo

Live site: https://ecommerce-app-frontend-blush.vercel.app/

📋 Table of Contents

Features

Tech Stack

Project Structure

Getting Started

Prerequisites

Environment Variables

Installation

Running Locally

API Reference

Testing

Deployment

Roadmap

Contributing

License

Acknowledgements

🚀 Features

Modern React 18 frontend bootstrapped with Vite for lightning‑fast dev server & HMR

Responsive, accessible UI (Tailwind CSS) with dark mode

JWT authentication & refresh tokens

Product search, filtering, pagination, wishlist & reviews

Fully‑featured shopping cart and Stripe payment checkout

Admin dashboard: CRUD products / categories, manage orders & users

RESTful Express.js API with typed request validation (express‑validator)

MongoDB Atlas database with Mongoose ODM and aggregation pipelines

Rate limiting, helmet, CORS, logging & error handling middleware

CI/CD with GitHub Actions → Vercel (frontend) 

100% typed codebase with JavaScript (optional flag)

🧑‍💻 Tech Stack

Layer

Technology

Frontend

React 18, Vite, React Router, Context Toolkit, Tailwind CSS, Axios

Backend

Node.js 18, Express.js, Mongoose, Cloudinary (images), Stripe

Database

MongoDB Atlas


GitHub Actions, Vercel

🏁 Getting Started

Prerequisites

Node.js ≥ 18 and npm / pnpm / yarn

MongoDB local instance or Atlas cluster

(Optional) Docker & Docker Compose

Environment Variables

Copy the examples and fill in your own values:

cp server/.env.example server/.env

Variable

Description

PORT

API port (default 5000)

MONGODB_URI

MongoDB connection string

JWT_SECRET

Secret for signing access tokens

JWT_REFRESH_SECRET

Secret for refresh tokens

STRIPE_SECRET_KEY

Stripe private key

CLOUDINARY_CLOUD_NAME

Cloudinary cloud

CLOUDINARY_API_KEY

Cloudinary key

CLOUDINARY_API_SECRET

Cloudinary secret

Installation

# Clone the repo
git clone https://github.com/<your-username>/ecommerce-website.git
cd ecommerce-website

# Install frontend deps
cd client
npm install
npm run dev     # http://localhost:5173

# In a new terminal, install backend deps
cd ../server
npm install
npm run dev     # http://localhost:5000

Running Locally with Docker

docker compose up --build

App available at http://localhost:5173 and API at http://localhost:5000.

🔌 API Reference

Full interactive docs available at /api-docs (Swagger UI).

Method

Endpoint

Description

GET

/api/products

List products with query params

GET

/api/products/:id

Single product

POST

/api/auth/register

Register user

POST

/api/auth/login

Login & get tokens

POST

/api/orders

Create order (auth)

...

...

...

See server/routes for the complete list.

🧪 Testing

# frontend
cd client
pnpm test

# backend
cd ../server
npm test

Coverage reports are generated in coverage/.

☁️ Deployment

Front‑end is automatically deployed to Vercel on push to main.Back‑end is containerized and deployed to Render (free tier) via GitHub Actions.

name: backend-deploy
on:
  push:
    branches: [ main ]
jobs:
  deploy:
    uses: render-examples/deploy@v1

Adjust vercel.json and render.yaml to suit your environment.

🗺️ Roadmap



🙌 Contributing

Contributions, issues and feature requests are welcome!Please read the contributing guidelines first.

git checkout -b feat/awesome-feature
git commit -m 'feat: add awesome feature'
git push origin feat/awesome-feature

📄 License

Distributed under the MIT License. See LICENSE for details.

🙏 Acknowledgements

Vite

React

Express

MongoDB

Tailwind CSS

Shield badges by Shields.io

Built with ❤️ 
