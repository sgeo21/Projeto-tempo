// Funções auxiliares para evitar erros e tratar inputs.

// assets/js/utils.js
export function sanitizeInput(input) {
  return input.trim().replace(/[<>]/g, ""); // evita XSS simples
}

export function validateCityName(city) {
  if (!city) throw new Error("Por favor, insira o nome de uma cidade.");
  if (city.length < 3) throw new Error("Nome de cidade muito curto.");
  return true;
}
