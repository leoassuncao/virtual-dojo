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

  constructor(private db: AngularFirestore) { 

 this.items = db.collection('Users').snapshotChanges().pipe(map( changes => {
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
			cpf: new FormControl('', Validators.required)
		});

  }

	addUser() {
		let user = this.form.controls['name'].value;
		let surname = this.form.controls['surname'].value;
		let cpf = this.form.controls['cpf'].value;

    this.db.collection("Users").add({
    user_cpf: cpf,
    user_id_belt: "ilNkmtOx9Jz1Ev3j4vX0",
    user_id_dojo: "nFhhSj5QySitSHaAhRfw",
    user_id_role: "JxiTSLDkP3JSWm45xaHo",
    user_name: user,
    user_surname: surname
	}) 
}

	editUser(item){
		console.log(item);
			this.db.collection('Users').doc(item).update({
			user_cpf: "1234"});
}
	
	deleteUser(item){
		this.db.collection("Users").doc(item).delete();
}







}