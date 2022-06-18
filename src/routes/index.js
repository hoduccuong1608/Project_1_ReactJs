import Home from '@/pages/Home';
import Form from '@/pages/Form';
import Login from '@/pages/Login';

const publicRoutes = [
    { path: '/', compoment: Home },
    { path: '/form', compoment: Form },
    { path: '/login', compoment: Login },
];
// export const praviteRoutes = [{ path: '/', compoment: Home }];
export { publicRoutes };
