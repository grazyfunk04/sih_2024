import sys
import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler, LabelEncoder
from sklearn.neighbors import KNeighborsClassifier

# Load the dataset
data = pd.read_csv(r"H:/SIH_2024/sih_2024/public/HEALTH DATASET.csv")

# Encode the 'sex' column
label_encoder = LabelEncoder()
data['sex'] = label_encoder.fit_transform(data['sex'])

# Calculate BMI and waist-to-height ratio
data['bmi'] = data['weight'] / (data['height'] / 100) ** 2
data['waist_height_ratio'] = data['waistline'] / data['height']

# Define health status based on multiple factors, including WHtR
def determine_health_status(row):
    bmi = row['bmi']
    waist_height_ratio = row['waist_height_ratio']
    age = row['age']
    
    if 0.4 <= waist_height_ratio <= 0.49 and 18.5 <= bmi <= 24.9:
        return 1  # Healthy
    elif 0.5 <= waist_height_ratio <= 0.59:
        return 0  # Increased health risk
    elif waist_height_ratio >= 0.6:
        return 0  # Highest risk of disease
    else:
        return 0  # Not Healthy (default case)

data['health_status'] = data.apply(determine_health_status, axis=1)

# Prepare the feature matrix X and target vector y
X = data[['age', 'height', 'weight', 'sex', 'waistline', 'bmi', 'waist_height_ratio']]
y = data['health_status']

# Split the dataset into training and testing sets
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Standardize the features
scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train)
X_test_scaled = scaler.transform(X_test)

# Train a k-NN classifier
knn = KNeighborsClassifier(n_neighbors=500)
knn.fit(X_train_scaled, y_train)

# Get input from command-line arguments
age = float(sys.argv[1])
height = float(sys.argv[2])
weight = float(sys.argv[3])
sex = int(sys.argv[4])
waistline = float(sys.argv[5])

# Create new data for prediction
new_data = pd.DataFrame({
    'age': [age],
    'height': [height],
    'weight': [weight],
    'sex': [sex],
    'waistline': [waistline]
})

# Calculate BMI and waist-to-height ratio for new data
new_data['bmi'] = new_data['weight'] / (new_data['height'] / 100) ** 2
new_data['waist_height_ratio'] = new_data['waistline'] / new_data['height']

# Select relevant features
new_data_features = new_data[['age', 'height', 'weight', 'sex', 'waistline', 'bmi', 'waist_height_ratio']]

# Standardize the new data using the same scaler
new_data_scaled = scaler.transform(new_data_features)

# Predict the health status
health_prediction = knn.predict(new_data_scaled)

# Output the result
if health_prediction[0] == 0:
    print("The person is not healthy. It is recommended to consult a healthcare professional.")
else:
    print("The person is healthy. Cheers to good health")
