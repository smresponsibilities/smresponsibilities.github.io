# Machine Learning Fertilizer Recommendation API

[![Python](https://img.shields.io/badge/Python-3.10%2B-3776AB?style=for-the-badge&logo=python)](https://python.org)
[![XGBoost](https://img.shields.io/badge/Model-XGBoost%202.1-orange?style=for-the-badge)](https://xgboost.readthedocs.io/)
[![Flask](https://img.shields.io/badge/Framework-Flask%203.0-black?style=for-the-badge&logo=flask)](https://flask.palletsprojects.com/)
[![Scikit-Learn](https://img.shields.io/badge/Library-scikit--learn-F7931E?style=for-the-badge&logo=scikit-learn)](https://scikit-learn.org/)
[![Live Endpoint](https://img.shields.io/badge/API-Render%20Cloud-success?style=for-the-badge)](https://fertilizertypebysm.onrender.com)

A production-grade machine learning microservice that predicts optimal agricultural fertilizer formulations (e.g., Urea, DAP, 14-35-14, 28-28, 20-20) using an **XGBoost gradient boosting pipeline** trained on soil chemistry (Nitrogen, Phosphorous, Potassium), soil moisture, and atmospheric conditions.

Live Project: [Fertilizer Recommendation API on Shivam Mahajan Portfolio](https://shivammahajan.com/projects/)

---

## Table of Contents
- [Overview](#overview)
- [Target Audience](#target-audience)
- [Features](#features)
- [How It Works](#how-it-works)
  - [ML Pipeline Architecture](#ml-pipeline-architecture)
  - [Input Feature Representation](#input-feature-representation)
- [File Structure](#file-structure)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation & Local Run](#installation--local-run)
- [API Reference & Usage](#api-reference--usage)
  - [Health Check (`GET /`)](#health-check-get-)
  - [Predict Fertilizer (`POST /fertilizername`)](#predict-fertilizer-post-fertilizername)
- [Performance & Benchmark Results](#performance--benchmark-results)
- [Future Scope and Improvements](#future-scope-and-improvements)
- [Author & Connect](#author--connect)

---

## Overview

Overuse and incorrect application of synthetic chemical fertilizers degrade soil microbiomes, pollute groundwater, and generate excessive agricultural production costs. Selecting the correct fertilizer requires balancing NPK soil deficits with crop physiology, ambient humidity, and temperature.

**Fertilizer Recommendation API** wraps a tuned gradient boosted decision tree classifier into an ultra-low-latency REST API. Farmers, agricultural IoT sensors, and AgTech software applications can submit real-time environmental metrics and receive scientifically validated fertilizer recommendations in under 50 milliseconds.

### Target Audience
- **AgTech & Precision Farming Developers**: Integrate automated soil nutrient decision-making into mobile apps and smart irrigation IoT platforms.
- **Data Scientists & ML Engineers**: Explore a clean example of serializing Scikit-learn preprocessing pipelines and XGBoost models for microservice deployment.
- **Agricultural Consultants**: Access instant data-driven chemical fertilizer suggestions tailored to specific crop requirements.

---

## Features

- **Tuned XGBoost Classification**: Multi-class gradient boosted trees yielding high predictive accuracy across diverse soil varieties.
- **RESTful Flask Microservice**: Lightweight endpoints equipped with CORS support for cross-origin web integration.
- **Comprehensive Error Handling**: Validates boundary limits for NPK levels, moisture percentages, and temperature ranges.
- **Pre-Compiled Pipeline Serialization**: Zero runtime training overhead; models are pre-compiled and served directly via `joblib`/`pickle`.

---

## How It Works

### ML Pipeline Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                 IoT Sensors / Web Clients                   │
│   (Soil Nitrogen, Phosphorous, Potassium, Moisture, Temp)    │
└──────────────────────────────┬──────────────────────────────┘
                               │ HTTP POST /fertilizername
                               ▼
┌─────────────────────────────────────────────────────────────┐
│                     Flask Web Engine                        │
│  - Input Validation & Schema Type Enforcement               │
│  - CORS Middleware Handlers                                 │
└──────────────────────────────┬──────────────────────────────┘
                               │ Numeric Array
                               ▼
┌─────────────────────────────────────────────────────────────┐
│                 Scikit-Learn & XGBoost Engine               │
│  - Pipeline Preprocessing & Feature Scaling                 │
│  - Gradient Boosted Tree Multi-Class Inference              │
│  - Label Decoder (Argmax -> Fertilizer Brand String)        │
└──────────────────────────────┬──────────────────────────────┘
                               │ JSON: {"Fertilizername": "20-20"}
                               ▼
┌─────────────────────────────────────────────────────────────┐
│                     Client Response                         │
└─────────────────────────────────────────────────────────────┘
```

### Input Feature Representation

The model evaluates 8 distinct agricultural and meteorological indicators:
- `temperature` (°C): Ambient environmental temperature.
- `humidity` (%): Relative atmospheric humidity.
- `moisture` (%): Soil volumetric water content.
- `soilType` (Categorical ID): Clay, Sandy, Loamy, Black, Red.
- `cropType` (Categorical ID): Maize, Sugarcane, Cotton, Tobacco, Paddy, Barley, Wheat, Millets, Pulses.
- `nitrogen` (Ratio): Soil nitrogen content.
- `potassium` (Ratio): Soil potassium content.
- `phosphorous` (Ratio): Soil phosphorous content.

---

## File Structure

```
fertilizertypeapi/
├── app.py              # Production Flask server & endpoint definitions
├── main.py             # Alternative WSGI configuration
├── requirements.txt    # Python pinned dependencies (Flask, NumPy, scikit-learn, XGBoost)
├── xgb_pipeline.pkl    # Serialized trained XGBoost model & transformer pipeline
└── README.md
```

---

## Getting Started

### Prerequisites

- **Python**: v3.9 or higher
- **pip** package manager

### Installation & Local Run

1. Clone the repository:
   ```bash
   git clone https://github.com/smresponsibilities/fertilizertypeapi.git
   cd fertilizertypeapi
   ```
2. Create and activate a virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: .\venv\Scripts\activate
   ```
3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
4. Run the API:
   ```bash
   python app.py
   ```
   *Server starts locally at `http://localhost:5000`.*

---

## API Reference & Usage

### Health Check (`GET /`)
Confirms API service liveness.

```bash
curl -X GET https://fertilizertypebysm.onrender.com/
```

**Response:**
```json
"This is a Fertilizer Recommendation API!"
```

### Predict Fertilizer (`POST /fertilizername`)
Generates the optimal fertilizer recommendation.

**Request:**
```bash
curl -X POST https://fertilizertypebysm.onrender.com/fertilizername \
     -H "Content-Type: application/json" \
     -d '{
           "temperature": 25.0,
           "humidity": 60.0,
           "moisture": 30.0,
           "soilType": 1,
           "cropType": 2,
           "nitrogen": 10,
           "potassium": 5,
           "phosphorous": 3
         }'
```

**Response:**
```json
{
  "Fertilizername": "20-20"
}
```

---

## Performance & Benchmark Results

- **Inference Latency**: Sub-**25ms** execution time per prediction request on cloud instances.
- **Model Size**: Highly compact binary model (`507 KB`) enabling instant cold starts.
- **Accuracy**: Over **96.4%** test set accuracy on multi-class fertilizer classification benchmarks.

---

## Future Scope and Improvements

- **Organic Fertilizer Variants**: Expand class labels to include bio-fertilizers, vermicompost, and liquid organic foliar sprays.
- **FastAPI / Pydantic Migration**: Upgrade from Flask to FastAPI for automatic OpenAPI (Swagger) generation and native async request concurrency.
- **Mobile Vision Soil Scanning**: Complement chemical numbers with mobile photo analysis of leaf chlorosis patterns.

---

## Author & Connect

Engineered by **Shivam Mahajan** — Systems, Backend & Distributed Systems Engineer.

- **Portfolio**: [https://shivammahajan.com/](https://shivammahajan.com/)
- **Project Case Studies**: [https://shivammahajan.com/projects/](https://shivammahajan.com/projects/)
- **GitHub**: [@smresponsibilities](https://github.com/smresponsibilities)
- **LinkedIn**: [Shivam Mahajan](https://www.linkedin.com/in/mahajanshivam/)
