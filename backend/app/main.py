from fastapi import FastAPI

app = FastAPI(title="WeatherGPT API")

@app.get("/")
def read_root():
    return {"Hello": "WeatherGPT Core"}
