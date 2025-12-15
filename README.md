# 🚦 Traffic Control Prediction System  
Turning drainage data into actionable traffic decisions

Ever wondered how cities decide when traffic control is actually needed during drainage maintenance?  
This project answers that using machine learning and spatial analytics, wrapped inside a clean API that dashboards can consume instantly.

No notebooks. No theory dumps. A working system.

---

## 🧩 What this project does

Given municipal drainage manhole data, the system:
- Predicts whether traffic control is required
- Groups locations into risk clusters
- Exposes everything via an API for dashboards and applications

Data → Models → Insights → Decisions.

---

## 🛠️ What’s inside

### 🧠 Machine Learning
- Logistic Regression  
- K-Nearest Neighbors  
- Decision Tree  

Models are evaluated using:
Accuracy, Precision, Recall, F1-score, and Confusion Matrix.

---

### 📍 Spatial Intelligence
- K-Means clustering to identify high-risk zones
- Elbow Method to determine the optimal number of clusters

Coordinates become insights.

---

### 🚀 Backend (FastAPI)
- Serves predictions and analytics
- Frontend-ready JSON responses
- Built for dashboard integration

---

## 🧪 Dataset

Drainage Manhole Dataset

Features used:
- Municipality
- Maintenance District
- Highway
- Geographic coordinates (x, y)
- Traffic Control requirement (target)

---

## 🔌 API Endpoint

GET /data

Returns:
- Geospatial scatter data
- Traffic control labels
- Cluster assignments
- Elbow curve values
- Model accuracy comparison
- Confusion matrix

---

## 🏗️ System Flow

Excel Data  
→ Cleaning & Feature Engineering  
→ ML Models & Clustering  
→ Evaluation  
→ FastAPI Backend  
→ Dashboard / App  

---

## ▶️ Run Locally

pip install fastapi uvicorn pandas numpy scikit-learn openpyxl  
uvicorn app:app --reload  

Open: http://127.0.0.1:8000/data

---

## 💡 Why this matters

Most ML projects stop at metrics.  
This one delivers deployable insights that support real decisions.

---

## 👤 Author

Umang Garg  
Data Analytics | Machine Learning | Automation
