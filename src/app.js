const path = require("path")
const express = require("express")
const hbs = require("hbs")
const { dir } = require("console")
const app = express()

const forecast = require("./utils/forecast")
const geocode = require("./utils/geocode")

// console.log(__dirname)
// console.log(__filename)

//define path for express engine
const dir_path = path.join(__dirname,'../public')
const template_path= path.join(__dirname,'../templates/views')
const partials_path= path.join(__dirname,'../templates/partials')

//set up handlerbars engine and views location
app.set('view engine','hbs')
app.set('views',template_path)
hbs.registerPartials(partials_path)

// set up static directory to serve
app.use(express.static(dir_path))

app.get('', (req,res) => {
    res.render('index',{
        title : 'first page',
        name : 'weather_app',
        create : 'nish'
    })
} )

// app.get('',(req,res) => {
//     // res.send('hello Express ')
//     res.send('<h1>Hello Express</h1>')
// })

app.get('/help',(req,res) => {
    // res.send('How can I help you..')
    // res.send({
    //     name : "Nish",
    //     age : 28
    // })
    res.render('help',{
        title : 'help page',
        name : 'How can i help u',
        create : 'jyo'
    })
})

app.get('/about',(req,res) => {
    // res.send('Abount Us ')
    // res.send([
    //     {
    //         name : "Nish",
    //         age : 28
    //     },
    //     {
    //         name : "Jyo",
    //         age : 25
    //     }
    // ])
    res.render('help',{
        title : 'about page',
        name : 'About Us',
        create : 'Bh'
    })
})

// app.get('/weather',(req,res) => {
//     res.send('How weather today..')
// }) 

app.get('/weather',(req,res) => {
    if(! req.query.address ){
        return res.send({error : 'pls enter place'})
    }
    geocode(req.query.address,(error, {lat, lon, place} = {} ) => {
        // if(error){
        //     return res.send({error : 'Please enter place'})
        // }else{
        //     return res.send({
        //         latitude : lat,
        //         longitude : lon,
        //         lacation : place
        //     })
        // }
        forecast(lat, lon ,(error , forecastData) => {
            if(error){
                return res.send({error})
            }
            res.send({
                forecast : forecastData,
                add : req.query.address
            })
        })
    })
})

app.get('/help/*',(req,res) => {
    res.send('help article not found')
})
app.get('/what', (req,res) => {
    res.render('404',{
        title : '404 page',
        name : 'weather_app',
        create : 'yas'
    })
} )

app.get('/products', (req,res) => {
    if(! req.query.search){
        return res.send({error : 'You must provide search string'})
    }
    res.send({products : req.query.search})
} )

app.get('*',(req,res) => {
    res.send('my 404 page')
})

app.listen(3001,() => {
    console.log('server is running')
})