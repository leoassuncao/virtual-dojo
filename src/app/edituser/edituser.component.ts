import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-edituser',
  templateUrl: './edituser.component.html',
  styleUrls: ['./edituser.component.css']
})
export class EdituserComponent implements OnInit {

	public user: string;
	public form: FormGroup;


  constructor(public db: AngularFirestore,
  			  private route: ActivatedRoute,
  			  private router: Router) { }

  ngOnInit() {
	this.user = this.route.snapshot.paramMap.get('id');
  	console.log (this.user);



  	 this.form = new FormGroup({
			name: new FormControl('', Validators.required),
			surname: new FormControl('', Validators.required),
			email: new FormControl('', Validators.required),
			cpf: new FormControl('', Validators.required)
		});

	this.getUserInfo(this.user);

  }

getUserInfo(userId) {
	let editForm = this.form;
  	this.db.collection("Users").doc(userId).get().toPromise().then(function(doc) {
  	console.log(doc.data());
  	editForm.controls['name'].setValue(doc.data().user_name);
	editForm.controls['surname'].setValue(doc.data().user_surname);
	editForm.controls['email'].setValue(doc.data().user_email);
	editForm.controls['cpf'].setValue(doc.data().user_cpf);

  		});
	}

editUser() {
		let user = this.form.controls['name'].value;
		let surname = this.form.controls['surname'].value;
		let email = this.form.controls['email'].value;
		let cpf = this.form.controls['cpf'].value;

			this.db.collection('Users').doc(this.user).update({
				user_name: user,
				user_surname: surname,
				user_cpf: cpf,
				user_email: email
				});	

	this.router.navigate([ 'users' ]);		
	}

back() {
	this.router.navigate([ 'users' ]);	
	}
}
