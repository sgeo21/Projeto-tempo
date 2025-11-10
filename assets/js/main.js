// Controla o fluxo principal do app (eventos e integração dos módulos).

// assets/js/main.js
import { getWeatherData } from "./api.js";
import { showWeather, showError } from "./ui.js";
import { sanitizeInput, validateCityName } from "./utils.js";

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("weather-form");
  const input = document.getElementById("city-input");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const city = sanitizeInput(input.value);

    try {
      validateCityName(city);
      const data = await getWeatherData(city);
      showWeather(data);
    } catch (error) {
      showError(error.message || "Erro inesperado. Tente novamente.");
    }
  });
});
