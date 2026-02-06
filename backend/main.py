import pickle
import json
import numpy as np
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import os
import sys

# Initialize FastAPI app
app = FastAPI(title="House Price Prediction API")

# configurations
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Adjust this in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Global variables for artifacts
model = None
scaler = None
columns = []

# Paths
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
MODELS_DIR = os.path.join(BASE_DIR, "models")
MODEL_PATH = os.path.join(MODELS_DIR, "House_Price_Prediction_Model.pickle")
SCALER_PATH = os.path.join(MODELS_DIR, "scaler.pickle")
COLUMNS_PATH = os.path.join(MODELS_DIR, "columns.json")

def load_artifacts():
    """Load ML artifacts (model, scaler, columns) into global variables."""
    global model, scaler, columns
    try:
        print("Loading artifacts...")
        
        if not os.path.exists(MODEL_PATH):
            raise FileNotFoundError(f"Model file not found at {MODEL_PATH}")
        with open(MODEL_PATH, "rb") as f:
            model = pickle.load(f)
            
        if not os.path.exists(SCALER_PATH):
            raise FileNotFoundError(f"Scaler file not found at {SCALER_PATH}")
        with open(SCALER_PATH, "rb") as f:
            scaler = pickle.load(f)

        if not os.path.exists(COLUMNS_PATH):
            raise FileNotFoundError(f"Columns file not found at {COLUMNS_PATH}")
        with open(COLUMNS_PATH, "r") as f:
            columns = json.load(f)["data_columns"]
            
        print("All artifacts loaded successfully.")
    except Exception as e:
        print(f"CRITICAL ERROR: Failed to load artifacts: {e}")
        # We don't exit here so the app can start and report health status, 
        # but prediction endpoints will fail gracefully.

# Load on startup
load_artifacts()

# Pydantic Models
class PredictionRequest(BaseModel):
    total_sqft: float
    bath: float
    bhk: int
    location: str

class PredictionResponse(BaseModel):
    predicted_price: float

class LocationsResponse(BaseModel):
    locations: list[str]

@app.get("/", tags=["Health"])
def read_root():
    """Health check endpoint."""
    status = "healthy" if model and scaler and columns else "degraded"
    return {"message": "Welcome to House Price Prediction API", "status": status}

@app.get("/locations", response_model=LocationsResponse, tags=["Data"])
def get_locations():
    """Get list of available locations for prediction."""
    if not columns:
        raise HTTPException(status_code=503, detail="Model artifacts not loaded.")
    
    # Extract locations from columns (assumes one-hot encoded format 'location_Name')
    locations = [col.replace('location_', '') for col in columns if col.startswith('location_')]
    return {"locations": locations}

@app.post("/predict", response_model=PredictionResponse, tags=["Prediction"])
def predict_price(req: PredictionRequest):
    """
    Predict house price based on input features.
    """
    if not model or not scaler:
        raise HTTPException(status_code=503, detail="Model artifacts not loaded.")
        
    try:
        # 1. Initialize input array with zeros
        x = np.zeros(len(columns))
        
        # 2. Set numeric features
        # Note: The original scaler was likely trained on [sqft, bath, bhk, price_per_sqft] or similar.
        # Based on existing 'main.py' logic, we have to fake/approximate the 4th feature if it was part of training.
        # The previous code used a hardcoded '100000' for the 4th feature (likely price_per_sqft or similar) for scaling.
        # We will maintain this logic to ensure consistency with the pickle file.
        
        # We need the exact feature set the scaler expects. 
        # If the previous code worked, we assume scaler expects 4 values.
        
        # Prepare data for scaler
        # CAUTION: This depends entirely on how the Scaler was trained. 
        # Assuming previous implementation was correct:
        features_to_scale = [req.total_sqft, req.bath, req.bhk, 100000] # 100000 was a placeholder in old code
        
        scaled_features = scaler.transform([features_to_scale])[0]
        
        # 3. Assign scaled values to the input array 'x'
        # Previous code assigned them to indices 0, 1, 2, 3? 
        # Let's double check standard one-hot encoding logic vs scaling logic.
        # Usually, you scale continuous vars and leave one-hot alone, OR you scale everything.
        # The previous code: 
        # x[0]=sqft, x[1]=bath, x[2]=bhk ... then scaled all 4 ... then put back into x[0..3]
        # We will replicate that behavior.
        
        x[0] = scaled_features[0]
        x[1] = scaled_features[1]
        x[2] = scaled_features[2]
        # x[3] is likely not used by the model itself if it was just a helper for scaling, 
        # or it IS used. We'll leave it if the model expects it.
        # If the model was trained with 'price_per_sqft' as a feature, that's data leakage, but we can't retrain the model now.
        # We assume the user wants to use the EXISTING model.
        if len(scaled_features) > 3:
             x[3] = scaled_features[3]

        # 4. Handle Location (One-Hot Encoding)
        loc_col = f'location_{req.location}'
        if loc_col in columns:
            loc_index = columns.index(loc_col)
            if loc_index >= 0 and loc_index < len(x):
                x[loc_index] = 1
        elif 'location_other' in columns:
             loc_index = columns.index('location_other')
             if loc_index >= 0 and loc_index < len(x):
                x[loc_index] = 1
        
        # 5. Predict
        price = model.predict([x])[0]
        price = round(price, 2)
        
        # Ensure non-negative
        price = max(0.0, price)
        
        return {"predicted_price": price}
        
    except Exception as e:
        import traceback
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=f"Prediction error: {str(e)}")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
