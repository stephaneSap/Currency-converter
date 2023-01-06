// all required variables
const optionsList = document.querySelectorAll("select"),
  fromCurrency = document.querySelector(".from select"),
  toCurrency = document.querySelector(".to select"),
  input = document.querySelector(".input-box input"),
  output = document.querySelector(".output-box input"),
  conversionBtn = document.querySelector("button"),
  CurrencySwapIcon = document.querySelector(".fa-rotate");

const apiKey = "15e9e4065d3f47c8437c1edf"; //replace with your apikey

for (let i = 0; i < optionsList.length; i++) {
  for (let currency_code in country_list) {
    let selected =
      i == 0
        ? currency_code == "EUR"
          ? "selected"
          : ""
        : currency_code == "MUR"
        ? "selected"
        : "";

    let optionTag = `<option ${selected}>${currency_code}</option>`;
    optionsList[i].insertAdjacentHTML("beforeend", optionTag);
  }

  optionsList[i].addEventListener("change", (e) => {
    loadFlag(e.target);
  });
}

function loadFlag(element) {
  for (let code in country_list) {
    if (code == element.value) {
      const imgTag = element.parentElement.querySelector("img");
      imgTag.src = `https://flagcdn.com/16x12/${country_list[
        code
      ].toLowerCase()}.png`;
    }
  }
}

function getExchangeRate() {
  const url = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/${fromCurrency.value}`;

  fetch(url)
    .then((response) => response.json())
    .then((result) => {
      let amount = result.conversion_rates[toCurrency.value];

      if (input.value > 0) {
        output.value = input.value * amount;
      } else {
        output.value = amount;
      }
    })
    .catch(() => {
      output.value = "Something went wrong!";
    });
}

conversionBtn.addEventListener("click", () => {
  if (input.value != 0 && input.value != "") {
    getExchangeRate();
  }
});

CurrencySwapIcon.addEventListener("click", () => {
  let temp = fromCurrency.value;
  fromCurrency.value = toCurrency.value;
  toCurrency.value = temp;

  loadFlag(fromCurrency);
  loadFlag(toCurrency);

  if (input.value != 0 && output.value != "") {
    getExchangeRate();
  }
});
