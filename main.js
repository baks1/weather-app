window.addEventListener("load", () => {
    let long
    let lat
    let temperatureDescription = document.querySelector(".temperature-description")
    let temperatureDegree = document.querySelector(".temperature-degree")
    let temperatureSection = document.querySelector(".degree-section")
    let locationTimezone = document.querySelector(".location-timezone")
    let span = document.querySelector(".degree-section span")


    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;

            const api = `https://api.darksky.net/forecast/9e33d2f2b23c439a1f389bc580fc0e06/${lat},${long}`

            fetch(api).then(response => {
                console.log(response)
                return response.json()
            }).then(data => {
                const { temperature, summary, icon } = data.currently
                locationTimezone.textContent = data.timezone
                setTemperature(temperature)
                temperatureSection.addEventListener("click", () => setTemperature(temperature))
                setDescription(summary)
                setIcons(icon, document.querySelector(".icon"))
            }).catch(error => {
                console.log(error)
            })
        })
    }

    function setIcons(icon, iconId) {
        const skycons = new Skycons({ color: "white" })
        const currentIcon = icon.replace(/-/g, "_").toUpperCase()
        skycons.play()
        return skycons.set(iconId, Skycons[currentIcon])
    }

    function setDescription(summary) {
        temperatureDescription.textContent = summary
    }

    function setTemperature(temperature) {
        temperatureDegree.textContent = Math.floor(((temperature - 32) / 1.8))
        if (span.textContent === "F") {
            span.textContent = "C"
            temperatureDegree.textContent = Math.floor(((temperature - 32) / 1.8))
        } else {
            span.textContent = "F"
            temperatureDegree.textContent = temperature
        }
    }
})