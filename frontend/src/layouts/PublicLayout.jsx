import { Link, Outlet } from "react-router-dom";

export const PublicLayout = () => {
    return (
        <div className="min-h-screen flex flex-col bg-white text-dark font-secondary">
            <header className="border-b border-neutral">
                <nav className="max-w-6xl mx-auto flex flex-wrap md:flex-nowrap items-center px-4 sm:px-6 py-3 sm:py-4 gap-x-6 gap-y-3">
                    <Link to="/" className="font-primary font-bold text-lg sm:text-xl text-primary tracking-tight">SkillUp Campus</Link>
                    <ul className="order-last md:order-0 md:flex items-center w-full md:w-auto gap-8 md:ml-16 text-sm font-medium">
                        <li><Link to="/courses" className="hover:text-primary transition-colors">Courses</Link></li>
                    </ul>
                    <div className="ml-auto flex items-center gap-4 text-sm font-medium">
                        <Link to="/login" className="hover:text-primary transition-colors">Login</Link>
                        <Link to="/signup"
                            className="bg-accent text-white px-3 sm:px-4 py-2 rounded-4xl hover:opacity-90 transition-opacity">
                            Sign Up
                        </Link>
                    </div>
                </nav>
            </header>
            <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-8: sm:py-12">
                <Outlet />
            </main>
            <footer className="border-t border-neutral mt-12">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-3 text-sm text-center md:text-left">
                    <p className="text-dark">© SkillUp Campus</p>
                </div>
            </footer>
        </div>
    );
}