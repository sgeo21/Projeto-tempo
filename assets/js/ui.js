/**
 * @file ui.js
 * @description Gerencia a exibição dos elementos da interface do usuário (UI),
 * incluindo a apresentação dos dados do clima e o tratamento de mensagens de erro.
 *
 * Este módulo manipula o DOM para atualizar o conteúdo de elementos HTML,
 * garantindo que o usuário veja informações atualizadas ou mensagens de erro,
 * conforme o estado da aplicação.
 */

/**
 * Exibe as informações meteorológicas na tela.
 *
 * Atualiza o conteúdo dos elementos HTML responsáveis por mostrar o nome da cidade,
 * a temperatura e a descrição (ex: velocidade do vento).
 * Remove a classe "hidden" da seção de resultados e limpa mensagens de erro anteriores.
 *
 * @function showWeather
 * @param {Object} data - Objeto contendo os dados meteorológicos.
 * @param {string} data.city - Nome completo da cidade e país.
 * @param {number} data.temperature - Temperatura atual em °C.
 * @param {string} data.description - Descrição adicional (ex: velocidade do vento).
 *
 * @example
 * showWeather({
 *   city: "Rio de Janeiro, Brazil",
 *   temperature: 30.5,
 *   description: "Vento: 15 km/h"
 * });
 */
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
