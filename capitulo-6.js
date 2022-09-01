//6.1
C:\mongodb\bin> db.clientes.renameCollection("clientes")

//6.2
db.clientes.updateOne({_id: ObjectId("123abc")}, {$set: {novoCampo: valor}})

//6.3
db.clientes.updateOne({_id: ObjectId("123abc")}, {$unset: {campovelho}})

//6.4
db.clientes.updateMany({}, {$rename: {nomevelho: nomenovo}})

//6.5
db.customers.find().explain("executionStats")

//6.6
db.createUser({user: "admin", pwd: "senha", roles: ["readWrite", "dbAdmin"]})

//6.7
C:\mongo\bin> mongod --dbPath caminhoDoSeuBanco --auth

//6.8
C:\mongo\bin> mongosh admin -u <usuario> -p <senha>

//6.9
db.changeUserPassword("usuario", "novaSenha")

//6.10
db.dropUser("usuario")

//6.11
C:\mongodb\bin> mongodump --out "C:\mongodb\backup"

//6.12
C:\mongodb\bin> mongodump -h tatooine.mongodb.umbler.com:27017 --out "C:\mongodb\backup"

//6.13
C:\mongodb\bin> mongodump -h tatooine.mongodb.umbler.com:27017 -u luiztools -p mudar123 --out "C:\mongodb\backup"

//6.14
C:\mongodb\bin> mongorestore -h tatooine.mongodb.umbler.com:27017 -u luiztools -p mudar123 "C:\mongodb\backup\database"

//6.15
C:\mongo\bin> mongoimport -h server:port -u user -p password -d databaseName -c collectionName --type csv --file caminhoDoArquivo.csv --headerline

//6.16
iconv -f ISO-8859-1 -t utf-8 origem.csv > destino.csv

//6.17
mongod --dbpath /replication/data/ -port 27018 --replSet "rs0"

//6.18
mongod --dbpath /replication/data2/ -port 27019 --replSet "rs0"

//6.19
mongosh -port 27018

//6.20
rs.initiate( { 
_id: "rs0", 
version: 1, 
members: [ { _id: 0, host : "localhost:27018" }, { _id: 1, host : "localhost:27019" } ]
 } )


//6.21
rs.slaveOk()

//6.22
mongodb://localhost:27018,localhost:27019/?replicaSet=rs0

//6.23
mongodb://user:password@localhost:27018,localhost:27019/?replicaSet=rs0&authenticationDatabase=myDb

//6.24
openssl rand -base64 756 > caminho-pasta/key 
chmod 400 caminho-pasta/key

//6.25
mongod --dbpath /replication/data2/ -port 27019 --replSet "rs0" --keyFile caminho-pasta/key --auth
