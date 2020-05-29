import React, { useEffect } from 'react';
import { Route, Switch } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';

import Header from './components/Header/Header';

import Home from './pages/Home';
import PhysicsLanding from './pages/Physics';
import Login from './pages/Login';

import { fetchFormulaList } from './redux/actions/formulaActions';
import { AppState } from './redux/reducers/rootReducer';


const App = () => {

    const dispatch = useDispatch();

    const { formulas } = useSelector((state: AppState) => state.formulas);
    // just so formulas isn't an unused variable for now
    console.log(formulas);

    useEffect(() => {
        dispatch(fetchFormulaList());
    }, [dispatch]);

    return (
        <div>
            <Header/>
            <Switch>    
                <Route exact path="/login" component={Login}/>            
                <Route exact path="/physics" component={PhysicsLanding}/>
                <Route path="/" component={Home}/>
            </Switch>

        </div>
    );
}

export default App;
