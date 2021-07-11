const mongoose = require('mongoose')
const Pusher = require("pusher");


const pusher = new Pusher({
    appId: "1232626",
    key: "30b83b9b426488afe28c",
    secret: "be18487428d2f546e376",
    cluster: "ap2",
    useTLS: true
  });

mongoose.connect(" mongodb+srv://sanz:sannu05@cluster0.s5xci.mongodb.net/ecom?retryWrites=true&w=majority", {
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("db connected")
}).catch(() => {
    console.log("db failed")
})

const db = mongoose.connection
db.once('open', () => {
    console.log('db coonected again')
    const msgCollection = db.collection('productdetails');
    const changeStream = msgCollection.watch()
    changeStream.on('change', (change)=>{
        console.log(change)
        if(change.operationType==='insert'){
            const msgdetail = change.fullDocument;
            pusher.trigger('pdtinsert','insert',{
                user:msgdetail.name
            })
        }
        if(change.operationType==='update'){
            const msgdetail = change.updateDescription;
            pusher.trigger('pdtupdate','update',{
                user:msgdetail
            })
        }
        if(change.operationType==='delete'){
            const msgdetail = change.documentKey;
            pusher.trigger('pdtdelete','delete',{
                user:msgdetail
            })
        }
    })
    console.log('db coonected again')
    const msgCollection1 = db.collection('categorys');
    const changeStream1 = msgCollection1.watch()
    changeStream1.on('change', (change)=>{
        console.log(change)
        if(change.operationType==='insert'){
            const msgdetail = change.fullDocument;
            pusher.trigger('pdtinsert','insert',{
                user:msgdetail.name
            })
        }
        if(change.operationType==='update'){
            const msgdetail = change.documentKey;
            pusher.trigger('pdtupdate','update',{
                user:msgdetail._id
            })
        }
        if(change.operationType==='delete'){
            const msgdetail = change.documentKey;
            pusher.trigger('pdtdelete','delete',{
                user:msgdetail
            })
        }
    })
})

