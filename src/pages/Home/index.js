import style from './Home.module.scss';
import classNames from 'classnames/bind';
import { useState, useEffect, createContext } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
// import usersApi from '@/Api/usersAPi';
import staffsApi from '@/Api/staffsApi';
import customersApi from '@/Api/customers';
import { HandleHome } from './HandleHome';

const cx = classNames.bind(style);
export const DataContext = createContext();
function Home() {

    const navigate = useNavigate();
    const [error, setError] = useState();
    const [isLoaded, setIsLoaded] = useState(false);
    const [staffs, setStaffs] = useState();
    const [customers, setCustomers] = useState();
    const [newCustomer, setNewCustomer] = useState();
    const [isStart, setIsStart] = useState(true);
    const id_staff = sessionStorage.getItem('accessToken');
    // const [users, setUsers] = useState();
    
    // useEffect(() => {
    //     const fetchUsersList = async () => {
    //         try {
    //             const response = await usersApi.getAll();
    //             setUsers(response.data);
    //             setIsLoaded(true);
    //             console.log('users', response);
    //         } catch (error) {
    //             console.log('failed', error);
    //             setIsLoaded(true);
    //             setError(error);
    //         }
    //     };
    //     fetchUsersList();
    // }, [isLoaded]);

    useEffect(() => {
        const fetchStaffsList = async () => {
            try {
                const response = await staffsApi.getAll();
                setStaffs(response.data);
                console.log('staffs', response);
            } catch (error) {
                console.log('failed', error);
                // setIsLoaded(true);
                setError(error);
            }
        };
        fetchStaffsList();
    }, []);


    useEffect(() => {
        const fetchCustomersList = async () => {
            try {
                const response = await customersApi.getAll();
                setCustomers(response.data);
                console.log('customers', response);
                setIsLoaded(true);
            } catch (error) {
                console.log('failed', error);
                setError(error);
            }
        };
        fetchCustomersList();
    }, [isLoaded]);

    useEffect( () => {
        setIsLoaded(true);
        const fetchnewCus = async () => {
            // try {
                const response =await fetch(`http://localhost:5001/api/customers/${id_staff}`)
                const data = await response.json();
                setNewCustomer(data);
                console.log('newCustomers', newCustomer);
            // }
            // catch (err) {
            //     console.log('failed', err);
            //     setError(err);
            // }
      
        }
        fetchnewCus();
    }, [isLoaded]);

    function SetIsStart({setIsLoaded}) {

        const handleStart = async() => {
            setIsStart(false);
            setIsLoaded(true); 
            console.log('newCustomers', newCustomer);
            const option2 = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json'},
                Credentials: 'omit',
                body: JSON.stringify({
                    status: 3,
                    next: 0,
                    id: customers[0].id,
                    id_staff: id_staff
                })
        };
        await fetch('http://localhost:5001/api/customers/update' , option2)
   
                   
        }

        return (<div className={cx('btn-start')} onClick={handleStart} >Bắt đầu</div>)
    } 

    // Logout
    const logout = () => {
        sessionStorage.removeItem('accessToken');
        navigate('/login', { replace: true });
    };

    if (!sessionStorage.getItem('accessToken')) {
        return <Navigate to="/login" />;
    } else if (error) {
        console.log('failse');
    }
    // else if (!isLoaded) {
    //         console.log('loading...')
    // }
     else if (staffs  && customers)
        return (
            <DataContext.Provider value={{ newCustomer,isLoaded, setIsLoaded, setNewCustomer}}>
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

                { isStart ? <SetIsStart setIsLoaded= {setIsLoaded}/> : <HandleHome />}
            </DataContext.Provider>
        );
}

export default Home;
