import '../assets/css/Home.css'
import CounterContainer from '../redux/CounterContainer';

const Home = () => {
    return (
        <div>
            <div className="banner">
                banner 영역
            </div>

            <div className="info">
                JDEX 간단 소개 영역
            </div>

            <br />
            <div className="wbtn">
                <p>wallet 연결 버튼</p>
                <CounterContainer />
            </div>
        </div>

    );
};

export default Home;