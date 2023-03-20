const dropList = document.querySelectorAll("form select");
const fromCurrency = document.querySelector(".from select");
const toCurrency = document.querySelector(".to select");
const form = document.querySelector("form");
const ExchangeRateTxt = document.querySelector("form .exchange-rate");

for (let i = 0; i < dropList.length; i++) {
  for (let currency_code in country_list) {
    let selected = i == 0 ? (currency_code == "USD" ? "selected" : "") : (currency_code == "CZK" ? "selected" : "");
    let optionTag = `<option value="${currency_code}" ${selected}>${currency_code}</option>`;
    dropList[i].insertAdjacentHTML("beforeend", optionTag);
  }
  dropList[i].addEventListener("change", e => {
    loadFlag(e.target);
    getExchangeRate();
  });
}

function loadFlag(e) {
  for (let code in country_list) {
    if (code == e.value) {
      let imgTag = e.parentElement.querySelector("img");
      imgTag.src = `https://www.countryflagicons.com/FLAT/64/${country_list[code]}.png`;
    }
  }
}

window.addEventListener("load", () => {
  loadFlag(fromCurrency);
  loadFlag(toCurrency);
  getExchangeRate();
});

form.addEventListener("submit", e => {
  e.preventDefault();
  getExchangeRate();
});

function getExchangeRate() {
  const amount = document.querySelector("form input");
  let amountVal = parseFloat(amount.value);
  if (isNaN(amountVal) || amountVal <= 0) {
    amountVal = 1;
    amount.value = "1";
  }
  ExchangeRateTxt.innerHTML = "Getting exchange rate...";
  let url = `https://v6.exchangerate-api.com/v6/8777a93365bcc9c744971fc9/latest/${fromCurrency.value}`;
  fetch(url)
    .then(response => response.json())
    .then(result => {
      let exchangeRate = result.conversion_rates[toCurrency.value];
      let totalExRate = (amountVal * exchangeRate).toFixed(2);
      ExchangeRateTxt.innerHTML = `${amountVal} ${fromCurrency.value} = ${totalExRate} ${toCurrency.value}`;
    })
    .catch(() => {
      ExchangeRateTxt.innerText = "Something went wrong";
    });
}
