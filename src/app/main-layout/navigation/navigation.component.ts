import {Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import {LocalStorageService} from 'src/app/shared/service/localstorage.service';
import {Router} from '@angular/router';
import {modulos} from './modulos';
import {Modulo} from '../../shared/model/modulo.model';
import {Role} from '../../shared/model/role.model';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

  public roles: Role[];
  public optionMenuSelected = 'ADM';
  public titleSidebar = 'Administrador';
  public modulos = new Array<Modulo>();

  @ViewChild('sidenav') sidenav: ElementRef;

  public username = '';

  clicked: boolean;

  constructor(public localStorageService: LocalStorageService,
              public router: Router) {
    this.clicked = this.clicked == undefined ? false : true;
  }


  ngOnInit() {

    const loginResponse = this.localStorageService.get('userLogin');
    if (loginResponse != undefined) {
      this.username = loginResponse.user.username;
      this.roles = loginResponse.roles;
      this.setModulos();
    } else {
      this.router.navigate(['/login']);
    }
  }


  setOptionMenu(opt): void {
    this.optionMenuSelected = opt.val;
    this.titleSidebar = opt.title;
    this.router.navigateByUrl('/main');
    this.setModulos();
  }

  setModulos(): void {
    this.modulos = new Array<Modulo>();
    this.roles.forEach(role => {
      const mod = this.getModulosByTipo()[role.name];
      if (mod) {
        this.modulos.push(mod);
        this.modulos.sort(function(a,b){
          return (a.orden-b.orden);
        });
      }
    });
  }

  getModulosByTipo() {

    return modulos[this.optionMenuSelected];
  }

  get accessModulo() {
    return this.modulos.length > 0;
  }

}
