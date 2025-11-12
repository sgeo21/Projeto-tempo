/**
 * @file main.js
 * @description Controla o fluxo principal da aplicação de clima, conectando os módulos
 * de API, interface e utilitários. Lida com o evento de envio do formulário,
 * valida o nome da cidade e exibe os dados meteorológicos.
 *
 * Módulos importados:
 * - `getWeatherData` (api.js): obtém os dados de clima pela API ou arquivo local.
 * - `showWeather`, `showError` (ui.js): manipulam a exibição na interface.
 * - `sanitizeInput`, `validateCityName` (utils.js): tratam e validam a entrada do usuário.
 *
 * Fluxo principal:
 * 1. Aguarda o carregamento do DOM.
 * 2. Captura o evento de `submit` do formulário.
 * 3. Sanitiza e valida o nome da cidade inserido.
 * 4. Busca os dados de clima usando `getWeatherData`.
 * 5. Exibe o resultado ou uma mensagem de erro.
 *
 * @example
 * // Exemplo de estrutura HTML correspondente:
 * // <form id="weather-form">
 * //   <input id="city-input" type="text" placeholder="Digite o nome da cidade" />
 * //   <button type="submit">Buscar</button>
 * // </form>
 * // <div id="weather-result"></div>
 *
 * // O script `main.js` lida automaticamente com o evento de envio do formulário.
 */
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
