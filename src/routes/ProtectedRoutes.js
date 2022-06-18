import { useContext } from 'react';
import { useLocation } from 'react-router';
import { Navigate, Outlet } from 'react-router-dom';
import { TokenContext } from '@/App';

const useAuth = () => {
    const { token } = useContext(TokenContext);
    return token && token.token;
};

const ProtectedRoutes = () => {
    const location = useLocation();
    const isAuth = useAuth();
    return isAuth ? <Outlet /> : <Navigate to="/login" replace state={{ from: location }} />;
};

export default ProtectedRoutes;
