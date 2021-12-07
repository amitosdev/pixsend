const express = require('express')
const path = require('path')
const http = require('http')
const app = express()

const PORT = 3003

app.use(express.static(__dirname))
app.use('/dist', express.static(path.join(__dirname, '../..', 'dist')))

app.get('/favicon.ico', (req, res) => {
  res.sendStatus(204)
})

app.get('/test', (req, res) => {
  console.log('request recived:')
  console.log(JSON.stringify(req.query, null, '\t'))
  res.sendStatus(200)
})

let server = http.createServer(app)
console.log('*** using HTTP server')

server.listen(PORT, () => {
  console.log('Server is listening on port ', PORT)
})
