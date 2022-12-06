const express = require('express')
const PORT = process.env.PORT || 5000
const app = express()


app.listen(PORT);

app.get("/", (req,res)=> {
  res.send("la pagina de inicio")
})

console.log('Server on port')

