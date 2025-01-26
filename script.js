// Cotação de moedas do dia. As variáveis vão ser usadas no lugar dos valores 
const USD = 4.87
const EUR = 5.32
const GBP = 6.08

// Obtendo os elementos do formulário para trabalhar com eles 
const form = document.querySelector("form")
const amount = document.getElementById("amount")
const currency = document.getElementById("currency")
const footer = document.querySelector("main footer") // vai pegar o footer dentro do main
const description = document.getElementById("description")
const result = document.getElementById("result")

// Manipulando o input amount para receber somente números: vai capturar o valor desse input conforme é inserido conteudo dentro dele
amount.addEventListener("input", () => {
  const hasCharactersRegex = /\D+/g // expressão regular \D+ vai encontrar todas as sequências de caracteres que não são números (0-9)
  amount.value = amount.value.replace(hasCharactersRegex, "") // uma vez que é encontrado strings no campo, será substituida por "nada"
}) 

// Capturando o evento de submit (enviar) do formulário 
form.onsubmit = (event) => { // aqui vai recuperar o event em si pq quero desativar o comportamento padrao dele de recarregar a página
  event.preventDefault()
  // console.log(currency.value) vai retornar o valor da tag do que foi selecionado no menu suspenso 

  // Identificando qual a moeda selecionada
  switch(currency.value) {
    case "USD":
      convertCurrency(amount.value, USD, "US$") // ao inves de colocar em numero o valor da moeda, colocou a const criada
      break
    case "EUR":
      convertCurrency(amount.value, EUR, "€") 
      break
    case "GBP":
      convertCurrency(amount.value, GBP, "£")    
      break
  }
}

// Criando a função para converter a moeda 
function convertCurrency(amount, price, symbol) {
  // console.log(amount, price, symbol) mostrando os valores no input, qual currency foi selecionado e a variável correnpondente ao valor dessa moeda
  try {
    // Atualizando a cotação da moeda selecionada no footer
    description.textContent = `${symbol} 1 = ${formatCurrencyBRL(price)}`

    // Calcula o resultado total
    let total = amount * price

    // Formatar o valor total para exibir ele no footer
    total = formatCurrencyBRL(total).replace("R$", "")

    // Exibe o resultado total
    result.textContent = `${total} Reais`

    // adicionando a classe que exibe o footer
    footer.classList.add("show-result") 

  } catch (error) {
    // remove a classe do footer, para ocultar ele se der algum erro
    footer.classList.remove("show-result")

    console.log(error)
    alert("Não foi possível converter. Tente novamente mais tarde.")
  }
}

// Formata a moeda em real brasileiro
function formatCurrencyBRL(value) {
  // Coverte o número para utilizar o toLocal
  return Number(value).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  })
} 

