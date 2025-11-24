const API_KEY = "f0a3375abec28c42d705f6252304d61a";

type WeatherData = {
  main: { temp: number };
  weather: { description: string }[];
};

async function getWeather(
  city: string,
  temperatureEl: HTMLElement,
  descriptionEl: HTMLElement
) {
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
  } catch (error: unknown) {
    console.error(error);
    temperatureEl.textContent = "";
    descriptionEl.textContent = "Kunde inte hämta väder.";
  }
}

window.addEventListener("DOMContentLoaded", () => {
  const cityInput = document.getElementById("city") as HTMLInputElement | null;
  const button = document.getElementById("getWeather") as HTMLElement | null;
  const temperatureEl = document.getElementById("temperature") as HTMLElement | null;
  const descriptionEl = document.getElementById("description") as HTMLElement | null;

  if (!button || !cityInput || !temperatureEl || !descriptionEl) return;

  button.addEventListener("click", () => {
    const city = cityInput.value.trim();
    if (city) {
      getWeather(city, temperatureEl, descriptionEl);
    }
  });
});




