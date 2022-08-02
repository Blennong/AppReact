const express = require('express')
const cors = require('cors')
const bodyParser = require("body-parser")

require('dotenv').config()

const app = express()

app.use(cors())
app.use(bodyParser.json({limit: '50mb'}))
app.use(express.static('public'))

/**
 * DATABASE CONNECTION
 */

const { Sequelize } = require('sequelize')
const db = new Sequelize(
  process.env.DBNAME,
  process.env.DBUSERNAME,
  process.env.DBPASSWORD,
  {
    host: process.env.DBHOST,
    port: process.env.DBPORT,
    dialect: 'postgres',
    operatorsAliases: false,
    // pool: {
    //   max: dbConfig.pool.max,
    //   min: dbConfig.pool.min,
    //   acquire: dbConfig.pool.acquire,
    //   idle: dbConfig.pool.idle
    // }
  }
)

const PostModel = require('./models/posts.js')
const Post = PostModel(db)

try {
  db.authenticate()
  console.log("Conexión a base de datos establecida correctamente.")
  db.sync()
} catch (error) {
  console.error("No se pudo conectar a base de datos", error)
}

/**
 * ROUTES / CONTROLLERS
 */

const router = require('express').Router()
router.get('/', (req, res) => {
  const nombre = req.query.nombre
  var condition = nombre ? { nombre: { [Sequelize.Op.iLike]: `%${nombre}%` } } : null

  Post.findAll({
    where: condition
  }).then(data => {
    res.send(data)
  }).catch(err => {
    res.status(500).send({
      message: err.message || "Some error occurred while retrieving Post."
    })
  })
})

router.post('/', (req, res) => {
  Post.create({
    nombre: req.body.nombre,
    descripcion: req.body.descripcion,
  }).then(data => {
    res.send(data)
  }).catch(err => {
    res.status(500).send({
      message: err.message || "Some error occurred while creating Post."
    })
  })
})

router.delete('/:id', (req, res) => {
  const id = req.params.id

  Post.destroy({
    where: { id: id }
  }).then(num => {
    if (num == 1) {
      res.send({
        message: "Post was deleted successfully!"
      })
    } else {
      res.send({
        message: `Cannot delete Post with id=${id}. Maybe Post was not found!`
      })
    }
  }).catch(err => {
    res.status(500).send({
      message: "Could not delete Post with id=" + id
    })
  })
})

app.use('/api/post', router)
app.listen(process.env.PORT, () => {
  console.log(`Servidor corriendo en puerto ${ process.env.PORT }`)
})
