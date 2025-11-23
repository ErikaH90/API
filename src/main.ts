const API_KEY = "f0a3375abec28c42d705f6252304d61a";

const cityInput = document.getElementById("city") as HTMLInputElement;
const button = document.getElementById("getWeather") as HTMLElement;
const temperatureEl = document.getElementById("temperature") as HTMLElement;
const descriptionEl = document.getElementById("description") as HTMLElement;

type WeatherData = {
  main: { temp: number };
  weather: { description: string }[];
};

async function getWeather(city: string) {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric&lang=sv`
    );
    
    if (!response.ok) {
      throw new Error("Stad hittades inte");
    }

    const data: WeatherData = await response.json();

    temperatureEl.textContent = `Temperatur: ${data.main.temp} °C`;
    descriptionEl.textContent = `Väder: ${data.weather[0].description}`;
  } catch (error) {
    console.error(error);
    temperatureEl.textContent = "";
    descriptionEl.textContent = "Kunde inte hämta väder.";
  }
}

// Eventlyssnare på knapp
button.addEventListener("click", () => {
  const city = cityInput.value.trim();
  if (city) {
    getWeather(city);
  }
});

