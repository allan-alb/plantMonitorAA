#include <arduino-timer.h>

#define lightReadInterval 10000
#define temperatureReadInterval 20000
#define moistureReadInterval 60000

// Timer config
Timer<3> timer;

// Thermistor configs
#define ThermistorPin A0
int T0;
float R1 = 10000;
float logR2, R2, TemperatureValue;
float c1 = 1.009249522e-03, c2 = 2.378405444e-04, c3 = 2.019202697e-07;

// Light Dependent Resistor configs
#define LightSensorPin A1
int LightValue;

// Moisture sensor configs
#define MoistureSensorPin A2
int MoistureValue = 0;
const int moisturePowerPin = 8;
const int moisturePowerDelayTime = 1000;

void getMoistureSensorValue() {
  digitalWrite(moisturePowerPin, HIGH);
  delay(10);
  MoistureValue = analogRead(MoistureSensorPin);

  Serial.print("Moisture: ");
  Serial.println(MoistureValue);

  digitalWrite(moisturePowerPin, LOW);
}

void getThermistorValue() {
  T0 = analogRead(ThermistorPin);
  R2 = R1 * (1023.0 / (float)T0 - 1.0);
  logR2 = log(R2);
  TemperatureValue = (1.0 / (c1 + c2*logR2 + c3*logR2*logR2*logR2));
  TemperatureValue = TemperatureValue - 273.15;

  Serial.print("Temperature: ");
  Serial.print(TemperatureValue);
  Serial.println(" C");
}

void getLightSensorValue() {
  LightValue = analogRead(LightSensorPin);

  Serial.print("Light intensity: ");
  Serial.println(LightValue);
}

bool call_moisture(void *) {
  getMoistureSensorValue();
  return true;  // keep timer active? true
}

bool call_lightness(void *) {
  getLightSensorValue();
  return true;  // keep timer active? true
}

bool call_thermistor(void *) {
  getThermistorValue();
  return true;  // keep timer active? true
}

void setup() {
  // Start serial monitor
  Serial.begin(9600);
  // Set moisture sensor pin
  pinMode(moisturePowerPin, OUTPUT);
  
  // set timers
  timer.every(lightReadInterval, call_lightness);
  timer.every(temperatureReadInterval, call_thermistor);
  timer.every(moistureReadInterval, call_moisture);
}

void loop() {
  timer.tick();
}