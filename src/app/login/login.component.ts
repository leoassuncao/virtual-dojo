import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

	public form: FormGroup;
	app: firebase.app.App;

  constructor(private router: Router) {

	this.app = firebase.initializeApp(environment.firebase);
  }

  ngOnInit() {

  this.form = new FormGroup({
			user: new FormControl('', Validators.required),
			password: new FormControl('', Validators.required)
		});

  }

  doLogin() {

		const user = this.form.controls['user'].value;
		const pwd = this.form.controls['password'].value;

		firebase.auth().signInWithEmailAndPassword(user, pwd).then((userInfo) => {
			  this.router.navigate([ 'home' ]);
			}).catch(function(error) {
			    const errorCode = error.code;
			    const errorMessage = error.message;

			    if (errorCode === 'auth/wrong-password') {
			        alert('Senha incorreta');
			    } if (errorCode === 'auth/network-request-failed') {
			    	alert('Erro de conexão');
			    } else {
			        alert(errorMessage);
			    }
			    console.log(error);
		});
	}
}
