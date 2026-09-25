import { Link, Outlet } from "react-router-dom";

export const AdminLayout = () => {
    return (
        <>
            <aside>
                <div>admin</div>
                <div>
                    <nav>
                        <ul>
                            <li><Link to="/admin/courses">Cursos</Link></li>
                            <li><Link to="/admin/users">Usuarios</Link></li>
                        </ul>
                    </nav>
                </div>
            </aside>
            <main>
                <Outlet />
            </main>
        </>
    );
}