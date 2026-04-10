import { useDispatch } from "react-redux";
import { asyncHandler } from "../../../utils/asyncHandler";
import { setUser } from "../auth.slice";
import { authService } from "../services/auth.services";
import type { LoginPayload, RegisterPayload } from "../types/auth.type";
import { useNavigate } from "react-router-dom";

const useAuth = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleRegister = async (userData: RegisterPayload) => {
        const [res, err] = await asyncHandler(() =>
            authService.register(userData)
        );
        if (err) return console.error("Registration error:", err);
    };

    const handleLogin = async (userData: LoginPayload) => {
        const [res, err] = await asyncHandler(() =>
            authService.login(userData)
        );
        dispatch(setUser(res.data.user));
        navigate('/')
        if (err) return console.error("Login error:", err);
    };

    const handleVerifyOtp = async (email: string, otp: string) => {
        const res = await authService.verifyOtp(email, otp);
        console.log("OTP verified:", res);
        navigate('/login')
    };
    const handleGetProfile = async () => {
        const res = await authService.getProfile();
        dispatch(setUser(res.data))
    };
    const handleLogout = async () => {
        await authService.logout();
        dispatch(setUser(null));
        navigate('/login')
    };


    return {
        handleRegister,
        handleLogin,
        handleVerifyOtp,
        handleGetProfile,
        handleLogout
    }
}

export default useAuth