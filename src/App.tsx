import React, { Dispatch } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AppState } from './redux/reducers/rootReducer';
import { CountActions } from './redux/actions/countActions';

const App = () => {

    const { count } = useSelector((state: AppState) => state.count);

    const countDispatch = useDispatch<Dispatch<CountActions>>();

    const handleIncrement = () => {
        countDispatch({type: 'INCREMENT'});
    }

    const handleDecrement = () => {
        countDispatch({type: 'DECREMENT'});
    }

    return (
        <div>
            <button onClick={handleIncrement}>+</button>
            {count}
            <button onClick={handleDecrement}>-</button>
        </div>
    );
}

export default App;
