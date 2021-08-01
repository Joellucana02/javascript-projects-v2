const apiKey = '8a3f6738750747e0b9170111210108';
const baseApi = 'http://api.weatherapi.com/v1';
const container = document.querySelector('.container'),
input = document.querySelector('.search-input'),
formBtn = document.getElementById('search'),
wrapper = document.querySelector('.wrapper');
/* Fahrenheit (°F) = (Celsius x 1.8) + 32 */
let getData = async (name)=>{
    try {
        let raw = await axios.get(`${baseApi}/current.json?key=${apiKey}&q=${name}||London`),
        data = raw.data;
        console.log(data)
        console.log(data.location.country)
        showWeather(data);
    } catch (error) {
        console.warn(error)
    }
}
getData(input)

formBtn.addEventListener("click", (e) => {
    e.preventDefault();
    if (!input.value) return;
    console.log(input.value);
    getData(input.value);
    input.value = "";
  });
  input.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (!input.value) return;
      console.log(input.value);
        getData(input.value);
      input.value = "";
    }
  });
let showWeather = (e)=>{
    wrapper.innerHTML = '';
    weatherWrapper(e)
}
let weatherWrapper = (e)=>{
    let div = document.createElement('div');
    div.classList.add('weather-item');
    div.innerHTML = weatherTemplate(e);
    wrapper.appendChild(div);

}
let weatherTemplate = (d)=>{
    return`
    <h3 class="weather-location">${d.location.country}, ${d.location.region}</h3>
    <p class="weather-temp_f">${d.current.temp_f} F</p>
                    <p class="weather-temp">${d.current.temp_c} C</p>
                    <img src="${d.current.condition.icon}" alt="${d.current.condition.text}">
                    <p class="weather-status">Current status: ${d.current.condition.text}</p>
                    <p class="weather-humidity">Humidity: ${d.current.humidity}% </p>
                    <p class="time">Local time: ${d.location.localtime} </p>
    `;
}