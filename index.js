require('dotenv').config()
const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000
const app = express()
const cors = require('cors')
const morgan = require('morgan')

// middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}))
app.use(cors())
app.use(morgan('dev'))
app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, 	X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-	Method');
	res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, 	DELETE');
	res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
	next();
});

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

