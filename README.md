🚦 Traffic Control Prediction System

Turning drainage data into actionable traffic decisions

Ever wondered how cities decide when traffic control is actually needed during drainage maintenance?
This project answers that using machine learning + spatial analytics, wrapped inside a clean API that dashboards can consume instantly.

No notebooks. No theory dumps. A working system.

🧩 What this project does (in plain English)

Given municipal drainage manhole data, the system:

Predicts whether traffic control is required

Groups locations into risk clusters

Exposes everything via an API so it can power dashboards or apps

Think: data → models → insights → decisions.

🛠️ What’s inside
🧠 Machine Learning

Logistic Regression

K-Nearest Neighbors

Decision Tree

Each model is trained, tested, and compared using:
Accuracy · Precision · Recall · F1-score · Confusion Matrix

📍 Spatial Intelligence

K-Means clustering to find high-risk zones

Elbow Method to choose the optimal number of clusters

This is where raw coordinates turn into operational insight.

🚀 Backend (not just a script)

FastAPI serves predictions and analytics

Frontend-ready JSON responses

Designed to plug directly into dashboards (React, Power BI, etc.)

🧪 Data used

Drainage Manhole Dataset

Key features:

Municipality

Maintenance District

Highway

Geographic coordinates (x, y)

Traffic Control requirement (target)

Categorical features are encoded, numeric features are scaled, and missing values are removed.

🔌 API Preview
GET /data

Returns:

Geospatial scatter data

Traffic control labels

Cluster assignments

Elbow curve values

Model accuracy comparison

Confusion matrix (Logistic Regression)

One endpoint. Multiple analytics layers.

🏗️ How the system flows
Excel Data
   ↓
Cleaning & Feature Engineering
   ↓
ML Models + Clustering
   ↓
Evaluation & Metrics
   ↓
FastAPI Backend
   ↓
Dashboard / App


Simple. Intentional. Deployable.

▶️ Run it locally
pip install fastapi uvicorn pandas numpy scikit-learn openpyxl
uvicorn app:app --reload


Then open:

http://127.0.0.1:8000/data

💡 Why this project matters

Most ML projects stop at accuracy scores.
This one goes further:

Models are compared, not assumed correct

Insights are served, not hidden in notebooks

Output is usable, not theoretical

That’s the difference between a demo and a system.

🔮 What I’d build next

Model persistence (joblib / pickle)

Explainability (feature importance, SHAP)

Live dashboard UI

Real-time data ingestion

Auth + role-based access

👤 Author

Umang Garg
Building data systems that don’t just analyze — they decide.
