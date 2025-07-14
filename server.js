import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { sendEmail } from "./nodemailer.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: process.env.FRONTEND_URI,
  })
);

app.post("/api/send-mail", async (req, res) => {
  try {

    // console.log("Req body: ",req.body)
    const { name, email, message } = req?.body;

    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: "All fields required!",
      });
    }

    const response = await sendEmail(email,"📩 New Message via Portfolio Contact Form", "", { name, email, message });

    if (response.accepted.length !== 1) {
      return res.status(400).json({
        success: false,
        message: "Unable to send OTP! Please try again later.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Mail sent successfully!",
    });
  } catch (error) {
    // console.log("Error: ", error);
    return res.status(500).json({
      succes: false,
      message: "Internal server error!",
    });
  }
});

const port = process.env.port || "5000";
app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});
