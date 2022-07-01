import style from './Screen.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(style);
export default function Screen() {
    return (
        <div>
            <div className={cx('box-screen')}>
                <div>So tiep theo</div>
                <div>Quay so</div>
            </div>
        </div>
    );
}
