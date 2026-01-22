import logger from "#config/logger.ts";
import app from "./app.ts";

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  logger.info("Listening on 3000");
  console.log(`Listening on ${PORT}`);
});
