import style from './Login.module.scss';
import classNames from 'classnames/bind';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const cx = classNames.bind(style);

export default function Login() {
    const navigate = useNavigate();
    const [username, setUserName] = useState('');
    const [password, setPassWord] = useState('');

    const setParams = (event) => {
        event.preventDefault();
        if (event.target.name === 'user-name') {
            setUserName(event.target.value);
        }
        if (event.target.name === 'pass-word') {
            setPassWord(event.target.value);
        }
    };
    const handleSubmit = () => {
        var myHeaders = new Headers();
        myHeaders.append('Content-type', 'application/x-www-form-urlencoded');

        var urlencoded = new URLSearchParams();
        urlencoded.append('user_name', username);
        urlencoded.append('pass_word', password);

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: urlencoded,
            redirect: 'follow',
        };
        fetch('http://localhost:8080/login', requestOptions)
            .then((res) => {
                console.log(res);
                if (res.ok) {
                    return res.json();
                }
                throw new Error(res.status);
            })
            .then((result) => {
                console.log(result);
                sessionStorage.setItem('accessToken', result.accessToken);
                navigate('/', { replace: true });
            })
            .catch((error) => {
                console.log('error', error);
                alert('Username, password are wrong');
            });
    };

    return (
        <div className={cx('menu-login')}>
            <div className={cx('title-login')}>
                <h2>BIDV</h2>
            </div>
            <form>
                <div className={cx('box-login')}>
                    <input
                        type="text"
                        className={cx('form-login')}
                        name="user-name"
                        onChange={setParams}
                        autocompletetype="off"
                        placeholder="Tên đăng nhập"
                    />

                    <input
                        type="password"
                        name="pass-word"
                        className={cx('form-login')}
                        onChange={setParams}
                        autocompletetype="current-password"
                        placeholder="Mật khẩu"
                    />
                </div>
                <button onClick={handleSubmit} type="button" className={cx('btn-login')}>
                    Đăng nhập
                </button>
            </form>
        </div>
    );
}
