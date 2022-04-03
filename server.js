// importing 

import express from 'express';
import mongoose from 'mongoose';
import Messages from './dbMessages.js';
import Pusher from 'pusher';
import Cors from 'cors';
import dotenv from "dotenv"

// app config
dotenv.config()

const app = express(); // creating the application and allows aus api routes
const port = process.env.PORT || 9000;

const pusher = new Pusher({
    appId: "1363451",
    key: "4d4cd3d915b404871efa",
    secret: "8ae3c83a41e74105b7dd",
    cluster: "eu",
    useTLS: true
  });

  const db = mongoose.connection

  db.once('open', () => {
      console.log("DB connected");

      const msgCollection = db.collection("messagecontents");
      const changeStream = msgCollection.watch();

      changeStream.on('change', (change) => {
          console.log("A Change occured", change);

          // whenever change occurs we will save that into a CHANGE variable. If the OPERATIONTYPE is 'INSERT', then we save FULL DOCUMENT into a variable which is 'INSERTED', which we will call MESSAGEDETAILS. This is the time when we trigger PUSHER. 
          if (change.operationType === 'insert') {
              const messageDetails = change.fullDocument;
              pusher.trigger('message', 'inserted', 
                 {
                  name: messageDetails.name,
                  message: messageDetails.message,
                  timestamp: messageDetails.timestamp,
                  received: messageDetails.received,
                 }           
              );
          } else {
              console.log('Error triggering Pusher')
          }
      })
  });


// middlewares

app.use(express.json());
app.use(Cors());

// DB config (where mongodb stuff come)

const connection_url = `mongodb+srv://${process.env.USERNAME}:${process.env.PASSWORD}@cluster0.go1aw.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`

mongoose.connect(connection_url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(()=>{
    console.log("test")
})


// api routes

app.get('/', (req, res) => res.status(200).send('hello world'))

app.get('/messages/sync', (req, res) => {
    Messages.find((err, data) => {
        if (err) {
            res.status(500).send(err)
        } else {
            res.status(200).send(data) // 200 is saying OK to get but not to post
        }
    })
})

app.get("/",(req,res)=>{
    res.send('APP IS RUNNING')
})

app.post('/messages/new', (req, res) => {
    const dbMessages = req.body // passing message structure into body
    console.log({dbMessages})
    Messages.create(dbMessages, (err, data) => {
        if (err) {
            res.status(500).send(err)
        } else {
            res.status(201).send(data)
        }
    })
})


if (process.env.NODE_ENV === 'production') {
	app.use(express.static('whatsapp-mern/build'));

    app.get("*",(req,res)=>{
        res.sendFile(path.resolve(__dirname,"whatsapp-mern","build","index.html"))
    })
}



// listener

app.listen(port, () => console.log(`Listening on localhost:${port}`));


