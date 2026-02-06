# 🏠 AI Estate Analytics: Advanced House Price Prediction

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Python 3.10+](https://img.shields.io/badge/Python-3.10%2B-blue.svg)](https://www.python.org/)
[![React 19](https://img.shields.io/badge/React-19-61DAFB.svg)](https://reactjs.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.128-05998B.svg)](https://fastapi.tiangolo.com/)

An AI-driven real estate valuation platform that leverages machine learning to provide hyper-accurate property price estimations in the Bengaluru market. Developed by **Muhammad Tanveer Iqbal**.

---

## 🚀 Overview

AI Estate Analytics combines high-performance backend processing with a premium, modern user interface. It utilizes a trained XGBoost model to analyze over 13,000 data points across various locations to deliver valuations with professional-grade precision.

### Key Features
- **AI-Powered Valuations**: Real-time price prediction using advanced regression models.
- **Premium UI/UX**: Professional dark-themed interface with glassmorphism and smooth animations.
- **Interactive Forms**: User-friendly property detail entry with real-time validation.
- **Robust API**: High-speed endpoints with comprehensive error handling and health monitoring.

---

## 🛠 Tech Stack

### Backend
- **Framework**: [FastAPI](https://fastapi.tiangolo.com/)
- **Machine Learning**: Scikit-Learn, XGBoost, NumPy, Pandas
- **Server**: Uvicorn (ASGI)

### Frontend
- **Framework**: [React.js](https://reactjs.org/) (Vite)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: Lucide React

---

## 📦 Installation & Setup

### 1. Prerequisites
- Python 3.10+
- Node.js 18+
- npm or yarn

### 2. Backend Setup
```bash
cd backend
# Create virtual environment
python -m venv venv
# Activate (Windows)
.\venv\Scripts\activate
# Install dependencies
pip install -r requirements.txt
# Run the server
uvicorn main:app --reload
```

### 3. Frontend Setup
```bash
cd frontend
# Install dependencies
npm install
# Build or Run dev server
npm run dev
```

---

## 📋 API Documentation

Once the backend is running, you can access the interactive API documentation at:
- **Swagger UI**: [http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs)
- **ReDoc**: [http://127.0.0.1:8000/redoc](http://127.0.0.1:8000/redoc)

---

## 👨‍💻 Developer

**Muhammad Tanveer Iqbal**  
*AI Engineer*

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/syed-muhammad-tanveer-75aaa1321/)
[![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/MTanveerIqbal)

---

## 📄 License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.