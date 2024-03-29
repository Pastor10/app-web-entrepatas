import {Component, Input, OnInit, EventEmitter, ViewChild} from '@angular/core';
import {trigger, state, style, transition, animate} from '@angular/animations';
import {MenuItem} from 'primeng/primeng';
import {AppComponent} from './app.component';
import { UsuarioService } from './shared/service/usuario.service';
import { AppConstant } from './shared/constant/app.constant';

@Component({
    selector: 'app-menu',
    template: `
        <ul app-submenu [item]="model" root="true" class="layout-menu layout-main-menu clearfix"
            [reset]="reset" visible="true" parentActive="true"></ul>
    `
})
export class AppMenuComponent implements OnInit {

    @Input() reset: boolean;

    model: any[];

    theme = 'blue';

    layout = 'blue';

    version = 'v3';
    
    public tkn;
    public pl;
 

    constructor(public app: AppComponent, public usuarioService: UsuarioService) {}

    ngOnInit() {
        let arrayOptions = [
            {
                label: 'Configuración',
                icon: 'fa fa-fw  fa-tags',
                items: [
                    {
                        label: 'Usuarios',
                        icon: 'fa fa-users',
                        routerLink: ['/main/usuarios'],
                        role: 'ROLE_USER',
                        state: false
                    },
                    {
                        label: 'Perfiles',
                        icon: 'fa fa-user',
                        routerLink: ['/main/perfiles'],
                        role: 'ROLE_PERFIL',
                        state: false
                    }
                ]
            },
            {
                label: 'Publicaciones',
                icon: 'fa fa-bell',
                items: [
                    {
                        label: 'Publicar',
                        icon: 'fa fa-bullhorn',
                        routerLink: ['/main/generar-publicacion'],
                        role: 'ROLE_PUBLICACION_REGISTRO',
                        state: false
                    },
                    {
                        label: 'Listado',
                        icon: 'fa fa-list-ul',
                        routerLink: ['/main/publicacion-lista'],
                        role: 'ROLE_PUBLICACION_LISTADO',
                        state: false
                    },
                    {
                        label: 'Historial Clinico',
                        icon: 'fa fa-folder-open-o',
                        routerLink: ['/main/publicacion-cita'],
                        role: 'ROLE_PUBLICACION_HISTORIAL_CLINICO',
                        state: false
                    },
                    {
                        label: 'Visitantes',
                        icon: 'fa fa-check-square-o',
                        routerLink: ['/main/publicacion-aprobacion'],
                        role: 'ROLE_PUBLICACION_APROBACION',
                        state: false
                    }
                ]
            },
            {
                label: 'Adopcion',
                icon: 'fa fa-heart',
                items: [
                    {
                        label: 'Listar Postulantes',
                        icon: 'fa fa-users',
                        routerLink: ['/main/postulante'],
                        role: 'ROLE_ADOPCION_POSTULANTE_LISTADO',
                        state: false
                    },
                    {
                        label: 'Generar Adopcion',
                        icon: 'fa fa-clipboard',
                        routerLink: ['/main/genera-adopcion'],
                        role: 'ROLE_ADOPCION_GENERAR',
                        state: false
                    },
                    {
                        label: 'Listar Adopciones',
                        icon: 'fa fa-file-text-o',
                        routerLink: ['/main/adopciones'],
                        role: 'ROLE_ADOPCION_LISTADO',
                        state: false
                    },
                    {
                        label: 'Devolucion',
                        icon: 'fa fa-thumbs-o-down',
                        routerLink: ['/main/devoluciones'],
                        role: 'ROLE_ADOPCION_DEVOLUCION',
                        state: false
                    }
                ]
            },
            {
                label: 'Eventos',
                icon: 'fa fa-calendar',
                items: [
                    {
                        label: 'Generar Evento',
                        icon: 'fa fa-street-view',
                        routerLink: ['/main/evento-publica'],
                        role: 'ROLE_EVENTO_GENERA',
                        state: false
                    },
                    {
                        label: 'Listar Eventos',
                        icon: 'fa fa-bars',
                        routerLink: ['/main/evento-lista'],
                        role: 'ROLE_EVENTO_LISTADO',
                        state: false
                    },
                    {
                        label: 'Tipo Evento',
                        icon: 'fa fa-cutlery',
                        routerLink: ['/main/tipo-evento'],
                        role: 'ROLE_EVENTO_TIPO',
                        state: false
                    }
                ]
            },
            {
                label: 'Colabora Refugio', 
                icon: 'fa fa-handshake-o',
                items: [
                    {label: 'Colaborar',
                    icon: 'fa fa-gift',
                    routerLink: ['/main/colabora'],
                    role:'ROLE_COLABORA_REFUGIO',
                    state: false
                    }
                   
                ]
               
            },
            {
                label: 'Local', 
                icon: 'fa fa-home',
                items: [
                    {label: 'Locales',
                    icon: 'fa fa-map-marker',
                    routerLink: ['/main/local'],
                    role:'ROLE_LOCAL_CREA',
                    state: false
                    },
                    {label: 'Tipo Local',
                     icon: 'fa fa-home', 
                     routerLink: ['/main/tipolocal'],
                     role:'ROLE_LOCAL_TIPO',
                     state: false
                    }
                ]
            },
            {
                label: 'Veterinaria', 
                icon: 'fa fa-ambulance',
                items: [
                    {label: 'Veterinario',
                    icon: 'fa fa-user-md',
                    routerLink: ['/main/veterinario'],
                    role:'ROLE_VETERINARIO',
                    state: false
                    },
                    {label: 'Veterinaria',
                     icon: 'fa fa-hospital-o', 
                     routerLink: ['/main/veterinaria'],
                     role:'ROLE_VETERINARIA',
                     state: false
                    }
                ]
            },
            {
                label: 'Animal', 
                icon: 'fa fa-github',
                items: [
                    {label: 'Raza Animal',
                    icon: 'fa fa-paw',
                    routerLink: ['/main/raza'],
                    role:'ROLE_ANIMAL_RAZA',
                    state: false
                    },
                    {label: 'Tamaño',
                     icon: 'fa fa-sort-amount-desc', 
                     routerLink: ['/main/tamano-animal'],
                     role:'ROLE_ANIMAL_TAMANO',
                     state: false
                    },
                    {label: 'Tipo Animal',
                    icon: 'fa fa-qq', 
                    routerLink: ['/main/tipo-animal'],
                    role:'ROLE_ANIMAL_TIPO',
                    state: false
                   }
                ]
            },
            {
                label: 'Reportes', 
                icon: 'fa fa-fw fa-bars',
                items: [
                    {label: 'Reporte general',
                    icon: 'fa fa-list-alt',
                    routerLink: ['/main/reporteF7-general'],
                    role:'ROLE_REPORTE',
                    state: false
                    },
                    {label: 'Reporte no coberturado',
                     icon: 'fa fa-list-alt', 
                     routerLink: ['/main/reporteF7-no-coverturado'],
                     role:'ROLE_REPORTE_NO_COBERTURADO',
                     state: false
                    }
                ]
            }

        ];
        this.createOptions(arrayOptions);
    }

   createOptions(arrayOptions){
    this.tkn = localStorage.getItem("userLogin");
    this.pl = JSON.parse(this.tkn);
    
    //let email = this.pl.email;

    for(let i= 0; i < arrayOptions.length; i++){
        for(let x = 0; x < arrayOptions[i].items.length; x++){
        for(let a= 0; a < this.pl.roles.length; a++){
         if(arrayOptions[i].items[x].role === this.pl.roles[a].name){
            arrayOptions[i].items[x].state = true;
         }}}}

         for(let i= 0;i < arrayOptions.length; i++){
                    arrayOptions[i].items = arrayOptions[i].items.filter(function( obj ) {
                        return obj.state == true;});}
                arrayOptions = arrayOptions.filter(function( obj ) {
                    return obj.items.length > 0;});

         this.model = arrayOptions;

    // this.usuarioService.getFindByEmail('luisyum@gmail.com').subscribe(
    //     data => {
    //         console.log('data', data);
            
    //         localStorage.setItem('perfil', JSON.stringify(data.profileEntity.nombre));
            
            
    //     for(let i= 0; i < arrayOptions.length; i++){
    //     for(let x = 0; x < arrayOptions[i].items.length; x++){
    //     for(let a= 0; a < data.profileEntity.roles.length; a++){
    //      if(arrayOptions[i].items[x].role === data.profileEntity.roles[a].name){
    //         arrayOptions[i].items[x].state = true;
    //      }}}}
    //     for(let i= 0;i < arrayOptions.length; i++){
    //         arrayOptions[i].items = arrayOptions[i].items.filter(function( obj ) {
    //             return obj.state == true;});}
    //     arrayOptions = arrayOptions.filter(function( obj ) {
    //         return obj.items.length > 0;});
    //     this.model = arrayOptions;
        
    //     },
    //     error => {
    //       const errorMessage =
    //         error.message != undefined
    //           ? error.message
    //           : 'No se pudo procesar la petición';
    //     }
    //   );
   }

    changeTheme(theme: string) {
        const themeLink: HTMLLinkElement = document.getElementById('theme-css') as  HTMLLinkElement;

        if (this.version === 'v3') {
            themeLink.href =  'assets/theme/theme-' + theme + '.css';
        } else {
            themeLink.href =  'assets/theme/theme-' + theme + '-v4' + '.css';
        }

        this.theme = theme;

    }

    changeLayout(layout: string, special?: boolean) {
        const layoutLink: HTMLLinkElement = document.getElementById('layout-css') as  HTMLLinkElement;

        if (this.version === 'v3') {
            layoutLink.href = 'assets/layout/css/layout-' + layout + '.css';
        } else {
            layoutLink.href = 'assets/layout/css/layout-' + layout + '-v4' + '.css';
        }

        this.layout = layout;

        if (special) {
            this.app.darkMenu = true;
        }
    }

    changeVersion(version: string) {
        const themeLink: HTMLLinkElement = document.getElementById('theme-css') as  HTMLLinkElement;
        const layoutLink: HTMLLinkElement = document.getElementById('layout-css') as  HTMLLinkElement;

        if (version === 'v3') {
            this.version = 'v3';
            themeLink.href =  'assets/theme/theme-' + this.theme + '.css';
            layoutLink.href = 'assets/layout/css/layout-' + this.layout + '.css';
        } else {
            themeLink.href =  'assets/theme/theme-' + this.theme + '-v4' + '.css';
            layoutLink.href = 'assets/layout/css/layout-' + this.layout + '-v4' + '.css';
            this.version = '-v4';
        }

    }
}

@Component({
  /* tslint:disable:component-selector */
    selector: '[app-submenu]',
  /* tslint:enable:component-selector */
    template: `
        <ng-template ngFor let-child let-i="index" [ngForOf]="(root ? item : item.items)">
            <li [ngClass]="{'active-menuitem': isActive(i)}" [class]="child.badgeStyleClass" *ngIf="child.visible === false ? false : true">
                <a [href]="child.url||'#'" (click)="itemClick($event,child,i)" (mouseenter)="onMouseEnter(i)"
                   class="ripplelink" *ngIf="!child.routerLink"
                    [attr.tabindex]="!visible ? '-1' : null" [attr.target]="child.target">
                    <i [ngClass]="child.icon"></i><span>{{child.label}}</span>
                    <i class="fa fa-fw fa-angle-down menuitem-toggle-icon" *ngIf="child.items"></i>
                    <span class="menuitem-badge" *ngIf="child.badge">{{child.badge}}</span>
                </a>

                <a (click)="itemClick($event,child,i)" (mouseenter)="onMouseEnter(i)" class="ripplelink" *ngIf="child.routerLink"
                    [routerLink]="child.routerLink" routerLinkActive="active-menuitem-routerlink"
                   [routerLinkActiveOptions]="{exact: true}" [attr.tabindex]="!visible ? '-1' : null" [attr.target]="child.target">
                    <i [ngClass]="child.icon"></i><span>{{child.label}}</span>
                    <i class="fa fa-fw fa-angle-down menuitem-toggle-icon" *ngIf="child.items"></i>
                    <span class="menuitem-badge" *ngIf="child.badge">{{child.badge}}</span>
                </a>
                <div class="layout-menu-tooltip">
                    <div class="layout-menu-tooltip-arrow"></div>
                    <div class="layout-menu-tooltip-text">{{child.label}}</div>
                </div>
                <div class="submenu-arrow" *ngIf="child.items"></div>
                <ul app-submenu [item]="child" *ngIf="child.items" [visible]="isActive(i)" [reset]="reset" [parentActive]="isActive(i)"
                    [@children]="(app.isSlim()||app.isHorizontal())&&root ? isActive(i) ?
                     'visible' : 'hidden' : isActive(i) ? 'visibleAnimated' : 'hiddenAnimated'"></ul>
            </li>
        </ng-template>
    `,
    animations: [
        trigger('children', [
            state('hiddenAnimated', style({
                height: '0px'
            })),
            state('visibleAnimated', style({
                height: '*'
            })),
            state('visible', style({
                display: 'block'
            })),
            state('hidden', style({
                display: 'none'
            })),
            transition('visibleAnimated => hiddenAnimated', animate('400ms cubic-bezier(0.86, 0, 0.07, 1)')),
            transition('hiddenAnimated => visibleAnimated', animate('400ms cubic-bezier(0.86, 0, 0.07, 1)'))
        ])
    ]
})
export class AppSubMenuComponent {

    @Input() item: MenuItem;

    @Input() root: boolean;

    @Input() visible: boolean;

    _reset: boolean;

    _parentActive: boolean;

    activeIndex: number;

    constructor(public app: AppComponent) {}

    itemClick(event: Event, item: MenuItem, index: number) {
        if (this.root) {
            this.app.menuHoverActive = !this.app.menuHoverActive;
        }

        // avoid processing disabled items
        if (item.disabled) {
            event.preventDefault();
            return true;
        }

        // activate current item and deactivate active sibling if any
        this.activeIndex = (this.activeIndex === index) ? null : index;

        // execute command
        if (item.command) {
            item.command({originalEvent: event, item});
        }

        // prevent hash change
        if (item.items || (!item.url && !item.routerLink)) {
            setTimeout(() => {
                // this.app.layoutMenuScrollerViewChild.moveBar();
            }, 450);
            event.preventDefault();
        }

        // hide menu
        if (!item.items) {
            if (this.app.isHorizontal() || this.app.isSlim()) {
                this.app.resetMenu = true; } else {
                this.app.resetMenu = false; }

            this.app.overlayMenuActive = false;
            this.app.staticMenuMobileActive = false;
            this.app.menuHoverActive = !this.app.menuHoverActive;
        }
    }

    onMouseEnter(index: number) {
        if (this.root && this.app.menuHoverActive && (this.app.isHorizontal() || this.app.isSlim())
            && !this.app.isMobile() && !this.app.isTablet()) {
            this.activeIndex = index;
        }
    }

    isActive(index: number): boolean {
        return this.activeIndex === index;
    }

    @Input() get reset(): boolean {
        return this._reset;
    }

    set reset(val: boolean) {
        this._reset = val;

        if (this._reset && (this.app.isHorizontal() || this.app.isSlim())) {
            this.activeIndex = null;
        }
    }

    @Input() get parentActive(): boolean {
        return this._parentActive;
    }

    set parentActive(val: boolean) {
        this._parentActive = val;

        if (!this._parentActive) {
            this.activeIndex = null;
        }
    }
}
