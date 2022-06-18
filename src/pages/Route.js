import { Route, Routes, Navigate } from 'react-router-dom';
import Home from './Home';
import Login from './Login';
import Form from './Form';
import DefaultLayout from '@/compoments/Layout/DefaultLayout';

export const RouteViews = () => {
    return (
        <DefaultLayout>
            <Routes>
                <Route
                    path="/"
                    render={() => {
                        return sessionStorage.getItem('accessToken') ? <Home /> : <Navigate to="/login" />;
                    }}
                />
                <Route path="/form" element={<Form />} />
                <Route path="/login" element={<Login />} />
            </Routes>
        </DefaultLayout>
    );
};
