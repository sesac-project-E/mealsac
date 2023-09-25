const swaggerUi = require("swagger-ui-express")
const swaggerJsdoc = require("swagger-jsdoc")

const options = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      version: "1.0.0",
      title: "MEALSAC",
      description:
        "MEALSAC 프로젝트 RestFul API 클라이언트 UI",
    },
    servers: [
      {
        url: "http://localhost:8000", // 요청 URL
      },
    ],
  },
  apis: ["src/**/*.js"], //Swagger 파일 연동
}
const specs = swaggerJsdoc(options)

module.exports = { swaggerUi, specs }