import style from './Home.module.scss';
import classNames from 'classnames/bind';
import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import usersApi from '@/Api/usersAPi';
import staffsApi from '@/Api/staffsApi';
const cx = classNames.bind(style);

function Home() {
    const i = 1;
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
                console.log(response);
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
                console.log(response);
            } catch (error) {
                console.log('fai', error);
                setIsLoaded(true);
                setError(error);
            }
        };
        fetchStaffsList();
    }, []);

    function accept() {}
    if (!sessionStorage.getItem('accessToken')) {
        return <Navigate to="/login" />;
    } else if (error) {
        console.log('failse');
    } else if (!isLoaded) {
        console.log('loading...');
    } else if (staffs && users)
        return (
            <div>
                <div className={cx('container')}>
                    <div className={cx('staff-header')}>
                        <h2 className={cx('cash-counter')}>Quầy số {staffs[0].id}</h2>
                        <ul className={cx('infor-staff')}>
                            <li>Họ và tên: {staffs[0].full_name}</li>
                            <li>Chức vụ: {staffs[0].position}</li>
                        </ul>
                        <div className={cx('clear')}></div>
                    </div>
                </div>
                <div className={cx('box-accept')}>
                    <div className={cx('number-screnn')}>{users[i].id}</div>
                    <button onClick={accept} className={cx('accept')}>
                        Accept
                    </button>
                </div>
            </div>
        );
}

export default Home;
