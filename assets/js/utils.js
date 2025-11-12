/**
 * @file utils.js
 * @description Contém funções auxiliares para tratamento e validação de entradas
 * de usuário, garantindo segurança e evitando erros comuns de digitação ou código malicioso.
 */

/**
 * Limpa e sanitiza o texto inserido pelo usuário.
 *
 * Remove espaços em branco extras no início e no final da string
 * e substitui caracteres potencialmente perigosos (`<` e `>`)
 * para evitar ataques simples de XSS (Cross-Site Scripting).
 *
 * @function sanitizeInput
 * @param {string} input - Texto inserido pelo usuário.
 * @returns {string} Texto limpo e seguro para uso.
 *
 * @example
 * const cidade = sanitizeInput("  <São Paulo>  ");
 * console.log(cidade); // "São Paulo"
 */
export function sanitizeInput(input) {
  return input.trim().replace(/[<>]/g, ""); // evita XSS simples
}

/**
 * Valida o nome da cidade inserido pelo usuário.
 *
 * Garante que o campo não esteja vazio e que o nome contenha
 * pelo menos 3 caracteres, evitando buscas inválidas.
 * 
 * Caso a validação falhe, lança um erro com uma mensagem amigável.
 *
 * @function validateCityName
 * @param {string} city - Nome da cidade a ser validado.
 * @returns {boolean} Retorna `true` se a validação for bem-sucedida.
 * @throws {Error} Se o nome da cidade estiver vazio ou for muito curto.
 *
 * @example
 * validateCityName("Londres"); // ✅ Retorna true
 * validateCityName(""); // ❌ Lança erro: "Por favor, insira o nome de uma cidade."
 */
export function validateCityName(city) {
  if (!city) throw new Error("Por favor, insira o nome de uma cidade.");
  if (city.length < 3) throw new Error("Nome de cidade muito curto.");
  return true;
}
