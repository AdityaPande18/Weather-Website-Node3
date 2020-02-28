const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const msg_1 = document.querySelector('#msg-1')
const msg_2 = document.querySelector('#msg-2')
const msg_3 = document.querySelector('#msg-3')
const msg_4 = document.querySelector('#msg-4')
const msg_5 = document.querySelector('#msg-5')
const msg_6 = document.querySelector('#msg-6')
const msg_8 = document.querySelector('#msg-8')

msg_1.textContent = ''
msg_2.textContent = ''

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const location = search.value
    msg_1.textContent = 'Loading...'
    const url = '/weather?address=' + location
    fetch(url).then((response) => {
        response.json().then((data) => {
            if(data.error){
                msg_1.textContent = data.error
            } else {
                if(data.icon=='clear-day'){
                    document.getElementById("image").src='img/clear-day.png'
                }else if(data.icon=='clear-night'){
                    document.getElementById("image").src='img/clear-night.png'
                }else if(data.icon=='rain'){
                    document.getElementById("image").src='img/rain.png'
                }else if(data.icon=='snow'){
                    document.getElementById("image").src='img/snow.png'
                }else if(data.icon=='sleet'){
                    document.getElementById("image").src='img/sleet.png'
                }else if(data.icon=='wind'){
                    document.getElementById("image").src='img/wind.png'
                }else if(data.icon=='fog'){
                    document.getElementById("image").src='img/fog.png'
                }else if(data.icon=='cloudy'){
                    document.getElementById("image").src='img/cloudy.png'
                }else if(data.icon=='partly-cloudy-day'){
                    document.getElementById("image").src='img/partly-cloudy-day.png'
                }else if(data.icon=='partly-cloudy-night'){
                    document.getElementById("image").src='img/partly-cloudy-night.png'
                }
                document.getElementById('forecast').style.display = 'block'
                msg_1.textContent = data.Location
                msg_2.textContent = data.summary
                msg_4.textContent = 'Temperature: ' + data.temperature + ' C'
                msg_5.textContent = 'Today\'s high: ' + data.temperature_max + ' C'
                msg_6.textContent = 'Today\'s low: ' + data.temperature_min + ' C'
                msg_8.textContent = 'Chances of rain: ' + data.precipProbability + '%'
            }
        })
    })
})