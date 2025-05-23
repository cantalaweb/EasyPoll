const port = 8000;

const cors = require("cors");
const express = require("express");
//const swaggerUi = require('swagger-ui-express');
//const swaggerDocument = require('./swagger-output.json');
const { dbConnection } = require("./db")

// ROUTES
const questionsRoutes = require("./routes/questions.routes")
const pollsRoutes = require("./routes/polls.routes")
const resultsRoutes = require("./routes/results.routes")
const ipRoutes = require("./routes/ip.routes")

const main = () => {
  const app = express();
  app.use(cors());
  app.use(express.json());
  //app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
  // ENDPOINTS
  app.use("/questions", questionsRoutes)
  app.use("/polls", pollsRoutes)
  app.use("/results", resultsRoutes)
  app.use("/get-ip", ipRoutes)

  dbConnection()

  app.listen(port, () => {
    console.log();
  });  
}

main()

