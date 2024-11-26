import http from 'http'
import express from 'express'
import {Server} from 'socket.io'
import {SerialPort, ReadlineParser} from 'serialport'
import ejs from 'ejs'
import path from 'path'
import {fileURLToPath} from 'url'
import fs from 'fs/promises'

const app = express()
const httpServer = http.createServer(app)
const io = new Server(httpServer)

const saveDataToFile = async (data) => {
	let file = 'C:/Users/user/Desktop/monitorfiles'

	if (data.includes('Temperature')) {
		file = file + '/temperature.txt'
	}
	
	if (data.includes('Light')) {
		file = file + '/light.txt'
	}
	
	if (data.includes('Moisture')) {
		file = file + '/moisture.txt'
	}
	
	const content = data + " (" + new Date().toLocaleString('pt') + ")\n"
	
	try {
		await fs.appendFile(file, content);
	} catch (err) {
		console.log(err);
	}
}

const saveErrorsToFile = async (errorData) => {
	const errorFile = 'C:/Users/user/Desktop/monitorfiles/error.txt'
	
	const content = errorData + " (" + new Date().toLocaleString('pt') + ")\n"
	
	try {
		await fs.appendFile(file, content);
	} catch (err) {
		console.log(err);
	}
}

const serialPort = new SerialPort({
  path: 'COM3',
  baudRate: 9600,
  autoOpen: true
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
serialPort.on('close', (e) => {
  console.log('serial port closed at ', new Date().toLocaleString('pt'))
  console.log('event data: ', JSON.stringify(e))
  saveErrorsToFile('port closed ' + JSON.stringify(e))
  
  serialPort.open((err) => {
	  if (err) {
		saveErrorsToFile('error reopening: ' + err.message)
		return console.log('error reopening port: ', err.message)
	  }
  })
})
serialParser.on('data', (data) => {
    console.log(data)
	saveDataToFile(data)
})
io.on('connection', (socket) => {
  console.log('socket.io connection')
  serialParser.on('data', (data) => {
    console.log(data)
    socket.emit('arduino-data', data)
	// saveDataToFile(data)
  })
  socket.on('disconnect', () => {
    console.log('disconnected')
  })
})

httpServer.listen(3000, () => {
  console.log('listening on port 3000... ')
})