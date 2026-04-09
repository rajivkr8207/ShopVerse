import { useState } from "react";
import { useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const VerifyEmail = () => {
    const location = useLocation();

    const email = location.state?.email;

    const [otp, setOtp] = useState("");
    const { handleVerifyOtp } = useAuth()
    const handleVerify = async () => {
        await handleVerifyOtp(email, otp);
    };

    return (
        <div className="h-screen flex justify-center items-center">
            <div className="bg-white p-6 rounded-xl shadow w-96 space-y-4">
                <h2 className="text-xl font-bold">Verify Email</h2>

                <input
                    placeholder="Enter OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    className="w-full border p-2 rounded"
                />

                <button
                    onClick={handleVerify}
                    className="w-full bg-purple-600 text-white p-2 rounded"
                >
                    Verify
                </button>
            </div>
        </div>
    );
};

export default VerifyEmail;