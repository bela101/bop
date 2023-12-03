const dataset = require('./assets/datasetsmall.json')
const port = 5174
const express = require('express')
const path = require('path')
// const fs = require('fs')
const app = express()

app.use(express.json())

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', '*');
    res.setHeader('Access-Control-Allow-Headers', '*');
    next();
});

app.get('/item/:id', (req, res) => {
    let item = dataset.find(item => item.id == req.params.id)
    console.log(req.query.file)
    let file = req.query.file
    // res.json(query.file)
    if (file=='all') { 
        console.log(req.query.file)
        res.sendFile(path.join(__dirname, '/assets', 'Archive.zip'))
    } else if(file) {
        console.log(req.query.file)
        res.sendFile(path.join(__dirname, '/assets', req.query.file))
        // res.json(item)
    } else { 
        console.log('no file')
        res.sendFile(path.join(__dirname, '/assets', 'nofile.txt'))
        // res.status(404).json({ message: 'Item with Id: ' + req.params.id + ' does not exist.'})
    } 
    // next()
})

// app.get('/item/:id', (req, res) => {
//     console.log("jsbdf")
//     let query = req.query
//     res.json(query.file) 
//     next()
// })

app.listen(port, () => {});