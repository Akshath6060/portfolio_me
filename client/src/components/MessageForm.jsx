import { useState } from "react";
import { submitContactMessage } from "../api.js";
import Reveal from "./motion/Reveal.jsx";

const EMPTY_FORM = { name: "", email: "", message: "" };

export default function MessageForm() {
  const [form, setForm] = useState(EMPTY_FORM);
  const [status, setStatus] = useState({ state: "idle", text: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ state: "pending", text: "Sending…" });
    try {
      await submitContactMessage(form);
      setStatus({ state: "success", text: "Thanks — your message has been sent." });
      setForm(EMPTY_FORM);
    } catch (err) {
      setStatus({ state: "error", text: err.message });
    }
  };

  return (
    <section className="message" aria-labelledby="message-heading">
      <Reveal variant="up" amount={0.4}>
        <h3 id="message-heading">Or send a message directly</h3>
        <form onSubmit={handleSubmit}>
          <input type="text" name="name" placeholder="Name" value={form.name} onChange={handleChange} required />
          <input type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} required />
          <textarea name="message" placeholder="Message" value={form.message} onChange={handleChange} required />
          <button type="submit" disabled={status.state === "pending"} data-cursor="hover">
            {status.state === "pending" ? "Sending…" : "Send message"}
          </button>
          {status.text && (
            <p className="message__status" data-state={status.state}>
              {status.text}
            </p>
          )}
        </form>
      </Reveal>
    </section>
  );
}
