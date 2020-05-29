import { FormulaActions } from "../actions/formulaActions";

export type Formula = {
    _links: {
        getAllFormulas: {
            href: string;
        }
        getFormulaInfo : {
            href: string;
        }
    }
    category: string;
    displayName: string;
    formulaName: string;
    formulaUrl: string;
}

type FormulaState = {
    formulas : Formula[],
    _links: object,
    category : string,
    displayName : string,
    formulaName : string,
    formulaUrl : string
}

const initialState: FormulaState = {
    formulas : [],
    _links: {},
    category : "",
    displayName : "",
    formulaName : "",
    formulaUrl : ""
}

const formulaReducer = (state: FormulaState = initialState, action: FormulaActions) => {
    switch(action.type) {
        case 'FETCH_FORMULAS':
            return {
                ...state,
                formulas: action.payload._embedded.formulas,
            }
        
        default:
            return state;
    }
}

export default formulaReducer;