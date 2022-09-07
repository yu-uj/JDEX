import { connect } from 'react-redux';
import Counter from './Counter';


const mapStateToProps = (state) => ({
    number: state.counter.number
});


const CounterContainer = connect(mapStateToProps)(Counter);

export default CounterContainer;