require("dotenv").config();
const app = require("../api/app");

app.listen(process.env.PORT, () => {
  console.log(`listening on ${process.env.PORT}`);
});
