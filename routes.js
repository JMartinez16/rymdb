'use strict'
const axios = require('axios')

module.exports = function (app, opts) {
  // Setup routes, middleware, and handlers
  app.get('/', (req, res) => {
    console.log('db')
    axios.get('https://rickandmortyapi.com/api/location?page=1')
      .then(db => {
        //db.data.results.map
        res.send(db.data.results)
      })
  })


  app.get('/search', (req, res) => {
    console.log('search')
    axios.get('https://rickandmortyapi.com/api/location?page=1')
      .then(db => {
        console.log(req.body.id)
        let busqueda_mundo = db.data.results.filter(mundo => req.body.id == mundo.id)
        res.send(busqueda_mundo)

      })
  })

  app.get('/n', (req, res) => {
    console.log('n')
    axios.get('https://rickandmortyapi.com/api/location?page=1')
      .then(db => {
        let chars = db.data.results.map(chars_mundo => {
          return chars_mundo.residents
        })

        res.send(chars)

      })
  })

  app.get('/chars', (req, res, next) => {
    console.log('chars')
    axios.get('https://rickandmortyapi.com/api/character/?page=1')
      .then(db => {
        let nombre = db.data.results.map(nombre => {
          return nombre.name
        })
        res.send(nombre)

      })
  })

  app.get('/estado',(req, res)=> {
    axios.get('https://rickandmortyapi.com/api/character/?page=1')
    .then(db=> {
      let estado = db.data.results.map(char=>{
        return char.status
      })
      res.send(estado)
    })
  
  })

  app.get('/dead',(req, res)=> {
    axios.get('https://rickandmortyapi.com/api/character/?page=1')
    .then(db=> {
      let zombies = db.data.results.filter(char=> char.status.includes('Dead')).map((char)=>{
        return char.status

      })
      res.send(zombies)
    })
  
  })

  app.get('/alive',(req,res)=> {
    axios.get('https://rickandmortyapi.com/api/character/?page=1')
    .then(db=> {
      const dead =db.data.results.map(char=>{
        return char.status
      })
      res.send(dead)
    })
    
  })
 

  app.get('/d',  (req, res, next) => {
    var directions = []
    axios.get(`https://rickandmortyapi.com/api/character/?page=1`)
      .then(db => {
        let maxPages = db.data.info.pages

        for (let pages = 1; pages <= maxPages; pages++) {
           directions = [...directions, `https://rickandmortyapi.com/api/character/?page=${pages}`]
        }
        Promise.all(directions.map(async (direction) => {
          return await axios.get(direction)
        })
        ).then(response => {
          let char_pages =[]
          response.forEach(pages=> {
            char_pages =[...char_pages, ...pages.data.results]
          })
          res.json(char_pages.map(char =>{
            return char.name
          }))
        }).catch(error=>res.json(error))
      }).catch(error=>console.log(error))
  })

 




  app.get('characters/', (req, res, next) => {
    // mostrar todos los personajes de la pagina
  })



}



