import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import isologoflex from "../assets/isologoflex.svg";
import Email from "../assets/Email.svg";
import Lock from "../assets/Lock.svg"
import { Check, LoaderCircle } from "lucide-react";
import LogoSkillUp from "../assets/Logo_Skillup.svg";
import Perfil from "../assets/Perfil.svg";
import { FRIENDLY_MESSAGES, getFriendlyMessage } from "../api/errorMessages";
import { register } from "../api/api";
import { FormField } from "../components/common/FormField";
import { validateName, validateEmail, validatePassword, getFieldStatus } from "../utils/validators";
import { trackViewRegisterForm, trackClickRegister, trackRegisterSuccess, trackRegisterError, extractErrorDetail } from "../api/analytics";

export const SignUp = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [acceptedTerms, setAcceptedTerms] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const nameStatus = getFieldStatus(username, validateName);
    const emailStatus = getFieldStatus(email, validateEmail);
    const passwordStatus = getFieldStatus(password, validatePassword);
    const confirmStatus = getFieldStatus(
        confirmPassword,
        (v) => (v === password ? "valid" : "invalid")
    );

    useEffect(() => {
        trackViewRegisterForm();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        trackClickRegister();

        if (!username.trim() || !email.trim() || !password.trim() || !confirmPassword.trim()) {
            setError(FRIENDLY_MESSAGES.REQUIRED_FIELD);
            trackRegisterError("form_incomplete");
            return;
        }

        if (password !== confirmPassword) {
            setError(FRIENDLY_MESSAGES.PASSWORD_MISMATCH);
            trackRegisterError("password_mismatch");
            return;
        }

        if (!acceptedTerms) {
            setError("Tenés que aceptar los términos y condiciones para continuar.");
            trackRegisterError("terms_not_accepted");
            return;
        }

        setLoading(true);

        try {
            const data = await register({ nombre: username, email, password });

            trackRegisterSuccess(data?.id);
            navigate("/login", { state: { registered: true, from: location.state?.from } });
        } catch (err) {
            setError(getFriendlyMessage(err));
            trackRegisterError(extractErrorDetail(err));
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen w-full flex justify-center items-center bg-gradient-to-b from-[#FF9617] to-[#9417B1]">
            <div className="flex pb-[50px] pt-[85px] bg-[#FFEAD1] items-center max-w-[994px] h-[751.65px] w-full border border-[#616161] rounded-[8px] box-border">
                <div className=" flex flex-col items-start px-[65px] h-[612px] gap-[96px] leading-[41px]">
                    <div className="flex flex-col gap-[7px]">
                        <img
                            src={isologoflex}
                            alt="isologo"
                            className="w-[152.74px] h-[44px]"
                        />
                        <p className="text-[32px] font-bold font-primary w-[348px] h-[128px]">
                            <span className="text-[#1E0523]">A platform that helps you{" "}</span>
                            <span className="text-[#76128E]">find the missing piece</span>
                        </p>
                    </div>
                    <img
                        src={LogoSkillUp}
                        alt="iso"
                        className="w-[337px] h-[337px]"
                    />
                </div>

                <div className="w-[0.95px] bg-[#000000] self-stretch h-[552.85px]" />

                <div className="flex-1 flex flex-col pl-[45px] pr-[86px]  h-[609px]">
                    <div className="flex flex-col pl-10 ">
                        <div className="flex flex-col gap-[6px] mb-[6px]">
                            <h2 className="text-[32px] font-bold leading-[24.3px] font-primary">
                                Add one more skill.
                            </h2>
                            <p className="text-[#590E6A] text-[20px] font-primary font-medium leading-[24.3px]">
                                Create your account and discover new ways to keep growing.

                            </p>
                        </div>

                        <form onSubmit={handleSubmit} noValidate>
                            <FormField
                                id="username"
                                label="Name"
                                value={username}
                                onChange={setUsername}
                                placeholder="Enter your username"
                                autoComplete="username"
                                icon={<img src={Perfil} alt="" className="w-[24px] h-[24px]" />}
                                status={nameStatus}
                            />

                            <FormField
                                className="mt-[8px]"
                                id="email"
                                label="Email"
                                type="email"
                                value={email}
                                onChange={setEmail}
                                placeholder="Enter your email"
                                autoComplete="email"
                                icon={<img src={Email} alt="" className="h-6 w-6" />}
                                status={emailStatus}
                                helperText={emailStatus === "error" ? "Ingresá un email válido." : undefined}
                            />

                            <FormField
                                className=""
                                id="password"
                                label="Password"
                                value={password}
                                onChange={setPassword}
                                placeholder="Enter your password"
                                autoComplete="new-password"
                                minLength={8} //esto en los form no hace nada porque ya valida en validators.js
                                isPassword
                                icon={<img src={Lock} alt="" className="h-6 w-6" />}
                                status={passwordStatus}
                                helperText={
                                    passwordStatus === "error"
                                        ? "Mínimo 8 caracteres."
                                        : passwordStatus === "warning"
                                            ? "Contraseña débil: sumá mayúsculas, números o símbolos."
                                            : undefined
                                }
                            />

                            <FormField
                                className="mt-[8px]"
                                id="confirmPassword"
                                label="Confirm Password"
                                value={confirmPassword}
                                onChange={setConfirmPassword}
                                placeholder="Repeat your password"
                                autoComplete="new-password"
                                minLength={8}
                                isPassword
                                icon={<img src={Lock} alt="" className="h-6 w-6" />}
                                status={confirmStatus}
                                helperText={
                                    confirmStatus === "error"
                                        ? "Las contraseñas no coinciden."
                                        : undefined
                                }
                            />

                            <label className="group block cursor-pointer mt-[13px]">
                                <input
                                    type="checkbox"
                                    checked={acceptedTerms}
                                    onChange={(e) => setAcceptedTerms(e.target.checked)}
                                    className="sr-only peer"
                                />
                                <div className="float-left mr-2 mt-[6px] w-[13px] h-[13px] border border-[#9417B1] rounded-[3px] bg-transparent flex items-center justify-center peer-checked:bg-[#9417B1] [&>svg]:opacity-0 peer-checked:[&>svg]:opacity-100">
                                    <Check className="h-3 w-3 text-white transition-opacity" strokeWidth={3} />
                                </div>
                                <span className="text-[#9417B1] leading-[24.3px] text-[16px] font-secondary">
                                    I agree to the terms and conditions and the privacy policy.
                                </span>
                            </label>

                            {error && (
                                <div
                                    role="alert"
                                    className="mt-[20px] w-[290px] text-[#C0392B] text-[14px] font-secondary leading-snug"
                                >
                                    {error}
                                </div>
                            )}

                            <div className="mt-[13px]">
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="text-white bg-[#FF9617] py-[18px] px-[60px] w-[290px] rounded-[30px] flex items-center justify-center gap-2 font-bold text-[18px] cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
                                >
                                    {loading ? (
                                        <>
                                            <LoaderCircle className="h-5 w-5 animate-spin" />
                                            <span>Creando cuenta...</span>
                                        </>
                                    ) : (
                                        "Create an account"
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>

                    <div className="flex items-center pl-10 gap-4 mt-[13px] leading-[10px]">
                        <p className="text-[16px] font-medium font-secondary">
                            Do you already have an account?
                        </p>
                        <Link
                            to="/login"
                            state={{ from: location.state?.from, registered: false }}
                            className="text-[#9417B1] text-[16px] font-medium font-secondary underline underline-offset-2 block"
                        >
                            Log in
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};