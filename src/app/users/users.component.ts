import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase';
import { Router } from '@angular/router';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})

export class UsersComponent  implements OnInit{

public form: FormGroup;
items: Observable<any[]>;
belts: Observable<any[]>;
dojos: Observable<any[]>;
roles: Observable<any[]>;
public idClicked;



  constructor(public db: AngularFirestore,
  				private router: Router) { 

 this.items = db.collection('Users').snapshotChanges().pipe(map( changes => {
        return changes.map(a => {
            const data = a.payload.doc.data() ;
            const id = a.payload.doc.id;
            return { id, ...data };

        });
    }));
	
 this.belts = db.collection('Belts').snapshotChanges().pipe(map( changes => {
        return changes.map(a => {
            const data = a.payload.doc.data() ;
            const id = a.payload.doc.id;
            return { id, ...data };

        });
    }));


    this.dojos = db.collection('Dojo').snapshotChanges().pipe(map( changes => {
        return changes.map(a => {
            const data = a.payload.doc.data() ;
            const id = a.payload.doc.id;
            return { id, ...data };

        });
    }));

    this.roles = db.collection('Role').snapshotChanges().pipe(map( changes => {
        return changes.map(a => {
            const data = a.payload.doc.data() ;
            const id = a.payload.doc.id;
            return { id, ...data };

        });
    }));
}

  ngOnInit() {


  this.form = new FormGroup({
			name: new FormControl('', Validators.required),
			surname: new FormControl('', Validators.required),
			email: new FormControl('', Validators.required),
			cpf: new FormControl('', Validators.required),
			belts: new FormControl('', Validators.required),
			dojos: new FormControl('', Validators.required),	
			roles: new FormControl('', Validators.required)
		});
  }

	addUser() {
		let user = this.form.controls['name'].value;
		let surname = this.form.controls['surname'].value;
		let email = this.form.controls['email'].value;
		let cpf = this.form.controls['cpf'].value;
		let belt = this.form.controls['belts'].value;
		let dojo = this.form.controls['dojos'].value;
		let role = this.form.controls['roles'].value;
		let teste =   this.db.collection("Users");

		firebase.auth().createUserWithEmailAndPassword(email, cpf).then(function (data)  {
			let tempId = data.user.uid;
             teste.doc(tempId).set({
				user_cpf: cpf,
				user_email: email,
				user_id_belt: belt,
				user_id_dojo: dojo,
				user_id_role: role,
				user_name: user,
				user_surname: surname
				}) 
            });	
}

	detailUser(item){
		console.log(item);
}
	
	deleteUser(item){
		this.db.collection("Users").doc(item).delete();
}

	editUser(item){
		this.db.collection('Users').doc(item).update({
			user_cpf: "12346"});

	this.router.navigate([ 'editUser/' + item ]);

}


	delClicked(id) {
	this.idClicked = id;

	}





}