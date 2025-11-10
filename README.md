# 🌦️ Aplicativo de Clima — Open Meteo

Aplicação simples de clima desenvolvida em **HTML, CSS e JavaScript**, que permite ao usuário buscar informações meteorológicas a partir do nome de uma cidade.  
O app consome a **API pública da Open-Meteo** para obter as coordenadas (latitude/longitude) e os dados de clima em tempo real.  
Em caso de falhas na conexão ou na API, a aplicação utiliza dados locais de exemplo para garantir estabilidade.

O intuito desta aplicação é o seu desenvolvimento com o auxílio de IA - foram utilizados nesta contrução o chatGPT e Qodo.

---

## 🌍 **Funcionalidades Principais**

✅ Buscar o clima atual de uma cidade  
✅ Obter latitude e longitude automaticamente via Geocoding API  
✅ Exibir temperatura e velocidade do vento em tempo real  
✅ Tratar erros de entrada e de rede  
✅ Possuir modo de **teste local** com `sample-response.json` (sem necessidade de internet)  
✅ Interface amigável, responsiva e segura  

---

## 🧩 **Arquitetura do Projeto**

projeto-clima/
│
├── index.html # Estrutura principal do app
├── assets/
│ ├── css/
│ │ └── style.css # Estilos e layout
│ ├── js/
│ │ ├── main.js # Lógica principal e eventos
│ │ ├── api.js # Conexão com API e fallback local
│ │ ├── ui.js # Manipulação da interface (renderização e mensagens)
│ │ └── utils.js # Validação e sanitização de entradas
│ └── img/ # Ícones e imagens do app
│
├── data/
│ └── sample-response.json # Dados de exemplo para testes offline
│
└── README.md # Documentação do projeto

---

## ⚙️ **Como Executar o Projeto**

1. **Clone o repositório**
   ```bash
   git clone https://github.com/sgeo21/app-clima.git
   cd app-clima
Abra no VS Code

Inicie um servidor local
(para que os fetch() funcionem corretamente)


npx live-server
ou use a extensão do VS Code Live Server e clique em “Go Live”.

Teste o app

Digite o nome de uma cidade (ex: Limeira, Cordeirópolis, Piracicaba)

Clique em “Buscar clima”

Caso a API falhe, o app automaticamente usará os dados locais de teste.

🧪 Casos de Teste
Nº	Cenário	Entrada	Resultado Esperado
1	Cidade válida	Limeira	Exibe temperatura e vento
2	Cidade inexistente	Atlantis	Exibe “Cidade não encontrada.”
3	Campo vazio	""	Exibe “Digite o nome de uma cidade.”
4	Entrada com caracteres inválidos	<script>	Entrada sanitizada, sem execução
5	Falha na API	—	App usa sample-response.json
6	Modo de teste local ativo	Piracicaba	Exibe dados do JSON local
7	Latência alta	São Paulo	Mostra indicador de carregamento

---

## 🧱 **Principais Arquivos**
🔹 index.html
Estrutura base da interface do usuário (formulário + área de exibição).

🔹 style.css
Define cores, fontes, layout responsivo e ícones do app.

🔹 main.js
Controla o envio do formulário, interage com o usuário e atualiza o DOM.

🔹 api.js
Gerencia as requisições para a Open-Meteo API e o fallback local (sample-response.json).

🔹 ui.js
Exibe resultados e mensagens de erro.

🔹 utils.js
Valida e sanitiza entradas para evitar erros e falhas de segurança (XSS).

---

## 🧰 **Tecnologias Utilizadas**
Tecnologia	Uso
HTML5	Estrutura da aplicação
CSS3	Estilização e responsividade
JavaScript (ES6)	Lógica e integração com APIs
Open-Meteo API	Fonte de dados meteorológicos
VS Code + Live Server	Ambiente de desenvolvimento

---

## 🔒 **Boas Práticas Implementadas**
Validação e sanitização de entradas (utils.js)

Tratamento de exceções e erros de rede

Modo de fallback com dados locais

Separação clara entre lógica, API e interface (arquitetura modular)

Código comentado e legível

Sem armazenamento de dados sensíveis

---

## 📈 **Melhorias Futuras**
Mostrar ícones de clima (sol, nuvens, chuva etc.)

Exibir previsão para os próximos dias

Suporte a múltiplas cidades e favoritos

Detecção automática de localização (via Geolocation API)

Tema claro/escuro 🌙☀️

---

## 📜 **Licença**
Este projeto é de uso livre para fins educacionais e demonstração.
Sinta-se à vontade para clonar, adaptar e evoluir a aplicação.

---

## 🧑‍💻 **Autor**

**Geovana Cazali**  
💼 Desenvolvedora Full Stack em formação  
📚 Projeto desenvolvido durante o Bootcamp [Generation Brasil](https://brazil.generation.org/)  
🔗 [LinkedIn](https://www.linkedin.com/in/geovana-cazali/) | [GitHub](https://github.com/sgeo21)