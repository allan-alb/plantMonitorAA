# Plant Monitor AA 🌱

**Plant Monitor** is a Node.js server application designed to connect with an Arduino board via a serial port. This project allows you to monitor plants by collecting data from sensors attached to the Arduino. The application logs environmental data, such as light sensitivity, temperature, and soil moisture, to a file for easy tracking and analysis.

## Features

- Connects to an Arduino board via serial communication.
- Reads data from the following sensors:
  - Light sensitivity
  - Temperature
  - Soil moisture
- Parses sensor data and writes it to the console and a log file.
- Useful for monitoring plant conditions in real time.

## Requirements

- [Node.js](https://nodejs.org/) (version X or higher)
- [Arduino](https://www.arduino.cc/) board
- Sensors for light sensitivity, temperature, and moisture
- Serial communication setup between the Arduino and the server

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/allan-alb/plantMonitorAA.git
   cd plantMonitorAA
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Connect the Arduino to your computer via USB and ensure the sensors are properly connected to the board.

4. Configure the serial port:
   - Update the serial port path in the application configuration file (e.g., `config.js` or directly in the code if applicable).

## Usage

1. Upload the Arduino sketch to your board (see below for details).
2. Start the server:
   ```bash
   node index.js
   ```

3. The server will begin listening for data from the Arduino via the serial port.

4. Data from the sensors will be logged to a file (e.g., `data.log`) in the project directory.

5. Use the logged data to analyze the conditions of your plants.

## Arduino Sketch

The Arduino board is responsible for reading data from the sensors and sending it via the serial port to the Node.js server. Here's an example of the sketch used in this project (available in `arduino/plantMonitor.ino`):

### Pin Configuration

- **Light sensor**: Connected to analog pin `A0`.
- **Moisture sensor**: Connected to analog pin `A1`.
- **Temperature sensor (DHT11)**: Data pin connected to digital pin `2`.

### Diagram Description

For the hardware setup:
1. Connect the **light sensor** output to `A0`.
2. Connect the **moisture sensor** output to `A1`.
3. Connect the **DHT11 sensor** as follows:
   - VCC to 5V on the Arduino.
   - GND to GND on the Arduino.
   - Data pin to digital pin `2` on the Arduino.
4. Ensure all sensors share a common ground with the Arduino board.

### Future Improvements

- Implement data visualization.
- Support alternative communication methods.
- Add alerts for extreme conditions (e.g., too dry or too hot).

### License

This project is licensed under the MIT License.
