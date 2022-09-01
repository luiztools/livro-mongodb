//4.1
{
   _id: ObjectId("123abc"),
   titulo: "Tutorial MongoDB",
   dataPublicacao: new Date("2016-05-18T16:00:00Z"),
   conteudo: "Be-a-bá do MongoDB",
   idAutor: ObjectId("456def"),
   status: 1,
   url: "http://www.luiztools.com.br/post/1"
}

//4.2
{
   _id: ObjectId("123abc"),
   titulo: "Tutorial MongoDB",
   dataPublicacao: new Date("2016-05-18T16:00:00Z"),
   conteudo: "Be-a-bá do MongoDB",
   autor: {
      _id: ObjectId("456def"),
      nome: "Luiz"
   },
   status: 1,
   url: "http://www.luiztools.com.br/post/1"
}

//4.3
{
   _id: ObjectId("456def"),
   nome: "Luiz Duarte",
   bio: "Empreendedor, professor, etc",
   foto: "1.jpg",
   usuario: "luiz",
   senha: "ds6dsv8ds5v76sd5v67d5v6"
}

//4.4
{
   _id: ObjectId("123abc"),
   titulo: "Tutorial MongoDB",
   dataPublicacao: new Date("2016-05-18T16:00:00Z"),
   conteudo: "Be-a-bá do MongoDB",
   autor: {
      _id: ObjectId("456def"),
      nome: "Luiz"
   },
   status: 1,
   url: "http://www.luiztools.com.br/post/1",
   categorias: [{
      _id: ObjectId("789ghi"),
      nome: "cat1"
   }],
   tags: ["tag1", "tag2"]
}

//4.5
{
   _id: ObjectId("789ghi"),
   nome: "cat1",
   descricao: "Categoria bacana"
}

//4.6
{
   _id: ObjectId("123abc"),
   titulo: "Tutorial MongoDB",
   dataPublicacao: new Date("2017-10-18T16:00:00Z"),
   conteudo: "Be-a-bá do MongoDB",
   autor: {
      _id: ObjectId("456def"),
      nome: "Luiz"
   },
   status: 1,
   url: "http://www.luiztools.com.br/post/1",
   categorias: [{
      _id: ObjectId("789ghi"),
      nome: "cat1"
   }],
   tags: ["tag1", "tag2"],
   comentarios: [{
      _id: ObjectId("012jkl"),
      nome: "Hater",
      texto: "Não gosto do seu blog",
      data: new Date("2017-10-18T18:00:00Z")
   }]
}

//4.7
db.artigos.findOne({url: 'http://www.luiztools.com.br/post/1'});

//4.8
db.artigos.createIndex({url: 1});

//4.9
{
   _id: ObjectId("123abc"),
   titulo: "Artigo 1",
   autor: {
      _id: ObjectId("456def"),
      nome: "Luiz"
   }
   tags: ["NodeJs", "MongoDB"]
}

//4.10
db.artigos.insertOne({ titulo: "Artigo 1", autor: { _id: ObjectId("456def"), nome: "Luiz" }, tags: null })

//4.11
db.artigos.find({"autor.nome": "Luiz"})

//4.12
db.artigos.replaceOne({_id: ObjectId("456def")},{ titulo: "Artigo 1", autor: { nome: "Luiz" }, tags: null })

//4.13
db.artigos.updateOne({"autor.nome":"Luiz"},{$set: {"autor.nome": "Luiz Fernando"}})

//4.14
db.artigos.insertOne({ titulo: "Artigo 1", autor: { nome: "Luiz" }, tags: ["NodeJs", "MongoDB"] })

//4.15
db.artigos.insertOne({ titulo: "Artigo 1", autor: { nome: "Luiz" }, tags: ["NodeJs", "MongoDB"], categorias: [{_id:ObjectId("abc123"), nome: "Desenvolvimento"}] })

//4.16
{
   _id: ObjectId("123abc"),
   titulo: "Artigo 1",
   tags: ["NodeJs", "MongoDB"],
   categorias: [{_id: 1, nome: "Desenvolvimento"}, {_id:2, nome: "Banco de Dados"}]
},
{
   _id: ObjectId("456def"),
   titulo: "Artigo 2",
   tags: ["NodeJs"],
   categorias: [{_id: 1, nome: "Desenvolvimento"}]
},
{
   _id: ObjectId("789ghi"),
   titulo: "Artigo 3",
   tags: ["MongoDB"],
   categorias: [{_id:2, nome: "Banco de Dados"}]
}

//4.17
db.artigos.find({tags: {$all: ["NodeJs", "MongoDB"]}});

//4.18
db.Artigo.find({tags: {$in: ["NodeJs", "MongoDB"]}});

//4.19
db.artigos.find({categorias: {nome:"Desenvolvimento"}})

//4.20
//remove a string tag1 do array tags
db.artigos.updateOne({_id:1}, {$pull: {tags: "tag1"}})

//adiciona a string tag1 no array tags
db.artigos.updateOne({_id:1}, {$push: {tags: "tag1"}})
