require('dotenv').config()

const Discord = require('discord.js')
const client = new Discord.Client();
client.login(process.env.BOT_TOKEN)

const { ethers, utils } = require("ethers")
const provider = ethers.getDefaultProvider();
const GovernanceTimelockAddress = '0x21CF9b77F88Adf8F8C98d7E33Fe601DC57bC0893';
const GovernanceTimelockAbi = require('./GovernanceTimelock.json');
const GovernanceTimelockContract = new ethers.Contract(GovernanceTimelockAddress, GovernanceTimelockAbi, provider);

GovernanceTimelockContract.on("*", function (eventObject) {

    if (!['QueueTransaction', 'ExecuteTransaction', 'CancelTransaction'].includes(eventObject.event)) {
        return
    }

    let eventDescription;
    switch (eventObject.event) {
        case 'QueueTransaction':
            eventDescription = "Queued"
            break;
        case 'ExecuteTransaction':
            eventDescription = "Executed"
            break;
        case 'CancelTransaction':
            eventDescription = "Cancelled"
            break;
    }

    const signature = eventData.args.signature;
    const parameters = signature.substring(signature.indexOf('(') + 1, signature.lastIndexOf(')'));
    const functionName = signature.split('(')[0];
    const parameterTypes = parameters.split(',');
    const decodedParameters = ethers.utils.AbiCoder.decode(parameterTypes, eventObject.data);

    const message = `Transaction ${eventDescription}: ${functionName}${decodedParameters.length && "(" + decodedParameters.join(", ") + ")"}`
    console.log(message)
    client.channels.cache.get(process.env.DISCORD_CHANNEL_ID).send(message);

});
