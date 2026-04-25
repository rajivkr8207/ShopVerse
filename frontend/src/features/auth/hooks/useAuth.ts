import { useDispatch } from "react-redux";
import { asyncHandler } from "../../../utils/asyncHandler";
import { setUser } from "../auth.slice";
import { authService } from "../services/auth.services";
import type { LoginPayload, RegisterPayload } from "../types/auth.type";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const useAuth = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();


    const handleRegister = async (userData: RegisterPayload) => {
        const [res, err] = await asyncHandler(() =>
            authService.register(userData)
        );
        toast.success(res.message);
        navigate('/login');
        if (err) return toast.error("Registration error:", err);
    };

    const handleLogin = async (userData: LoginPayload) => {
        const [res, err] = await asyncHandler(() =>
            authService.login(userData)
        );
        toast.success(res.message);
        dispatch(setUser(res.data.user));
        navigate('/')
        if (err) return console.error("Login error:", err);
    };

    const handleVerifyOtp = async (email: string, otp: string) => {
        const res = await authService.verifyOtp(email, otp);
        toast.success(res.message);
        navigate('/login')
    };
    const handleGetProfile = async () => {
        const res = await authService.getProfile();
        console.log(res)
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