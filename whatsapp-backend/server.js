//importing
const express = require ('express');
const mongoose = require ('mongoose');
const Messages = require ('./dbMessages.js');
const Pusher = require ('pusher');
const cors = require('cors');
/*import  express from 'express'; /*es6 modules*/

//app config
const app = express();
const port = process.env.PORT || 9000

const pusher = new Pusher({
    appId: '1068492',
    key: '8c206eb63cbc292832ae',
    secret: 'bcbf95d2f8cae0c71ad1',
    cluster: 'eu',
    encrypted: true
  });

//middlewares
app.use(express.json());
app.use(cors());

//DB config
//upZeFNB3HtPHviXk
const connection_url = 'mongodb+srv://admin:upZeFNB3HtPHviXk@cluster0.nyzev.mongodb.net/whatsappdb?retryWrites=true&w=majority'
mongoose.connect(connection_url, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const db = mongoose.connection
db.once('open', () =>{
    console.log('db is connected');

    const msgCollection = db.collection('messagecontents')
    const changeStream = msgCollection.watch();

    changeStream.on('change',(change) => {
        console.log(change);

        if(change.operationType === 'insert') {
            const messageDetails = change.fullDocument;
            pusher.trigger('messages','inserted',{
                name: messageDetails.name,
                message: messageDetails.message,
                timestamp: messageDetails.timestamp,
                received: messageDetails.received
            });
            //messages is the channel
        }
        else {
            console.log('Error triggering Pusher');
        }
    })
})

//api routes
app.get('/',(req,res) => res.status(200).send('hello world'));

app.get('/messages/sync',(req,res) => {
    Messages.find((err, data) =>{
        if(err) {
            res.status(500).send(err);
        }
        res.status(200).send(data)
    })
})

app.post('/messages/new',(req,res)=> {
    const dbMessage = req.body

    Messages.create(dbMessage,(err,data) => {
        if(err) {
            res.status(500).send(err);
        }
        res.status(201).send(data)
    })
})

//listener
app.listen(port, ()=> console.log(`listening on ${port}`));