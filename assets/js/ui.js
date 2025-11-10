// Gerencia o que aparece na tela e mensagens de erro.

// assets/js/ui.js
export function showWeather({ city, temperature, description }) {
  const result = document.getElementById("weather-result");
  document.getElementById("city-name").textContent = city;
  document.getElementById("temperature").textContent = `Temperatura: ${temperature}°C`;
  document.getElementById("description").textContent = description;

  result.classList.remove("hidden");
  document.getElementById("error-message").textContent = "";
}

export function showError(message) {
  document.getElementById("error-message").textContent = message;
  document.getElementById("weather-result").classList.add("hidden");
}
