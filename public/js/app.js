console.log('client side javascript is loaded')

// fetch('http://puzzle.mead.io/puzzle').then((response) => {
//     // console.log(response)
//     response.json().then((data) => {
//         console.log(data)
//     })
// })

// fetch("http://localhost:3001/weather?address=Nagpur").then((res) => {
//     res.json().then((data) => {
//         if (data.error) {
//             console.log(data.error)
//         }else{
//             console.log(data.forecast)
//         }
        
//     })
// })

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')

const msg1 = document.querySelector('#message-1')
const msg2 = document.querySelector('#message-1')
msg1.textContent = 'From Javascript'

weatherForm.addEventListener('submit',(event) => {
    event.preventDefault()
    msg2.textContent = 'Loading...'
    // console.log('Testing done', 'place :' + search.value)
    fetch("http://localhost:3001/weather?address="+search.value).then((res) => {
        res.json().then((data) => {
            if (data.error) {
                console.log(data.error)
                msg1.textContent = data.error
            }else{
                console.log(data.forecast)
                msg2.textContent = data.forecast.place
            }
            
        })
    })

})

