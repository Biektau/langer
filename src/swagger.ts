import swaggerJSDoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Langer API",
      version: "1.0.0",
      description: "Langer API",
    },
  },
  apis: ["./src/routes/*.ts"],
};

const specs = swaggerJSDoc(options);
export default specs;
