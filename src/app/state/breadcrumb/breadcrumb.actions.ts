import {MenuItem} from 'primeng/api';

export class SetItems {
    static readonly type = '[Breadcrumb] SetItems';

    constructor(public items: MenuItem[]) {
    }
}
