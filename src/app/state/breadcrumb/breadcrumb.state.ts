import {MenuItem} from 'primeng/api';
import {Action, Selector, State, StateContext} from '@ngxs/store';
import {SetItems} from './breadcrumb.actions';


export class BreadcrumbStateModel {
    items: MenuItem[];
}

@State<BreadcrumbStateModel>({
    name: 'breadcrumb',
    defaults: {
        items: []
    }
})
export class BreadcrumbState {

    constructor() {
    }

    @Selector()
    static getItems(state: BreadcrumbStateModel) {
        return state.items;
    }

    @Action(SetItems)
    setItems({getState, setState}: StateContext<BreadcrumbStateModel>, {items}: SetItems) {
        console.log('Seteando', items);
        const state = getState();
        setState({
            ...state,
            items: items,
        });
    }

}
