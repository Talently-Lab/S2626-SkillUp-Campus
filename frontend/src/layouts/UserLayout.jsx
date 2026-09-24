import { Outlet } from "react-router-dom";

export const UserLayout = () => {
    return (
        <>
            <header>
                <div>Panel de usuario</div>
            </header>
            <main>
                <Outlet />
            </main>
        </>
    );
}