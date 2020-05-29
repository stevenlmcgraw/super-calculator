import React, { useEffect, Dispatch } from 'react';
import { Route, Switch } from "react-router-dom";
import Header from './components/Header/Header';
import Home from './pages/Home';
import PhysicsLanding from './pages/Physics';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFormulaList, FormulaActions } from './redux/actions/formulaActions';
import { AppState } from './redux/reducers/rootReducer';


const App = () => {

    //const formulaDispatch = useDispatch<Dispatch<FormulaActions>>();
    const formulaDispatch = useDispatch();

    const { formulas } = useSelector((state: AppState) => state.formulas);

    useEffect(() => {
        formulaDispatch(fetchFormulaList);
        console.log('In useEffect')
        console.log(formulaDispatch)
    }, []);

    return (
        <div>
            <Header />
            <Switch>
                
                <Route exact path="/physics" component={PhysicsLanding}/>
                <Route path="/" component={Home}/>
            </Switch>

        </div>
    );
}

export default App;
