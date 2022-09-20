import { Link } from "react-router-dom";
// import { useSelector } from 'react-redux'
// import { Route } from 'react-router-dom';
import { Single, Pair, Create } from '../components/staking'
import '../assets/css/Staking.css';

function Staking () {

    return (
        <main>
            <div className="Pool">
			
                <Single as={Link} to="/staking/single" />
                <Pair as={Link} to="/staking/pair" />

                <Create />
            </div>
        </main>
    );
};

export default Staking;