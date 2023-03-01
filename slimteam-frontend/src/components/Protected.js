import { Navigate, Outlet } from "react-router-dom";

export default function Protected({user,loading}) {
    return <>{!loading && <>{user ? <Outlet /> : <Navigate to="/login" />}</>}</>;
}
