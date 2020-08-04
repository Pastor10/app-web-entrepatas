// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `angular-cli.json`.

import {AbstractControl, FormGroup} from '@angular/forms';

export const utilFunctions = {
    production: false,
    endpointApi: 'http://entrepatasch.us-east-2.elasticbeanstalk.com'
};


export const openUrlInNewTab = (url) => {
    const win = window.open(url, '_blank');
    win.focus();
};

export const openTab = (url) => {
    // Create link in memory
    const a = window.document.createElement('a');
    a.target = '_blank';
    a.href = url;

    // Dispatch fake click
    const e = window.document.createEvent('MouseEvents');
    e.initMouseEvent('click', true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
    a.dispatchEvent(e);
};


export const isMobileDevice = () => {
    return (typeof window.orientation !== 'undefined') || (navigator.userAgent.indexOf('IEMobile') !== -1);
};


export const toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
        const dsplit = reader.result.toString().split(',');
        resolve(dsplit[1]);
    };
    reader.onerror = error => reject(error);
});


export const markFormGroupTouched = (formGroup: FormGroup) => {
    (<any>Object).values(formGroup.controls).forEach(control => {
        control.markAsTouched();
        if (control.controls) {
            markFormGroupTouched(control);
        }
    });
};

export const getBreadcrumb = (route: any) => {
    return route.snapshot.data.breadcrumb;
};

export const ValidateUbigeo = (control: AbstractControl) => {

    if (!control.value) {
        return null;
    }

    if (typeof (control.value) !== 'object') {
        return {ubigeo: true};
    } else {
        if (control.value.codDepartamento && control.value.codProvincia && control.value.codDistrito) {
            return null;
        } else {
            return {ubigeo: true};
        }
    }
};

export const ValidateIsObject = (control: AbstractControl) => {
    if (!control.value) {
        return null;
    }
    if (typeof (control.value) !== 'object') {
        return {notobject: true};
    } else {
        return null;
    }
};

export const add = (a, b) => Number(a) + Number(b)




