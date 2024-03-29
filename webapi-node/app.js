const { MongoClient, ObjectId } = require("mongodb");

async function connect() {
  if (global.db) return global.db;
  const client = new MongoClient("mongodb://127.0.0.1:27017/");
  await client.connect();

  global.db = await conn.db("workshop");
  return global.db;
}

const express = require('express');
const app = express();
const port = 3000; //porta padrão

app.use(express.json());

//definindo as rotas
const router = express.Router();
router.get('/', (req, res) => res.json({ message: 'Funcionando!' }));

/* GET all customers */
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

/* POST new customer */
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

/* PUT old customer */
router.put('/clientes/:id', async (req, res, next) => {
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

/* PATCH old customer */
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

/* DELETE customer */
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

app.use('/', router);

//inicia o servidor
app.listen(port)
console.log('API funcionando!')
