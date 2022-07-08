import style from './Home.module.scss';
import classNames from 'classnames/bind';
import { useState, useEffect, createContext } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import usersApi from '@/Api/usersAPi';
import staffsApi from '@/Api/staffsApi';
import customersApi from '@/Api/customers';
import { HandleHome } from './HandleHome';
const cx = classNames.bind(style);
export const DataContext = createContext();
function Home() {
    // const i = 0;
    const navigate = useNavigate();
    const [error, setError] = useState();
    const [isLoaded, setIsLoaded] = useState(false);
    const [staffs, setStaffs] = useState();
    const [users, setUsers] = useState();
    const [customers, setCustomers] = useState();
    const id_staff = sessionStorage.getItem('accessToken');

    useEffect(() => {
        const fetchUsersList = async () => {
            try {
                const response = await usersApi.getAll();
                setUsers(response.data);
                setIsLoaded(true);
                console.log('users', response);
            } catch (error) {
                console.log('failed', error);
                setIsLoaded(true);
                setError(error);
            }
        };
        fetchUsersList();
    }, [isLoaded]);

    useEffect(() => {
        const fetchStaffsList = async () => {
            try {
                const response = await staffsApi.getAll();
                setStaffs(response.data);
                console.log('staffs', response);
            } catch (error) {
                console.log('failed', error);
                setIsLoaded(true);
                setError(error);
            }
        };
        fetchStaffsList();
    }, [isLoaded]);


    useEffect(() => {
        const fetchCustomersList = async () => {
            try {
                const response = await customersApi.getAll();
                setCustomers(response.data);
                console.log('customers', response);
            } catch (error) {
                console.log('failed', error);
                setIsLoaded(true);
                setError(error);
            }
        };
        fetchCustomersList();
    }, [isLoaded]);
    // Logout
    const logout = () => {
        sessionStorage.removeItem('accessToken');
        navigate('/login', { replace: true });
    };

    if (!sessionStorage.getItem('accessToken')) {
        return <Navigate to="/login" />;
    } else if (error) {
        console.log('failse');
    } else if (!isLoaded) {
        console.log('loading...');
    } else if (staffs && users && customers)
        return (
            <DataContext.Provider value={{ staffs, users, customers, setIsLoaded }}>
                <div className={cx('container')}>
                    <ul className={cx('header')}>
                        <li>
                            <h3 className={cx('cash-counter')}>Quầy số {id_staff}</h3>
                        </li>
                        <li>
                            <h3 className={cx('fullname-staff')}>Họ và tên: {staffs[id_staff-1].full_name}</h3>
                        </li>
                        <li>
                            <h3 className={cx('position-staff')}>Chức vụ: {staffs[id_staff-1].position}</h3>
                        </li>
                        <li>
                            <h3>Số người còn lại: {customers.length}</h3>
                        </li>
                        <li>
                            <button className={cx('btn-logout')} onClick={logout}>
                                Đăng xuất
                            </button>
                        </li>
                    </ul>
                </div>

                <HandleHome />
            </DataContext.Provider>
        );
}

export default Home;
