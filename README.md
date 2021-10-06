## Badger Governance Bot

This bot monitors BadgerDAO's [Governance Timelock Contract](https://etherscan.io/address/0x21CF9b77F88Adf8F8C98d7E33Fe601DC57bC0893) for events when transactions are queued, cancelled, and executed. It then posts them to a Discord channel, configurable with environmental variables.

The environmental variables `BOT_TOKEN` and `DISCORD_CHANNEL_ID` must be configured. Find instructions for generating a `BOT_TOKEN` value and deploying to Heroku [here](https://medium.com/techtalkers/how-to-create-a-simple-bot-using-discord-js-51bcedb0ab8c).