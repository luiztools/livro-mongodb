//5.1
npm init

//5.2
npm install -S express mongodb body-parser

//5.3
const {MongoClient} = require("mongodb");
async function connect(){
  if(global.db) return global.db;
  const conn = await MongoClient.connect("mongodb://localhost:27017/", { useUnifiedTopology: true });
  if(!conn) return new Error("Can't connect");
  global.db = await conn.db("workshop");
  return global.db;
}


//5.4
const express = require('express');
const app = express();         
const bodyParser = require('body-parser');
const port = 3000; //porta padrão

//5.5
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//5.6
//definindo as rotas
const router = express.Router()
router.get('/', (req, res) => res.json({ message: 'Funcionando!' }))
app.use('/', router)

//5.7
//inicia o servidor
app.listen(port)
console.log('API funcionando!')

//5.8
node app

//5.9
router.get('/clientes', async function(req, res, next) {
    try{
      const db = await connect();
      res.json(await db.collection("customers").find().toArray());
    }
    catch(ex){
      console.log(ex);
      res.status(400).json({erro: `${ex}`});
    }
})

//5.10
const {MongoClient, ObjectId} = require("mongodb");

module.exports = {findCustomers, findCustomer}

//5.11
router.get('/clientes/:id?', async function(req, res, next) {
    try{
      const db = await connect();
      if(req.params.id)
        res.json(await db.collection("customers").findOne({_id: new ObjectId(req.params.id)}));
      else
        res.json(await db.collection("customers").find().toArray());
    }
    catch(ex){
      console.log(ex);
      res.status(400).json({erro: `${ex}`});
    }
})

//5.12
router.post('/clientes', async function(req, res, next){
    try{
      const customer = req.body;
      const db = await connect();
      res.json(await db.collection("customers").insert(customer));
    }
    catch(ex){
      console.log(ex);
      res.status(400).json({erro: `${ex}`});
    }
})

//5.13
router.put('/clientes/:id', async function(req, res, next){
    try{
      const customer = req.body;
      const db = await connect();
      res.json(await db.collection("customers").update({_id: new ObjectId(req.params.id)}, customer));
    }
    catch(ex){
      console.log(ex);
      res.status(400).json({erro: `${ex}`});
    }
})

//5.14
router.patch('/clientes/:id', async function(req, res, next){
    try{
      const customer = req.body;
      const db = await connect();
      const id = {_id: new ObjectId(req.params.id)};
      res.json(await db.collection("customers").updateOne(id, {$set: customer}));
    }
    catch(ex){
      console.log(ex);
      res.status(400).json({erro: `${ex}`});
    }
})

//5.15
router.delete('/clientes/:id', async function(req, res, next){
    try{
      const db = await connect();
      res.json(await db.collection("customers").deleteOne({_id: new ObjectId(req.params.id)}));
    }
    catch(ex){
      console.log(ex);
      res.status(400).json({erro: `${ex}`});
    }
})