const weatherForm = document.querySelector("form")
const searchElement = document.querySelector("input")
const messageOne = document.querySelector("#message-one")
const messageTwo = document.querySelector("#message-two")

weatherForm.addEventListener("submit", (event) => {
    event.preventDefault()

    const location = searchElement.value

    messageOne.textContent = "Loading location weather data"
    messageTwo.textContent = ""


    fetch("http://localhost:3000/weather?address=" + location).then((response) => {
        response.json().then((data) => {
            if(data.error){
                messageOne.textContent = data.error
                messageTwo.textContent = "" 
            } else {
                messageOne.textContent = data.location
                messageTwo.textContent = "It is " + data.forecast.temperature + " degrees F and " + data.forecast.weather + " with " + data.forecast.rainProb + "% chance of precipitation."
            }
        })
    })
})