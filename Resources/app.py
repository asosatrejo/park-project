from flask import Flask, jsonify
from pymongo import MongoClient

app = Flask(__name__)

# Connect to the MongoDB database
client = MongoClient("mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.10.5") 
db = client["parks_db"]
collection = db["park_data"]

# Define a route to retrieve park data
@app.route('/', methods=['GET'])
def get_parks():
    # Query the MongoDB collection and exclude the MongoDB _id field
    parks = list(collection.find({}, {'_id': 0}))
    return jsonify(parks)

if __name__ == '__main__':
    app.run(host="0.0.0.0", debug=True, port=5000)

# API Link: http://127.0.0.1:5000/