const PORT = 8000
const express = require('express')
const { MongoClient } = require('mongodb')
const { v4: uuidv4 } = require('uuid')
const jwt = require('jsonwebtoken')
const cors = require('cors')
const bcrypt = require('bcrypt')

const uri = process.env.URI

const app = express()
app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
  res.json('hello to my app')
})

// Sign up to the Database
app.post('/signup', async (req, res) => {
  const client = new MongoClient(uri)
  const { email, password } = req.body

  const generatedUserId = uuidv4()
  const hashedPassword = await bcrypt.hash(password, 10)

  try {
    await client.connect()
    const database = client.db('app-data')
    const users = database.collection('users')

    const existingUser = await users.findOne({ email })

    if (existingUser) {
      return res.status(409).send('User already exists. Please login')
    }

    const sanitizedEmail = email.toLowerCase()

    const data = {
      user_id: generatedUserId,
      email: sanitizedEmail,
      hashed_password: hashedPassword,
    }

    const insertedUser = await users.insertOne(data)

    const token = jwt.sign(insertedUser, sanitizedEmail, {
      expiresIn: 60 * 24,
    })
    res.status(201).json({ token, userId: generatedUserId })
  } catch (err) {
    console.log(err)
  } finally {
    await client.close()
  }
})

// Log in to the Database
app.post('/login', async (req, res) => {
  const client = new MongoClient(uri)
  const { email, password } = req.body

  try {
    await client.connect()
    const database = client.db('app-data')
    const users = database.collection('users')

    const user = await users.findOne({ email })

    const correctPassword = await bcrypt.compare(password, user.hashed_password)

    if (user && correctPassword) {
      const token = jwt.sign(user, email, {
        expiresIn: 60 * 24,
      })
      res.status(201).json({ token, userId: user.user_id })
    }

    res.status(400).json('Invalid Credentials')
  } catch (err) {
    console.log(err)
  } finally {
    await client.close()
  }
})

// Get individual user
app.get('/user', async (req, res) => {
  const client = new MongoClient(uri)
  const userId = req.query.userId

  try {
    await client.connect()
    const database = client.db('app-data')
    const users = database.collection('users')

    const query = { user_id: userId }
    const user = await users.findOne(query)
    res.send(user)
  } finally {
    await client.close()
  }
})

// Update User with a match
app.put('/addmatch', async (req, res) => {
  const client = new MongoClient(uri)
  const { userId, matchedUserId } = req.body

  try {
    await client.connect()
    const database = client.db('app-data')
    const users = database.collection('users')

    const query = { user_id: userId }
    const updateDocument = {
      $push: { matches: { user_id: matchedUserId } },
    }
    const user = await users.updateOne(query, updateDocument)
    res.send(user)
  } finally {
    await client.close()
  }
})

// Get all Users by userIds in the Database
app.get('/users', async (req, res) => {
  const client = new MongoClient(uri)
  const userIds = JSON.parse(req.query.userIds)

  try {
    await client.connect()
    const database = client.db('app-data')
    const users = database.collection('users')

    const pipeline = [
      {
        $match: {
          user_id: {
            $in: userIds,
          },
        },
      },
    ]

    const foundUsers = await users.aggregate(pipeline).toArray()

    res.json(foundUsers)
  } finally {
    await client.close()
  }
})

// Get all the Gendered Users in the Database
app.get('/gendered-users', async (req, res) => {
  const client = new MongoClient(uri)
  const gender = req.query.gender

  try {
    await client.connect()
    const database = client.db('app-data')
    const users = database.collection('users')
    const query = { gender_identity: { $eq: gender } }
    const foundUsers = await users.find(query).toArray()
    res.json(foundUsers)
  } finally {
    await client.close()
  }
})

// Update a User in the Database
app.put('/user', async (req, res) => {
  const client = new MongoClient(uri)
  const formData = req.body.formData

  try {
    await client.connect()
    const database = client.db('app-data')
    const users = database.collection('users')

    const query = { user_id: formData.user_id }

    const updateDocument = {
      $set: {
        first_name: formData.first_name,
        dob_day: formData.dob_day,
        dob_month: formData.dob_month,
        dob_year: formData.dob_year,
        show_gender: formData.show_gender,
        gender_identity: formData.gender_identity,
        gender_interest: formData.gender_interest,
        url: formData.url,
        about: formData.about,
        matches: formData.matches,
      },
    }

    const insertedUser = await users.updateOne(query, updateDocument)

    res.json(insertedUser)
  } finally {
    await client.close()
  }
})

// Get Messages by from_userId and to_userId
app.get('/messages', async (req, res) => {
  const { userId, correspondingUserId } = req.query
  const client = new MongoClient(uri)

  try {
    await client.connect()
    const database = client.db('app-data')
    const messages = database.collection('messages')

    const query = {
      from_userId: userId,
      to_userId: correspondingUserId,
    }
    const foundMessages = await messages.find(query).toArray()
    res.send(foundMessages)
  } finally {
    await client.close()
  }
})

// Add a Message to our Database
app.post('/message', async (req, res) => {
  const client = new MongoClient(uri)
  const message = req.body.message

  try {
    await client.connect()
    const database = client.db('app-data')
    const messages = database.collection('messages')

    const insertedMessage = await messages.insertOne(message)
    res.send(insertedMessage)
  } finally {
    await client.close()
  }
})

// Delete a User from Database
app.delete('/user', async (req, res) => {
  const client = new MongoClient(uri)
  const userId = req.query.userId
  try {
    await client.connect()
    const database = client.db('app-data')
    const users = database.collection('users')

    const query = { user_id: userId }
    const deleteResult = await users.deleteOne(query)
    console.log(deleteResult + 'has been deleted')
    res.send(deleteResult)
  } finally {
    await client.close()
  }
})

/*---Report Route---*/
// Create report:
app.post('/report', async (req, res) => {
  const client = new MongoClient(uri)
  const {
    userWantsReportId,
    userGetsReportedId,
    category,
    explanation,
    evidenceURL,
  } = req.body
  try {
    await client.connect()
    const database = client.db('app-data')
    const users = database.collection('users')
    const reports = database.collection('reports')
    const generatedReportId = uuidv4()
    // console.log('userGetsReportedId:', typeof userGetsReportedId)

    const userGetsReported = await users.findOne({
      user_id: userGetsReportedId,
    })
    const userWantsReport = await users.findOne({ user_id: userWantsReportId })

    // console.log('userGetsReported:', userGetsReported)
    // console.log('personComplained:', personComplained)

    if (!userGetsReported || !userWantsReport) {
      return res.status(404).send('Can not find this user account')
    }

    const data = {
      reportId: generatedReportId,
      userGetsReportedId: userGetsReportedId,
      userGetsReported_url: userGetsReported?.url,
      userGetsReported_email: userGetsReported?.email,
      userGetsReported_first_name: userGetsReported?.first_name,
      category: category,
      explanation: explanation,
      evidenceURL: evidenceURL,
      userWantsReport_email: userWantsReport?.email,
    }

    const insertedReport = await reports.insertOne(data)

    res.json(insertedReport)
  } catch (err) {
    console.log(err)
  } finally {
    await client.close()
  }
})

// Get all Reports by reportId in the Database
app.get('/reports', async (req, res) => {
  const client = new MongoClient(uri)
  try {
    await client.connect()
    const database = client.db('app-data')
    const reports = database.collection('reports')
    const allReports = await reports.find().toArray()
    res.json(allReports)
  } catch (err) {
    console.log(err)
  } finally {
    await client.close()
  }
})
// Delete Report

app.delete('/report', async (req, res) => {
  const client = new MongoClient(uri)
  const reportId = req.query.reportId

  try {
    await client.connect()
    const database = client.db('app-data')
    const reports = database.collection('reports')
    const query = { reportId: reportId }
    const deleteResult = await reports.deleteOne(query)
    // console.log(deleteResult + 'has been deleted')
    res.send(deleteResult)
  } finally {
    await client.close()
  }
})

app.listen(PORT, () => console.log('server running on PORT ' + PORT))
