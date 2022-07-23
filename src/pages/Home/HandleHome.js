import style from './Home.module.scss';
import classNames from 'classnames/bind';
import { DataContext } from '.';
import { useContext, useState } from 'react';
const cx = classNames.bind(style);

export const HandleHome = () => {

    const [users, setUsers] = useState();
    const data = useContext(DataContext);
    // const users = data.users;
    const id_staff = sessionStorage.getItem('accessToken');  
    const setIsLoaded = data.setIsLoaded;
    const setCustomer = data.setNewCustomer;
    const customer = data.newCustomer;
    const [isAccept, setIsAccept] = useState(false);

    
  


    if (!isAccept && customer) {
        return <BoxNumber obj={{ setUsers,setIsLoaded, setIsAccept, setCustomer, isAccept, users, customer, id_staff}} />;
    } else if (isAccept && users) {
        return <BoxUser obj={{  setUsers, setIsLoaded, setIsAccept, setCustomer, isAccept, users, customer, id_staff}} />;
    }
};

const BoxNumber = ({ obj }) => {

    const handleAccept = async  () => {
        obj.setIsAccept(true);
        // obj.setIsLoaded(false);
        await fetch(`http://localhost:5001/api/users/${obj.customer[0].id}`)
        .then(res => res.json())
        .then(res => obj.setUsers(res));
    };

    const handleNext = async () => {
        obj.setIsAccept(false);
        obj.setIsLoaded(false);
        console.log('accept', obj.isAccept);
        const option1 = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json'},
                Credentials: 'omit',
                body: JSON.stringify({
                    status: 2,
                    next: 0,
                    id: obj.customer[0].id,
                    id_staff: obj.id_staff
                })
        };
        await fetch('http://localhost:5001/api/customers/update', option1)
        //  await fetch(`http://localhost:5001/api/customers/${obj.id_staff}`, option1)
        //  .then(res => res.json())
        //  .then(res => obj.setCustomer(res));
    };

    // console.log('index', obj.index);
    console.log('accept', obj.isAccept);
    return (
        <div>
            <div className={cx('menu')}>
                <ul className={cx('box-number')}>
                    <li className={cx('number-screen')}>{obj.customer[0].id}</li>
                    <li>Số tiếp theo</li>
                </ul>
            </div>
            <div className={cx('btn-menu')}>
                <div>
                    <button onClick={handleAccept} className={cx('btn-accept')}>
                        Chấp nhận
                    </button>
                </div>
                <div>
                    <button onClick={handleNext} className={cx('btn-next')}>
                        Tiếp theo
                    </button>
                </div>
            </div>
        </div>
    );
};

const BoxUser = ({ obj }) => {
    const handleDone = async () => {

            obj.setIsAccept(false);
            obj.setIsLoaded(false);
            const option2 = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json'},
                Credentials: 'omit',
                body: JSON.stringify({
                    status: 1,
                    next: 0,
                    id: obj.customer[0].id,
                    id_staff: obj.id_staff
                })
        };
            await fetch('http://localhost:5001/api/customers/update' , option2)
            // await fetch(`http://localhost:5001/api/customers/${obj.id_staff}`)
            //        .then(res => res.json())
            //        .then(res => obj.setCustomer(res));
    };
    // console.log('index', obj.index);
    console.log('accept', obj.isAccept);
    return (
        <div className={cx('main-content')}>
            <h2 className={cx('title-menu')}>Thông tin khách hàng</h2>
            <div className={cx('box-process')}>
                <div className={cx('infor-user')}>
                    <div>Số thứ tự: {obj.customer[0].id}</div>

                    <div>Họ và tên: {obj.users[0].full_name}</div>

                    <div>Số tài khoản: {obj.users[0].accout_number}</div>

                    <div>Số CCCD: {obj.users[0].id_number}</div>

                    <div>Ngày cấp: {obj.users[0].id_date}</div>

                    <div>Số điện thoại: {obj.users[0].phone_number}</div>

                    <div>Số tiền: {obj.users[0].money}</div>
                </div>
            </div>

            <button onClick={handleDone} className={cx('btn-done')}>
                Xong
            </button>
        </div>
    );
};
