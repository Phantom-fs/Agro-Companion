# Agro Companion

## Overview

Agro Companion is designed to assist farmers and agricultural enthusiasts by classifying different types of soil and providing advanced crop recommendations based on various factors. Users can easily classify different types of soil such as alluvial soil, black soil, red soil, yellow soil, laterite soil, arid soil, and mountain soil. The platform also offers crop recommendations considering factors like soil type, season, rainfall, temperature, humidity, nitrogen, phosphorus, potassium, and specific regional data, and it also provides a tool to access these information for specific crops. If climate data is not available for crop recommendation, the platform fetches the necessary information using a weather API.

## Features

- **Soil Classification**: Identify and learn about different types of soil including alluvial, black, red, yellow, arid, and mountain soils.
- **Advanced Crop Recommendation**: Receive crop recommendations based on multiple factors such as soil type, season, climate conditions, and soil nutrients.
- **Climate Data Integration**: Fetches real-time weather data using a weather API when local climate data is unavailable.
- **Crop Information**: Detailed information on the requirements for growing specific crops, including ideal soils, season, rainfall, temperature, humidity, nitrogen, phosphorus, and potassium levels.
- **User-Friendly Interface**: Intuitive and easy-to-navigate interface for seamless user experience.

## Technologies Used

- **Frontend**: HTML, CSS, JavaScript
- **Backend**: Python-based server
- **Machine Learning**: Classification and fuzzy-logic based recommendation models
- **API Integration**: Weather API for real-time climate data
- **Application Server**: Deployed on a cloud platform Heroku

## How It Works

1. **Soil Classification**: Users can input soil data or upload an image to identify the soil type. The system processes the data/image and classifies the soil. The system uses ensembled CNN and ViT model for classification.
2. **Crop Recommendation**: Users can input various parameters such as soil type, season, and nutrient levels. The system provides crop recommendations based on these inputs. The system using fuzzy inference system for recommendation
3. **Climate Data Fetching**: If local climate data is not provided, the system uses a weather API to fetch real-time climate data relevant to the user's location.
4. **Detailed Crop Information**: Users can browse through a database of crops to view detailed growing requirements, including ideal soil type, climate conditions, and nutrient levels.

## Developer
- ***[Farhan Sheth](https://www.linkedin.com/in/farhan-sheth/)***

----

#### The code for the deployed application server for soil classifcation can be found in the [Agro Companion Soil Server](https://github.com/Phantom-fs/Agro-Companion-Soil-Application-Server).
#### The code for the deployed application server for crop recommendation and crop information can be found in the [Agro Companion Crop Server](https://github.com/Phantom-fs/Agro-Companion-Crop-Application-Server). 