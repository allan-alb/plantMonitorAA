import http from 'http'
import express from 'express'
import {Server} from 'socket.io'
import {SerialPort, ReadlineParser} from 'serialport'
import ejs from 'ejs'
import path from 'path'
import {fileURLToPath} from 'url'

const app = express()
const httpServer = http.createServer(app)
const io = new Server(httpServer)

const serialPort = new SerialPort({
  path: '/dev/ttyACM0',
  baudRate: 9600
})

const serialParser = serialPort.pipe(new ReadlineParser({ delimiter: '\r\n' }))

app.engine('ejs', ejs.__express)
app.set('views', './src/views');
app.set('view engine', 'ejs')

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, 'public')))
app.get('/', (req, res) => {
  res.render('index')
})

serialPort.on('open', () => {
  console.log('serial port opened')
})
io.on('connection', (socket) => {
  console.log('socket.io connection')
  serialParser.on('data', (data) => {
    console.log(data)
    socket.emit('arduino-data', data)
  })
  socket.on('disconnect', () => {
    console.log('disconnected')
  })
})

httpServer.listen(3000, () => {
  console.log('listening on port 3000... ')
})