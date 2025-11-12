/**
 * Busca dados meteorológicos de uma cidade usando a API Open-Meteo.
 * Inclui ícones e descrições de clima com fallback para dados locais.
 *
 * @async
 * @function getWeatherData
 * @param {string} city - Nome da cidade a ser pesquisada.
 * @returns {Promise<Object>} Objeto com cidade, temperatura, descrição e ícone.
 *
 * @example
 * const data = await getWeatherData("Cordeirópolis");
 * console.log(data.icone); // "☀️"
 */
export async function getWeatherData(city) {
  try {
    if (!city) throw new Error("O nome da cidade é obrigatório.");

    // 🔹 Etapa 1: Buscar coordenadas
    const geoResponse = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1`
    );
    if (!geoResponse.ok) throw new Error("Falha ao buscar localização.");
    const geoData = await geoResponse.json();

    if (!geoData.results?.length) throw new Error("Cidade não encontrada.");
    const { latitude, longitude, name, country } = geoData.results[0];

    // 🔹 Etapa 2: Buscar dados climáticos
    const weatherResponse = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`
    );
    if (!weatherResponse.ok) throw new Error("Falha ao buscar dados do clima.");
    const weatherData = await weatherResponse.json();

    const { temperature, windspeed, weathercode } = weatherData.current_weather;

    // 🔹 Etapa 3: Retornar com ícone e descrição
    const { descricao, icone } = getWeatherDescription(weathercode);

    return {
      city: `${name}, ${country}`,
      temperature,
      description: `${descricao} — Vento: ${windspeed} km/h`,
      icone
    };

  } catch (error) {
    console.warn("⚠️ API falhou, usando dados locais de teste:", error.message);

    // 🔹 Fallback local
    const localResponse = await fetch("./data/sample-response.json");
    const localData = await localResponse.json();

    const found = localData.samples.find(
      (item) => item.city.toLowerCase().includes(city.toLowerCase())
    );

    if (!found) throw new Error("Cidade não encontrada (nem nos dados locais).");

    const { descricao, icone } = getWeatherDescription(found.current_weather.weathercode);

    return {
      city: found.city,
      temperature: found.current_weather.temperature,
      description: `${descricao} — Vento: ${found.current_weather.windspeed} km/h`,
      icone
    };
  }
}

/**
 * Converte o código meteorológico da Open-Meteo em uma descrição textual e ícone.
 *
 * @param {number} code - Código numérico retornado pela API.
 * @returns {Object} Um objeto com `descricao` e `icone`.
 */
function getWeatherDescription(code) {
  const map = {
    0: { descricao: "Céu limpo", icone: "☀️" },
    1: { descricao: "Predominantemente claro", icone: "🌤️" },
    2: { descricao: "Parcialmente nublado", icone: "🌥️" },
    3: { descricao: "Nublado", icone: "☁️" },
    45: { descricao: "Nevoeiro", icone: "🌫️" },
    48: { descricao: "Neblina", icone: "🌫️" },
    51: { descricao: "Chuvisco leve", icone: "🌦️" },
    61: { descricao: "Chuva leve", icone: "🌦️" },
    63: { descricao: "Chuva moderada", icone: "🌧️" },
    65: { descricao: "Chuva forte", icone: "🌧️" },
    71: { descricao: "Neve leve", icone: "❄️" },
    73: { descricao: "Neve moderada", icone: "❄️" },
    75: { descricao: "Neve intensa", icone: "❄️" },
    95: { descricao: "Trovoadas", icone: "⛈️" },
    99: { descricao: "Tempestade severa", icone: "🌩️" },
  };

  return map[code] || { descricao: "Condição desconhecida", icone: "❔" };
}
