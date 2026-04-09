import { useState } from "react";
import useAuth from "../hooks/useAuth";

const Register = () => {

    const [form, setForm] = useState({
        fullname: "",
        email: "",
        password: "",
        contact: "",
    });
    const { handleRegister } = useAuth()
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async () => {
        await handleRegister(form);
    };

    return (
        <div className="h-screen flex justify-center items-center">
            <div className="bg-white p-6 rounded-xl shadow w-96 space-y-4">
                <h2 className="text-xl font-bold">Register</h2>

                {["fullname", "email", "password", "contact"].map((field) => (
                    <input
                        key={field}
                        name={field}
                        type={field === "password" ? "password" : "text"}
                        placeholder={field}
                        onChange={handleChange}
                        className="w-full border p-2 rounded"
                    />
                ))}

                <button
                    onClick={handleSubmit}
                    className="w-full bg-blue-600 text-white p-2 rounded"
                >
                    Register
                </button>
            </div>
        </div>
    );
};

export default Register;