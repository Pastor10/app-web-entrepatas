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
import createNumberMask from 'text-mask-addons/dist/createNumberMask';


@Component({
    selector: 'app-perfil',
    templateUrl: './perfil.component.html',
    styleUrls: ['./perfil.component.scss']
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
    celular: number= null;
    token;
    pl;
    listTipoDocumento: TipoDocumento[];
    filteredCities: Ubigeo[];
    mf: FormGroup;

    public numberMask = createNumberMask({
		prefix: '',
		suffix: '',
		includeThousandsSeparator: true,
		thousandsSeparatorSymbol: '',
		allowDecimal: false,
		decimalSymbol: '.',
		decimalLimit: 1,
		integerLimit: 12,
		requireDecimal: false,
		allowNegative: false,
		allowLeadingZeroes: true
	});

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
            if(this.usuario.persona.ubigeo!=null){
                this.getCity(this.usuario.persona.ubigeo);
            }
            
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

    onFileUpload(data: { files: File }): void {
        const formData: FormData = new FormData();
        const file = data.files[0];
        formData.append('file', file, file.name);
        this.personaService.uploadImage(formData).subscribe(resp => {
          this.usuario.persona.foto = resp.url;
          this.showMsg('success', 'Imganen subida', 'Perfil de usuario');
        });
      }
    

    filterCitiesByNombre(event) {
        const query = event.query;
        this.ubigeoService.findCity(query).subscribe(data => {
            this.filteredCities = data;
        });
    }

    onSelectCiudad(e: Ubigeo) {

        this.mf.patchValue({
            'ubigeo': e
        });
    }

    save(){
     
        let ubigeo = this.usuario.persona.ubigeo != undefined ? this.usuario.persona.ubigeo.nombre : undefined;
        let celular = this.usuario.persona.celular;
        this.celular = +celular;
        
        if(this.usuario.persona.tipoDocumento==null){
            this.showMsg('info', 'Seleccione tipo documento', 'Perfil de usuario');
            return;
        }
        if(this.usuario.persona.nombre.trim()==''){
            this.showMsg('info', 'Escriba un nombre', 'Perfil de usuario');
            return;
        }

        if(this.usuario.persona.apePaterno.trim()==''){
            this.showMsg('info', 'Escriba un apellido paterno', 'Perfil de usuario');
            return;
        }
        if(this.usuario.persona.apeMaterno.trim()==''){
            this.showMsg('info', 'Escriba un apellido materno', 'Perfil de usuario');
            return;
        }

        if(this.celular==0 || this.celular == null){
            this.showMsg('info', 'Escriba número de celular', 'Perfil de usuario');
            return;
        }

        if(this.usuario.persona.correo.trim()==''){
            this.showMsg('info', 'Escriba un correo', 'Perfil de usuario');
            return;
        }

        
        if(ubigeo==undefined){
            this.showMsg('info', 'Escriba la ciudad donde reside', 'Perfil de usuario');
            return;
        }

        if(this.usuario.persona.direccion==null || this.usuario.persona.direccion==''){
            this.showMsg('info', 'Escriba su dirección donde reside', 'Perfil de usuario');
            return;
        }


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

      soloLetras(e) {
        var tecla = (document.all) ? e.keyCode : e.which;
    
        //Tecla de retroceso para borrar, siempre la permite
        if (tecla == 8) {
            return true;
        }
        var patron = /[A-Za-z ]/;
        var tecla_final = String.fromCharCode(tecla);
        return patron.test(tecla_final);
    }
}
