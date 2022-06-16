import style from './Home.module.scss';
import classNames from 'classnames/bind';
import { useNavigate } from 'react-router-dom';
const cx = classNames.bind(style);
function Home() {
    let history = useNavigate();
    const logout = () => {
        localStorage.removeItem('accessToken', false);
        history('/login', { replace: true });
    };
    return (
        <div>
            <h2>Helo</h2>
            <button onClick={logout}>Logtout</button>
        </div>
    );
}

export default Home;
