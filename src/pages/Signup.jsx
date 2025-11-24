import React, { useState } from "react";
import { api } from "../api.js";

export default function Signup({ onSuccess, go }) {
    const [form, setForm] = useState({ username: "", email: "", password: "" });

    const submit = async () => {
        await api.post("/auth/signup", form);
        const { data } = await api.post("/auth/login", { email: form.email, password: form.password });
        onSuccess(data.user);
    };

    return (
        <div>
            <h2>Signup to Ghosain</h2>
            <input placeholder="Username" value={form.username} onChange={(e) => setForm({ ...form, username: e.target.value })} />
            <input placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
            <input placeholder="Password" type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
            <button onClick={submit}>Create account</button>
            <p>
                Already have an account? <button onClick={() => go("login")}>Login</button>
            </p>
        </div>
    );
}