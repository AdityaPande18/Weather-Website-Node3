console.log('Client side javascript file is loaded!')

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const msg_1 = document.querySelector('#msg-1')
const msg_2 = document.querySelector('#msg-2')

msg_1.textContent = ''
msg_2.textContent = ''

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const location = search.value
    msg_1.textContent = 'Loading...'

    const url = 'http://localhost:3000/weather?address=' + location
    fetch(url).then((response) => {
        response.json().then((data) => {
            if(data.error){
                msg_1.textContent = data.error
            } else {
                msg_1.textContent = data.Location
                msg_2.textContent = data.msg
            }
        })
    })
})