# Exploratory Data Analysis & Predictive Machine Learning Pipelines

[![Python](https://img.shields.io/badge/Language-Python%203-3776AB?style=for-the-badge&logo=python)](https://python.org)
[![Jupyter](https://img.shields.io/badge/Notebook-Jupyter-F37626?style=for-the-badge&logo=jupyter)](https://jupyter.org/)
[![Google Colab](https://img.shields.io/badge/Platform-Google_Colab-F9AB00?style=for-the-badge&logo=google-colab)](https://colab.research.google.com/)
[![Pandas](https://img.shields.io/badge/Data-Pandas%20%7C%20NumPy-150458?style=for-the-badge&logo=pandas)](https://pandas.pydata.org/)
[![Scikit-Learn](https://img.shields.io/badge/ML-scikit--learn-F7931E?style=for-the-badge&logo=scikit-learn)](https://scikit-learn.org/)

An end-to-end data science and machine learning research repository. Implements rigorous statistical Exploratory Data Analysis (EDA), distribution analysis, multi-collinearity checks, feature scaling, and cross-validated predictive model training in Python.

Project Reference: [Shivam Mahajan Portfolio](https://shivammahajan.com/) · [Projects](https://shivammahajan.com/projects/)

---

## Table of Contents
- [Overview](#overview)
- [Target Audience](#target-audience)
- [Features](#features)
- [How It Works](#how-it-works)
  - [End-to-End Modeling Workflow](#end-to-end-modeling-workflow)
- [File Structure](#file-structure)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Running via Jupyter or Google Colab](#running-via-jupyter-or-google-colab)
- [Key Analyses & Methodologies](#key-analyses--methodologies)
- [Performance & Validation Metrics](#performance--validation-metrics)
- [Future Scope and Improvements](#future-scope-and-improvements)
- [Author & Connect](#author--connect)

---

## Overview

In machine learning workflows, jumping directly into model training without exhaustive data sanitization results in severe algorithmic bias, data leakage, and degraded out-of-sample generalization. Understanding variance distributions, categorical cardinalities, and non-linear relationships is prerequisite to selecting appropriate estimators.

This repository documents an empirical machine learning pipeline: from raw dataset ingestion and automated anomaly detection to visual correlation heatmaps, feature encoding, hyperparameter tuning, and ensemble evaluation.

### Target Audience
- **Aspiring Data Scientists**: Learn reproducible methodologies for data cleansing, variance inflation factor (VIF) filtering, and distribution normalization.
- **Kaggle & Hackathon Competitors**: Study structured notebook pipelines optimized for reproducible cross-validation and feature engineering.
- **Applied ML Engineers**: Inspect clean pipelines leveraging Scikit-learn, Pandas, and Matplotlib/Seaborn.

---

## Features

- **Automated Data Profiling**: Comprehensive summary statistics, skewness/kurtosis evaluations, and null-value distribution matrices.
- **Outlier Mitigation**: Interquartile Range (IQR) filtering and robust Z-score transformations.
- **Feature Engineering Pipeline**: One-Hot Encoding for low-cardinality nominal features, target encoding, and continuous standard scaling.
- **Cross-Validated Evaluation**: K-Fold stratified cross-validation guarding against data leakage and overfitting.
- **Google Colab Cloud Integration**: Self-contained notebooks ready for GPU/TPU accelerated execution in Google Colab.

---

## How It Works

### End-to-End Modeling Workflow

```
┌─────────────────────────────────────────────────────────────┐
│                 Raw Tabular Dataset Ingestion               │
│                  (CSV / Parquet / DataFrames)               │
└──────────────────────────────┬──────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────┐
│                 Exploratory Data Analysis (EDA)             │
│  - Distribution Histograms, Boxplots, and Pairplots         │
│  - Pearson & Spearman Correlation Matrices                  │
│  - Missingness Mapping (Iterative Imputer / KNN Imputer)    │
└──────────────────────────────┬──────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────┐
│                 Feature Engineering & Preprocessing        │
│  - Standard / MinMax Scaling (Zero Mean, Unit Variance)     │
│  - Polynomial Features & Interaction Terms                  │
│  - Target Stratified Train-Test Split (80/20)               │
└──────────────────────────────┬──────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────┐
│                 Predictive Model Evaluation                 │
│  - Baseline vs Random Forests, Gradient Boosters, SVMs      │
│  - Metrics: ROC-AUC, F1-Score, RMSE, Confusion Matrix       │
└─────────────────────────────────────────────────────────────┘
```

---

## File Structure

```
aiml1/
├── Backupuptovisualisation.ipynb                # In-depth statistical EDA & visual charts
├── Copy_of_Sample_ML_Submission_Template.ipynb # Complete modeling pipeline & inference loop
├── backup.ipynb                                # Scratch exploration and model checkpoints
└── README.md
```

---

## Getting Started

### Prerequisites

- **Python**: v3.9 or higher
- **JupyterLab** or **VS Code Jupyter Extension**

### Running via Jupyter or Google Colab

1. Clone the repository:
   ```bash
   git clone https://github.com/smresponsibilities/aiml1.git
   cd aiml1
   ```
2. Install standard scientific Python libraries:
   ```bash
   pip install numpy pandas matplotlib seaborn scikit-learn jupyterlab
   ```
3. Launch Jupyter:
   ```bash
   jupyter lab
   ```
   *Or open any `.ipynb` notebook directly in [Google Colab](https://colab.research.google.com/).*

---

## Key Analyses & Methodologies

- **Imputation Strategy**: Median imputation for skewed continuous attributes; mode imputation for categorical attributes.
- **Dimensionality Reduction**: Principal Component Analysis (PCA) projections for visualizing high-dimensional cluster boundaries in 2D space.
- **Ensemble Benchmarking**: Evaluating performance gains from bagging (Random Forests) versus sequential boosting (XGBoost/LightGBM).

---

## Performance & Validation Metrics

- **Validation Rigor**: 5-Fold Stratified Cross-Validation on all candidate architectures.
- **Leakage Prevention**: Fit transformations (`StandardScaler`, `OneHotEncoder`) strictly on training folds prior to transforming test folds.

---

## Future Scope and Improvements

- **SHAP & LIME Interpretability**: Integrate Shapley additive explanations for global and local model transparency.
- **MLflow Experiment Tracking**: Version hyperparameters, metrics, and serialized artifacts with MLflow.
- **AutoML Integration**: Benchmark manually crafted pipelines against FLAML and Optuna Bayesian optimization.

---

## Author & Connect

Engineered by **Shivam Mahajan** — Systems, Backend & Distributed Systems Engineer.

- **Portfolio**: [https://shivammahajan.com/](https://shivammahajan.com/)
- **Project Case Studies**: [https://shivammahajan.com/projects/](https://shivammahajan.com/projects/)
- **GitHub**: [@smresponsibilities](https://github.com/smresponsibilities)
- **LinkedIn**: [Shivam Mahajan](https://www.linkedin.com/in/mahajanshivam/)
