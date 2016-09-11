#ifndef COMMANDHANDLER_H
#define COMMANDHANDLER_H

#include <Arduino.h>
#include <Bridge.h>
#include <BridgeServer.h>
#include <BridgeClient.h>


class CommandHandler
{
public:
	CommandHandler();
	~CommandHandler();

public:
	void Handle(BridgeClient client);

private:
	void HandleCamera(BridgeClient client);
	void HandleMovement(BridgeClient client);
	void HandleTestCommands(BridgeClient client);
};

#endif

