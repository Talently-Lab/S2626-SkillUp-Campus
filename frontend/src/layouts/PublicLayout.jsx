import { Globe, Mail, ShoppingCart } from "lucide-react";
import { Link, Outlet } from "react-router-dom";
import isologoflex from "../assets/isologoflex.svg";
import isologocol from "../assets/isologocol.svg";

export const PublicLayout = () => {
    return (
        <div className="min-h-screen grid grid-rows-[auto_1fr_auto] bg-white text-dark ">
            <header className="bg-[#1E0523]">
                <nav className="max-w-[1300px]  mx-auto flex flex-wrap font-secondary md:flex-nowrap items-center px-4 sm:px-6 py-3 sm:py-4 gap-x-6 gap-y-3">
                    <Link to="/" className="font-primary font-bold text-lg sm:text-[25.64px] ml-6 text-primary tracking-tight">
                        <img
                            src={isologoflex}
                            alt="SkillUp — Inicio"
                            className="w-[114.56px] h-[33px]"
                            width={115}
                            height={33}
                        />
                    </Link>
                    <div className="flex items-center ml-auto gap-[22px]">
                        <ul className=" flex items-center w-full md:w-auto gap-[60px] md:ml-16 text-sm font-medium">
                            <li><Link to="/courses" className="text-[12.13px] text-[#FFEAD1] hover:text-primary transition-colors">Courses</Link></li>
                            <li><Link to="/blog" className="text-[12.13px] text-[#FFEAD1] hover:text-primary transition-colors">Blog</Link></li>
                            <li><Link to="/contact" className="text-[12.13px] text-[#FFEAD1] hover:text-primary transition-colors">Contact</Link></li>
                        </ul>
                        <div className="flex items-center text-[12.13px] gap-[22px]">
                            <Link to="/cart" className="text-[12.13px] text-[#FFEAD1] hover:text-primary transition-colors"><ShoppingCart /></Link>
                            <Link
                                to="/login"
                                className="bg-primary text-[#1E0523] px-3 sm:px-[38px] py-[10.5px] rounded-4xl hover:text-neutral transition-opacity"
                            >
                                <span className="text-[12.13px] font-bold font-secondary">Sign In</span>
                            </Link>
                        </div>
                        {/*                         <div className="flex items-center gap-[22px] text-sm font-medium">
                            <Link to="/login" className=" text-[#FFEAD1] hover:text-accent transition-colors">
                                <span className="text-[12.13px] font-bold">Login</span></Link>
                            <Link to="/signup"
                                className="bg-accent text-[#1E0523] px-3 sm:px-[38px] py-[10.5px] rounded-4xl hover:text-neutral transition-opacity">
                                <span className="text-[12.13px] font-bold">Sign Up</span>
                            </Link>
                        </div> */}
                        <ul className="">
                            <li><Link to="/lenguage" className="text-[#FFEAD1] hover:text-primary transition-colors"><Globe /></Link></li>
                        </ul>
                    </div>
                </nav>
            </header>
            <main className="w-full">
                <Outlet />
            </main>
            <footer className="mt-12 w-full bg-[#1E0523]">
                <div className="max-w-[1300px] h-[430px] text-neutral mx-auto px-4 sm:px-6 py-6 flex flex-col justify-between gap-3 text-sm text-center md:text-left">
                    <div className="flex items-center justify-between py-10 h-[436px] w-full gap-[64px]  items-start">
                        <div className="flex flex-col gap-[23px] w-[156px]">
                            <div className="flex flex-col">
                                <div className="flex justify-start">
                                    <img
                                        src={isologocol}
                                        alt="SkillUp"
                                        className="h-[108px] w-[97.7px]"
                                        width={98}
                                        height={108}
                                        loading="lazy"
                                        decoding="async"
                                    />
                                </div>
                                <p className="font-secondary font-bold text-[14px] leading-[19.6px]">
                                    New skills, <br></br>new opportunities
                                </p>
                            </div>

                            <nav aria-label="Redes sociales">
                                <ul className="flex gap-[10px] h-[25.5px]">
                                    <li>
                                        <a
                                            href="https://linkedin.com"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            aria-label="LinkedIn de SkillUp"
                                        >
                                            <span className="icon-[mdi--linkedin] text-[25.5px]" aria-hidden="true" />
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href="https://instagram.com"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            aria-label="Instagram de SkillUp"
                                        >
                                            <span className="icon-[mdi--instagram] text-[25.5px]" aria-hidden="true" />
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href="https://youtube.com"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            aria-label="YouTube de SkillUp"
                                        >
                                            <span className="icon-[mdi--youtube] text-[25.5px]" aria-hidden="true" />
                                        </a>
                                    </li>
                                </ul>
                            </nav>
                        </div>

                        <div className="flex w-[891px] font-secondary font-bold justify-between">
                            <nav aria-label="Nuestro campus" className="flex flex-col w-[156px] gap-[20px]">
                                <h3 className="text-primary text-[20px] leading-[19.6px]">Our Campus</h3>
                                <ul className="text-[14px] flex flex-col gap-[14px]">
                                    <li><Link to="/campus/artificial Intelligence" className="text-[#FFEAD1] hover:text-primary">Artificial Intelligence</Link></li>
                                    <li><Link to="/campus/programming-and-Development" className="text-[#FFEAD1] hover:text-primary">Programming and Development</Link></li>
                                    <li><Link to="/campus/digital Marketing" className="text-[#FFEAD1] hover:text-primary">Digital Marketing</Link></li>
                                    <li><Link to="/campus/ux-ui-design" className="text-[#FFEAD1] hover:text-primary">UX/UI Design</Link></li>
                                    <li><Link to="/campus/project-management" className="text-[#FFEAD1] hover:text-primary">Project Management</Link></li>
                                </ul>
                            </nav>

                            <nav aria-label="Explorá" className="flex flex-col w-[156px] gap-[20px]">
                                <h3 className="text-primary text-[20px] leading-[19.6px]">Explore</h3>
                                <ul className="text-[14px] flex flex-col gap-[14px] ">
                                    <li><Link to="/courses" className="text-[#FFEAD1] hover:text-primary">Courses</Link></li>
                                    <li><Link to="/careers" className="text-[#FFEAD1] hover:text-primary">Careers</Link></li>
                                    <li><Link to="/certifications" className="text-[#FFEAD1] hover:text-primary">Certifications</Link></li>
                                    <li><Link to="/resources" className="text-[#FFEAD1] hover:text-primary">Resources</Link></li>
                                    <li><Link to="/about Us" className="text-[#FFEAD1] hover:text-primary">About Us</Link></li>
                                </ul>
                            </nav>

                            <nav aria-label="Ayuda" className="flex flex-col w-[156px] gap-[20px]">
                                <h3 className="text-primary text-[20px] leading-[19.6px]">Help</h3>
                                <ul className="text-[14px] flex flex-col gap-[14px]">
                                    <li><Link to="/help" className="text-[#FFEAD1] hover:text-primary">Help Center</Link></li>
                                    <li><Link to="/terms-and-Conditions" className="text-[#FFEAD1] hover:text-primary">Terms and Conditions</Link></li>
                                    <li><Link to="/privacy" className="text-[#FFEAD1] hover:text-primary">Privacy</Link></li>
                                    <li><Link to="/contact" className="text-[#FFEAD1] hover:text-primary">Contact</Link></li>
                                </ul>
                            </nav>

                            <div className="flex flex-col w-[231px] gap-[20px]">
                                <h3 className="text-primary text-[20px] font-bold leading-[19.6px]">
                                    Subscribe and get the latest news
                                </h3>
                                <p className="font-secondary text-[14px] font-medium text-[#9A9CA0]">
                                    courses, resources, and opportunities for your professional development.
                                </p>
                                <form
                                    onSubmit={(e) => e.preventDefault()}
                                    className="relative w-[231px] h-[39.69px]"
                                >
                                    <label htmlFor="newsletter-email" className="sr-only">
                                        Email address to receive updates
                                    </label>
                                    <Mail
                                        className="absolute left-3 top-1/2 -translate-y-1/2 w-[16px] h-[16px] text-dark pointer-events-none"
                                        aria-hidden="true"
                                    />
                                    <input
                                        id="newsletter-email"
                                        type="email"
                                        name="email"
                                        placeholder="Tu email"
                                        autoComplete="email"
                                        className="w-full h-full pl-10 pr-3 rounded-full bg-neutral border border-[#3A1A40] text-[14px] font-secondary text-black placeholder:text-[#9A9CA0] placeholder:font-normal outline-none"
                                    />
                                </form>
                            </div>
                        </div>
                    </div>

                    <div className="flex border-[#E1E1E1] border-t-1 items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="flex items-center">
                                <img
                                    src={isologoflex}
                                    alt="SkillUp"
                                    className="h-[41px] w-[143px]"
                                    width={143}
                                    height={41}
                                    loading="lazy"
                                    decoding="async"
                                />
                            </div>
                            <p className="text-[#FFEAD1] font-normal text-[10.13px]">
                                &copy; 2026 Skillup. All rights reserved
                            </p>
                        </div>

                        <nav aria-label="Selector de idioma">
                            <ul className="gap-[22px] ">
                                <li>
                                    <Link
                                        to="/lenguage"
                                        className=""
                                        aria-label="Cambiar idioma"
                                    >
                                        <Globe aria-hidden="true" className="text-[#FFEAD1] hover:text-primary transition-colors" />
                                    </Link>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </footer>
        </div>
    );
}