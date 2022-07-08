import style from './Home.module.scss';
import classNames from 'classnames/bind';
import { DataContext } from '.';
import { useContext, useRef, useState } from 'react';
const cx = classNames.bind(style);

export const HandleHome = () => {
    const i = useRef(0);

    const data = useContext(DataContext);
    const users = data.users;
    const setIsLoaded = data.setIsLoaded;
    const id_staff = sessionStorage.getItem('accessToken');
    const customers = data.customers;
    const [index, setIndex] = useState(i.current);

    const [isAccept, setIsAccept] = useState(false);

    if (!isAccept) {
        return <BoxNumber obj={{ index, setIndex, isAccept, setIsAccept, users, customers, id_staff, setIsLoaded}} />;
    } else if (isAccept) {
        return <BoxUser obj={{ index, setIndex, isAccept, setIsAccept, users, customers, id_staff, setIsLoaded}} />;
    }
};

const BoxNumber = ({ obj }) => {
    const handleAccept = () => {
        obj.setIsAccept(true);
        const options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            Credentials: 'omit',
            body: JSON.stringify({
                status: 1,
                id: obj.customers[obj.index].id,
                id_staff: obj.id_staff
            })
    };
        fetch('http://localhost:5000/api/insert' , options)
        .then(obj.setIsLoaded(false));
    };

    const handleNext = () => {
        obj.setIndex(obj.index + 1);
        obj.setIsAccept(false);

        const options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            Credentials: 'omit',
            body: JSON.stringify({
                status: 2,
                id: obj.customers[obj.index].id,
                id_staff: obj.id_staff
            })
    };
        fetch('http://localhost:5000/api/insert' , options)
        .then(obj.setIsLoaded(false));
    };

    // console.log('index', obj.index);
    // console.log('accept', obj.isAccept);
    return (
        <div>
            <div className={cx('menu')}>
                <ul className={cx('box-number')}>
                    <li className={cx('number-screen')}>{obj.customers[0].id}</li>
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
    const handleDone = () => {
        // var promise = new Promise((resolve, reject) => {
        //     resolve();
        // }).then(() => {
            obj.setIndex(obj.index + 1);
            obj.setIsAccept(false);
        // })
    };
    // console.log('index', obj.index);
    // console.log('accept', obj.isAccept);
    return (
        <div className={cx('main-content')}>
            <h2 className={cx('title-menu')}>Thông tin khách hàng</h2>
            <div className={cx('box-process')}>
                <div className={cx('infor-user')}>
                    <div>Số thứ tự: {obj.users[obj.index].id}</div>

                    <div>Họ và tên: {obj.users[obj.index].full_name}</div>

                    <div>Số tài khoản: {obj.users[obj.index].accout_number}</div>

                    <div>Số CCCD: {obj.users[obj.index].id_number}</div>

                    <div>Ngày cấp: {obj.users[obj.index].id_date}</div>

                    <div>Số điện thoại: {obj.users[obj.index].phone_number}</div>

                    <div>Số tiền: {obj.users[obj.index].money}</div>
                </div>
            </div>

            <button onClick={handleDone} className={cx('btn-done')}>
                Done
            </button>
        </div>
    );
};
