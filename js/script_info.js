document.getElementById('menu-toggle').addEventListener('click', function() {
    var navLinks = document.getElementById('nav-links');
    if (navLinks.style.display === 'flex') {
        navLinks.style.display = 'none';
    } else {
        navLinks.style.display = 'flex';
    }
});

document.getElementById('get-info').addEventListener('click', function() {
    const crop = document.getElementById('crop').value;

    if (crop === 'NA') {
        alert('Please select a crop');
        return;
    }

    const infoButton = document.getElementById('get-info');
    infoButton.disabled = true;
    infoButton.textContent = 'Fetching...';
    infoButton.style.backgroundColor = 'green';

    const payload = { about_crop: crop };

    fetch('https://crop-v1-88c71517a18e.herokuapp.com/crop_details', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
    })
    .then(response => response.json())
    .then(data => {
        console.log(data.crop_info);

        const resultsContainer = document.getElementById('results-container');
        const cropInfoTable = document.getElementById('crop-info-table');
        
        const cropInfo = JSON.parse(data.crop_info.replace(/'/g, '"'));
        
        let soils = ""
        for (let i = 0; i < cropInfo.soil.length; i++) {
            soils += cropInfo.soil[i];
            if (i < cropInfo.soil.length - 1) {
                soils += ", ";
            }
        }
        
        cropInfoTable.innerHTML = `
            <tr>
                <td>Soil</td>
                <td>${soils}</td>
            </tr>
            <tr>
                <td>Season</td>
                <td>${cropInfo.season}</td>
            </tr>
            <tr>
                <td>Temperature</td>
                <td>${cropInfo.Temperature}°C</td>
            </tr>
            <tr>
                <td>pH</td>
                <td>${cropInfo.ph}</td>
            </tr>
            <tr>
                <td>Rainfall</td>
                <td>${cropInfo.Rainfall} cm</td>
            </tr>
            <tr>
                <td>Humidity</td>
                <td>${cropInfo.Humidity}%</td>
            </tr>
            <tr>
                <td>Nitrogen</td>
                <td>${cropInfo.N}</td>
            </tr>
            <tr>
                <td>Phosphorus</td>
                <td>${cropInfo.P}</td>
            </tr>
            <tr>
                <td>Potassium</td>
                <td>${cropInfo.K}</td>
            </tr>
            <tr>
                <td>Other</td>
                <td>${cropInfo.other}</td>
            </tr>
        `;

        resultsContainer.classList.remove('hidden');
    })
    .catch(error => {
        console.error('Error:', error);
        alert('An error occurred while fetching crop information. Please try again.');
    })
    .finally(() => {
        infoButton.disabled = false;
        infoButton.textContent = 'Get Info';
        infoButton.style.backgroundColor = 'black';
    });
});