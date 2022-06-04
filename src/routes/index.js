import Menu from '@/pages/Menu';
import FormInput from '@/pages/FormInput';
import Login from '@/pages/Login';

const publicRoutes = [
    { path: '/', compoment: Menu },
    { path: '/form', compoment: FormInput },
    { path: '/login', compoment: Login },
];

// const privateRoutes = [{ path: '/login', compoment: Login }];

export { publicRoutes };
