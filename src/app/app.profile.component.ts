import {Component} from '@angular/core';
import {trigger, state, transition, style, animate} from '@angular/animations';
import { AppConstant } from './shared/constant/app.constant';

@Component({
    selector: 'app-inline-profile',
    template: `
        <div class="profile" [ngClass]="{'profile-expanded':active}">
            <a href="#" (click)="onClick($event)">
                <img class="profile-image" src="assets/layout/images/default-avatar.png" />
                <span class="profile-name">{{name}}</span>
                <i class="fa fa-fw fa-caret-down"></i>
                <span class="profile-role">Admin</span>
            </a>
        </div>

        <ul id="profile-menu" class="layout-menu" [@menu]="active ? 'visible' : 'hidden'">
            <li role="menuitem">
                <a href="#" [attr.tabindex]="!active ? '-1' : null">
                    <i class="fa fa-fw fa-user"></i>
                    <span>Profile</span>
                </a>
                <div class="layout-menu-tooltip">
                    <div class="layout-menu-tooltip-arrow"></div>
                    <div class="layout-menu-tooltip-text">Profile</div>
                </div>
            </li>
            <li role="menuitem">
                <a href="#" [attr.tabindex]="!active ? '-1' : null">
                    <i class="fa fa-fw fa-user-secret"></i>
                    <span>Privacy</span>
                </a>
                <div class="layout-menu-tooltip">
                    <div class="layout-menu-tooltip-arrow"></div>
                    <div class="layout-menu-tooltip-text">Privacy</div>
                </div>
            </li>
            <li role="menuitem">
                <a href="#" [attr.tabindex]="!active ? '-1' : null">
                    <i class="fa fa-fw fa-cog"></i>
                    <span>Settings</span>
                </a>
                <div class="layout-menu-tooltip">
                    <div class="layout-menu-tooltip-arrow"></div>
                    <div class="layout-menu-tooltip-text">Settings</div>
                </div>
            </li>
            <li role="menuitem">
                <a href="#" (click)="logout()" [attr.tabindex]="!active ? '-1' : null">
                    <i class="fa fa-fw fa-sign-out"></i>
                    <span>Logout</span>
                </a>
                <div class="layout-menu-tooltip">
                    <div class="layout-menu-tooltip-arrow"></div>
                    <div class="layout-menu-tooltip-text">Logout</div>
                </div>
            </li>
        </ul>
    `,
    animations: [
        trigger('menu', [
            state('hidden', style({
                height: '0px'
            })),
            state('visible', style({
                height: '*'
            })),
            transition('visible => hidden', animate('400ms cubic-bezier(0.86, 0, 0.07, 1)')),
            transition('hidden => visible', animate('400ms cubic-bezier(0.86, 0, 0.07, 1)'))
        ])
    ]
})
export class AppProfileComponent {

    active: boolean;
    public tkn;
    public pl;
    public name;

    onClick(event) {
        this.active = !this.active;
        event.preventDefault();
    }
    logout(){
        localStorage.removeItem("token");
       }
constructor(){
         this.tkn = AppConstant.DECODE(localStorage.getItem("token"));
         this.pl = JSON.parse(this.tkn.sub);
         this.name = this.pl.full_name;
    
}
       
}
