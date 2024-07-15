document.getElementById('menu-toggle').addEventListener('click', function() {
    var navLinks = document.getElementById('nav-links');
    if (navLinks.style.display === 'flex') {
        navLinks.style.display = 'none';
    } else {
        navLinks.style.display = 'flex';
    }
});

// -------------------------------------------------
// State and Area for the recommendation form
const State_areas = {
    "ANDAMAN AND NICOBAR ISLANDS": ["Nicobar", "South Andaman", "N & M Andaman"],
    "ARUNACHAL PRADESH": ["Lohit", "East Siang", "Subansiri F.D", "Tirap", "Anjaw (Lohit)", "Lower Dibang", "Changlang", "Papum Pare", "Low Subansiri", "Upper Siang", "West Siang", "Dibang Valley", "West Kameng", "East Kameng", "Tawang(W Kame", "Kurung Kumey"],
    "ASSAM": ["Cachar", "Darrang", "Goalpara", "Kamrup", "Lakhimpur", "North Cachar", "Nagaon", "Sivasagar", "Barpeta", "Dhubri", "Dibrugarh", "Jorhat", "Karimganj", "Kokrajhar", "Shonitpur", "Golaghat", "Tinsukia", "Hailakandi", "Dhemaji (Lakhi)", "Karbi Anglong", "Udalguri (Dara)", "Kamrup Metrop", "Chirang (Bongai)", "Baksa Barpeta", "Bongaigaon", "Morigaon", "Nalbari"],
    "MEGHALAYA": ["East Khasi Hi", "Jaintia Hills", "East Garo Hil", "Ri-Bhoi", "South Garo Hi", "W Khasi Hill", "West Garo Hil"],
    "MANIPUR": ["Imphal East", "Senapati", "Tamenglong", "Chandel", "Ukhrul", "Thoubal", "Bishnupur", "Imphal West", "Churachandpur"],
    "MIZORAM": ["Aizawl", "Champhai", "Kolasib", "Lunglei", "Chhimtuipui", "Lawngtlai", "Mamit", "Saiha", "Serchhip"],
    "NAGALAND": ["Kohima", "Tuensang", "Mokokchung", "Dimapur", "Wokha", "Mon", "Zunheboto", "Phek", "Kephrie", "Longleng", "Peren"],
    "TRIPURA": ["North Tripura", "South Tripura", "West Tripura", "Dhalai"],
    "WEST BENGAL": ["Cooch Behar", "Darjeeling", "Jalpaiguri", "Malda", "South Dinajpur", "North Dinajpur", "Bankura", "Birbhum", "Burdwan", "Hooghly", "Howrah", "Purulia", "Murshidabad", "Nadia", "North 24 Parg", "South 24 Parg", "East Midnapor", "West Midnapor", "Kolkata"],
    "SIKKIM": ["North Sikkim", "East Sikkim", "West Sikkim", "South Sikkim"],
    "ORISSA": ["Balasore", "Bolangir", "Kandhamal/Phu", "Cuttack", "Dhenkanal", "Ganjam", "Kalahandi", "Keondjhargarh", "Koraput", "Mayurbhanj", "Puri", "Sambalpur", "Sundargarh", "Bhadrak", "Jajpur", "Kendrapara", "Angul", "Nawapara", "Malkangiri", "Nawarangpur", "Nayagarh", "Khurda", "Bargarh", "Jharsuguda", "Deogarh", "Rayagada", "Gajapati", "Jagatsinghapu", "Boudhgarh", "Sonepur"],
    "JHARKHAND": ["Bokaro", "Dhanbad", "Dumka", "Hazaribag", "Palamu", "Ranchi", "Sahibganj", "West Singhbhum", "Deoghar", "Giridih", "Godda", "Gumla", "Lohardaga", "Chatra", "Koderma", "Pakur", "East Singhbhu", "Garhwa", "Seraikela-Kha", "Jamtara", "Latehar", "Simdega", "Khunti(Ranchi", "Ramgarh"],
    "BIHAR": ["Bhagalpur", "East Champaran", "Darbhanga", "Gaya", "Munger", "Muzaffarpur", "West Champaran", "Purnea", "Gopalganj", "Madhubani", "Aurangabad", "Begusarai", "Bhojpur", "Nalanda", "Patna", "Katihar", "Khagaria", "Saran", "Madhepura", "Nawada", "Rohtas", "Samastipur", "Sitamarhi", "Siwan", "Vaishali", "Jahanabad", "Buxar", "Araria", "Banka", "Bhabua", "Jamui", "Kishanganj", "Sheikhpura", "Supaul", "Lakhisarai", "Sheohar", "Arwal", "Saharsa"],
    "UTTAR PRADESH": ["Allahabad", "Azamgarh", "Bahraich", "Ballia", "Banda", "Barabanki", "Basti", "Deoria", "Faizabad", "Farrukhabad", "Fatehpur", "Ghazipur", "Gonda", "Gorakhpur", "Hardoi", "Jaunpur", "Kanpur Nagar", "Kheri Lakhimp", "Lucknow", "Mirzapur", "Pratapgarh", "Rae Bareli", "Sitapur", "Sultanpur", "Unnao", "Varanasi", "Sonbhadra", "Maharajganj", "Mau", "Siddharth Ngr", "Kushinagar", "Ambedkar Nagar", "Kannauj", "Balrampur", "Kaushambi", "Sahuji Mahara", "Kanpur Dehat", "Chandauli", "Sant Kabir Ngr", "Sant Ravidas", "Shravasti Ngr", "Agra", "Aligarh", "Bareilly", "Bijnor", "Badaun", "Bulandshahar", "Etah", "Etawah", "Hamirpur", "Jalaun", "Jhansi", "Lalitpur", "Mainpuri", "Mathura", "Meerut", "Moradabad", "Muzaffarnagar", "Pilibhit", "Rampur", "Saharanpur", "Shahjahanpur", "Ghaziabad", "Firozabad", "Mahoba", "Mahamaya Naga", "Auraiya", "Bagpat", "Jyotiba Phule", "Gautam Buddha", "Kanshiram Nag"],
    "UTTARANCHAL": ["Almora", "Chamoli", "Dehradun", "Garhwal Pauri", "Nainital", "Pithoragarh", "Garhwal Tehri", "Uttarkashi", "Haridwar", "Champawat", "Rudraprayag", "Udham Singh N", "Bageshwar"],
    "HARYANA": ["Ambala", "Gurgaon", "Hisar", "Jind", "Karnal", "Mahendragarh", "Rohtak", "Bhiwani", "Faridabad", "Kurukshetra", "Sirsa", "Sonepat(Rtk)", "Yamunanagar", "Kaithal", "Panipat", "Rewari", "Fatehabad", "Jhajjar", "Panchkula", "Mewat", "Palwal(Frd)"],
    "CHANDIGARH": ["Chandigarh"],
    "DELHI": ["New Delhi", "Central Delhi", "East Delhi", "North Delhi", "NE Delhi", "SW Delhi", "NW Delhi", "South Delhi", "West Delhi"],
    "PUNJAB": ["Amritsar", "Bathinda", "Ferozepur", "Gurdaspur", "Hoshiarpur", "Jalandhar", "Kapurthala", "Ludhiana", "Patiala", "Rupnagar", "Sangrur", "Faridkot", "Moga", "Nawanshahr", "Fatehgarh Sah", "Muktsar", "Mansa", "Barnala", "SAS Nagar(Mga)", "Tarn Taran"],
    "HIMACHAL": ["Bilaspur", "Chamba", "Kangra", "Kinnaur", "Kullu", "Lahul & Spiti", "Mandi", "Hamirpur", "Shimla", "Sirmaur", "Solan", "Una"],
    "JAMMU AND KASHMIR": ["Anantnag", "Baramulla", "Doda", "Jammu", "Kathua", "Ladakh (Leh)", "Udhampur", "Badgam", "Kupwara", "Pulwama", "Srinagar", "Kargil", "Poonch", "Rajouri", "Bandipore", "Ganderwal", "Kulgam/(Ant)", "Shopan", "Samba", "Kistwar", "Reasi", "Ramban(Dda)"],
    "RAJASTHAN": ["Barmer", "Bikaner", "Churu", "Sri Ganganaga", "Jaisalmer", "Jalore", "Jodhpur", "Nagaur", "Pali", "Hanumangarh", "Ajmer", "Alwar", "Banswara", "Bharatpur", "Bhilwara", "Bundi", "Chittorgarh", "Dungarpur", "Jaipur", "Jhalawar", "Jhunjhunu", "Kota", "Sawai Madhopur", "Sikar", "Sirohi", "Tonk", "Udaipur", "Dholpur", "Baran", "Dausa", "Rajsamand", "Karauli", "Pratapgarh(Cht"],
    "MADHYA PRADESH": ["Betul", "Vidisha", "Bhind", "Datia", "Dewas", "Dhar", "Guna", "Gwalior", "Hoshangabad", "Indore", "Jhabua", "Mandsaur", "Morena", "Khandwa", "Khargone", "Raisen", "Rajgarh", "Ratlam", "Sehore", "Shajapur", "Shivpuri", "Ujjain", "Bhopal", "Harda", "Neemuch", "Sheopur", "Barwani", "Ashoknagar(Gna", "Burhanpur", "Alirajpur(Jba)", "Balaghat", "Chhatarpur", "Chhindwara", "Jabalpur", "Mandla", "Narsinghpur", "Panna", "Rewa", "Sagar", "Satna", "Seoni", "Shahdol", "Sidhi", "Tikamgarh", "Katni", "Dindori", "Umaria", "Damoh", "Anuppur(Shahd", "Singrauli"],
    "GUJARAT": ["Ahmedabad", "Banaskantha", "Baroda", "Bharuch", "Valsad", "Dangs", "Kheda", "Mehsana", "Panchmahals", "Sabarkantha", "Surat", "Gandhinagar", "Narmada(Brc)", "Navsari(Vsd)", "Anand(Khr)", "Patan(Mhsn)", "Dahod(Pnml)", "Tapi(Srt)", "Amreli", "Bhavnagar", "Jamnagar", "Junagadh", "Kutch", "Rajkot", "Surendranagar", "Porbandar"],
    "DADAR NAGAR HAVELI": ["Dnh"],
    "DAMAN AND DUI": ["Daman", "Diu"],
    "MAHARASHTRA": ["Mumbai City", "Raigad", "Ratnagiri", "Thane", "Sindhudurg", "Mumbai Sub", "Ahmednagar", "Dhule", "Jalgaon", "Kolhapur", "Nashik", "Pune", "Sangli", "Satara", "Solapur", "Nandurbar", "Aurangabad", "Beed", "Nanded", "Osmanabad", "Parbhani", "Latur", "Jalna", "Hingoli", "Akola", "Amravati", "Bhandara", "Buldhana", "Chandrapur", "Nagpur", "Yavatmal", "Wardha", "Gadchiroli", "Washim", "Gondia"],
    "GOA": ["North Goa", "South Goa"],
    "CHATISGARH": ["Bastar", "Bilaspur", "Durg", "Raigarh", "Raipur", "Surguja", "Rajnandgaon", "Dantewada", "Kanker (Norh", "Janjgir-Champ", "Korba", "Jashpur", "Dhamtari", "Mahasamund", "Koriya", "Kowardha (Kab", "Narayanpur", "Bijapur"],
    "ANDHRA PRADESH": ["East Godavari", "West Godavari", "Guntur", "Krishna", "Nellore", "Prakasam", "Srikakulam", "Visakhapatnam", "Vizianagaram", "Adilabad", "Hyderabad", "Karimnagar", "Khammam", "Mahabubnagar", "Medak", "Nalgonda", "Nizamabad", "Warangal", "Rangareddy", "Anantapur", "Chittoor", "Kuddapah", "Kurnool"],
    "TAMIL NADU": ["Vellore", "Coimbatore", "Dharmapuri", "Kanyakumari", "Chennai", "Madurai", "Nilgiris", "Ramanathapura", "Salem", "Thanjavur", "Tiruchirappal", "Tirunelveli", "Erode", "Pudukkottai", "Dindigul", "Virudhunagar", "Sivaganga", "Thoothukudi", "Tiruvannamala", "Nagapattinam", "Viluppuram", "Cuddalore", "Kanchipuram", "Tiruvallur", "Theni", "Namakkal", "Karur", "Perambalur", "Tiruvarur", "Krishnagiri", "Ariyalur", "Tirupur"],
    "PONDICHERRY": ["Pondicherry", "Karaikal", "Mahe", "Yanam"],
    "KARNATAKA": ["Uttar Kannada", "Dakshin Kanda", "Udupi", "Belgam", "Bidar", "Bijapur", "Dharwad", "Gulbarga", "Yadgir", "Raichur", "Bagalkote", "Gadag", "Haveri", "Koppal", "Bangalore Rur", "Bellary", "Chikmagalur", "Chitradurga", "Kodagu", "Hassan", "Kolar", "Mandya", "Mysore", "Shimoga", "Tumkur", "Bangalore Urb", "Chamarajanaga", "Davangere", "Ramnagar(Bngr)", "Chickballapur"],
    "KERALA": ["Alappuzha", "Cannur", "Ernakulam", "Kottayam", "Kozhikode", "Malappuram", "Palakkad", "Kollam", "Thrissur", "Thiruvanantha", "Idukki", "Kasargod", "Pathanamthitta", "Wayanad"],
    "LAKSHADWEEP": ["Lakshadweep"]
};

function updateAreaOptions() {
    var stateSelect = document.getElementById("state");
    var areaSelect = document.getElementById("area");
    var selectedState = stateSelect.value;
    
    // Clear existing options
    areaSelect.innerHTML = '<option value="NA">Select Area</option>';
    
    if (selectedState === "NA") {
        areaSelect.disabled = true;
    } else {
        areaSelect.disabled = false;
        var areas = State_areas[selectedState];
        console.log(areas);
        for (var i = 0; i < areas.length; i++) {
            var option = document.createElement("option");
            option.value = areas[i];
            option.text = areas[i];
            areaSelect.add(option);
        }
    }
}

// -------------------------------------------------
// season wise months
const season_months = {
    "Kharif": ["May", "June", "July", "August", "September", "October"],
    "Rabi": ["October", "November", "December", "January", "February", "March", "April"],
    "Year long": ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
};

function updateMonthOptions() {
    var seasonSelect = document.getElementById("season");
    var monthSelect = document.getElementById("month");
    var selectedSeason = seasonSelect.value;
    
    // Clear existing options
    monthSelect.innerHTML = '<option value="NA">Select Month</option>';
    
    if (selectedSeason === "NA") {
        monthSelect.disabled = true;
    } else {
        monthSelect.disabled = false;
        var months = season_months[selectedSeason];
        for (var i = 0; i < months.length; i++) {
            var option = document.createElement("option");
            option.value = months[i];
            option.text = months[i];
            monthSelect.add(option);
        }
    }
}

// -------------------------------------------------
// Script to get geolocation and set it in the form
function setGeolocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            document.getElementById('latitude').value = position.coords.latitude;
            document.getElementById('longitude').value = position.coords.longitude;
        }, function(error) {
            console.error("Error Code = " + error.code + " - " + error.message);
        });
    } else {
        alert("Geolocation is not supported by this browser.");
    }
}

document.addEventListener('DOMContentLoaded', setGeolocation);

// Script to handle form submission
document.getElementById('crop-recommendation-form').addEventListener('submit', function(event) {
    event.preventDefault();

    let flag = "False";

    // name to number mapping of season
    const season_val = document.getElementById('season').value;

    if (season_val == "NA") {
        alert('Please select a season');
        return;
    }

    let season = 0;

    switch (season_val) {
        case "Rabi":
            season = 0;
            break;
        case "Kharif":
            season = 1;
            break;
        case "Year long":
            season = 2;
            break;
    }

    const nitrogen = parseInt(document.getElementById('nitrogen').value);
    const phosphorus = parseInt(document.getElementById('phosphorus').value);
    const potassium = parseInt(document.getElementById('potassium').value);

    if (nitrogen !== 0 || phosphorus !== 0 || potassium !== 0) {
        flag = "True";
    }

    const temperature = parseFloat(document.getElementById('temperature').value) || "NA";
    const humidity = parseFloat(document.getElementById('humidity').value) || "NA";
    const lat = parseFloat(document.getElementById('latitude').value) || "NA";
    const long = parseFloat(document.getElementById('longitude').value) || "NA";

    if ((temperature == "NA" || humidity == "NA") && (lat == "NA" || long == "NA")) {
        alert('Please enter temperature and humidity or allow location access');
        return;
    }

    const rainfall = parseInt(document.getElementById('rainfall').value) || "NA";

    const month = document.getElementById('month').value;
    const state = document.getElementById('state').value;
    const area = document.getElementById('area').value;

    if ((rainfall == "NA" || rainfall === 0) && (month == "NA" || state == "NA" || area == "NA")) {
        if (month == "NA") {
            alert('Please enter rainfall or select a month');
            return;
        } else {
            alert('Please enter rainfall or select a state and area');
            return;
        }
    }

    // name to number mapping
    const soil_val = document.getElementById('soil').value;
    let soil = 0

    switch (soil_val) {
        case "Alluvial Soil":
            soil = 0;
            break;
        case "Black Soil":
            soil = 1;
            break;
        case "Red Soil":
            soil = 2;
            break;
        case "Yellow Soil":
            soil = 3;
            break;
        case "Laterite Soil":
            soil = 4;
            break;
        case "Arid Soil":
            soil = 5;
            break;
        case "Mountain Soil":
            soil = 6;
            break;
    }

    // submit button
    const submitButton = document.getElementById('bttn');

    submitButton.disabled = true;
    submitButton.textContent = 'Loading...';
    submitButton.style.backgroundColor = 'green';

    const payload = {
        flag: flag,

        soil: soil,
        season: season,
        ph: parseFloat(document.getElementById('ph').value),

        Month: month,
        State: state,
        Area: area,

        N: nitrogen,
        P: phosphorus,
        K: potassium,

        Temperature: temperature,
        Humidity: humidity,
        Rainfall: rainfall,

        Latitude: lat,
        Longitude: long
    };

    fetch('https://crop-v1-88c71517a18e.herokuapp.com/recommend', {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json' 
        },
        body: JSON.stringify(payload),
    })
    .then(response => response.json())
    .then(data => {
        const resultsContainer = document.querySelector('.results-container');
        resultsContainer.innerHTML = '';

        // create heading
        const heading = document.createElement('h2');
        heading.textContent = 'Recommended Crops';

        // JSON format : {"crop_recommendation":[["Oilseeds",100.0], ["Pulses",100.0]}
        // need only the crop names
        let crops = "";

        for (let i = 0; i < data.crop_recommendation.length; i++) {
            crops += data.crop_recommendation[i][0];
            if (i < data.crop_recommendation.length - 1) {
                crops += ", ";
            }
        }

        const crop = document.createElement('p');
        crop.textContent = crops;

        resultsContainer.appendChild(heading);
        resultsContainer.appendChild(crop);

        // scroll to results
        resultsContainer.scrollIntoView({ behavior: 'smooth' });

        // unhide
        resultsContainer.classList.remove('hidden');
    })
    .catch(error => {
        console.error('Error:', error);
        //alert('An error occurred while fetching crop recommendations. Please try again.');

        const resultsContainer = document.querySelector('.results-container');
        resultsContainer.innerHTML = '';

        // error text
        const errorText = document.createElement('p');
        errorText.textContent = 'No crop recommendations found. Please try again with different inputs.';

        resultsContainer.appendChild(errorText);

        // scroll to results
        resultsContainer.scrollIntoView({ behavior: 'smooth' });

        // unhide
        resultsContainer.classList.remove('hidden');
    })
    .finally(() => {
        submitButton.disabled = false;
        submitButton.textContent = 'Recommend';
        submitButton.style.backgroundColor = 'black';
    });
});
