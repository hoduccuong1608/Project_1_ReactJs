import style from './Screen.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(style);
export default function Screen() {


    return (
        <div>
            <div className={cx('box-screen')}>
                <div className={cx('next')}>Số tiếp theo: </div>
                <div className={cx('next')}>Quầy số: </div>
            </div>
        </div>
    );
    
}
