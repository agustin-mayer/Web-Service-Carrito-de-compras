require('dotenv').config()

//esto va
const express = require('express')
const PORT = process.env.PORT || 5000
const app = express()


const cors = require('cors')
// middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}))
app.use(cors())
// routes
app.use(require('./routes/index'))


//esto va
app.listen(PORT);
//esto va
/*
app.get("/", (req,res)=> {
  res.send("la pagina de inicio")
})
*/
//esto va
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
          url: "https://promo-iaw-web-service.vercel.app/",
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

