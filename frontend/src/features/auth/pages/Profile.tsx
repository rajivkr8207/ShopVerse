import { useEffect } from "react";
import useAuth from "../hooks/useAuth";
import type { AuthState, IUser } from "../types/auth.type";
import { useSelector } from "react-redux";
import Button from "../../../components/common/Button";

const Profile = () => {
    const { handleGetProfile, handleLogout } = useAuth()
    const user = useSelector((state: AuthState) => state.auth.user) as IUser | null;
    useEffect(() => {
        if (!user) {
            handleGetProfile()
        }
    }, [])
    return (
        <div className="h-screen flex justify-center items-center">
            <div className="bg-neutral-800 p-6 rounded-xl shadow w-96">
                <h2 className="text-xl font-bold mb-4">Profile</h2>

                {user ? (
                    <div className="space-y-2">
                        <p><b>Name:</b> {user?.fullname}</p>
                        <p><b>Email:</b> {user?.email}</p>
                        <p><b>Contact:</b> {user?.contact}</p>
                        <Button onClick={handleLogout} text="Logout" />
                    </div>
                ) : (
                    <p>Loading...</p>
                )}
            </div>
        </div>
    );
};

export default Profile;