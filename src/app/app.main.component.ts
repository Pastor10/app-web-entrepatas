import {AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {MenuItem, ScrollPanel} from 'primeng/primeng';


import {ThemeWeb} from './domain/theme-web';
import {Observable} from 'rxjs';
import {BreadcrumbState} from './state/breadcrumb/breadcrumb.state';
import {Select} from '@ngxs/store';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import { MenuOrientation } from './enums/menu-orientation';


@Component({
    selector: 'app-main',
    template: `
        <div class="layout-wrapper" (click)="onLayoutClick()"
             [ngClass]="{'menu-layout-static': !isOverlay(),
                'menu-layout-overlay': isOverlay(),
                'layout-menu-overlay-active': overlayMenuActive,
                'menu-layout-horizontal': isHorizontal(),
                'menu-layout-slim': isSlim(),
                'layout-menu-static-inactive': staticMenuDesktopInactive,
                'layout-menu-static-active': staticMenuMobileActive}">

            <div class="layout-main" style="padding-bottom: 0px; min-height: calc(100vh - 112px);">
                <p-breadcrumb [model]="itemsBreadcrumb" [home]="home"></p-breadcrumb>
                <router-outlet></router-outlet>
            </div>



            <div class="layout-mask"></div>

            <app-footer></app-footer>

        </div>
    `
})
export class AppMainComponent implements AfterViewInit {

    @Select(BreadcrumbState.getItems) itemsBreadcrumb$: Observable<MenuItem[]>;
    itemsBreadcrumb: MenuItem[] = [];

    home: MenuItem;

    constructor(private router: Router, private route: ActivatedRoute) {
    }


    layoutMode: MenuOrientation = MenuOrientation.OVERLAY;

    darkMenu = false;

    profileMode = 'inline';

    theme = 'blue';

    layout = 'blue';

    version = 'v4';

    rotateMenuButton: boolean;

    topbarMenuActive: boolean;

    overlayMenuActive: boolean;

    staticMenuDesktopInactive: boolean;

    staticMenuMobileActive: boolean;

    layoutMenuScroller: HTMLDivElement;

    menuClick: boolean;

    topbarItemClick: boolean;

    activeTopbarItem: any;

    resetMenu: boolean;

    menuHoverActive: boolean;

    @ViewChild('layoutMenuScroller', {static: true}) layoutMenuScrollerViewChild: ScrollPanel;

    static getTheme(): ThemeWeb {
        if (!localStorage.getItem('theme')) {
            return null;
        }
        return <ThemeWeb>JSON.parse(localStorage.getItem('theme'));
    }

    static setTheme(tema: ThemeWeb): void {
        localStorage.setItem('theme', JSON.stringify(tema));
    }

    ngAfterViewInit() {
        setTimeout(() => {
            this.layoutMenuScrollerViewChild.moveBar();
        }, 100);
    }



    initTheme() {
        const tema: ThemeWeb = {
            layoutMode: MenuOrientation.HORIZONTAL,
            theme: 'blue',
            layout: 'blue',
            profileMode: 'inline',
            darkMenu: false
        };
        if (!AppMainComponent.getTheme()) {
            AppMainComponent.setTheme(tema);
        }

        this.loadTheme();

        setTimeout(() => {
            this.changeTheme(this.theme);
            this.changeLayout(this.layout, tema.special);
        }, 1000);
    }

    loadTheme(): void {
        const tema = AppMainComponent.getTheme();
        this.layoutMode = tema.layoutMode;
        this.darkMenu = tema.darkMenu;
        this.profileMode = tema.profileMode;
        this.theme = tema.theme;
        this.layout = tema.layout;
    }

    saveTheme(): void {
        const theme: ThemeWeb = {
            darkMenu: this.darkMenu,
            layout: this.layout,
            layoutMode: this.layoutMode,
            profileMode: this.profileMode,
            theme: this.theme,
        };

        AppMainComponent.setTheme(theme);
    }

    onLayoutClick() {
        if (!this.topbarItemClick) {
            this.activeTopbarItem = null;
            this.topbarMenuActive = false;
        }

        if (!this.menuClick) {
            if (this.isHorizontal() || this.isSlim()) {
                this.resetMenu = true;
            }

            if (this.overlayMenuActive || this.staticMenuMobileActive) {
                this.hideOverlayMenu();
            }

            this.menuHoverActive = false;
        }

        this.topbarItemClick = false;
        this.menuClick = false;
    }

    onMenuButtonClick(event) {
        this.menuClick = true;
        this.rotateMenuButton = !this.rotateMenuButton;
        this.topbarMenuActive = false;

        if (this.layoutMode === MenuOrientation.OVERLAY) {
            this.overlayMenuActive = !this.overlayMenuActive;
        } else {
            if (this.isDesktop()) {
                this.staticMenuDesktopInactive = !this.staticMenuDesktopInactive;
            } else {
                this.staticMenuMobileActive = !this.staticMenuMobileActive;
            }
        }

        event.preventDefault();
    }

    onMenuClick($event) {
        this.menuClick = true;
        this.resetMenu = false;

        if (!this.isHorizontal()) {
            setTimeout(() => {
                this.layoutMenuScrollerViewChild.moveBar();
            }, 450);
        }
    }

    onTopbarMenuButtonClick(event) {
        this.topbarItemClick = true;
        this.topbarMenuActive = !this.topbarMenuActive;

        this.hideOverlayMenu();

        event.preventDefault();
    }

    onTopbarItemClick(event, item) {
        this.topbarItemClick = true;

        if (this.activeTopbarItem === item) {
            this.activeTopbarItem = null;
        } else {
            this.activeTopbarItem = item;
        }

        event.preventDefault();
    }

    onTopbarSubItemClick(event) {
        event.preventDefault();
    }

    hideOverlayMenu() {
        this.rotateMenuButton = false;
        this.overlayMenuActive = false;
        this.staticMenuMobileActive = false;
    }

    isTablet() {
        const width = window.innerWidth;
        return width <= 1024 && width > 640;
    }

    isDesktop() {
        return window.innerWidth > 1024;
    }

    isMobile() {
        return window.innerWidth <= 640;
    }

    isOverlay() {
        return this.layoutMode === MenuOrientation.OVERLAY;
    }

    isHorizontal() {
        return this.layoutMode === MenuOrientation.HORIZONTAL;
    }

    isSlim() {
        return this.layoutMode === MenuOrientation.SLIM;
    }

    changeToStaticMenu() {
        this.layoutMode = MenuOrientation.STATIC;
    }

    changeToOverlayMenu() {
        this.layoutMode = MenuOrientation.OVERLAY;
    }

    changeToHorizontalMenu() {
        this.layoutMode = MenuOrientation.HORIZONTAL;
    }

    changeToSlimMenu() {
        this.layoutMode = MenuOrientation.SLIM;
    }

    changeTheme(theme: string) {
        const themeLink: HTMLLinkElement = <HTMLLinkElement>document.getElementById('theme-css');

        if (this.version === 'v3') {
            themeLink.href = 'assets/theme/theme-' + theme + '.css';
        } else {
            themeLink.href = 'assets/theme/theme-' + theme + '-v4' + '.css';
        }

        this.theme = theme;

    }

    changeLayout(layout: string, special?: boolean) {
        const layoutLink: HTMLLinkElement = <HTMLLinkElement>document.getElementById('layout-css');

        if (this.version === 'v3') {
            layoutLink.href = 'assets/layout/css/layout-' + layout + '.css';
        } else {
            layoutLink.href = 'assets/layout/css/layout-' + layout + '-v4' + '.css';
        }

        this.layout = layout;

        if (special) {
            this.darkMenu = true;
        }
    }

    changeVersion(version: string) {
        const themeLink: HTMLLinkElement = <HTMLLinkElement>document.getElementById('theme-css');
        const layoutLink: HTMLLinkElement = <HTMLLinkElement>document.getElementById('layout-css');

        if (version === 'v3') {
            this.version = 'v3';
            themeLink.href = 'assets/theme/theme-' + this.theme + '.css';
            layoutLink.href = 'assets/layout/css/layout-' + this.layout + '.css';
        } else {
            themeLink.href = 'assets/theme/theme-' + this.theme + '-v4' + '.css';
            layoutLink.href = 'assets/layout/css/layout-' + this.layout + '-v4' + '.css';
            this.version = '-v4';
        }

    }

    changeProfileMode(profileMode: string) {
        this.profileMode = profileMode;
    }

    changeDarkMenu(darkMenu: boolean) {
        this.darkMenu = darkMenu;
    }

}
