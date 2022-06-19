import style from './Header.module.scss';
import classNames from 'classnames/bind';
import logo from '@/assets/img/logo.png';

const cx = classNames.bind(style);
function Header() {
    return (
        <header className={cx('header')}>
            <a href="http://localhost:3000/" title="BIDV">
                <img src={logo} alt="BIDV" className={cx('logo')} />
            </a>
            <p className={cx('namebank')}>Ngân hàng Thương mại cổ phần Đầu tư và Phát triển Việt Nam</p>
        </header>
    );
}

export default Header;
