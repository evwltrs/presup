import { config } from './config/config'

import { Client, Intents } from 'discord.js'

var cors = require('cors')
import express from 'express'

const app = express()
const port = config.port

app.use(cors())

const myIntents = new Intents()
myIntents.add()
myIntents.add(Intents.FLAGS.GUILD_PRESENCES, Intents.FLAGS.GUILDS)
const client = new Client({ intents: myIntents })

client.on('ready', async () => {
	console.log(`Logged in as ${client.user!.tag}!`)
})

async function getPresence() {
	const user = await client.users.fetch(config.userId)
	const guild = await client.guilds.fetch(config.guildId)
	const member = await guild.members.fetch(user)
	return member.presence!.activities
}

app.get('/', async function (req, res) {
	res.send(await getPresence())
})

app.listen(port, () => {
	console.log(`Listening at http://localhost:${port}`)
})
client.login(config.botToken)
