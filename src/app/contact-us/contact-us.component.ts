import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements OnInit {
  addOxygenForm: FormGroup;

  constructor(private fb: FormBuilder) { 

    this.createForm();
  }

  ngOnInit(): void {
  }
  createForm() {
    this.addOxygenForm = this.fb.group({
      name:  new FormControl('',  [Validators.required]),
      email:  new FormControl('',  [Validators.required,	Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
      phone: '',
      message: new FormControl('',  [Validators.required]),
      
    });
  }


  onSubmit() {
    
    console.log(this.addOxygenForm.value);
    Swal.fire({
      title: 'Email sent seccessfully !',
     
      icon: 'success',
      confirmButtonText: 'Cool'
    }) 
    this.addOxygenForm.reset()
  }
}
