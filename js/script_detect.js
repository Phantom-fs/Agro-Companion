document.getElementById('menu-toggle').addEventListener('click', function() {
    var navLinks = document.getElementById('nav-links');
    if (navLinks.style.display === 'flex') {
        navLinks.style.display = 'none';
    } else {
        navLinks.style.display = 'flex';
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const imageUpload = document.getElementById('imageUpload');
    const predictButton = document.getElementById('predictButton');
    const processedImageContainer = document.querySelector('.processed-image-container');
    const predictionsContainer = document.querySelector('.predictions-container');
    const cropName = document.getElementById('crop-name');
    const recommendCrop = document.getElementById('recommend-crop');

    predictButton.addEventListener('click', () => {
        // if no image is selected, return
        if (!imageUpload.files.length) {
            alert('Please upload an image file to make a prediction');
            return;
        }

        // the file is not an image, return
        if (!['image/jpeg', 'image/jpg', 'image/png'].includes(imageUpload.files[0].type)) {
            alert('Please upload an image file (jpg or png)');
            return;
        }

        predictButton.disabled = true;
        predictButton.textContent = 'Predicting...';
        predictButton.style.backgroundColor = 'green';

        const url = "https://soil-v1-8bba132f7688.herokuapp.com/predict"

        const file = imageUpload.files[0];
        const reader = new FileReader();

        reader.onloadend = () => {
            const imageBytes = new Uint8Array(reader.result);
            const formData = new FormData();
            formData.append('file', new Blob([imageBytes], { type: 'image/jpeg' }), file.name);
            
            fetch(url, {
                method: 'POST',
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                const predictionsList = document.getElementById('predictionsList');
                
                predictionsList.innerHTML = '';

                // if the model is not confident enough, return
                if (data.probabilities[0] < 0.2) {
                    alert('The model is not confident enough to make a prediction. Please try another image.');
                    return;
                }

                // data in JSON format {'class_labels': top5_labels, 'probabilities': top5}
                for (let i = 0; i < data.class_labels.length; i++) {
                    const row = document.createElement('tr');

                    // Label cell
                    const labelCell = document.createElement('td');
                    labelCell.textContent = data.class_labels[i];
                    row.appendChild(labelCell);

                    // Probability cell
                    const probabilityPercentage = (data.probabilities[i] * 100).toFixed(2); // Convert to percentage and round to 2 decimal points
                    const probabilityCell = document.createElement('td');
                    probabilityCell.textContent = `${probabilityPercentage}%`;
                    row.appendChild(probabilityCell);

                    predictionsList.appendChild(row);
                }

                const soil_highest = data.class_labels[0];


                if (soil_highest == 'Alluvial Soil') {
                    cropName.textContent = 'Detected: Alluvial Soil';
                    recommendCrop.textContent = 'The primary crops grown include wheat, rice, maize, sugarcane, legumes, and oilseeds, etc.';
                } 
                else if (soil_highest == 'Black Soil') {
                    cropName.textContent = 'Detected: Black Soil';
                    recommendCrop.textContent = 'The primary crops grown include cotton, pulses, millets, castor, tobacco, sugarcane, citrus fruits, linseed, etc.';
                } 
                else if (soil_highest == 'Red Soil') {
                    cropName.textContent = 'Detected: Red Soil';
                    recommendCrop.textContent = 'The primary crops grown include Wheat, cotton, oilseeds, millets, tobacco, pulses, etc.';
                }
                else if (soil_highest == 'Yellow Soil') {
                    cropName.textContent = 'Detected: Yellow Soil';
                    recommendCrop.textContent = 'The primary crops grown include  maize, groundnut, rice, mango, orange, vegetables, potato, pulses, etc.';
                }
                else if (soil_highest == 'Laterite Soil') {
                    cropName.textContent = 'Detected: Laterite Soil';
                    recommendCrop.textContent = 'The primary crops grown include coconut, arecanut, banana, tapioca, vegetables, yams, pepper, pineapple, fruit trees etc.';
                }
                else if (soil_highest == 'Arid Soil') {
                    cropName.textContent = 'Detected: Arid/Desert Soil';
                    recommendCrop.textContent = 'The primary crops grown include barley, cotton, wheat, millets, maize, pulses, etc.';
                }
                else if (soil_highest == 'Mountain Soil') {
                    cropName.textContent = 'Detected: Mountain Soil';
                    recommendCrop.textContent = 'The primary crops grown include rice, tea, coffee, beans, corn, squash, etc.';
                }
                else {
                    cropName.textContent = 'Soil Type Not Detected';
                    recommendCrop.textContent = 'The model is not confident enough to make a prediction. Please try another image.';
                }

                processedImageContainer.classList.remove('hidden');
                predictionsContainer.classList.remove('hidden');

            })
            .catch(error => {
                console.error('Error:', error);
            })
            .finally(() => {
                predictButton.disabled = false;
                predictButton.textContent = 'Predict';
                predictButton.style.backgroundColor = 'black';
            });
        };

        if (file) {
            reader.readAsArrayBuffer(file);
        }
    });
});