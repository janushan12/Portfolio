const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const nodemailer = require("nodemailer");
require("dotenv").config();

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.post("/send", async (req, res) => {
    const { name, email, subject, message } = req.body;
    try {
        let transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            },
        });

        let mailOptions = {
            From: email,
            to: "janu.1999.12@gmail.com",
            subject: `Portfolio Contact: ${name}`,
            text: `You got a message from:
            Name: ${name}
            Email: ${email}
            Subject: ${subject}
            Message: ${message}`,
        };
        await transporter.sendMail(mailOptions);
        res.status(200).json({ success: true, message: "Email sent successfully!" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Something went wrong!" });
    }
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, ()=> {
    console.log("Server running on port 3000");
})