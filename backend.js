const express = require("express");
const cors = require("cors");
const fs = require("fs");
const app = express();

app.use(express.json());
app.use(cors());

let credentialList = [];

readFromFile();

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
		const jsondata = JSON.stringify(credentialList);
		writeToFile(jsondata);
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

app.post("/forgotPassword", (req, res) => {
	const { emailId, phoneNumber, newPassword } = req.body;

	//email exist in credList, phoneNumber is same or not then we've to update the oldpass with new password
	for (let i = 0; i < credentialList.length; i++) {
		if (
			credentialList[i].emailId === emailId &&
			credentialList[i].phoneNumber === phoneNumber
		) {
			credentialList[i].password = newPassword;
			res.json({ message: "password update successfully." });
			const jsondata = JSON.stringify(credentialList);
			writeToFile(jsondata);
			return;
		}
	}
	res.json({ message: "Invalid Email or Phone No." });
});

function readFromFile() {
	fs.readFile("cred.json", (err, data) => {
		if (err) {
			console.log("error in reading the files");
		} else {
			console.log(data.toString());
			credentialList = JSON.parse(data.toString());
		}
	});
}

function writeToFile(jsondata) {
	fs.writeFile("cred.json", jsondata, (err) => {
		if (err) {
			console.log("error in writing the files", err);
		}
	});
}

app.listen(3001, () => {
	console.log("Server is running on port 3001");
});
