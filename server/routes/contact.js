import { Router } from "express";
import Message from "../models/Message.js";

const router = Router();

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

router.post("/", async (req, res) => {
  const { name, email, message } = req.body ?? {};

  if (!name?.trim() || !email?.trim() || !message?.trim()) {
    return res.status(400).json({ error: "Name, email, and message are all required." });
  }
  if (!EMAIL_RE.test(email.trim())) {
    return res.status(400).json({ error: "Please provide a valid email address." });
  }

  const saved = await Message.create({ name: name.trim(), email: email.trim(), message: message.trim() });
  res.status(201).json({ id: saved._id });
});

export default router;
