// Project : Country-Guide-App

const form = document.forms[0];
const input = document.querySelector("input:first-child");
const submitBtn = document.querySelector("input:nth-child(2)");
const flag = document.querySelector(".flag img");
const flagName = document.querySelector(".flag h2");
const content = document.querySelector(".content");
const countryInfo = document.querySelectorAll("p span");
const countryLocation = document.querySelector("span a");
const errorNote = document.querySelector("p.notes");

form.addEventListener("submit", function (e) {
  e.preventDefault();
  content.style.display = "none";
  errorNote.textContent = "";
  if (input.value === "") {
    errorNote.textContent = "Input cannot be empty !";
    return;
  }
  fetch(
    `https://restcountries.com/v3.1/name/${input.value.trim()}?fullText=true`
  )
    .then((response) => {
      let myData = response.json();
      return myData;
    })
    .then((result) => {
      if (result.status !== 404) {
        content.style.display = "block";
        flag.src = result[0].flags.png;
        flag.alt = result[0].flags.alt;
        flag.title = `${input.value.toUpperCase()} Flag`;
        flagName.textContent = input.value;
        input.value = "";
        countryInfo[0].textContent = result[0].capital[0];
        countryInfo[1].textContent = result[0].region;
        countryInfo[2].textContent = result[0].population;
        countryInfo[3].textContent =
          Object.entries(result[0].currencies)[0][1].name +
          " - " +
          Object.entries(result[0].currencies)[0][1].symbol;
        countryInfo[4].textContent = Object.entries(result[0].languages)[0][1];
        countryInfo[5].textContent = result[0].timezones.join(" - ");
        countryInfo[6].textContent =
          result[0].idd.root + result[0].idd.suffixes[0];
        countryLocation.href = result[0].maps.googleMaps;
      } else {
        reject();
      }
    })
    .catch(() => {
      errorNote.textContent = "Please enter a Valid country name ";
    });
});
