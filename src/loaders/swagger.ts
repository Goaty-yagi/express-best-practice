import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";

const swagger = () => {
  const swaggerDocument = YAML.load("docs/api-docs.yaml");
  return [swaggerUi.serve, swaggerUi.setup(swaggerDocument)];
};

export default swagger;
