function getWeatherData() {
  let lat = document.getElementById("latitude").value;
  let long = document.getElementById("longitude").value;

  if (!lat || !long) {
    alert("latitude, longitude can't be empty.");
    return;
  }

  document.getElementsByClassName("loader")[0].style.display = "block";

  // Define the API URL
  const apiUrl =
    "https://api.open-meteo.com/v1/forecast?latitude=" +
    lat.trim() +
    "&longitude=" +
    long.trim() +
    "&current=temperature_2m,rain&timezone=auto&forecast_days=1";

  // Make a GET request
  fetch(apiUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      document.getElementById("temp").innerText =
        data.current.temperature_2m + " " + data.current_units.temperature_2m;
      document.getElementById("rain").innerText =
        data.current.rain + " " + data.current_units.rain;
    })
    .catch((error) => {
      console.error("Error:", error);
    })
    .finally(() => {
      document.getElementsByClassName("loader")[0].style.display = "none";
    });
}
