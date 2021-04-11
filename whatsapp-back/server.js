const express = require('express');
const mongoose = require('mongoose');
const Messages = require('./dbMessages');
const Pusher = require('pusher');


const app = express();
const port = process.env.PORT || 9000;

app.use(express.json());
app.use(function (req, res, next) {
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader('Access-Control-Allow-Methods', '*');
	res.setHeader("Access-Control-Allow-Headers", "*");
	next();
});

const pusher = new Pusher({
	appId: '1069084',
	key: '2731f82e65bcaf31cc02',
	secret: '6c45077381144aba72f8',
	cluster: 'ap2',
	encrypted: true
});


const db = mongoose.connection

db.once('open', () => {
	console.log("db connected")

	const msgCollection = db.collection("messagecontents");
	const changeStream = msgCollection.watch();

	changeStream.on('change', (change) => {
		
		if (change.operationType === 'insert') {
			const messageDetails = change.fullDocument

			pusher.trigger('messages', 'inserted', {
				name: messageDetails.name,
				message: messageDetails.message,
				timestamp: messageDetails.timestamp,
				recieved: messageDetails.recieved
			})
		} else {
			console.log("Error triggering Pusher"); 
		}
	})
})

const connectionUrl = `mongodb+srv://admin:bkbTva7AHs5M89Ih@cluster0.s0mun.mongodb.net/whatsapp-cloneDB?retryWrites=true&w=majority`;

mongoose.connect(connectionUrl, {
	useCreateIndex: true,
	useNewUrlParser: true,
	useUnifiedTopology: true
});

app.get('/', (req, res) => res.status(200).send('hello world'));

app.post('/messages/new', (req, res) => {
	const dbMessage = req.body;

	Messages.create(dbMessage, (err, data) => {
		if (err) {
			res.status(500).send(err)
		} else {
			res.status(200).send(data)
		}
	})
	// res.end();
})

app.get('/messages/sync', (req, res) => {
	Messages.find((err, data) => {
		if (err) {
			res.status(500).send(err)
		} else {
			res.status(201).send(data)
		}
	})
})

app.listen(port, () => console.log(`listening on localhost:${port}`));