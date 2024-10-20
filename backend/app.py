import numpy as np
import pandas as pd
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from sklearn.preprocessing import MinMaxScaler
from keras.models import load_model
from datetime import datetime
import joblib

app = FastAPI()

# Load the trained model
model = load_model('../src/components/Mysales/multimodal_model.h5')

# Load the scaler
scaler = joblib.load('../src/components/Mysales/scaler.pkl')

# Function to create dataset (as defined in your original code)
def create_dataset(data, time_step=1):
    X, y = [], []
    for i in range(len(data) - time_step - 1):
        X.append(data[i:(i + time_step), 0])
        y.append(data[i + time_step, 0])
    return np.array(X), np.array(y)

class PredictionInput(BaseModel):
    date: str
    platform: str
    previous_7_days: list

class FeedbackInput(BaseModel):
    prediction_id: str
    actual_sales: float
    rating: int

# In-memory storage for predictions and feedback
predictions = {}
feedback = []

@app.post("/predict")
async def predict(input: PredictionInput):
    try:
        # Convert input data to the format expected by the model
        date = datetime.strptime(input.date, "%Y-%m-%d")
        previous_7_days = np.array(input.previous_7_days).reshape(-1, 1)
        
        # Scale the input data
        scaled_data = scaler.transform(previous_7_days)
        
        # Reshape for model input
        X = scaled_data.reshape(1, 7, 1)
        
        # Make prediction
        prediction = model.predict(X)
        
        # Inverse transform the prediction
        predicted_sales = scaler.inverse_transform(prediction)[0][0]
        
        # Store prediction
        prediction_id = f"pred_{len(predictions) + 1}"
        predictions[prediction_id] = {
            "date": input.date,
            "platform": input.platform,
            "predicted_sales": float(predicted_sales)
        }
        
        return {"prediction_id": prediction_id, "predicted_sales": float(predicted_sales)}
    
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@app.post("/feedback")
async def provide_feedback(input: FeedbackInput):
    if input.prediction_id not in predictions:
        raise HTTPException(status_code=404, detail="Prediction not found")
    
    feedback.append({
        "prediction_id": input.prediction_id,
        "predicted_sales": predictions[input.prediction_id]["predicted_sales"],
        "actual_sales": input.actual_sales,
        "rating": input.rating
    })
    
    return {"message": "Feedback received successfully"}

@app.get("/model_performance")
async def get_model_performance():
    if not feedback:
        return {"message": "No feedback data available yet"}
    
    mse = np.mean([(f["predicted_sales"] - f["actual_sales"])**2 for f in feedback])
    avg_rating = np.mean([f["rating"] for f in feedback])
    
    return {
        "mean_squared_error": float(mse),
        "average_rating": float(avg_rating)
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)