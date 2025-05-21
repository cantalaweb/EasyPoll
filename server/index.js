const port = 8000;

const cors = require("cors");
const express = require("express");
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger-output.json');
const { dbConnection } = require("./db")

// ROUTES
// const ingredientsRoutes = require("./routes/ingredients.routes")
const questionsRoutes = require("./routes/questions.routes")

const main = () => {
  const app = express();
  app.use(cors());
  app.use(express.json());
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
  // ENDPOINTS
  // app.use("/ingredients", ingredientsRoutes)
  app.use("/questions", questionsRoutes)

  dbConnection()

  app.listen(port, () => {
    console.log();
  });  
}

main()

