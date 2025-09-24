import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const from = (location.state && location.state.from) || "/";

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    setSubmitting(true);
    const user = await login(name, email);
    setSubmitting(false);
    // if (user) {
    //   navigate(from, { replace: true });
    // }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] bg-darkBlue2 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-darkBlue1 border-2 border-lightGray rounded-lg p-6 text-white">
        <h1 className="text-xl font-semibold mb-1">Join Sonic Meet</h1>
        <p className="text-slate-400 text-sm mb-6">Enter your name to continue. Email is optional.</p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm mb-1" htmlFor="name">Name<span className="text-red-400">*</span></label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              className="w-full h-10 rounded-md px-3 text-darkBlue1 outline-none"
              required
            />
          </div>
          <div>
            <label className="block text-sm mb-1" htmlFor="email">Email (optional)</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full h-10 rounded-md px-3 text-darkBlue1 outline-none"
            />
          </div>
          <div className="flex gap-2 pt-2">
            <button
              type="submit"
              disabled={submitting || !name.trim()}
              className="bg-blue disabled:opacity-60 py-2 px-4 rounded-md text-white font-semibold"
            >
              {submitting ? "Joining..." : "Join"}
            </button>
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="py-2 px-4 rounded-md border-2 border-lightGray text-slate-200"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
