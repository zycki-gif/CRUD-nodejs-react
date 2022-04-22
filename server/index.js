const express = require('express')
const app = express()
const mysql = require('mysql')
const cors = require('cors')

const userUpload = require('./routes/index.js')

const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'slipknot00',
  database: 'contact_db'
})

app.use('/user', userUpload)
app.use(cors())
app.use(express.json())

app.post('/create', (req, res) => {
  const nome = req.body.nome
  const email = req.body.email
  const telefone = req.body.telefone
  const photo = req.body.photo

  db.query(
    'INSERT INTO contact_table (nome, email, telefone, photo) VALUES (?,?,?,?)',
    [nome, email, telefone, photo],
    (err, result) => {
      if (err) {
        console.log(err)
      } else {
        res.send('Values Inserted')
      }
    }
  )
})

app.get('/contacts', (req, res) => {
  db.query('SELECT * FROM contact_table', (err, result) => {
    if (err) {
      console.log(err)
    } else {
      res.send(result)
    }
  })
})

app.put('/update', (req, res) => {
  const id = req.body.id
  const nome = req.body.nome
  const telefone = req.body.telefone
  const email = req.body.email
  db.query(
    'UPDATE contact_table SET nome = ?, email = ?, telefone = ?  WHERE id = ?',
    [nome, email, telefone, id],
    (err, result) => {
      if (err) {
        console.log(err)
      } else {
        res.send(result)
      }
    }
  )
})

app.delete('/delete/:id', (req, res) => {
  const { id } = req.params.id
  db.query('DELETE FROM contact_table WHERE id = ?', [id], (err, result) => {
    if (err) {
      console.log(err)
    } else {
      res.send(result)
    }
  })
})
app.listen(3001, () => {
  console.log('Servidor rodando na porta  3001')
})
