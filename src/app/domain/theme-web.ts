import {MenuOrientation} from '../enums/menu-orientation';

export interface ThemeWeb {
    layoutMode: MenuOrientation;
    theme: string;
    layout: string;
    profileMode: string;
    darkMenu: boolean;
    special?: boolean;
}
