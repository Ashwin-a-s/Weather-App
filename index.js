const apiKey = "1256debb06e5b1e321f0385e8de772e4";
const sub = document.querySelector("form");
const card = document.getElementById("card");
sub.addEventListener("submit",async event =>{
    event.preventDefault();
    card.textContent = "";
    const city = document.getElementById("cityInput").value;
    if(city){
        try{
            const data = await getWeatherData(city);
            displayWeather(data);
        }
        catch(error){
            displayError(error);
        }
        }
    else{
        displayError("Enter a city name");
    }
});
function displayWeather(data){
    const{
            name: city,
            main: {temp,humidity},
            weather: [{description,id}]
        } = data;
    const cityDisplay = document.createElement("p");
    const tempDisplay = document.createElement("p");
    const humidityDisplay = document.createElement("p");
    const discrip = document.createElement("p");

    cityDisplay.textContent = city;
    tempDisplay.textContent = `${(temp - 273.15).toFixed(1)}°C`;
    humidityDisplay.textContent = "Humidity : "+humidity + "%";
    discrip.textContent = description;

    cityDisplay.classList.add("cityDisplay");
    tempDisplay.classList.add("tempDisplay");
    humidityDisplay.classList.add("humidityDisplay");
    discrip.classList.add("discrip");

    card.appendChild(cityDisplay);
    card.appendChild(tempDisplay);
    card.appendChild(humidityDisplay);
    card.appendChild(discrip);



}
async function getWeatherData(city){
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

    const response = await fetch(apiUrl);
    if(!response.ok){
        throw new Error("Enter Correctly");
    }
    return await response.json();
}

function displayError(error){
    const errorDisplay = document.createElement("p");
    errorDisplay.textContent = error;
    errorDisplay.classList.add("errorDisplay");
    card.appendChild(errorDisplay);
    //console.log(error);
    
}