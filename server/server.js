const express = require('express')
const cors = require('cors')
const { Pool } = require('pg')

const app = express()
app.use(cors())
app.use(express.json())

const pool = new Pool({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT
})

app.get('/all', async (req, res) => {
  const result = await pool.query('SELECT * FROM texte')
  res.json(result.rows)
})
app.post('/all', async (req, res) => {
  try {
    console.log(req.body)
    const { text } = req.body
    await pool.query('INSERT INTO texte (content) VALUES ($1)', [text])
    res.json({ status: 'ok' })
  } catch (err) {
    console.error('Raté', err)
    res.status(500).json({ error: 'Erreur serveur' })
  }
})
app.listen(3001, () => { console.log('API OK') })
