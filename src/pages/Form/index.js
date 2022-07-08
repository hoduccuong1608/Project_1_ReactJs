import style from './Form.module.scss';
import classNames from 'classnames/bind';
import { useState } from 'react';

const cx = classNames.bind(style);

function Form() {

    const [accoutnumber , setAccoutNumber] = useState();
    const handleSubmit = async(e) => {
        e.preventDefault();
        const OPTIONS = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            Credentials: 'omit',
            body: JSON.stringify({
                accoutnumber: accoutnumber
            })
    };

    try {
        const response = await fetch('http://localhost:5000/api/customer', OPTIONS);
        const data = await response.json();
        console.log(data.id);
    } catch(err) {
        console.log(err);
        alert('Số tài khoản không đúng, vui lòng nhập lại');
      }
}
    return (
        <div className={cx('container')}>
            <div className={cx('top-content')}>
                <h2 className={cx('name-content')}>Biểu mẫu đăng ký rút tiền Ngân hàng BIDV</h2>
                <p className={cx('request')}>Quý khách vui lòng điền đầy đủ thông tin</p>
                <span className={cx('liner')}></span>
            </div>
            <div id="bottom-content">
                <form action="">
                    <div className={cx('form-group')}>
                        <label className={cx('title-input')}>Số tài khoản</label>
                        <div className={cx('box-input')}>
                            <input type="text" className={cx('form-control')} id="accout_number" name="accout_number" onChange={e => setAccoutNumber(e.target.value)} />
                        </div>
                    </div>

                    <div className={cx('form-group')}>
                        <label className={cx('title-input')}>Họ và tên</label>
                        <div className={cx('box-input')}>
                            <input type="text" className={cx('form-control')} id="full_name" name="full_name" />
                        </div>
                    </div>

                    <div className={cx('form-group')}>
                        <label className={cx('title-input')}>Số CCCD</label>
                        <div className={cx('box-input')}>
                            <input type="text" className={cx('form-control')} id="id_number" name="id_number" />
                        </div>
                    </div>

                    <div className={cx('form-group')}>
                        <label className={cx('title-input')}>Ngày cấp</label>
                        <div className={cx('box-input')}>
                            <input type="date" className={cx('form-control')} id="id_date" name="id_date" />
                        </div>
                    </div>

                    <div className={cx('form-group')}>
                        <label className={cx('title-input')}>Số điện thoại</label>
                        <div className={cx('box-input')}>
                            <input type="text" className={cx('form-control')} id="phone_number" name="phone_number" />
                        </div>
                    </div>

                    <div className={cx('form-group')}>
                        <label className={cx('title-input')}>Số tiền</label>
                        <div className={cx('box-input')}>
                            <input type="text" className={cx('form-control')} name="value" placeholder="VND" />
                        </div>
                    </div>

                    <div className={cx('form-group')}>
                        <div className={cx('box-input')}>
                            <button onClick={handleSubmit} type="button" className={cx('btn-send')}>
                                Gửi
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Form;
