import { Injectable } from '@angular/core';
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

      this.model = new User( );
      this.model.email = email;
      this.model.password = password;
      let body = JSON.stringify( this.model );
      let headers = new Headers({ 'Content-Type': 'application/json'});
      let options = new RequestOptions({ headers: headers });
      var resul = false;
      // return this.http.post('http://192.168.99.101:4001/user/resources/ldap', body, options)
      // return this.http.post('http://192.168.99.102:4001/user/resources/ldap', body, options)
      return this.http.post('http://169.254.176.227:4001/user/resources/ldap', body, options)
        .map((response: Response) => {
          // login successful if there's a jwt token in the response
          return response.json();
        });
    }

    loginMS(email: string, password: string) {
      this.model = new User();
      this.model.email = email;
      this.model.password = password;
      let body = JSON.stringify(this.model);
      let headers = new Headers({ 'Content-Type': 'application/json' });
      let options = new RequestOptions({ headers: headers });
      var resul = false;
      // return this.http.post( 'http://192.168.99.101:4000/user/resources/authentication', body, options )
      // return this.http.post( 'http://192.168.99.101:4002/user/resources/authentication', body, options )
      return this.http.post( 'http://169.254.176.227:4002/user/resources/authentication', body, options )
      .map( (response: Response) => {
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
        // return this.http.delete('http://192.168.99.101:4002/user/resources/authentication/' + token, options);
        // return this.http.delete('http://192.168.99.102:4002/user/resources/authentication/' + token, options);
        return this.http.delete('http://169.254.176.227:4002/user/resources/authentication/' + token, options);

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
        // return this.http.post('http://192.168.99.101:4001/user/resources/ldapcruds', body, options);
        // return this.http.post('http://192.168.99.102:4001/user/resources/ldapcruds', body, options);
        return this.http.post('http://169.254.176.227:4001/user/resources/ldapcruds', body, options);
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
        // return this.http.post('http://192.168.99.101:4000/user/resources/users/', body, options);
        // return this.http.post('http://192.168.99.102:4000/user/resources/users/', body, options);
        return this.http.post('http://169.254.176.227:4002/user/resources/users/', body, options);

    }

    validate( token: string ){
        let jsonToken = '{"token":"' + token + '"}';
        var body = JSON.parse(jsonToken);

        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        let valid: boolean;
        // return this.http.post('http://192.168.99.101:4000/user/resources/verification/', body, options)
        // return this.http.post('http://192.168.99.102:4000/user/resources/verification/', body, options)
        return this.http.post('http://169.254.176.227:4002/user/resources/verification/', body, options)
          .map((response: Response) => {
            return response.json();
          }
        );
    }
}
