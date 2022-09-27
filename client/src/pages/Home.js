import '../assets/css/Home.css'
import '../assets/JDEX.png'
import CounterContainer from '../redux/CounterContainer';

const Home = () => {
    return (
        <div>
            <div className="banner">
                banner 영역
            </div>

            <div className="info">
                JDEX 간단 소개 영역
                <img className='jimg' src='../assets/JDEX.png'/>
            </div>

            <br />
            <div className="wbtn">
                <div className="wb">
                    <h5 className='wc'>JDEX 이용을 위해</h5>
                    <h4 className='wc'>지갑을 연결 해주세요!</h4>
                    <br/>
                    <CounterContainer />
                    <br/>
                </div>
                
            </div>
        </div>

    );
};

export default Home;