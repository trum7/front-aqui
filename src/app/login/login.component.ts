import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {RequestOptions, Http, Request, RequestMethod, Headers} from '@angular/http';
import { AlertService, AuthenticationService } from '../_services/index';
import { Observable } from 'rxjs/Rx';
import { User } from '../_models/index';

@Component({
  moduleId: module.id,
  selector: 'login',
  styleUrls: ['login.component.css'],
  templateUrl: 'login.component.html'
})
export class LoginComponent implements OnInit {
    model: any = {};
    model1: any = {};
    loading = false;
    loading1 = false;
    returnUrl: string;
    token: string;
    modelU: User;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
        private alertService: AlertService,
        private http: Http
    ) { }

    ngOnInit() {

        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }



    login() {
        this.loading = true;
        this.authenticationService.login(this.model.email, this.model.password)
        .subscribe(
            data1 => {
                if( data1.login == "True" ){
                  // this.router.navigate([this.returnUrl]);
                  this.authenticationService.loginMS(this.model.email, this.model.password)
                  .subscribe(
                      data1 => {
                          if ( data1.token == "Usuario invalido" ){
                          }else{
                            if (typeof(Storage) !== "undefined") {
                                localStorage.setItem("id", data1.id.toString( ));
                                localStorage.setItem("token", data1.token.toString( ));
// prueba del validate

                                this.authenticationService.validate( data1.token.toString( ) )
                                .subscribe(
                                  data2 => {
                                      if (data2.valido == "true" ){

                                        this.router.navigate([this.returnUrl]);

                                      }else{

                                        var divL = document.getElementById('avisoLogin');
                                        divL.style.display= 'block' ;

                                      }


                                  }


                                );
// var myString: string = String(bool);
// console.log( myString );
// console.log( "PUTO MUNDO" );
// if( String(bool) == true ){
//   this.router.navigate([this.returnUrl]);
// }else{
// }
// //
//
                                // this.router.navigate([this.returnUrl]);
                            }
                          }
                      },
                      error => {
                          this.alertService.error(error);
                          this.loading = false;
                      });
                }else{
                    var divL = document.getElementById('avisoLogin');
                    divL.style.display= 'block' ;
                }
            },
            error => {
                this.alertService.error(error);
                this.loading = false;
            });
    }


    logout( ){
      this.authenticationService.logout( localStorage.getItem('token') )
          .subscribe(
              data => {
                  var str = String(data);
                  var n = str.search("200");
                  if( n != -1 ){
                    // remove user from local storage to log user out
                    localStorage.removeItem('token');
                    localStorage.removeItem('id');
                    this.router.navigate([this.returnUrl]);
                  }
              },
              error => {

              });
    }


    register( ){
        this.loading1 = true;
        this.authenticationService.create(this.model1.firstName, this.model1.lastName, this.model1.username, this.model1.password )
            .subscribe(
                data => {
                    var str = String(data);
                    var n = str.search("201");
                    var div = document.getElementById('aviso');
                    var div1 = document.getElementById('aviso1');
                    if( n != -1 ){

                      div1.style.display= 'none' ;
                      div.style.display= 'block' ;
                      this.authenticationService.createMS( this.model1.firstName, this.model1.lastName, this.model1.username, this.model1.password )
                        .subscribe(
                          data =>{
                            var str = String(data);
                            var n = str.search("201");
                            if( n != -1 ){
                            }
                          }

                      );

                    }else{
                      div.style.display= 'none' ;
                      div1.style.display= 'block' ;
                    }
                    this.loading1 = false;
                },
                error => {
                    this.alertService.error(error);
                    this.loading1 = false;
                });
    }

}
