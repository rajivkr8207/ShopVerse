import { useState } from "react";
import { useLocation, Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { motion } from "framer-motion";
import { CheckCircle2, ArrowLeft, RefreshCw, Key } from "lucide-react";
import Button from "../../../components/common/Button";

const VerifyEmail = () => {
    const location = useLocation();
    const [otp, setOtp] = useState("");
    const { handleVerifyOtp } = useAuth()

    const handleVerify = async (e: React.FormEvent) => {
        e.preventDefault();
        const email = location.search.split('=')[1]
        await handleVerifyOtp(email, otp);
    };

    return (
        <div className="min-h-screen flex justify-center items-center bg-[var(--secondary)] p-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-[var(--neutral)] p-8 rounded-2xl shadow-2xl w-full max-w-md border border-white/5"
            >
                <div className="text-center mb-8">
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2, type: "spring" }}
                        className="w-16 h-16 bg-[var(--primary)]/10 rounded-2xl flex items-center justify-center mx-auto mb-4"
                    >
                        <CheckCircle2 className="text-[var(--primary)]" size={32} />
                    </motion.div>
                    <h2 className="text-3xl font-bold text-white mb-2">Verify Email</h2>
                    <p className="text-gray-400 text-sm">Please enter the email associated with your account to confirm the OTP</p>
                </div>

                <form onSubmit={handleVerify} className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-300 ml-1">OTP</label>
                        <div className="relative group">
                            <Key className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-[var(--primary)] transition-colors" size={20} />
                            <input
                                type="string"
                                placeholder="123456"
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                                required
                                className="w-full bg-[var(--secondary)] border border-white/5 text-white p-3 pl-10 rounded-xl outline-none focus:border-[var(--primary)]/50 focus:ring-2 focus:ring-[var(--primary)]/10 transition-all"
                            />
                        </div>
                    </div>

                    <div className="bg-[var(--primary)]/5 p-4 rounded-xl border border-[var(--primary)]/10">
                        <p className="text-xs text-[var(--primary)] text-center font-medium">
                            The verification link has been sent. Please ensure the email matches your registration.
                        </p>
                    </div>

                    <Button
                        type="submit"
                        text="Verify Account"
                        className="w-full py-4 text-lg"
                    />

                    <button
                        type="button"
                        className="w-full flex items-center justify-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
                    >
                        <RefreshCw size={16} /> Resend OTP
                    </button>
                </form>

                <p className="text-center mt-8 text-sm text-gray-400">
                    <Link to="/login" className="text-gray-400 hover:text-white font-medium flex items-center justify-center gap-2">
                        <ArrowLeft size={16} /> Back to Login
                    </Link>
                </p>
            </motion.div>
        </div>
    );
};

export default VerifyEmail;