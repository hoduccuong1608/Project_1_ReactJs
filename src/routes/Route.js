import { Route, Routes } from 'react-router-dom';
import Login from '../pages/Login';
import Form from '../pages/Form';
import Home from '@/pages/Home';
import Screen from '@/pages/Screen';
import DefaultLayout from '@/compoments/Layout/DefaultLayout';

export const RouteViews = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/form" element={<Form />} />
            <Route path="/login" element={<Login />} />
            <Route path="/screen" element={<Screen />} />
        </Routes>
    );
};
