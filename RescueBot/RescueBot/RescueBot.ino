/*
 Name:		RescueBot.ino
 Created:	2016/9/10 15:57:00
 Author:	mistree
*/

#include "L298N.h"
#include <Bridge.h>
#include <BridgeServer.h>
#include <BridgeClient.h>
#include <Servo.h>

BridgeServer server;

Servo servoX;
Servo servoY;
Servo servoS;

Process shell;

//PWM: 3, 5, 6, 9, 10, 11, and 13

L298N grabber(3, A4, A5, 12, 2, 13);
L298N driver(5, A0, A1, A2, A3, 6);
#define sonarPin 4
#define servoPinX 9
#define servoPinY 10
#define servoPinS 11

int ping_cm()
{
	long duration = 0;
	pinMode(sonarPin, OUTPUT);
	digitalWrite(sonarPin, LOW);
	delayMicroseconds(2);
	digitalWrite(sonarPin, HIGH);
	delayMicroseconds(10);
	digitalWrite(sonarPin, LOW);
	pinMode(sonarPin, INPUT);
	duration = pulseIn(sonarPin, HIGH);
	//delay(30);
	return (duration / 2) / 29.1;
}

void setup() 
{
	// initialize bridge connection between the arduino chip and linux openwrtyun chip
	Bridge.begin();
	// start accepting http request
	server.listenOnLocalhost();
	//server.noListenOnLocalhost();
	server.begin();

	// write initial position to servos
	servoS.attach(servoPinS);
	servoX.attach(servoPinX);
	servoY.attach(servoPinY);
}


void loop() 
{
	
	BridgeClient client = server.accept();
	// check if there's a http request
	if (client)
	{
		// read the http request message
		String message = client.readStringUntil('/');
	/*if (Serial.available())
	{
		Serial.println("ready");
		String message = Serial.readStringUntil('/');*/
		message.trim();
		if (message == "scan")
		{
			for (int i = 0; i < 36; i++)
			{
				servoS.write(i * 5);
				client.print(ping_cm());
				client.println(" ");
				delay(30);
			}
		}
		else if (message == "servo")
		{
			servoX.write(client.readStringUntil('/').toInt());
			servoY.write(client.readStringUntil('/').toInt());
		}
		else if (message == "stream")
		{
			shell.runShellCommandAsynchronously("mjpg_streamer -i 'input_uvc.so -y -n -f 30 -r 320x240' -o 'output_http.so -p 8080 -n -w /www/webcam'");
			delay(500);
			client.print(shell.readString());
			client.println();
		}
		else if (message == "shell")
		{
			shell.runShellCommand(Serial.readStringUntil('/'));
			delay(500);
			client.print(shell.readString());
		}
		else
		{
			int speed = client.readStringUntil('/').toInt();
			int time = client.readStringUntil('/').toInt();
			if (message == "forward")
			{
				driver.forward(speed, time);
				driver.full_stop(0);
			}
			else if (message == "backward")
			{
				driver.backward(speed, time);
				driver.full_stop(0);
			}
			else if (message == "left")
			{
				driver.turn_left(speed, time);
				driver.full_stop(0);
			}
			else if (message == "right")
			{
				driver.turn_right(speed, time);
				driver.full_stop(0);
			}
			else if (message == "liftdown")
			{
				grabber.setup_motors(HIGH, LOW, LOW, LOW);
				grabber.drive_motors(speed);
				delay(time);
				grabber.full_stop(0);
			}		
			else if (message == "liftup")
			{
				grabber.setup_motors(LOW, HIGH, LOW, LOW);
				grabber.drive_motors(speed);
				delay(time);
				grabber.full_stop(0);
			}		
			else if (message == "grabout")
			{
				grabber.setup_motors(LOW, LOW, HIGH, LOW);
				grabber.drive_motors(speed);
				delay(time);
				grabber.full_stop(0);
			}
			else if (message == "grabin")
			{
				grabber.setup_motors(LOW, LOW, LOW, HIGH);
				grabber.drive_motors(speed);
				delay(time);
				grabber.full_stop(0);
			}
		}
		client.println("processed");
		client.stop();
	}
}
