require('dotenv').config()
const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000
const app = express()
const cors = require('cors')

//index.js //SANTI
app.get('/', (req, res) => {
  res.sendFile('index.html', {root: path.join(__dirname, 'public')});
})

// middleware
app.use(express.static('public'))//SANTI

app.use(express.json());
app.use(express.urlencoded({extended: false}))
app.use(cors())

// routes
app.use(require('./routes/index'))

app.listen(PORT);
console.log('Server on port')

const swaggerUiExpress = require('swagger-ui-express')
const swaggerJsdoc = require('swagger-jsdoc')

const options = {
    definition: {
      openapi: "3.0.0",
      info: {
        title: "Foodmay API",
        version: "1.0.0",
        description:
          "Documentacion Foodmay API",
        contact: {
          name: "Agustin Mayer",
        },
      },
      servers: [
        {
          url: "https://agustinmayer99-servicio-web.herokuapp.com/",
        },
      ],
    },
    apis: ["./routes/index.js"],
  };

  const specs = swaggerJsdoc(options);
  app.use(
    "/",
    swaggerUiExpress.serve,
    swaggerUiExpress.setup(specs)
  );
module.exports = app
