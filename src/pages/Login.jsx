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
        setError("იმეილი ან პაროლი არასწორია!");
      }
    } catch {
      setError("სერვერთან კავშირი ვერ დამყარდა.");
    }
  };

  return (
    <div className="card">
      <h2>ავტორიზაცია</h2>
      {error && <p className="error-msg">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label>ელ-ფოსტა</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label>პაროლი</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          შესვლა
        </button>
      </form>
    </div>
  );
};

export default Login;
