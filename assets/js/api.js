/**
 * Obtém dados meteorológicos atuais de uma cidade usando a API Open-Meteo.
 * 
 * A função tenta primeiro buscar dados em tempo real por meio das APIs:
 *  - Geocoding API: para obter latitude e longitude da cidade.
 *  - Forecast API: para buscar a temperatura e o vento atuais.
 * 
 * Caso a API falhe ou a cidade não seja encontrada, é feito um fallback
 * para um arquivo local (`./data/sample-response.json`).
 *
 * @async
 * @function getWeatherData
 * @param {string} city - Nome da cidade a ser pesquisada.
 * @returns {Promise<Object>} Retorna um objeto contendo os dados do clima:
 * @returns {string} return.city - Nome completo da cidade e país.
 * @returns {number} return.temperature - Temperatura atual em °C.
 * @returns {string} return.description - Descrição com a velocidade do vento.
 * 
 * @throws {Error} Lança um erro se não for possível obter os dados da cidade,
 *                 tanto pela API quanto pelo arquivo local.
 * 
 * @example
 * // Exemplo de uso:
 * import { getWeatherData } from './api.js';
 * 
 * getWeatherData('São Paulo')
 *   .then(data => console.log(data))
 *   .catch(err => console.error(err.message));
 * 
 * // Retorno esperado:
 * // {
 * //   city: "São Paulo, Brazil",
 * //   temperature: 26.4,
 * //   description: "Vento: 12 km/h"
 * // }
 */
//Para que a aplicação nunca caia, sempre apresente um resultado mesmo que esse resultado seja o teste. 
export async function getWeatherData(city) {
  try {
    // Tenta buscar da API real
    const geoResponse = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1`
    );

    if (!geoResponse.ok) throw new Error("Falha ao buscar localização.");

    const geoData = await geoResponse.json();

    if (!geoData.results || geoData.results.length === 0)
      throw new Error("Cidade não encontrada.");

    const { latitude, longitude, name, country } = geoData.results[0];

    // buscar temperatura atual
    const weatherResponse = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`
    );

    if (!weatherResponse.ok) throw new Error("Falha ao buscar dados do clima.");

    const weatherData = await weatherResponse.json();

    return {
      city: `${name}, ${country}`,
      temperature: weatherData.current_weather.temperature,
      description: `Vento: ${weatherData.current_weather.windspeed} km/h`
    };

  } catch (error) {
    console.warn("⚠️ API falhou, usando dados locais de teste:", error.message);

    // Usa dados locais de teste como fallback
    const localResponse = await fetch("./data/sample-response.json");
    const localData = await localResponse.json();

    const found = localData.samples.find(
      (item) => item.city.toLowerCase().includes(city.toLowerCase())
    );

    if (!found) throw new Error("Cidade não encontrada (nem nos dados locais).");

    return {
      city: found.city,
      temperature: found.current_weather.temperature,
      description: `Vento: ${found.current_weather.windspeed} km/h`
    };
  }
}



