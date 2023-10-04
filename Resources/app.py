from flask import Flask, jsonify
from flask_cors import CORS
from pymongo import MongoClient

app = Flask(__name__)
CORS(app)

# Connect to the MongoDB database
client = MongoClient("mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.10.5") 
db = client["parks_db2"]
collection = db["parks"]

# List of park amenities for filtering
parkAmenities = [
    "restroom", "camping", "picnic", "playground",
    "basketball", "tennis", "volleyball", "shelter", "walking", "dogpark",
    "ampitheate", "garden", "fitness", "gazebo", "playswings", "parking"
]

# Define a route to retrieve park data
@app.route('/', methods=['GET'])
def get_parks():
    # Query the MongoDB collection and exclude the MongoDB _id field
    parks = list(collection.find({}, {'_id': 0}))
    return jsonify(parks)

@app.route('/filtered_parks_count', methods=['GET'])
def get_filtered_parks_count():
    # Create a MongoDB query for parks with any of the specified amenities
    query = {"$or": [{amenity: "Yes"} for amenity in parkAmenities]}
    
    # Fetch and count parks with amenities
    count = collection.count_documents(query)
    return jsonify({"count": count})

if __name__ == '__main__':
    app.run(host="0.0.0.0", debug=True, port=5000)