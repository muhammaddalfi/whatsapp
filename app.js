require("dotenv").config();
const  {API_PORT} = process.env;
const port = process.env.port || API_PORT;

const express = require('express')
const app = express()

app.use(express.json());
app.use(express.urlencoded({extended: true}));

//import module route
const apiRoute = require('./router/api')

//deklarasi router user
app.use(apiRoute)

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
