import { useState } from "react";
import useAuth from "../hooks/useAuth";
import { motion } from "framer-motion";
import { User, Mail, Lock, Phone, UserPlus, ArrowLeft } from "lucide-react";
import Button from "../../../components/common/Button";
import { Link } from "react-router-dom";

const Register = () => {
    const [form, setForm] = useState({
        fullname: "",
        email: "",
        password: "",
        contact: "",
    });
    const { handleRegister } = useAuth();
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await handleRegister(form);
    };

    const inputFields = [
        { name: "fullname", placeholder: "Full Name", icon: User, type: "text" },
        { name: "email", placeholder: "Email Address", icon: Mail, type: "email" },
        { name: "contact", placeholder: "Contact Number", icon: Phone, type: "text" },
        { name: "password", placeholder: "Password", icon: Lock, type: "password" },
    ];

    return (
        <div className="min-h-screen flex justify-center items-center bg-[var(--secondary)] p-4">
            <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="bg-[var(--neutral)] p-8 rounded-2xl shadow-2xl w-full max-w-lg border border-white/5"
            >
                <div className="text-center mb-8">
                    <motion.div 
                        initial={{ rotate: -10, scale: 0 }}
                        animate={{ rotate: 0, scale: 1 }}
                        transition={{ delay: 0.2, type: "spring" }}
                        className="w-16 h-16 bg-[var(--primary)]/10 rounded-2xl flex items-center justify-center mx-auto mb-4"
                    >
                        <UserPlus className="text-[var(--primary)]" size={32} />
                    </motion.div>
                    <h2 className="text-3xl font-bold text-white mb-2">Create Account</h2>
                    <p className="text-gray-400">Join us to start your journey</p>
                </div>

                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {inputFields.map((field) => (
                        <div key={field.name} className="space-y-2 col-span-1 md:col-span-1 even:md:col-span-1 odd:md:col-span-1 last:md:col-span-2">
                            <label className="text-sm font-medium text-gray-300 ml-1 capitalize">{field.name}</label>
                            <div className="relative group">
                                <field.icon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-[var(--primary)] transition-colors" size={18} />
                                <input
                                    name={field.name}
                                    type={field.type}
                                    placeholder={field.placeholder}
                                    onChange={handleChange}
                                    required
                                    className="w-full bg-[var(--secondary)] border border-white/5 text-white p-3 pl-10 rounded-xl outline-none focus:border-[var(--primary)]/50 focus:ring-2 focus:ring-[var(--primary)]/10 transition-all text-sm"
                                />
                            </div>
                        </div>
                    ))}

                    <div className="col-span-1 md:col-span-2 pt-4">
                        <Button
                            type="submit"
                            text="Create Account"
                            className="w-full py-4 text-lg"
                        />
                    </div>
                </form>

                <p className="text-center mt-8 text-sm text-gray-400">
                    Already have an account?{" "}
                    <Link to="/login" className="text-[var(--primary)] font-semibold hover:underline flex items-center justify-center gap-1 mt-1">
                        <ArrowLeft size={14} /> Back to Sign In
                    </Link>
                </p>
            </motion.div>
        </div>
    );
};

export default Register;