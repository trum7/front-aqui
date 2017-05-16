﻿import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { User } from '../_models/index';
import { Router, ActivatedRoute } from '@angular/router';
import { Http,Response,Headers,RequestOptions } from '@angular/http';

@Injectable()
export class AuthenticationService {
    constructor(private http: Http) { }

    model: User;
    regis: User;
    authentication:boolean;

    login(email: string, password: string) {

      this.model = new User();
      this.model.email = email;
      this.model.password = password;
      this.model.nick = email;
      this.model.name = email;
      let body = JSON.stringify(this.model);
      let headers = new Headers({ 'Content-Type': 'application/json'});
      let options = new RequestOptions({ headers: headers });
      var resul = false;
      //http://192.168.99.102:4001/user/resources/ldap
      return this.http.post('http://192.168.99.102:4001/user/resources/ldap', body, options)
                      .map((response: Response) => {
                // login successful if there's a jwt token in the response
                return response.json();



              }
            );
      //alert(resul);
      //return resul;
        //alert(JSON.stringify({ email: username, password: password, nick: username, name: username }));
    /*let headers = new Headers({ 'Content-Type': 'application/json'});
        return this.http.post('http://192.168.99.102:4001/user/resources/ldap', JSON.stringify({ email: username, password: password, nick: username, name: username }),{headers: headers})
        .map((response: Response) => {
                // login successful if there's a jwt token in the response
                let user = response.json();
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                alert("Noseee");
                alert(user.login);
                localStorage.setItem('currentUser', "Yes");
            });*/
    }

    loginMS(email: string, password: string) {

      this.model = new User();
      this.model.email = email;
      this.model.password = password;
      this.model.nick = email;
      this.model.name = email;
      let body = JSON.stringify(this.model);
      let headers = new Headers({ 'Content-Type': 'application/json' });
      let options = new RequestOptions({ headers: headers });
      var resul = false;
      //http://192.168.99.102:4000/user/resources/authentication
      return this.http.post('http://192.168.99.103:4002/user/resources/authentication', body, options)
                      .map((response: Response) => {
                        return response.json();
                      });
    }

    logout(token: string) {

        let jsonToken = '{"token":"' + token + '"}';
        var body = JSON.parse(jsonToken);

        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        let valid: boolean;
        //http://192.168.99.102:4000/user/resources/authentication/
        return this.http.delete('http://192.168.99.103:4002/user/resources/authentication/' + token, options);


    }

    create(name: string, nick: string, email: string, password: string) {

        this.regis = new User();
        this.regis.email = email;
        this.regis.password = password;
        this.regis.nick = nick;
        this.regis.name = name;
        let body = JSON.stringify(this.regis);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        //http://192.168.99.102:4001/user/resources/ldapcruds
        return this.http.post('http://192.168.99.102:4001/user/resources/ldapcruds', body, options);
        // remove user from local storage to log user out
        //localStorage.removeItem('currentUser');
    }
    createMS(name: string, nick: string, email: string, password: string) {

        this.regis = new User();
        this.regis.email = email;
        this.regis.password = password;
        this.regis.nick = nick;
        this.regis.name = name;
        let body = JSON.stringify(this.regis);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        //http://192.168.99.102:4000/user/resources/users/
        return this.http.post('http://192.168.99.103:4002/user/resources/users/', body, options);
        // remove user from local storage to log user out
        //localStorage.removeItem('currentUser');

    }

    // validate(  token: string ):any{
    //     this.valide( token ).subscribe(
    //       data =>{
    //         // let valid:boolean;
    //         // console.log( String(data.valido) );
    //         if( data.valido == "true"){
    //           console.log( "validate true" );
    //           this.authentication = true;
    //         }else{
    //           console.log( "validate false" );
    //           this.authentication = false;
    //         }
    //     });
    //     // console.log( String(this.authentication) );
    //     return this.authentication;
    // }

    validate( token: string ){
        let jsonToken = '{"token":"' + token + '"}';
        var body = JSON.parse(jsonToken);

        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        let valid: boolean;
        //http://192.168.99.102:4000/user/resources/verification/
        return this.http.post('http://user-ms:4000/user/resources/verification/', body, options)
          .map((response: Response) => {
            return response.json();
          });
    }
}
