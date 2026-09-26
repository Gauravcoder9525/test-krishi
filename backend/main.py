"""
🌾 Krishi AI — FastAPI Backend Server
Main application entry point.

Runs on port 5003.
Start with: uvicorn main:app --host 0.0.0.0 --port 5003 --reload
"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from routers import disease, soil, environment, blockchain, prediction, crop_predict

# ──────────────────────────────────────────────
# FastAPI App
# ──────────────────────────────────────────────
app = FastAPI(
    title="Krishi AI Backend",
    description="🌾 FastAPI backend for Krishi AI — Disease Detection, Soil Classification, Environmental Data, Blockchain Hash, and Fertiliser Prediction",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc"
)

# ──────────────────────────────────────────────
# CORS Middleware (allow all origins for development)
# ──────────────────────────────────────────────
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ──────────────────────────────────────────────
# Register Routers
# ──────────────────────────────────────────────
app.include_router(disease.router)
app.include_router(soil.router)
app.include_router(environment.router)
app.include_router(blockchain.router)
app.include_router(prediction.router)
app.include_router(crop_predict.router)


# ──────────────────────────────────────────────
# Health Check
# ──────────────────────────────────────────────
@app.get("/api/health")
async def health_check():
    """Health check endpoint to verify the backend is running."""
    return {
        "success": True,
        "status": "healthy",
        "service": "Krishi AI Backend",
        "version": "1.0.0",
        "endpoints": {
            "disease_detect": "POST /api/disease-detect",
            "soil_classify": "POST /api/soil-classify",
            "soil_anomaly": "POST /api/soil-anomaly",
            "environment": "GET /api/environment?lat=28.67&lon=77.45",
            "blockchain_submit": "POST /api/blockchain/submit-farmer-request",
            "blockchain_solution": "POST /api/blockchain/commit-company-solution",
            "blockchain_chain": "GET /api/blockchain/chain",
            "fertilizer_predict": "POST /api/prediction/fertilizer",
            "docs": "GET /docs"
        }
    }


@app.get("/")
async def root():
    """Root endpoint."""
    return {
        "message": "🌾 Krishi AI Backend is running!",
        "docs": "Visit /docs for interactive API documentation"
    }


# ──────────────────────────────────────────────
# Run with: uvicorn main:app --host 0.0.0.0 --port 5003 --reload
# ──────────────────────────────────────────────
if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=5003, reload=True)
