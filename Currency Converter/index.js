var inputAmount = document.getElementById("original-currency-amount");
var fromCurrency = document.getElementById("from_currency");
var toCurrency = document.getElementById("to_currency");
var exchangeRate = document.getElementById("exchange-rate");
var exchange = document.getElementById("exchange");
var outputAmount = document.getElementById("output-text");
var outputFrom = document.getElementById("from");
var outputTo = document.getElementById("to");

// using the DOM (getElementById), we choose our HTML elements before creating variables and storing them there

exchange.addEventListener("click", () => {
  [fromCurrency.value, toCurrency.value] = [
    toCurrency.value,
    fromCurrency.value,
  ]; // click event cause currency values to be converted into one another
  calculate(); // calling the calculate function in the event listener to convert amount in input field to selected currency
});
// arrow function here uses array destructuring assignment to swap values of fromCurrency.value and toCurrency.value
// the values are extracted from [toCurrency.value, fromCurrency.value] array and assigned to [fromCurrency.value, toCurrency.value] array
// e.g., if fromCurrency is USD and toCurrency is EUR, clicking the exchange button would swap so that fromCurrency is EUR and toCurrency is USD

var toAmount = 0;
// initializing toAmount to 0 to give it a valid/default value as fetching data from API may have slight delays

function calculate() {
  const fromCurrencyValue = fromCurrency.value;
  const toCurrencyValue = toCurrency.value;

  fetch(`https://api.exchangerate-api.com/v4/latest/${fromCurrencyValue}`)
    .then((res) => res.json())
    // 1st then method receives the response object ('res') and converts it to JSON format
    .then((res) => {
      const rate = res.rates[toCurrencyValue];
      exchangeRate.value = `${rate}`;
      toAmount = (inputAmount.value * rate).toFixed(3);
      outputFrom.innerText = `${inputAmount.value} ${fromCurrencyValue}`;
      outputTo.innerText = `${toAmount} ${toCurrencyValue}`;
      outputAmount.style.display = "block";
    });
  // 2nd then method receives the parsed JSON data ('res') and handles it by extracting the conversion rate
}
// calculate function fetches exchange rate data from the API, performs the currency conversion calculation and displays results based on the selected currencies and input amount

// Calculate Function Summary
// 1. We get values of 'fromCurrency' and 'toCurrency' elements. The .value property is used to retrieve the selected option value from the select element
// 2. We then perform an HTTP GET request to the ExchangeRate-API using the fetch() function
// 3. API URL is constructed dynamically based on 'fromCurrencyValue' variable and response from the API is then processed
// 4. In response, the conversion rate from 'fromCurrencyValue' to 'toCurrencyValue' is obtained from 'res.rates' object and is stored in the 'rate' variable
// 5. Exchange rate value (rate0 is set to the 'exchangeRate' element
// 6. toAmount stores value calculated from inputAmount's value multiplied by the exchange rate
// 7. Rest is DOM manipulation using innerText to display the converted amounts on the HTML

document.getElementById("exchange-button").addEventListener("click", () => {
  calculate();
});
//  choose exchange button and add EventListener to invoke/call the calculation function

// What do we mean by API URL constructed dynamically?
// When we say API URL is constructed dynamically based on the 'fromCurrencyValue' variable, it means that the value of the 'fromCurrencyValue' variable is used to create the URL for the API request
// for example, if 'fromCurrencyValue' variable holds the value "USD", the constructed URL will be:
// `https://api.exchangerate-api.com/v4/latest/USD`
// Hence, this allows the code to fetch exchange rate data for fromCurrencyValue and perform currency conversion calculation
