import style from './Login.module.scss';
import classNames from 'classnames/bind';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
// import { parse, stringify, toJSON, fromJSON } from 'flatted';
const cx = classNames.bind(style);

export default function Login() {
    const navigate = useNavigate();
    const [username, setUserName] = useState();
    const [password, setPassWord] = useState();

    // const setParams = (event) => {
    //     event.preventDefault();
    //     if (event.target.name === 'user-name') {
    //         setUserName(event.target.value);
    //     }
    //     if (event.target.name === 'pass-word') {
    //         setPassWord(event.target.value);
    //     }
    // };
    const handleSubmit = async(e) => {
        // const urlencoded = new URLSearchParams();
        // urlencoded.append('user_name', username);
        // urlencoded.append('pass_word', password);
        e.preventDefault();
        console.log(username, password);
        const requestOptions = {
            method: 'POST',
            // headers: { 'Content-Type': 'application//x-www-form-urlencoded' },
            headers: { "Content-Type" : 'application/json' },
            credentials: 'omit',
            body: JSON.stringify({username: username, password: password}),
            // redirect: 'follow',
        };
        try {
            const response = await fetch('http://localhost:5000/api/login', requestOptions)
            const data = await response.json();
            console.log(data.response[0].id_staff);
            sessionStorage.setItem('accessToken', data.response[0].id_staff);
            navigate('/', { replace: true });

        } catch(err) {
            console.log(err);
            alert('Username, password are wrong');
          }

        // .then((response) => {
        //     console.log(response);
        //     if (response.ok) {
        //         return response.json();
        //     }
        //     throw new Error(response.status);
        // })
        // .then((result) => {
        //     console.log(result.id);
        //     sessionStorage.setItem('accessToken', result.id);
        //     navigate('/', { replace: true });
        // })
        // .catch((error) => {
        //     console.log('error', error);
        //     alert('Username, password are wrong');
        // });
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
                        onChange={e => setUserName(e.target.value)}
                        autocompletetype="off"
                        placeholder="Tên đăng nhập"
                    />

                    <input
                        type="password"
                        name="pass-word"
                        className={cx('form-login')}
                        onChange={e => setPassWord(e.target.value)}
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
