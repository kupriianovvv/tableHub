const db = require("./database");
const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors())

app.get("/", async (req, res) => {
	try {
		const result = await db.execute("SELECT * FROM tablehub");
		res.send(result[0]);
	} catch(err) {
		console.log(err)
	}
})

app.listen(3000, () => console.log('listening port 3000'))
