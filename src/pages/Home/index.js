import style from './Home.module.scss';
import classNames from 'classnames/bind';
import { useState, useEffect, createContext } from 'react';
import { Navigate } from 'react-router-dom';
import usersApi from '@/Api/usersAPi';
import staffsApi from '@/Api/staffsApi';
import { HandleHome } from './HandleHome';
const cx = classNames.bind(style);
export const DataContext = createContext();
function Home() {
    // const i = 0;
    const [error, setError] = useState();
    const [isLoaded, setIsLoaded] = useState(false);
    const [staffs, setStaffs] = useState();
    const [users, setUsers] = useState();

    useEffect(() => {
        const fetchUsersList = async () => {
            try {
                const response = await usersApi.getAll();
                setUsers(response.data);
                setIsLoaded(true);
                console.log('users', response);
            } catch (error) {
                console.log('fai', error);
                setIsLoaded(true);
                setError(error);
            }
        };
        fetchUsersList();
    }, []);

    useEffect(() => {
        const fetchStaffsList = async () => {
            try {
                const response = await staffsApi.getAll();
                setStaffs(response.data);
                console.log('staffs', response);
            } catch (error) {
                console.log('fai', error);
                setIsLoaded(true);
                setError(error);
            }
        };
        fetchStaffsList();
    }, []);

    //

    if (!sessionStorage.getItem('accessToken')) {
        return <Navigate to="/login" />;
    } else if (error) {
        console.log('failse');
    } else if (!isLoaded) {
        console.log('loading...');
    } else if (staffs && users)
        return (
            <DataContext.Provider value={{ staffs, users }}>
                <div className={cx('container')}>
                    <ul className={cx('header')}>
                        <li>
                            <h3 className={cx('cash-counter')}>Quầy số {staffs[0].id}</h3>
                        </li>
                        <li>
                            <h3 className={cx('fullname-staff')}>Họ và tên: {staffs[0].full_name}</h3>
                        </li>
                        <li>
                            <h3 className={cx('position-staff')}>Chức vụ: {staffs[0].position}</h3>
                        </li>
                        <li>
                            <h3>Số người còn lại: {users.length}</h3>
                        </li>
                    </ul>
                </div>
                <HandleHome />
            </DataContext.Provider>
        );
}

export default Home;
