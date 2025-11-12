/**
 * @file test.js
 * @description Executa testes simples para verificar o funcionamento dos módulos
 * principais da aplicação (api.js, utils.js e ui.js).
 * 
 * Os testes são feitos diretamente no console do navegador, sem dependências externas.
 * Cada teste imprime o resultado e o status (✅ ou ❌).
 */

import { getWeatherData } from "./api.js";
import { sanitizeInput, validateCityName } from "./utils.js";
import { showWeather, showError } from "./ui.js";

/**
 * Função auxiliar para exibir o resultado de cada teste no console.
 * @param {string} name - Nome do teste.
 * @param {boolean} passed - Indica se o teste foi bem-sucedido.
 * @param {string} [message] - Mensagem opcional de detalhe.
 */
function logTestResult(name, passed, message = "") {
  const status = passed ? "✅" : "❌";
  console.log(`${status} ${name} ${message}`);
}

/**
 * Testes do módulo utils.js
 */
function testUtils() {
  console.log("🔧 Testando utils.js...");

  try {
    const result = sanitizeInput("  <São Paulo>  ");
    logTestResult(
      "sanitizeInput remove espaços e tags perigosas",
      result === "São Paulo",
      `→ Resultado: "${result}"`
    );

    validateCityName("Rio");
    logTestResult("validateCityName aceita nome válido", true);

    try {
      validateCityName("");
      logTestResult("validateCityName rejeita nome vazio", false);
    } catch {
      logTestResult("validateCityName rejeita nome vazio", true);
    }
  } catch (error) {
    logTestResult("Erros inesperados em utils.js", false, error.message);
  }
}

/**
 * Teste do módulo api.js
 */
async function testAPI() {
  console.log("🌦️ Testando api.js...");

  try {
    const data = await getWeatherData("São Paulo");
    const ok =
      data &&
      typeof data.city === "string" &&
      typeof data.temperature === "number";
    logTestResult("getWeatherData retorna dados válidos", ok, JSON.stringify(data));
  } catch (error) {
    logTestResult("getWeatherData falhou (verifique conexão ou JSON local)", false, error.message);
  }
}

/**
 * Teste do módulo ui.js
 * (Executa apenas se os elementos HTML estiverem disponíveis no DOM)
 */
function testUI() {
  console.log("🖥️ Testando ui.js...");

  const mockData = {
    city: "Teste City, Brasil",
    temperature: 25,
    description: "Vento: 10 km/h"
  };

  try {
    showWeather(mockData);
    logTestResult("showWeather atualiza a interface", true);

  } catch (error) {
    logTestResult("Falha ao testar ui.js", false, error.message);
  }
}

/**
 * Executa todos os testes na sequência.
 */
async function runTests() {
  console.log("🚀 Iniciando testes do app de clima...\n");

  try {
    testUtils();
    await testAPI();
    testUI();
  } catch (error) {
    console.error("❌ Erro inesperado durante os testes:", error.message);
  } finally {
    console.log("\n🧩 Testes concluídos!");
  }
}

runTests();
