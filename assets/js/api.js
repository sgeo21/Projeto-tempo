//Responsável apenas pela comunicação com a API (Open-Meteo).

// assets/js/api.js
export async function getWeatherData(city) {
  try {
    // 1️⃣ Converter nome da cidade em coordenadas
    const geoResponse = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1`
    );

    if (!geoResponse.ok) throw new Error("Falha ao buscar localização.");

    const geoData = await geoResponse.json();

    if (!geoData.results || geoData.results.length === 0)
      throw new Error("Cidade não encontrada.");

    const { latitude, longitude, name, country } = geoData.results[0];

    // 2️⃣ Buscar temperatura atual
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
    throw error; // tratado em outro módulo
  }
}

