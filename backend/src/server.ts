import app from "./app.js";
import { config } from "./config/config.js";
import { ConnectDB } from "./config/database.js";

const PORT = config.PORT


ConnectDB()
app.listen(PORT, () => {
    console.log(`server is running on ${PORT} port`)
})