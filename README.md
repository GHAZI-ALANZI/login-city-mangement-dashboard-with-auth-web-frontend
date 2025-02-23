# Login City Management - Authentication System

This is a **Next.js 15** Login authentication system that integrates with a backend **API for login**. It handles:
- User authentication via **JWT tokens**
- Role-based access control
- Secure login with **localStorage**
- Redirection based on user roles

## 🚀 Features
✅ **Next.js 15 & TypeScript**  
✅ **JWT Authentication** using `jsonwebtoken`  
✅ **Role-based Access Control** (`FullAdmin` redirects to Dashbord)  
✅ **Docker Support** for lightweight deployment  
✅ **Glassmorphism UI** with Tailwind CSS  


<img width="959" alt="Image" src="https://github.com/user-attachments/assets/24afa26f-cdbc-4659-8030-743a4c9dab32" />

## 📌 Installation
### **Clone the Repository**

git clone https://github.com/GHAZI-ALANZI/login-city-mangement-dashboard-with-auth-web-frontend.git

## Install Dependencies

npm install

# 📌  Environment Variables
Create a .env.local file in the root directory:


NEXT_PUBLIC_API_URL=https://localhost:7245  ## here replace url with  your api 

# 📌  Authentication 

** utils/auth.ts (Handles API Requests & Token)

** app/login/page.tsx (Login Page)
This is the Next.js 15 client-side login page with authentication.


# 📌 Run the Application

npm run dev

Visit http://localhost:3000/login in your browser.

# 📌Docker Support
Dockerfile

# docker-compose.yml

docker-compose up --build -d
Visit http://localhost:3000 🚀.


