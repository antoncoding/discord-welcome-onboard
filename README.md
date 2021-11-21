# Venus Bot

This repository is forked from [GuideBot](https://github.com/AnIdiotsGuide/guidebot). This is a bot that help users generate a new profile pic with custom background.

## Requirements

- `git` command line ([Windows](https://git-scm.com/download/win) | [Linux](https://git-scm.com/download/linux) | [MacOS](https://git-scm.com/download/mac)) installed
- `node` [Version 16.x](https://nodejs.org)
- The node-gyp build tools. This is a pre-requisite for Enmap, but also for a **lot** of other modules. See [The Enmap Guide](https://enmap.evie.codes/install#pre-requisites) for details and requirements for your OS. Just follow what's in the tabbed block only, then come back here!

You also need your bot's token. This is obtained by creating an application in
the Developer section of discord.com. Check the [first section of this page](https://anidiots.guide/getting-started/getting-started-long-version)
for more info.

## Environment Variables
Copy `.env-example` into `.env` and fill out the environment variables:

```.env
# Discord Bot Token
DISCORD_TOKEN=

# Bot owner id
OWNER=

# Clipping Magic settings: Get an account at https://clippingmagic.com/
# Clipping Magic: api key
CM_PASS=

# Clipping Magic: user id
CM_USER=

# Clipping Magic: whether it's a production env. You will start being charge if you switch to true
CM_IS_PRODUCTION=false
```

You will need to go to [Clipping Magic](https://clippingmagic.com/api/pricing) and register an API key, this API is used to remove image background.

## Intents

You can enable privileged intents in your bot page
(the one you got your token from) under `Privileged Gateway Intents`.

By default GuideBot needs the Guilds, Guild Messages and Direct Messages intents to work.
For join messages to work you need Guild Members, which is privileged.
User counts that GuideBot has in places such as in the ready log, and the stats
command may be incorrect without the Guild Members intent.

Intents are loaded from the index.js file, and the installer is pre-set with the Guilds, Guild Messages and Direct Messages intents.

For more info about intents checkout the [official Discord.js guide page](https://discordjs.guide/popular-topics/intents.html) and the [official Discord docs page](https://discord.com/developers/docs/topics/gateway#gateway-intents).

## Starting the bot

To start the bot, in the command prompt, run the following command:

```shell
node index.js
```
