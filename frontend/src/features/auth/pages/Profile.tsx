import type { AuthState, IUser } from "../types/auth.type";
import { useSelector } from "react-redux";

const Profile = () => {

    const user = useSelector((state: AuthState) => state.auth.user) as IUser | null;
    return (
        <div className="h-screen flex justify-center items-center">
            <div className="bg-white p-6 rounded-xl shadow w-96">
                <h2 className="text-xl font-bold mb-4">Profile</h2>

                {user ? (
                    <div className="space-y-2">
                        <p><b>Name:</b> {user?.fullname}</p>
                        <p><b>Email:</b> {user?.email}</p>
                        <p><b>Contact:</b> {user?.contact}</p>
                    </div>
                ) : (
                    <p>Loading...</p>
                )}
            </div>
        </div>
    );
};

export default Profile;