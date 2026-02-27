const apiKey = "ca5663b459fd4b7a719dae1f985fe016";

const form = document.getElementById("weatherForm");
const input = document.getElementById("cityInput");
const result = document.getElementById("weatherResult");

form.addEventListener("submit", function (e) {
    e.preventDefault();

    const city = input.value.trim();

    if (city === "") {
        alert("Por favor escribe una ciudad");
        return;
    }

    obtenerClima(city);
});

function obtenerClima(ciudad) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&appid=${apiKey}&units=metric&lang=es`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error("Ciudad no encontrada");
            }
            return response.json();
        })
        .then(data => {
            mostrarClima(data);
        })
        .catch(error => {
            result.innerHTML = `<p>${error.message}</p>`;
        });
}

function mostrarClima(data) {
    const { name, main, weather, wind } = data;

    result.innerHTML = `
        <h2>${name}</h2>
        <p>🌡️ Temperatura: ${main.temp} °C</p>
        <p>🌤️ Clima: ${weather[0].description}</p>
        <p>💧 Humedad: ${main.humidity}%</p>
        <p>🌬️ Viento: ${wind.speed} m/s</p>
    `;
}