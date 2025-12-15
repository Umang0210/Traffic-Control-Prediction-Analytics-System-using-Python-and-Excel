from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder, StandardScaler
from sklearn.linear_model import LogisticRegression
from sklearn.neighbors import KNeighborsClassifier
from sklearn.tree import DecisionTreeClassifier
from sklearn.cluster import KMeans
from sklearn.metrics import (
    confusion_matrix,
    accuracy_score,
    precision_score,
    recall_score,
    f1_score
)

# -----------------------------
# FASTAPI APP
# -----------------------------
app = FastAPI()

# -----------------------------
# CORS (VERY IMPORTANT)
# -----------------------------
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://127.0.0.1:3000"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# -----------------------------
# LOAD DATA
# -----------------------------
df = pd.read_excel("Drainage Manhole Dataset.xlsx")

# -----------------------------
# PREPROCESSING
# -----------------------------
df = df[
    [
        "Municipality",
        "Maintenance District",
        "Highway",
        "Requires Traffic Control",
        "x",
        "y",
    ]
].dropna()

df["Traffic_Control"] = df["Requires Traffic Control"].map(
    {"Yes": 1, "No": 0}
)

le = LabelEncoder()
df["Municipality"] = le.fit_transform(df["Municipality"])
df["Highway"] = le.fit_transform(df["Highway"].astype(str))

X = df[
    [
        "Municipality",
        "Maintenance District",
        "Highway",
        "x",
        "y",
    ]
]
y = df["Traffic_Control"]

scaler = StandardScaler()
X_scaled = scaler.fit_transform(X)

X_train, X_test, y_train, y_test = train_test_split(
    X_scaled, y, test_size=0.3, random_state=42
)

# -----------------------------
# MODELS
# -----------------------------
models = {
    "Logistic Regression": LogisticRegression(),
    "KNN": KNeighborsClassifier(n_neighbors=5),
    "Decision Tree": DecisionTreeClassifier(max_depth=5),
}

metrics = {}
predictions = {}

for name, model in models.items():
    model.fit(X_train, y_train)
    preds = model.predict(X_test)

    predictions[name] = preds
    metrics[name] = {
        "accuracy": accuracy_score(y_test, preds),
        "precision": precision_score(y_test, preds, zero_division=0),
        "recall": recall_score(y_test, preds, zero_division=0),
        "f1": f1_score(y_test, preds, zero_division=0),
    }

# -----------------------------
# K-MEANS CLUSTERING
# -----------------------------
kmeans = KMeans(n_clusters=4, random_state=42)
clusters = kmeans.fit_predict(X_scaled)

# Elbow method
wcss = []
for k in range(1, 9):
    km = KMeans(n_clusters=k, random_state=42)
    km.fit(X_scaled)
    wcss.append(km.inertia_)

# -----------------------------
# API ENDPOINT
# -----------------------------
@app.get("/data")
def get_dashboard_data():
    return {
        "scatter": {
            "x": df["x"].tolist(),
            "y": df["y"].tolist(),
            "color": df["Traffic_Control"].tolist(),
        },
        "box": {
            "x": df["Traffic_Control"].tolist(),
            "y": df["Maintenance District"].tolist(),
        },
        "clusters": {
            "x": df["x"].tolist(),
            "y": df["y"].tolist(),
            "cluster": clusters.tolist(),
        },
        "elbow": {
            "k": list(range(1, 9)),
            "wcss": wcss,
        },
        "confusion_matrix": confusion_matrix(
            y_test,
            predictions["Logistic Regression"]
        ).tolist(),
        "accuracy": {
            model: metrics[model]["accuracy"]
            for model in metrics
        },
        "performance": metrics,
    }
