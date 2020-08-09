/*
 * 2019-2020 Farmacias Peruanas Incorporated
 * All Rights Reserved.
 *
 * NOTICE: All information contained herein is, and remains
 * the property of Farmacias Peruanas Incorporated and its suppliers,
 * if any. The intellectual and technical concepts contained
 * herein are proprietary to Farmacias Peruanas Incorporated
 * and its suppliers and may be covered by PERU and Foreign Patents,
 * patents in process, and are protected by trade secret or copyright law.
 * Dissemination of this information or reproduction of this material
 * is strictly forbidden unless prior written permission is obtained
 * from Farmacias Peruanas Incorporated.
 */

/**
*
* @author José Jara.
*/

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
	providedIn: 'root'
})
export class GlobalService {

	url = `${environment.END_POINT}`;

	constructor(private readonly http: HttpClient) {}

	getPayload(token) {
		const base64Url = token.split('.')[1];
		const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
		const jsonPayload = decodeURIComponent(
			atob(base64).split('')
			.map(function(c) {
				return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
			}).join('')
		);

		return JSON.parse(jsonPayload);
	}

	getUser() {
		let user = null;
		const tkn = localStorage.getItem('access_token');

		if(tkn=='undefined' || tkn==undefined || tkn.trim()==''){
			localStorage.clear();
			return null;
		}

		if (tkn ) {
			user = this.getPayload(tkn);
		}

		return user;
	}

	getToken() {
		return localStorage.getItem('access_token');
	}

	getPoliticas({idPolitica, idEmpresa}){
		return this.http.get<any>(`${this.url}/politica/${idPolitica}/${idEmpresa}`);
	}

	uriToJson(uri){

		return JSON.parse('{"' + decodeURI(uri).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g,'":"') + '"}');
	}

	verifyCaptchaActive() {
		return this.http.get<any>(`${this.url}/UsuarioRest/verifyCaptchaActive`)
	}


}
