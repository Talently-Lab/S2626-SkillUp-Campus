import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "../pages/Home";
import { Courses } from "../pages/Courses";
import { CourseDetail } from "../pages/CourseDetail";
import { PublicLayout } from "../layouts/PublicLayout";
import { AuthLayout } from "../layouts/AuthLayout";
import { Login } from "../pages/Login";
import { SignUp } from "../pages/SignUp";
import { UserDashboard } from "../pages/UserDashboard";
import { AdminLayout } from "../layouts/AdminLayout";
import { AdminCourses } from "../pages/admin/AdminCourses";
import { AdminUsers } from "../pages/admin/AdminUsers";
import { NotFound } from "../pages/NotFound";
import { UserLayout } from "../layouts/UserLayout";

export const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<PublicLayout />}>
                    <Route path="/" element={<Home />} />
                    <Route path="/courses" element={<Courses />} />
                    <Route path="/courses/:id" element={<CourseDetail />} />
                </Route>

                <Route element={<AuthLayout />}>
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<SignUp />} />
                </Route>

                <Route element={<UserLayout />}>
                    <Route path="/dashboard" element={<UserDashboard />} />
                </Route>

                <Route element={<AdminLayout />}>
                    <Route path="/admin/courses" element={<AdminCourses />} />
                    <Route path="/admin/users" element={<AdminUsers />} />
                </Route>

                <Route path="*" element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    );
}