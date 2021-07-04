# ArchiveCord

ArchiveCord is a client to view applications archived using [LiteBot's](https://github.com/iDarkLightning/LiteBot) standard archives plugin!

## Deploying

If you would like to host your own version of this client, you can do so like such:

First, clone the repository

```bash
git clone https://github.com/iDarkLightning/archivecord.git
```

Next, fill out your `ENVIRONMENT_VARIABLES`. To do this, copy `.env` to `env.local` and fill it out

- `DISCORD_CLIENT_ID`: The Client ID of your discord application
- `DISCORD_CLIENT_SECRET`: The Client Secret of your discord application

The above fields can be found through your discord developer portal:
![Example Image](https://cdn.discordapp.com/attachments/439793596003254286/861356286309040148/unknown.png)

- `JWT_SECRET`: The secret token that will be used to sign session tokens and make requests to LiteBot, this must match the `api_litebot` field in your configuration for LiteBot
- `LITEBOT_URL`: The route that your LiteBot server is running on, by default this will be `http://localhost:8000` if you are deploying this on the same machine as LiteBot

Now, if you do not have `node.js` installed, then you can install it from [here](https://nodejs.org/en/).

Whilst you can run the server via `npm`, it is reccomended to use `yarn`. You can install `yarn` using the following command after installing node.

```bash
npm install --global yarn
```

Now, you can start the server like such:

```
yarn build
yarn start
```

If you have issues, feel free to reach out to me via the [LiteTech Discord Server](https://discord.litetech.cf)

## Credits

The UI/UX credits go to `@owen3242`.
