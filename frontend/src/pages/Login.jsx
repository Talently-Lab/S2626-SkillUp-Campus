import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getFriendlyMessage } from "../api/errorMessages";
import isologoflex from "../assets/isologoflex.svg";
import Email from "../assets/Email.svg";
import Lock from "../assets/Lock.svg";
import LogoSkillUp from "../assets/Logo_Skillup.svg";
import { login } from "../api/api";
import { LoaderCircle } from "lucide-react";
import { FormField } from "../components/common/FormField";
import { validateEmail, validatePassword, getFieldStatus, } from "../utils/validators";

export const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const emailStatus = getFieldStatus(email, validateEmail);
    const passwordStatus = getFieldStatus(password, validatePassword);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const { token, usuario } = await login({ email, password });

            localStorage.setItem("token", token);
            localStorage.setItem("usuario", JSON.stringify(usuario));

            navigate("/user-dashboard");
        } catch (err) {
            setError(getFriendlyMessage(err));
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen w-full flex justify-center items-center bg-gradient-to-b from-[#FF9617] to-[#9417B1]">
            <div className="flex pt-[85px] pr-[115px] pb-[114px] pl-[64px]  bg-[#FFEAD1] w-[994px] h-[751.65px] border border-[#616161] rounded-[8px] box-border">
                <div className=" flex flex-col items-start h-[612px] pr-[65px] gap-[36px] leading-[41px]">
                    <div className="flex flex-col gap-[7px]">
                        <img src={isologoflex} alt="isologo" className="w-[152.74px] h-[44px]" />
                        <p className="text-[32px] font-bold font-primary w-[348px] h-[128px]">
                            <span className="text-[#1E0523]">A platform that helps you </span><span className="text-[#76128E]">find the missing piece</span>
                        </p>
                    </div>
                    <img src={LogoSkillUp} alt="iso" className="w-[337px] h-[337px]" />
                </div>

                <div className="w-[0.95px] bg-[#000000] self-stretch h-[552.85px]" />

                <div className="flex-1 flex flex-col pl-[41px] gap-[35px] h-[533px]">
                    <div className="flex flex-col pl-[40px] w-[350px]">
                        <div className="flex flex-col gap-[35px]">
                            <h2 className="text-[32px] font-bold leading-[24.28px] font-primary">
                                Log In
                            </h2>
                            <p className="text-[#590E6A] text-[20px] font-primary font-medium leading-[10px] w-[390px]">
                                You´re back! 💜 Ready to continue?
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} className="mt-[35px] w-[320px]">
                            <FormField
                                id="email"
                                label="Email"
                                type="email"
                                value={email}
                                onChange={setEmail}
                                placeholder="Enter your email"
                                autoComplete="email"
                                icon={<img src={Email} alt="" className="h-6 w-6" />}
                                status={emailStatus}
                                helperText={
                                    emailStatus === "error"
                                        ? "Ingresá un email válido."
                                        : undefined
                                }
                            />

                            <FormField
                                className="mt-[30px]"
                                id="password"
                                label="Password"
                                value={password}
                                onChange={setPassword}
                                placeholder="Enter your password"
                                autoComplete="current-password"
                                isPassword
                                icon={<img src={Lock} alt="" className="h-6 w-6" />}
                                status={passwordStatus}
                                helperText={
                                    passwordStatus === "error"
                                        ? "La contraseña debe tener al menos 8 caracteres."
                                        : passwordStatus === "warning"
                                            ? "Contraseña débil: agregá mayúsculas, números o símbolos."
                                            : undefined
                                }
                            />

                            <div className="flex justify-start mt-[13px]">
                                <Link
                                    to="/forgot-password"
                                    className="text-[#9417B1] font-secondary text-[16px] font-normal leading-[24.28px] underline underline-offset-2"
                                >
                                    Did you forget your password?
                                </Link>
                            </div>

                            {error && (
                                <div
                                    role="alert"
                                    className="mt-[20px] w-[290px] text-[#C0392B] text-[14px] font-secondary leading-snug"
                                >
                                    {error}
                                </div>
                            )}

                            <div className="mt-[35px]">
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="text-white bg-[#FF9617] py-4 w-[290px] rounded-[30px] flex items-center justify-center gap-2 font-bold text-[18px] cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
                                >
                                    {loading ? (
                                        <>
                                            <LoaderCircle className="h-5 w-5 animate-spin" />
                                            <span>Ingresando...</span>
                                        </>
                                    ) : (
                                        "Log In"
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                    <div className="pl-10">
                        <p className="text-[16px] font-medium font-secondary">
                            Don't have an account yet?
                        </p>
                        <Link to="/signup" className="text-[#9417B1] text-[16px] font-medium font-secondary underline underline-offset-2 block mt-1">
                            Create Your Account
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};