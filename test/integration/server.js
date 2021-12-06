const express = require('express')
const path = require('path')
const http = require('http')
const app = express()

const PORT = 3003

app.use(express.static(__dirname))
app.use('/dist', express.static(path.join(__dirname, '../..', 'dist')))

app.set('port', PORT)

app.get('/favicon.ico', (req, res) => {
  res.sendStatus(204)
})

let server = http.createServer(app)
// eslint-disable-next-line no-console
console.log('*** using HTTP server')

server.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log('Server is listening on port ', PORT)
})
