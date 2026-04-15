import { useEffect } from "react";
import useAuth from "../hooks/useAuth";
import type { AuthState, IUser } from "../types/auth.type";
import { useSelector } from "react-redux";
import Button from "../../../components/common/Button";
import { motion } from "framer-motion";
import { User, Mail, Phone, ShieldCheck, MapPin } from "lucide-react";
import type { RootState } from "../../../app/app.store";

const Profile = () => {
    const { handleGetProfile, handleLogout } = useAuth()
    const user = useSelector((state: RootState) => state.auth.user) as IUser | null;

    useEffect(() => {
        if (!user) {
            handleGetProfile()
        }
    }, [user, handleGetProfile])

    return (
        <div className="min-h-screen flex justify-center items-center bg-[var(--secondary)] p-4 text-white">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="bg-[var(--neutral)] w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden border border-white/5"
            >
                {/* Header/Cover Gradient */}
                <div className="h-32 bg-gradient-to-r from-[var(--tertiary)] to-[var(--primary)] opacity-80" />

                <div className="px-8 pb-8">
                    {/* Avatar and Main Info */}
                    <div className="relative -mt-16 mb-6 flex flex-col md:flex-row md:items-end gap-6">
                        <motion.div
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="w-32 h-32 rounded-2xl bg-[var(--neutral)] border-4 border-[var(--neutral)] shadow-xl flex items-center justify-center overflow-hidden"
                        >
                            <div className="w-full h-full bg-[var(--primary)]/10 flex items-center justify-center text-[var(--primary)]">
                                <User size={64} />
                            </div>
                        </motion.div>

                        <div className="flex-1 pb-2">
                            <h2 className="text-3xl font-bold">{user?.fullname || "User Name"}</h2>
                            <p className="text-gray-400 flex items-center gap-2">
                                <ShieldCheck size={16} className="text-[var(--primary)]" />
                                Verified Account
                            </p>
                        </div>

                        <Button
                            onClick={handleLogout}
                            text="Logout"
                            variant="outline"
                            className="md:mb-2 border-red-500/50 text-red-500 hover:bg-red-500 hover:text-white"
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                        {/* Info Cards */}
                        <InfoItem icon={User} label="Role" value={user?.role} />
                        <InfoItem icon={Mail} label="Email Address" value={user?.email} />
                        <InfoItem icon={Phone} label="Contact Number" value={user?.contact} />
                        <InfoItem icon={MapPin} label="Location" value="India" />
                        <InfoItem icon={ShieldCheck} label="Member Since" value="April 2026" />
                    </div>

                    {!user && (
                        <div className="flex justify-center py-10">
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                                className="w-8 h-8 border-2 border-[var(--primary)] border-t-transparent rounded-full"
                            />
                        </div>
                    )}
                </div>
            </motion.div>
        </div>
    );
};

const InfoItem = ({ icon: Icon, label, value }: { icon: any, label: string, value: string | undefined }) => (
    <div className="flex items-start gap-4 p-4 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors">
        <div className="p-3 rounded-xl bg-[var(--primary)]/10 text-[var(--primary)]">
            <Icon size={20} />
        </div>
        <div>
            <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">{label}</p>
            <p className="text-lg font-semibold text-gray-200">{value || "Not provided"}</p>
        </div>
    </div>
);

export default Profile;