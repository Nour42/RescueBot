/*
 Name:		RescueBot.ino
 Created:	2016/9/10 15:57:00
 Author:	mistree
*/

//#include "CommandHandler.h"
#include "L298N.h"
#include <Bridge.h>
#include <Mailbox.h>

#include <Servo.h>

Servo servoX; 
Servo servoY;

int posX = 90;
int posY = 90;


Process mjpegserver;
L298N hBridge(A5,A1,A2,A3,A4,A6);


void setup() 
{
	// initialize bridge connection between the arduino chip and linux openwrtyun chip
	Bridge.begin();
	// start accepting http request
	Mailbox.begin();

	// attach servos to pin9 and pin10
	servoX.attach(A9);
	servoY.attach(A10);

	// write initial position to servos
	servoX.write(posX); // move to middle position
	servoY.write(posY);
}

void loop() 
{
	String message;
	// check if there's a http request
	if (Mailbox.messageAvailable())
	{
		// read the http request message
		Mailbox.readMessage(message);
		if (message == "cu")
			servoY.write(posY = posY - 5); // move camera up
		else if (message == "cd")
			servoY.write(posY = posY + 5); // move camera down
		else if (message == "cr")
			servoX.write(posX = posX - 5); // move camera right
		else if (message == "cl")
			servoX.write(posX = posX + 5); // move camera left
		else if (message == "s")
			// launch camera live stream
			mjpegserver.runShellCommandAsynchronously("mjpg_streamer -i 'input_uvc.so -y -n -f 30 -r 320x240' -o 'output_http.so -p 8080 -n -w /www/webcam'");
		else if (message == "test")
		{
			// perform an h bridge test
			hBridge.forward(200, 2000);
			hBridge.backward(200, 2000);
			hBridge.turn_right(200, 2000);
			hBridge.turn_left(200, 2000);
			hBridge.full_stop(2000);
		}
	}
}
