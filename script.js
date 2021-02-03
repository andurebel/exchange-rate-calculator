// @ts-nocheck
const currencyElement_one = document.getElementById("currency-one");
const amountElement_one = document.getElementById("amount-one");
const currencyElement_two = document.getElementById("currency-two");
const amountElement_two = document.getElementById("amount-two");

const rateElement = document.getElementById("rate");
const swap = document.getElementById("swap");

//fetch rates
function calculate() {
  const currency_one = currencyElement_one.value;
  const currency_two = currencyElement_two.value;

  fetch(
    `https://v6.exchangerate-api.com/v6/ce2b868808a377ca64911828/latest/${currency_one}`,
  )
    .then((res) => res.json())
    .then((data) => {
      //console.log(data.conversion_rates);

      const rate = data.conversion_rates[currency_two];

      rateElement.innerHTML = `1${currency_one}=${rate} ${currency_two}`;

      amountElement_two.value = (amountElement_one.value * rate).toFixed(2);
      calculate();
    });
}
calculate();
currencyElement_one.addEventListener("change", calculate);
currencyElement_one.addEventListener("input", calculate);
currencyElement_two.addEventListener("change", calculate);
currencyElement_two.addEventListener("input", calculate);

swap.addEventListener("click", () => {
  const temp = currencyElement_one.value;
  currencyElement_one.value = currencyElement_two.value;
  currencyElement_two.value = temp;
  calculate();
});
