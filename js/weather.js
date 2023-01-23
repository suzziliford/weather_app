console.log("butts")

let pageHeader = document.querySelector("#top_header");
pageHeader.innerHTML = "Global Weather By City"
pageHeader.style.color = 'lightgrey'


let form = document.getElementById('locationForm');
console.log(form);

async function handleFormSubmit(e){
    e.preventDefault();
    let cityName = e.target.cityName.value;
    console.log(cityName);
    let countryName = e.target.countryName.value;
    console.log(countryName)
    e.target.cityName.value = '';
    e.target.countryName.value= '';
    
    let cityInfo = await getLocationinfo(cityName);
    console.log(cityInfo);
    
    let countryInfo = await getLocationinfo(countryName);
    console.log(countryInfo);

    buildWeatherDisplay(cityInfo, countryName)
};



form.addEventListener('submit', handleFormSubmit);

async function getLocationinfo(cityName, countryName){
    let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName},${countryName}&appid=dbfd17e667f4ef457e82ad9520ce04aa`)
    let data = await response.json();
    return data;

}


let resultsContainer = document.getElementById("#resultsContainer");
container.style.width = "60%"; 
container.style.margin = "0 auto"; 

 
  

function buildWeatherDisplay(weatherObj){
    console.log(weatherObj)
    
    let shoutTitle = document.querySelector("#shoutTitle");
    let shoutToggle = document.querySelector("#currentFeelsLike");
    let shout = document.querySelector("#weatherShout");
    let shoutTitleTwo = document.querySelector("#maxMin");
    let shoutTwo = document.querySelector("#weatherShoutTwo");
    let shoutConditions = document.querySelector("#conditions");


    let locationFeelsLike = document.createElement('p');
    locationFeelsLike.className = 'shout';
    locationFeelsLike.innerHTML = `Feels Like ${weatherObj.main.feels_like}`;
    let feelsLike = toFahrenheit(weatherObj.main.feels_like);
    console.log(feelsLike)


    let locationDescription = document.createElement('p');
    locationDescription.className = 'shout';
    locationDescription.innerHTML = `${weatherObj.weather[0].description}`;

    let locationCurrentTemp = document.createElement('p');
    locationCurrentTemp.className = 'shout';
    locationCurrentTemp.innerHTML = `Current temp ${weatherObj.main.temp}`;
    console.log(weatherObj.main.temp)
    let currentTemp = toFahrenheit(weatherObj.main.temp);
    console.log(currentTemp);

    let locationHigh = document.createElement('p');
    locationHigh.className = 'shout';
    locationHigh.innerHTML = `High of ${weatherObj.main.temp_max}`;
    let maxTemp = toFahrenheit(weatherObj.main.temp_max);
    console.log(maxTemp)

    let locationLow = document.createElement('p');
    locationLow.className = 'shout';
    locationLow.innerHTML = `Low of ${weatherObj.main.temp_min}`;
    let minTemp = toFahrenheit (weatherObj.main.temp_min);
    console.log(minTemp)

    function toFahrenheit(x){
        x = ((x-273.15) *1.8)+32
        console.log(x)
        return x.toFixed(2);
    };

    locationTitle = weatherObj.name;
    shoutConditions.innerHTML = "";
    shoutConditions.append(locationDescription);



    
    shoutTitle.innerHTML = (`${locationTitle}.`);
    shoutTitle.style.color = 'grey';
    shoutToggle.innerHTML = ('current');
    shoutToggle.style.color = ('grey');
    shout.innerHTML = (`${currentTemp}\u00B0`);
    shout.style.color = 'grey';
    shoutTitleTwo.innerHTML = (`min`);
    shoutTitleTwo.style.color = ('grey');
    shoutTwo.innerHTML = (`${minTemp}\u00B0`);
    shoutTwo.style.color = 'grey';
    shoutConditions.style.color = ('white');
    
    shout.addEventListener('mouseover', (e) => {console.log(e);
        if (shout.innerHTML === (`${currentTemp}\u00B0`)){
            shout.innerHTML = (`${feelsLike}\u00B0`);
            shout.style.color = 'gray';
            shoutToggle.innerHTML = (`feels like`);
            shoutToggle.style.color = 'white';
        } else { 
            shout.innerHTML = (`${currentTemp}\u00B0`);
            shoutToggle.innerHTML = (`current`);
            shout.style.color = 'grey';
            shoutToggle.style.color = 'grey';
        }
    });

    shoutTwo.addEventListener('mouseover', (e) => {console.log(e);
        if (shoutTwo.innerHTML === (`${minTemp}\u00B0`)){
            shoutTwo.innerHTML = (`${maxTemp}\u00B0`);
            shoutTwo.style.color = 'grey'
            shoutTitleTwo.innerHTML = (`max`);
            shoutTitleTwo.style.color = 'white'
        } else {
            shoutTwo.innerHTML = (`${minTemp}\u00B0`);
            shoutTwo.style.color = ('grey')
            shoutTitleTwo.innerHTML = (`min`);
            shoutTitleTwo.style.color = ('grey')
        }
    });
    
}

