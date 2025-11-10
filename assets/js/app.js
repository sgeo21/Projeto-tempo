// App simples: busca cidade -> geocoding -> forecast -> mostra temperatura atual
(async function init() {
  const form = document.getElementById('weather-form');
  const input = document.getElementById('city-input');
  const result = document.getElementById('result');
  const statusEl = document.getElementById('status');

  function setStatus(msg) { statusEl.textContent = msg || ''; }
  function setResult(html) { result.innerHTML = html || ''; }

  async function geocodeCity(city) {
    const url = new URL('https://geocoding-api.open-meteo.com/v1/search');
    url.searchParams.set('name', city);
    url.searchParams.set('count', '1');
    url.searchParams.set('language', 'pt');
    url.searchParams.set('format', 'json');

    const res = await fetch(url.toString());
    if (!res.ok) throw new Error('Falha ao consultar geocoding');
    const data = await res.json();
    if (!data.results || data.results.length === 0) {
      throw new Error('Cidade não encontrada.');
    }
    const { latitude, longitude, name, country, admin1 } = data.results[0];
    return { latitude, longitude, name, country, admin1 };
  }

  async function getCurrentWeather(lat, lon) {
    const url = new URL('https://api.open-meteo.com/v1/forecast');
    url.searchParams.set('latitude', String(lat));
    url.searchParams.set('longitude', String(lon));
    url.searchParams.set('current_weather', 'true');
    url.searchParams.set('timezone', 'auto');

    const res = await fetch(url.toString());
    if (!res.ok) throw new Error('Falha ao consultar previsão');
    const data = await res.json();
    if (!data.current_weather) throw new Error('Sem dados de clima atual.');
    return data.current_weather; // { temperature, windspeed, winddirection, weathercode, time }
  }

  function renderWeather(place, weather) {
    const loc = [place.name, place.admin1, place.country].filter(Boolean).join(', ');
    const temp = Math.round(Number(weather.temperature));
    const time = new Date(weather.time).toLocaleString();
    setResult(`
      <div>
        <div><strong>Local:</strong> ${loc}</div>
        <div><strong>Temperatura:</strong> ${temp} °C</div>
        <div><strong>Atualizado:</strong> ${time}</div>
      </div>
    `);
  }

  form?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const city = input?.value?.trim();
    if (!city) return;

    setStatus('Buscando...');
    setResult('');

    try {
      const place = await geocodeCity(city);
      const weather = await getCurrentWeather(place.latitude, place.longitude);
      renderWeather(place, weather);
      setStatus('');
    } catch (err) {
      console.error(err);
      setStatus('');
      setResult(`<span class="error">${err.message || 'Ocorreu um erro'}</span>`);
    }
  });
})();
