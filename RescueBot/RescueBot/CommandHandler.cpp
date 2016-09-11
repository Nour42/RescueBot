#include "CommandHandler.h"


CommandHandler::CommandHandler()
{

};

CommandHandler::~CommandHandler()
{

};

// 0/[0 1 2 3]

void CommandHandler::Handle(BridgeClient client)
{
	String type = client.readStringUntil('/');
	if (type == "camera")
		HandleCamera(client);
};

void CommandHandler::HandleCamera(BridgeClient client)
{
	String cmd = client.readStringUntil('/');
	if (cmd == "horizon")
	{
		// pin 5
		//50-255
		int value = client.parseInt();
		Serial.println(value);
		// arduino freeze after analog write, seems power problem
		// decouple with capacitor or use external power
		analogWrite(5, value);
	}
	else if (cmd == "vertical")
	{
		// pin 6
		analogWrite(5, client.parseInt());
	}

};

void CommandHandler::HandleMovement(BridgeClient client)
{

};

void CommandHandler::HandleTestCommands(BridgeClient client)
{

};