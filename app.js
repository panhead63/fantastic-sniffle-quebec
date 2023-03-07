require('dotenv').config();
const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000;
const { urlencoded } = require('body-parser')
const { ObjectId } = require('mongodb')
const { MongoClient, ServerApiVersion} = require('mongodb');
const client = new MongoClient(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1});
app.use(bodyParser.urlencoded({ extended: true}))
app.set('view engine', 'ejs')

let someVar = "";

async function cxnDB(){

  try{
    client.connect; 
    const collection = client.db("chillAppz").collection("snacks");
    const result = await collection.find().toArray();
      
    // console.log("cxnDB result: ", result);
    return result; 

  }
  catch(e){
      console.log(e)
  }
  finally{
    client.close; 
  }


}

app.get('/', async (req, res) => {

  let result = await cxnDB().catch(console.error); 

  // console.log("get/: ", result);

  res.render('index', {
    someVar : "hello from node, express, & EJS, nodemon here too!",
    snackData : result
  })
})

app.post('/addSnack', async (req, res) => {

  try {
    // console.log("req.body: ", req.body) 
    client.connect; 
    const collection = client.db("chillAppz").collection("snacks");
    await collection.insertOne(req.body);
      
    res.redirect('/');
  }
  catch(e){
    console.log(error)
  }
  finally{
   // client.close()
  }

})


app.post('/updateSnack/:id', async (req, res) => {

  try {
    console.log("req.parms.id: ", req.params.id) 
    
    client.connect; 
   // const collection = client.db("chillAppz").collection("snacks");
    let result = await collection.findOneAndUpdate( 
      {"_id": ObjectId(req.params.id)}, { $set: {"snack": "new snack" } }
    )
    .then(result => {
      console.log(result); 
      res.redirect('/');
    })
    .catch(error => console.error(error))
  }
  finally{
    client.close()
  }

})

app.post('/deleteSnack/:id', async (req, res) => {

  try {
    console.log("req.parms.id: ", req.params.id) 
    
    client.connect; 
    const collection = client.db("chillAppz").collection("snacks");
    let result = await collection.findOneAndDelete( 
      {
        "_id": ObjectId(req.params.id)
      }
    )
    .then(result => {
      console.log(result); 
      res.redirect('/');
    })
    .catch(error => console.error(error))
  }
  finally{
    //client.close()
  }

})

app.listen(PORT, () => {
  console.log(`Server is running & listening on port ${PORT}`);
});





