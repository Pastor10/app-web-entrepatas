import {Component} from '@angular/core';
import {trigger, state, transition, style, animate} from '@angular/animations';
import { AppConstant } from './shared/constant/app.constant';
import { UsuarioService } from './shared/service/usuario.service';
import { User } from './shared/model/User.model';

@Component({
    selector: 'app-inline-profile',
    template: `
        <div class="profile" [ngClass]="{'profile-expanded':active}">
            <a href="#" (click)="onClick($event)">
                <img class="profile-image" src="{{foto}}" />
                <span class="profile-name">Bienvenido</span>
                <i class="fa fa-fw fa-caret-down"></i>
                <span class="profile-role">{{name}}</span>
            </a>
        </div>

        <ul id="profile-menu" class="layout-menu" [@menu]="active ? 'visible' : 'hidden'">
            
            <li role="menuitem">
                <a href="#" routerLink="/main/perfil" [attr.tabindex]="!active ? '-1' : null">
                    <i class="fa fa-user-circle-o"></i>
                    <span>Mi Perfil</span>
                </a>
                <div class="layout-menu-tooltip">
                    <div class="layout-menu-tooltip-arrow"></div>
                    <div class="layout-menu-tooltip-text">Mi Perfil</div>
                </div>
            </li>
            <li role="menuitem">
                <a href="#" routerLink="/main/change-password" [attr.tabindex]="!active ? '-1' : null">
                    <i class="fa fa-unlock-alt"></i>
                    <span>Cambiar contraseña</span>
                </a>
                <div class="layout-menu-tooltip">
                    <div class="layout-menu-tooltip-arrow"></div>
                    <div class="layout-menu-tooltip-text">Cambiar contraseña</div>
                </div>
            </li>
            <li role="menuitem">
                <a href="#" (click)="logout()" [attr.tabindex]="!active ? '-1' : null">
                    <i class="fa fa-fw fa-sign-out"></i>
                    <span>Cerrar sesión</span>
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
    public foto;
    public perfil;
    usuario: User;

    onClick(event) {
        this.active = !this.active;
        event.preventDefault();
    }
    logout(){
        localStorage.removeItem("userLogin");
       }
constructor(public usuarioService: UsuarioService){
         this.tkn = localStorage.getItem("userLogin");
         
         this.pl = JSON.parse(this.tkn);

         
         this.name = this.pl.user.name;
         //this.perfil = this.pl.user.per
         this.getUserId(this.pl.user.id);

         
    
}

getUserId(id){
    this.usuarioService.getUserId(id).subscribe((data: User) =>{
    this.usuario = data;
    this.foto = this.usuario.persona.foto;
    
    });
    return this.usuario;
}
       
}
