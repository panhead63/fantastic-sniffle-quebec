const express = require('express')
const app = express()
const PORT = (3000 || process.env.PORT)

app.set('view engine', 'ejs')

let someVar = "";

app.get('/', function (req, res) {
 // res.send('Hello World')
  res.render('index', {
    someVar : "hello from node, express, & EJS"
  })
})

app.listen(PORT, () => {
    console.log(`Server is running & listening on port ${PORT}`);
  });