import {Component} from '@angular/core';
import {AppComponent} from './app.component';
import { AppMainComponent } from './app.main.component';

@Component({
    selector: 'app-topbar',
    template: `
        <div class="topbar clearfix">
            <div class="topbar-left">
                <img src="assets/layout/images/logo2.png" class="topbar-logo" />
            </div>
            <div class="topbar-right">
                <a id="menu-button" href="#" (click)="app.onMenuButtonClick($event)"
                   [ngClass]="{'menu-button-rotate': app.rotateMenuButton}">
                    <i class="fa fa-angle-left"></i>
               </a>

                <a id="topbar-menu-button" href="#" (click)="app.onTopbarMenuButtonClick($event)">
                    <i class="fa fa-bars"></i>
                </a>
                <!-- <ul class="topbar-items fadeInDown">
            <li  class="profile-item">

                <a href="#" routerLink="/main">
                    <img class="profile-image" src="assets/layout/images/registro.png" />
                </a>
                <ul class="layout-menu fadeInDown">
                            <li role="menuitem">
                                <a href="#" (click)="app.onTopbarSubItemClick($event)">
                                    <i class="fa fa-fw fa-paint-brush"></i>
                                    <span>Mi Perfil</span>
                                </a>
                            </li>
                            <li role="menuitem">
                                <a href="#" (click)="app.onTopbarSubItemClick($event)">
                                    <i class="fa fa-fw fa-star-o"></i>
                                    <span>Cerrar session</span>
                                </a>
                            </li>
                        </ul>
            </li>
            <li  class="profile-item">
                <a href="#" routerLink="/conocenos">
                    <img class="profile-image" src="assets/layout/images/lupa.png" />
                </a>
            </li>
            <li  class="profile-item">
                <a  href="#" routerLink="/adopta">
                    <img class="profile-image" src="assets/layout/images/pata.png" />
                </a>
                
            </li>
        </ul> -->

             <ul class="topbar-items fadeInDown" [ngClass]="{'topbar-items-visible': app.topbarMenuActive}">
                   
                    <li #settings [ngClass]="{'active-top-menu':app.activeTopbarItem === settings}">
                        <a href="#" (click)="app.onTopbarItemClick($event,settings)">
                            <i class="topbar-icon fa fa-fw fa-cog"></i>
                            <span class="topbar-item-name">Settings</span>
                        </a>
               
                        <ul class="layout-menu fadeInDown">
                            <li role="menuitem">
                                <a href="#" (click)="logout()">
                                    <i class="fa fa-sign-in"></i>
                                    <span>Cerrar Sesion</span>
                                </a>
                            </li>
                    
                        </ul>
                    </li>

                    <li #notifications [ngClass]="{'active-top-menu':app.activeTopbarItem === notifications}">
                        <a href="#" (click)="app.onTopbarItemClick($event,notifications)">
                            <i class="topbar-icon fa fa-fw fa-bell-o"></i>
                            <span class="topbar-badge animated rubberBand">4</span>
                            <span class="topbar-item-name">Notifications</span>
                        </a>
                        <ul class="layout-menu fadeInDown">
                            <li role="menuitem">
                                <a href="#" (click)="app.onTopbarSubItemClick($event)">
                                    <i class="fa fa-fw fa-tasks"></i>
                                    <span>Pending tasks</span>
                                </a>
                            </li>
                    
                        </ul>
                    </li>
             
              
                </ul>


            </div>
        </div>
    `
})
export class AppTopBarComponent {

    constructor(public app: AppMainComponent) {}
    logout(){
        localStorage.removeItem("userLogin");
       }

}
