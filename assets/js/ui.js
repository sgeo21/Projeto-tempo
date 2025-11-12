/**
 * @file ui.js
 * @description
 * Gerencia a exibição dos elementos da interface do usuário (UI),
 * incluindo a apresentação dos dados do clima, o ícone correspondente
 * e o tratamento de mensagens de erro.
 *
 * Este módulo manipula o DOM para atualizar o conteúdo de elementos HTML,
 * garantindo que o usuário veja informações atualizadas ou mensagens de erro,
 * conforme o estado da aplicação.
 */

/**
 * Exibe as informações meteorológicas na tela.
 *
 * Atualiza o conteúdo dos elementos HTML responsáveis por mostrar:
 * - Nome da cidade e país
 * - Temperatura atual
 * - Descrição (ex: velocidade do vento)
 * - Ícone correspondente à condição do tempo
 *
 * Remove a classe "hidden" da seção de resultados e limpa mensagens de erro anteriores.
 *
 * @function showWeather
 * @param {Object} data - Objeto contendo os dados meteorológicos.
 * @param {string} data.city - Nome completo da cidade e país.
 * @param {number} data.temperature - Temperatura atual em °C.
 * @param {string} data.description - Descrição adicional (ex: velocidade do vento).
 * @param {string} data.icone - Emoji ou caractere representando o clima atual.
 *
 * @example
 * showWeather({
 *   city: "Cordeirópolis, Brazil",
 *   temperature: 28,
 *   description: "Céu limpo — Vento: 10 km/h",
 *   icone: "☀️"
 * });
 */
export function showWeather({ city, temperature, description, icone }) {
  const result = document.getElementById("weather-result");

  // Atualiza os elementos HTML com os dados do clima
  document.getElementById("city-name").textContent = city;
  document.getElementById("temperature").textContent = `🌡️ Temperatura: ${temperature}°C`;
  document.getElementById("description").textContent = description;

  // Exibe o ícone (se não existir elemento, cria um)
  let iconElement = document.getElementById("weather-icon");
  if (!iconElement) {
    iconElement = document.createElement("p");
    iconElement.id = "weather-icon";
    iconElement.classList.add("weather-icon");
    result.prepend(iconElement); // adiciona no topo do resultado
  }
  iconElement.textContent = icone || "❔";

  // Exibe o resultado e limpa erros anteriores
  result.classList.remove("hidden");
  document.getElementById("error-message").textContent = "";
}

/**
 * Exibe uma mensagem de erro na tela.
 *
 * Esconde a seção de resultados e mostra a mensagem de erro
 * recebida como parâmetro.
 *
 * @function showError
 * @param {string} message - Mensagem de erro a ser exibida ao usuário.
 *
 * @example
 * showError("Cidade não encontrada. Tente novamente.");
 */
export function showError(message) {
  document.getElementById("error-message").textContent = message;
  document.getElementById("weather-result").classList.add("hidden");
}

