// //Responsável apenas pela comunicação com a API (Open-Meteo).

// // assets/js/api.js
// export async function getWeatherData(city) {
//   try {
//     // 1️⃣ Converter nome da cidade em coordenadas
//     const geoResponse = await fetch(
//       `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1`
//     );

//     if (!geoResponse.ok) throw new Error("Falha ao buscar localização.");

//     const geoData = await geoResponse.json();

//     if (!geoData.results || geoData.results.length === 0)
//       throw new Error("Cidade não encontrada.");

//     const { latitude, longitude, name, country } = geoData.results[0];

//     // 2️⃣ Buscar temperatura atual
//     const weatherResponse = await fetch(
//       `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`
//     );

//     if (!weatherResponse.ok) throw new Error("Falha ao buscar dados do clima.");

//     const weatherData = await weatherResponse.json();

//     return {
//       city: `${name}, ${country}`,
//       temperature: weatherData.current_weather.temperature,
//       description: `Vento: ${weatherData.current_weather.windspeed} km/h`
//     };
//   } catch (error) {
//     throw error; // tratado em outro módulo
//   }
// }


//para teste offline - tem estar ou um ou outro ativo para que a aplicação fique ativa, já que define a forma de informar os dados. 
// assets/js/api.js
// export async function getWeatherData(city) {
//   try {
//     // Modo teste: usar JSON local
//     const response = await fetch("./data/sample-response.json");
//     const data = await response.json();

//     const found = data.samples.find(
//       (item) => item.city.toLowerCase().includes(city.toLowerCase())
//     );

//     if (!found) throw new Error("Cidade não encontrada nos dados locais.");

//     return {
//       city: found.city,
//       temperature: found.current_weather.temperature,
//       description: `Vento: ${found.current_weather.windspeed} km/h`
//     };
//   } catch (error) {
//     throw error;
//   }
// }
// assets/js/api.js

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
