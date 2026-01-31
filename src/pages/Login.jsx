import React, { useState } from "react";
import { useAuth } from "../context/useAuth";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await axios.get(
        `http://localhost:5000/users?email=${email}&password=${password}`,
      );
      if (res.data.length > 0) {
        login(res.data[0]);
        navigate("/dashboard");
      } else {
        setError("არასწორი მონაცემები!");
      }
    } catch {
      setError("სერვერთან კავშირი ვერ დამყარდა");
    }
  };

  return (
    <div className="container">
      <div className="card">
        <h2>შესვლა</h2>
        {error && <p className="error-msg">{error}</p>}
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="ელ-ფოსტა"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="პაროლი"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">შესვლა</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
