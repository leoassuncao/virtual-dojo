import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-edituser',
  templateUrl: './edituser.component.html',
  styleUrls: ['./edituser.component.css']
})
export class EdituserComponent implements OnInit {

	public user: string;
	public form: FormGroup;


  constructor(public db: AngularFirestore,
  			  private route: ActivatedRoute) { }

  ngOnInit() {
	this.user = this.route.snapshot.paramMap.get('id');
  	console.log (this.user);

  	this.db.collection("Users").doc(this.user).get().toPromise().then(function(doc) {
  	console.log(doc.data());
  	});

  	 this.form = new FormGroup({
			name: new FormControl('', Validators.required),
			surname: new FormControl('', Validators.required),
			email: new FormControl('', Validators.required),
			cpf: new FormControl('', Validators.required)
		});

  }



}
