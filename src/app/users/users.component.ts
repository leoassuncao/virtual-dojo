import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})

export class UsersComponent  implements OnInit{

private form: FormGroup;
items: Observable<any[]>;
belts: Observable<any[]>;
dojos: Observable<any[]>;
roles: Observable<any[]>;
private idClicked;



  constructor(private db: AngularFirestore) { 

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
			cpf: new FormControl('', Validators.required),
			belts: new FormControl('', Validators.required),
			dojos: new FormControl('', Validators.required),	
			roles: new FormControl('', Validators.required)
		});

  }

	addUser() {
		let user = this.form.controls['name'].value;
		let surname = this.form.controls['surname'].value;
		let cpf = this.form.controls['cpf'].value;
		let belt = this.form.controls['belts'].value;
		let dojo = this.form.controls['dojos'].value;
		let role = this.form.controls['roles'].value;
		let tempId = this.db.createId();

    this.db.collection("Users").doc(tempId).set({
    user_cpf: cpf,
    user_id_belt: belt,
    user_id_dojo: dojo,
    user_id_role: role,
    user_name: user,
    user_surname: surname
	}) 


	
}

	detailUser(item){
		console.log(item);
}
	
	deleteUser(item){
		this.db.collection("Users").doc(item).delete();
}

	editUser(item){
		this.db.collection('Users').doc(item).update({
			user_cpf: "1234"});
}


	delClicked(id) {
	this.idClicked = id;

	}





}