const express = require("express");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(cors());

const credentialList = [];

app.post("/signup", (req, res) => {
	const { fullName, emailId, phoneNumber, password, add } = req.body;

	console.log(fullName, emailId, phoneNumber, password, add);

	if (!fullName || !emailId || !password || !phoneNumber || !add) {
		res.json({ message: "Please enter valid credentials" });
		return;
	} else {
		for (let i = 0; i < credentialList.length; i++) {
			if (credentialList[i].emailId === emailId) {
				res.json({ message: "User already exists!" });
				return;
			}
		}
		const user = {
			fullName,
			emailId,
			phoneNumber,
			password,
			add,
		};

		credentialList.push(user);
		res.json({ message: "User created successfully" });
	}
	console.log(credentialList);
});

app.post("/login", (req, res) => {
	const { emailId, password } = req.body;
	for (let i = 0; i < credentialList.length; i++) {
		if (
			credentialList[i].emailId === emailId &&
			password === credentialList[i].password
		) {
			res.json({ message: "Login successful" });
			return;
		}
	}
	res.json({ message: "Invalid email or password" });
});

app.listen(3001, () => {
	console.log("Server is running on port 3001");
});
