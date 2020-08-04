import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';


import { Store } from '@ngxs/store';
import { ActivatedRoute } from '@angular/router';
import { UsuarioService } from 'src/app/shared/service/usuario.service';
import { User } from 'src/app/shared/model/User.model';
import { TipoDocumentoService } from 'src/app/shared/service/tipodocumento.service';
import { TipoDocumento } from 'src/app/shared/model/tipoDocumento.model';
import { UbigeoService } from 'src/app/shared/service/ubigeo.service';
import { Ubigeo } from 'src/app/shared/model/ubigeo.model';
import { PersonaService } from 'src/app/shared/service/persona.service';


@Component({
    selector: 'app-perfil',
    templateUrl: './perfil.component.html'
})
export class PerfilComponent implements OnInit {

    isEdit: boolean;
    // model: User;

    modelFormBasic: FormGroup;
    uploadedFiles: any[] = [];
    usuario: User;
    userId: number;
    nombre: string;
    tipo: string;
    id: number;
    apePaterno: string;
    apeMaterno: string;
    username: string;
    passwordTrans: string;
    correo: string;
    celular: number;
    token;
    pl;
    listTipoDocumento: TipoDocumento[];
    filteredCities: Ubigeo[];
    mf: FormGroup;


    constructor(private messageService: MessageService,
        public fb: FormBuilder,
        private store: Store,
        private route: ActivatedRoute, public usuarioService: UsuarioService, public tipoDocumentoService: TipoDocumentoService,
        public ubigeoService: UbigeoService, public personaService: PersonaService) {

        this.token = localStorage.getItem("userLogin");
        this.pl = JSON.parse(this.token);
        this.getUserById(this.pl.user.id);
    }

    ngOnInit() {
        //this.store.dispatch(new SetItems(getBreadcrumb(this.route)));
        // this.loadModel();
        //this.builderFormBasic();
        this.getAllTipoDocumento();
        this.builderForm();
       
    }

    builderForm() {
        this.mf = this.fb.group({
            ubigeo: [null, [Validators.required]],
         
        });

    }


    builderFormBasic() {
        this.modelFormBasic = this.fb.group({
            nombres: ['', [Validators.required]],
            apellidos: ['', [Validators.required]],
            dni: ['', [Validators.required]],
            avatarUrl: ['']
        });
    }

    getUserById(id) {
        this.usuarioService.getUserId(id).subscribe(data => {
            this.usuario = data;
            this.getCity(this.usuario.persona.ubigeo);
            console.log('usuario', this.usuario);
            //this.modelToForm(data);

        });
    }

    getAllTipoDocumento() {
        this.tipoDocumentoService.getAll().subscribe((data: TipoDocumento[]) => {
            this.listTipoDocumento = data;
        });
    }

    modelToForm(data) {
        this.nombre = data.persona.nombre;
        this.apePaterno = data.persona.apePaterno;
        this.apeMaterno = data.persona.apeMaterno;
        this.correo = data.persona.correo;
        this.celular = data.persona.celular;
        this.getCity(data.persona.ubigeo);

    }

    getCity(ubigeo: Ubigeo) {
        const params = [
            `codDepartamento=${ubigeo.codDepartamento}`,
            `codProvincia=${ubigeo.codProvincia}`,
            `codDistrito=${ubigeo.codDistrito}`
        ];
        this.ubigeoService.getCity(params.join('&')).subscribe(
            data => {
                if (data != null) {
                    this.usuario.persona.ubigeo = data;
                }
               
            }
        );

    }

    

    filterCitiesByNombre(event) {
        const query = event.query;
        this.ubigeoService.findCity(query).subscribe(data => {
            this.filteredCities = data;
        });
    }

    onSelectCiudad(e: Ubigeo) {
        console.log("city ", e);
        
        this.mf.patchValue({
            'ubigeo': e
        });
    }

    save(){
        console.log('guardado', this.usuario);
        this.personaService.update(this.usuario.persona).then(data => {
            if(data!=null){
              let  message = 'Datos actualizados.';
                 this.showMsg('success', message);
            }
            
        });
        
    }

    showMsg( type: string, msg: string, title: string = 'Datos Personales') {
        this.messageService.add( { key: 'tst', severity: type, summary: title, detail: msg } );
      }

}
