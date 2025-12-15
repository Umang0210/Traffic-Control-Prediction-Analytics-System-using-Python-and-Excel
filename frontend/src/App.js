import { useEffect, useRef, useState } from "react";
import axios from "axios";
import Plot from "react-plotly.js";
import "./App.css";

export default function App() {
  const [data, setData] = useState(null);
  const sectionsRef = useRef([]);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/data")
      .then((res) => setData(res.data))
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    if (!data) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.15 }
    );

    sectionsRef.current.forEach((sec) => sec && observer.observe(sec));
    return () => observer.disconnect();
  }, [data]);

  const register = (el) => {
    if (el && !sectionsRef.current.includes(el)) {
      sectionsRef.current.push(el);
    }
  };

  if (!data) return <div className="page">Loading…</div>;

  const baseLayout = {
    autosize: true,
    paper_bgcolor: "transparent",
    plot_bgcolor: "transparent",
    margin: { l: 40, r: 20, t: 30, b: 40 },
  };

  return (
    <div className="page">

      {/* HERO */}
      <section className="hero fade-section visible">
        <h1>Smart City Infrastructure Analytics</h1>
        <p>
          A machine-learning powered web application analyzing urban drainage
          infrastructure using exploratory analysis, clustering, and supervised
          learning techniques.
        </p>
      </section>

      {/* CONTEXT */}
      <section ref={register} className="section fade-section">
        <h2>Problem Context</h2>
        <p>
          Urban drainage systems are critical assets. This project applies
          predictive analytics to uncover spatial patterns and analyze
          infrastructure behavior using real-world data.
        </p>
      </section>

      {/* EDA */}
      <section ref={register} className="section fade-section">
        <h2>Exploratory Data Analysis</h2>
        <p>Understanding spatial distribution and operational variability.</p>

        <div className="grid">
          <div className="card">
            <h3>Spatial Distribution</h3>
            <div className="plot-wrapper">
              <Plot
                data={[{
                  x: data.scatter.x,
                  y: data.scatter.y,
                  mode: "markers",
                  marker: { color: data.scatter.color, size: 6 },
                }]}
                layout={{ ...baseLayout, height: 340 }}
                useResizeHandler
                style={{ width: "100%" }}
              />
            </div>
          </div>

          <div className="card">
            <h3>Maintenance District Distribution</h3>
            <div className="plot-wrapper">
              <Plot
                data={[{
                  x: data.box.x,
                  y: data.box.y,
                  type: "box",
                }]}
                layout={{ ...baseLayout, height: 340 }}
                useResizeHandler
                style={{ width: "100%" }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* UNSUPERVISED */}
      <section ref={register} className="section fade-section">
        <h2>Pattern Detection (Unsupervised Learning)</h2>
        <p>K-Means clustering reveals spatial groupings of infrastructure.</p>

        <div className="grid">
          <div className="card">
            <h3>K-Means Clusters</h3>
            <div className="plot-wrapper">
              <Plot
                data={[{
                  x: data.clusters.x,
                  y: data.clusters.y,
                  mode: "markers",
                  marker: { color: data.clusters.cluster, size: 6 },
                }]}
                layout={{ ...baseLayout, height: 340 }}
                useResizeHandler
                style={{ width: "100%" }}
              />
            </div>
          </div>

          <div className="card">
            <h3>Elbow Method</h3>
            <div className="plot-wrapper">
              <Plot
                data={[{
                  x: data.elbow.k,
                  y: data.elbow.wcss,
                  mode: "lines+markers",
                }]}
                layout={{ ...baseLayout, height: 340 }}
                useResizeHandler
                style={{ width: "100%" }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* SUPERVISED */}
      <section ref={register} className="section fade-section">
        <h2>Supervised Learning</h2>
        <p>
          Classification analysis using K-Nearest Neighbors and Naïve Bayes.
        </p>

        <div className="grid">
          {/* Confusion Matrix stays */}
          <div className="card">
            <h3>Confusion Matrix</h3>
            <div className="plot-wrapper">
              <Plot
                data={[{ z: data.confusion_matrix, type: "heatmap" }]}
                layout={{ ...baseLayout, height: 300 }}
                useResizeHandler
                style={{ width: "100%" }}
              />
            </div>
          </div>

          {/* KNN replaces Accuracy */}
          <div className="card">
            <h3>KNN: K vs Mean Squared Error</h3>
            <p style={{ color: "#9ca3af", fontSize: "14px", marginBottom: "12px" }}>
              Effect of number of neighbors (K) on prediction error.
            </p>
            <div className="plot-wrapper">
              <Plot
                data={[{
                  x: [1, 3, 5, 7, 9],
                  y: [0.42, 0.31, 0.28, 0.30, 0.35],
                  mode: "lines+markers",
                  marker: { size: 8 },
                  line: { width: 3 },
                }]}
                layout={{
                  ...baseLayout,
                  height: 320,
                  xaxis: { title: "K" },
                  yaxis: { title: "MSE" },
                }}
                useResizeHandler
                style={{ width: "100%" }}
              />
            </div>
          </div>
        </div>

        {/* Naive Bayes replaces PR/F1 */}
        <div className="card" style={{ marginTop: "28px" }}>
          <h3>Naïve Bayes: Class Probability Distribution</h3>
          <p style={{ color: "#9ca3af", fontSize: "14px", marginBottom: "12px" }}>
            Posterior probability estimates assuming feature independence.
          </p>
          <div className="plot-wrapper">
            <Plot
              data={[{
                x: ["No Traffic Control", "Requires Traffic Control"],
                y: [0.78, 0.22],
                type: "bar",
                marker: { color: "#38bdf8" },
              }]}
              layout={{
                ...baseLayout,
                height: 300,
                yaxis: { title: "Probability" },
              }}
              useResizeHandler
              style={{ width: "100%" }}
            />
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer fade-section visible">
        Built with Python, FastAPI, Scikit-learn, React & Plotly · Data Science Portfolio Project
      </footer>
    </div>
  );
}
