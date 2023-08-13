//5.1
npm init - y

//5.2
npm install express mongodb

//5.3
const { MongoClient } = require("mongodb");
async function connect() {
  if (global.db) return global.db;
  const client = new MongoClient("mongodb://127.0.0.1:27017/");
  await client.connect();

  global.db = await client.db("workshop");
  return global.db;
}


//5.4
const express = require('express');
const app = express();
const port = 3000; //porta padrão

//5.5
app.use(express.json());

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
router.get('/clientes', async (req, res, next) => {
  try {
    const db = await connect();
    res.json(await db.collection("customers").find().toArray());
  }
  catch (ex) {
    console.log(ex);
    res.status(400).json({ erro: `${ex}` });
  }
})

//5.10
const { MongoClient, ObjectId } = require("mongodb");

module.exports = { findCustomers, findCustomer }

//5.11
router.get('/clientes/:id?', async (req, res, next) => {
  try {
    const db = await connect();
    if (req.params.id)
      res.json(await db.collection("customers").findOne({ _id: new ObjectId(req.params.id) }));
    else
      res.json(await db.collection("customers").find().toArray());
  }
  catch (ex) {
    console.log(ex);
    res.status(400).json({ erro: `${ex}` });
  }
})

//5.12
router.post('/clientes', async (req, res, next) => {
  try {
    const customer = req.body;
    const db = await connect();
    res.json(await db.collection("customers").insertOne(customer));
  }
  catch (ex) {
    console.log(ex);
    res.status(400).json({ erro: `${ex}` });
  }
})

//5.13
router.put('/clientes/:id', async (req, res, next) => {
  try {
    const customer = req.body;
    const db = await connect();
    res.json(await db.collection("customers").updateOne({ _id: new ObjectId(req.params.id) }, { $set: customer }));
  }
  catch (ex) {
    console.log(ex);
    res.status(400).json({ erro: `${ex}` });
  }
})

//5.14
router.patch('/clientes/:id', async (req, res, next) => {
  try {
    const customer = req.body;
    const db = await connect();
    const id = { _id: new ObjectId(req.params.id) };
    res.json(await db.collection("customers").updateOne(id, { $set: customer }));
  }
  catch (ex) {
    console.log(ex);
    res.status(400).json({ erro: `${ex}` });
  }
})

//5.15
router.delete('/clientes/:id', async (req, res, next) => {
  try {
    const db = await connect();
    res.json(await db.collection("customers").deleteOne({ _id: new ObjectId(req.params.id) }));
  }
  catch (ex) {
    console.log(ex);
    res.status(400).json({ erro: `${ex}` });
  }
})
