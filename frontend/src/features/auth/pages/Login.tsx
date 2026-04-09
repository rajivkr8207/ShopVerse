import { useState } from "react";
import useAuth from "../hooks/useAuth";

const Login = () => {

  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const { handleLogin } = useAuth();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLoginsubmit = async () => {
    await handleLogin(form);
  };

  return (
    <div className="h-screen flex justify-center items-center">
      <div className="bg-white p-6 rounded-xl shadow w-96 space-y-4">
        <h2 className="text-xl font-bold">Login</h2>

        <input
          name="email"
          placeholder="Email"
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        <button
          onClick={handleLoginsubmit}
          className="w-full bg-green-600 text-white p-2 rounded"
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;