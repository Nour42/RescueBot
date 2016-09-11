/*
 Name:		RescueBot.ino
 Created:	2016/9/10 15:57:00
 Author:	mistree
*/

#include "CommandHandler.h"
#include <Bridge.h>
#include <BridgeServer.h>
#include <BridgeClient.h>
#include <Process.h>

BridgeServer server;
CommandHandler handler;
Process mjpegserver;

// the setup function runs once when you press reset or power the board
void setup() 
{
	Bridge.begin();
	server.listenOnLocalhost();
	server.begin();
	Serial.print("starting ");
	// start video streaming server
	mjpegserver.runShellCommandAsynchronously("mjpg_streamer -i 'input_uvc.so - y - n - f 30 - r 320x240' -o 'output_http.so - p 8080 - n - w / www / webcam'");
}

// the loop function runs over and over again until power down or reset
void loop() 
{
	BridgeClient client = server.accept();
	if (client)
	{
		handler.Handle(client);
		//Serial.print(client.readString());
		client.stop();
	}
	delay(50);
}
