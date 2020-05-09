//5.1
npm init

//5.2
npm install -S express mongodb body-parser

//5.3
const mongoClient = require("mongodb").MongoClient
mongoClient.connect('mongodb://localhost/workshop')
	.then(conn => global.conn = conn.db("workshop"))
	.catch(err => console.log(err))

module.export = {}

//5.4
global.db = require('./db')
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
function findCustomers(callback){
	global.conn.collection('customers').find().toArray(callback)
}

module.exports = {findCustomers}

//5.10
// GET /clientes
router.get('/clientes', (req, res) => global.db.findCustomers((err, docs) => {
    if(err) res.status(500).json(err)
    else res.json(docs)
}))

//5.11
const ObjectId = require("mongodb").ObjectId
function findCustomer(id, callback){
	global.conn.collection('customers').findOne(new ObjectId(id), callback)
}

module.exports = {findCustomers, findCustomer}

//5.12
// GET /clientes/{id}
router.get('/clientes/:id', (req, res) => global.db.findCustomer(req.params.id, (err, doc) => {
    if(err) res.status(500).json(err)
    else res.json(doc)
}))

//5.13
function insertCustomer(customer, callback){
	global.conn.collection('customers').insert(customer, callback)
}

module.exports = {findCustomers, findCustomer, insertCustomer}

//5.14
// POST /clientes
router.post('/clientes', (req, res) => {
    const customer = req.body
    global.db.insertCustomer(customer, (err, result) => {
        if(err) res.status(500).json(err)
        else res.json({ message: 'Cliente cadastrado com sucesso!'})
    })
})

//5.15
curl -X POST -d "{'nome':'Curl', 'idade': 11, 'uf': 'RJ'}" http://localhost:3000/clientes

//5.16
function updateCustomer(id, customer, callback){
	global.conn.collection('customers').update({_id: new ObjectId(id)}, customer, callback)
}

module.exports = {findCustomers, findCustomer, insertCustomer, updateCustomer}

//5.17
// PUT /clientes/{id}
router.put('/clientes/:id', (req, res) => {
    const id = req.params.id
    const customer = req.body
    global.db.updateCustomer(id, customer, (err, result) => {
        if(err) res.status(500).json(err)
        else res.json({ message: 'Cliente atualizado com sucesso!'})
    })
})

//5.18
curl -X PUT -d "{'nome':'Postman', 'idade': 20, 'uf': 'SP'}" http://localhost:3000/clientes/59ac8350e07d4f10cf6a74f6

//5.19
function patchCustomer(id, updates, callback){
	global.conn.collection('customers').update({_id: new ObjectId(id)}, { $set: updates }, callback)
}

module.exports = {findCustomers, findCustomer, insertCustomer, updateCustomer, patchCustomer}

//5.20
// PATCH /clientes/{id}
router.patch('/clientes/:id', (req, res) => {
    const id = req.params.id
    const updates = req.body
    global.db.patchCustomer(id, updates, (err, result) => {
        if(err) res.status(500).json(err)
        else res.json({ message: 'Cliente atualizado com sucesso!'})
    })
})

//5.21
curl -X PATCH -d "{'nome':'POSTMAN'}" http://localhost:3000/clientes/59ac8350e07d4f10cf6a74f6

//5.22
function deleteCustomer(id, callback){
	global.conn.collection('customers').deleteOne({_id: new ObjectId(id)}, callback)
}

module.exports = {findCustomers, findCustomer, insertCustomer, updateCustomer, patchCustomer, deleteCustomer}


//5.23
// DELETE /clientes/{id}
router.delete('/clientes/:id', (req, res) => {
    const id = req.params.id
    global.db.deleteCustomer(id, (err, result) => {
        if(err) res.status(500).json(err)
        else res.json({ message: 'Cliente excluído com sucesso!'})
    })
})

//5.24
curl -X DELETE http://localhost:3000/clientes/59ac8350e07d4f10cf6a74f6

//5.25
{
   "_id": ObjectId("123-abc-456-def"),
   "Nome": "Luiz Fernando Duarte Júnior",
   "Tags": ["LUIZ", "FERNANDO", "DUARTE", "JUNIOR"],
   ...
}

//5.26
custArray = [{"Nome":"Luiz Júnior", "Profissao":"Professor", "Tags":["LUIZ","JUNIOR","PROFESSOR"]},{"Nome":"Luiz Duarte", "Profissao":"Blogueiro", "tags":["LUIZ","DUARTE","BLOGUEIRO"]}]
db.Customer.insert(custArray);

//5.27
db.Customer.createIndex({ "Tags": 1 });

//5.28
db.Customer.find({"Tags": { $in: ["LUIZ"] }}).pretty()

//5.29
db.Customer.find({"Tags": { $all: ["LUIZ","JUNIOR"] }}).pretty()

//5.30
using System;
using System.Collections.Generic;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

public class Customer
{
    [BsonId]
    public ObjectId Id { get; set; }
        
    public string Nome { get; set; }

    public string Profissao { get; set; }
        
    public List<string> Tags { get; set; }
}


//5.31
public class DataAccess
{
    MongoClient _client;
    IMongoDatabase _db;

    public DataAccess()
    {
        _client = new MongoClient("mongodb://localhost:27017");
        _db = _client.GetDatabase("searchengine");
    }

    public long CountCustomers(){
        return _db.GetCollection<Customer>(typeof(Customer).Name).Count(new FilterDefinitionBuilder<Customer>().Empty);
    }
}

//5.32
<ul class="nav navbar-nav">
   <li><a asp-area="" asp-controller="Home" asp-action="Index">Home</a></li>
   <li><a asp-area="" asp-controller="Home" asp-action="Search">Search</a></li>
   <li><a asp-area="" asp-controller="Home" asp-action="About">About</a></li>
   <li><a asp-area="" asp-controller="Home" asp-action="Contact">Contact</a></li>
</ul>

//5.33
// HomeController.cs
public IActionResult Search()
{
   ViewData["Message"] = "Search page.";
   ViewData["Count"] = new DataAccess().CountCustomers();
   return View();
}

//5.34
@{
    ViewData["Title"] = "Search Page";
}

<div class="row" style="margin-top: 20px">
   <form method="GET" action="/Home/Search">
      <p><label>Pesquisa: <input type="text" name="q" /></label></p>
      <p><input type="submit" value="Pesquisar" class="btn btn-primary" /></p>
      <p>@Html.Raw(ViewData["Count"]) clientes cadastrados!</p>
   </form>
</div>

//5.35
@model IEnumerable<Buscador.Models.Customer>

//5.36
<hr />   
@if(Model != null) 
{ 
   <ul>
   @foreach(var item in Model)
   {
      <li>@Html.DisplayFor(modelItem => item.Nome)</li>
   }
   </ul>
}

//5.37
public IEnumerable<Customer> GetCustomers(string query)
{
   var tags = query.ToUpper().Split(new string[] { " " }, StringSplitOptions.RemoveEmptyEntries).ToList();
   var filter = Builders<Customer>.Filter.All(c => c.Tags, tags);
   return _db.GetCollection<Customer>(typeof(Customer).Name).Find(filter).ToList();
}

//5.38
public IActionResult Search(String q)
{
   ViewData["Message"] = "Search page.";
   var da = new DataAccess();
   ViewData["Count"] = da.CountCustomers();

   if(!String.IsNullOrEmpty(q))
   {
      return View(da.GetCustomers(q));
   }

   return View();
}

//5.39
git clone https://github.com/mongodb/mongo-php-driver.git
cd mongo-php-driver
git submodule sync && git submodule update –init
phpize
./configure
make 
sudo make install

//5.40
extension=mongodb.so

//5.41
$mongo = new MongoDB\Driver\Manager( 'sua string de conexão’);
if( $mongo )
   echo “Funcionou!";
else
   echo “Não funcionou!";
   
//5.42
clienteArray = [{“nome”:”Luiz Júnior”, “profissao”:”Professor”},{“nome”:”Luiz Duarte”, “profissao”:”Blogueiro”}]
db.clientes.insert(clienteArray);

//5.43
<?php
try {
    $mongo = new MongoDB\Driver\Manager( ‘string de conexao’ );
    $query = new MongoDB\Driver\Query([], [‘sort’ => [ ‘nome’ => 1], ‘limit’ => 5]);
    $rows = $mongo->executeQuery(“banco.clientes”, $query);    
    foreach ($rows as $row) {
        echo “$row->nome : $row->profissao\n”;
    }
} catch (MongoDB\Driver\Exception\Exception $e) {
   $filename = basename(__FILE__);
   echo “Erro no arquivo $filename.\n”;
   echo “Exception:”, $e->getMessage(), “\n”;
   echo “Arquivo:”, $e->getFile(), “\n”;
   echo “Linha:”, $e->getLine(), “\n”;    
}
?>

//5.44
$mongo = new MongoDB\Driver\Manager( ‘string de conexao’ );

//5.45
$query = new MongoDB\Driver\Query([], [‘sort’ => [ ‘nome’ => 1], ‘limit’ => 5]);

//5.46
$rows = $mongo->executeQuery(“banco.clientes”, $query);

//5.47
foreach ($rows as $row) {
    echo “$row->nome : $row->profissao\n”;
}

//5.48
<html>
<head></head>
<body>
    <form method=”POST” action=”cadastro.php”>
    	<p>
<label for=”txtNome”>Nome: <input type=”text” id=”txtNome” name=”txtNome” />
</p>
    	<p>
<label for=”txtProfissao”>Profissão: <input type=”text” id=”txtProfissao” name=”txtProfissao” /></label>
</p>
    	<input type=”submit” value=”Salvar” />
    </form>
</body>
</html>

//5.49
<?php
if ($_SERVER[‘REQUEST_METHOD’] === ‘POST’) {
try {        
    $mongo = new MongoDB\Driver\Manager( ‘string de conexao’ );   
    $bulk = new MongoDB\Driver\BulkWrite;           

    $doc = [‘_id’ => new MongoDB\BSON\ObjectID, ‘nome’ => $_POST[“txtNome”], ‘profissao’ => $_POST[“txtProfissao”]];       

    $bulk->insert($doc);$mongo->executeBulkWrite(‘banco.clientes’, $bulk);
    header(‘Location: listagem.php’);    die();
} catch (MongoDB\Driver\Exception\Exception $e) {
     $filename = basename(__FILE__);        
    echo “Erro no arquivo $filename.\n”;    
    echo “Exception:”, $e->getMessage(), “\n”;    
    echo “Arquivo:”, $e->getFile(), “\n”;
    echo “Linha:”, $e->getLine(), “\n”;    
}
}
?>

//5.50
if ($_SERVER[‘REQUEST_METHOD’] === ‘POST’) {

//5.51
$bulk = new MongoDB\Driver\BulkWrite;

//5.52
$doc = [‘_id’ => new MongoDB\BSON\ObjectID, ‘nome’ => $_POST[“txtNome”], ‘profissao’ => $_POST[“txtProfissao”]];

//5.53
$bulk->insert($doc);
$mongo->executeBulkWrite(‘banco.clientes’, $bulk);

//5.54
$mongo = new MongoDB\Driver\Manager( ‘string de conexao’ );
$bulk = new MongoDB\Driver\BulkWrite;    

$doc = [‘_id’ => new MongoDB\BSON\ObjectID, ‘nome’ => $_POST[“txtNome”], ‘profissao’ => $_POST[“txtProfissao”]];
$bulk->insert($doc);

$mongo->executeBulkWrite(‘banco.clientes’, $bulk);

//5.55
{“_id”:”abc-123-def-456”, “nome”: “Luiz Júnior”, “profissao”:”Professor”}

//5.56
$mongo = new MongoDB\Driver\Manager( ‘string de conexao’ );
$bulk = new MongoDB\Driver\BulkWrite;
$filter = [‘_id’ => “abc-123-def-456”];    

$doc = [‘_id’ => “abc-123-def-456”, ‘nome’ => “Luiz Fernando”, ‘profissao’ => “Professor”];
$bulk->update($filter, $doc, [‘multi’ => false, ‘upsert’ => false]);

$mongo->executeBulkWrite(‘banco.clientes’, $bulk);

//5.57
$mongo = new MongoDB\Driver\Manager( ‘string de conexao’ );
$bulk = new MongoDB\Driver\BulkWrite;    

$filter = [‘_id’ => “abc-123-def-456”];
$bulk->delete($filter);

$mongo->executeBulkWrite(‘banco.clientes’, $bulk);
