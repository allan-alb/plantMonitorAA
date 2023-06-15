(function () {
  var socket = io()

  socket.on('arduino-data', (data) => {
    const contentDiv = document.getElementById('content')
    const dataText = document.createElement('span')
    const dateText = document.createElement('span')

    dateText.className = "date-text"
    const measureInfoDiv = document.createElement('div')
    measureInfoDiv.className= 'measure-div'
    dataText.innerText = data
    dateText.innerText = "(" + new Date().toLocaleString('pt') + ")"
    measureInfoDiv.appendChild(dataText)
    measureInfoDiv.appendChild(dateText)

    if (data.includes('Temperature')) {
      const temperatureDiv = document.getElementById('temperature-div')
      temperatureDiv.insertBefore(measureInfoDiv, temperatureDiv.firstChild)
    }
    if (data.includes('Light')) {
      const lightnessDiv = document.getElementById('lightness-div')
      lightnessDiv.insertBefore(measureInfoDiv, lightnessDiv.firstChild)
    }
    if (data.includes('Moisture')) {
      const moistureDiv = document.getElementById('moisture-div')
      moistureDiv.insertBefore(measureInfoDiv, moistureDiv.firstChild)
    }
  })
})()
