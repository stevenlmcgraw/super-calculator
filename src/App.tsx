import React, { useEffect, useState } from 'react';
import { Route, Switch } from "react-router-dom";
import Header from './components/Header/Header';
import Home from './pages/Home';
import PhysicsLanding from './pages/Physics';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFormulaList } from './redux/actions/formulaActions';
import { AppState } from './redux/reducers/rootReducer';


const App = () => {

    const dispatch = useDispatch();

    const [activeIndexValue, setActiveIndexValue] = useState<number>(0);

    const { formulas } = useSelector((state: AppState) => state.formulas);
    console.log(formulas);

    useEffect(() => {
        dispatch(fetchFormulaList());
    }, [dispatch]);

    return (
        <div>
            <Header 
                activeIndexValue={activeIndexValue}
                setActiveIndexValue={setActiveIndexValue}
            />
            <Switch>                
                <Route exact path="/physics" component={PhysicsLanding}/>
                <Route path="/" component={Home}/>
            </Switch>

        </div>
    );
}

export default App;
