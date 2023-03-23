const PORT = 8000
const express = require('express')
const {MongoClient} = require('mongodb')
const {v4: uuidv4} = require('uuid')
const jwt = require('jsonwebtoken')
const cors = require('cors')
const bcrypt = require('bcrypt')
require('dotenv').config()

const uri = process.env.URI

const app = express()
app.use(cors())
app.use(express.json())

// Default
app.get('/', (req, res) => {
    res.json('Hello to my app')
})

app.listen(PORT, () => console.log('server running on PORT ' + PORT))
