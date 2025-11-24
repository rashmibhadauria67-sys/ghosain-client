import React, { useState } from "react";
import { api } from "../api.js";

export default function Login({ onSuccess, go }) {
    const [form, setForm] = useState({ email: "", password: "" });

    const submit = async () => {
        const { data } = await api.post("/auth/login", form);
        onSuccess(data.user);
    };

    return (
        <div>
            <h2>Login to Ghosain</h2>
            <input placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
            <input placeholder="Password" type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
            <button onClick={submit}>Login</button>
            <p>
                New here? <button onClick={() => go("signup")}>Signup</button>
            </p>
        </div>
    );
}