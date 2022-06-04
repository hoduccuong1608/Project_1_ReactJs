import style from './Login.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(style);

function Login() {
    return (
        <div className={cx('menu-login')}>
            <div className={cx('title-login')}>
                <h2>BIDV</h2>
            </div>
            <div className={cx('box-login')}>
                <input
                    type="text"
                    className={cx('form-login')}
                    name="user-name"
                    autocompletetype="off"
                    placeholder="Tên đăng nhập"
                />

                <input
                    type="password"
                    name="pass-word"
                    className={cx('form-login')}
                    autocompletetype="current-password"
                    placeholder="Mật khẩu"
                />
            </div>
            <button type="button" className={cx('btn-login')}>
                Đăng nhập
            </button>
        </div>
    );
}

export default Login;
