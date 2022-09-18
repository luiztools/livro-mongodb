//3.1
db.customers.insertOne({ nome: "Luiz", idade: 29 })

//3.2
custArray = [{ nome : "Fernando", idade : 29 }, { nome : "Teste", uf : "RS" }]
db.customers.insertMany(custArray)

//3.3
db.customers.find().pretty()

//3.4
db.customers.find({uf: "RS"})

//3.5
db. customers.find({uf: "RS", nome: "Luiz"})

//3.6
db.customers.find({nome: { $regex: /a/i }})

//3.7
db.customers.find({idade: {$gte: 18}})

//3.8
db.customers.find({nome: "Luiz", idade: {$gte: 18}})

//3.9
db.customers.find({nome: { $regex: /a/i }, idade: {$gte: 18}})

//3.10
db.customers.find({$or: [{idade: 29}, {nome: "Teste"}]})

//3.11
db.customers.find().skip(1).limit(10)

//3.12
db.customers.find().sort({idade: 1})

//3.13
db.customers.count()

//3.14
db.customers.find({nome:"Luiz"}).count()

//3.15
db.customers.find({nome: "Luiz"}, {idade: 1})

//3.16
db.customers.replaceOne({nome: "Luiz"}, {nome: "Luiz", idade: 32, uf: "RS"})

//3.17
db.customers.updateOne({_id: ObjectId("59ab46e433959e2724be2cbd")}, {$set: {idade: 28}})

//3.18
db.customers.updateOne({nome: "LuizTools"}, {$set: {nome: "LuizTools", uf: "RS"} }, {upsert: true})

//3.19
db.customers.deleteMany({nome: "Luiz"})

//3.20
db.customers.deleteOne({_id: ObjectId("abc123def456ghi789")})
