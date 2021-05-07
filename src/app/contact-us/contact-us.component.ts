import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

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
      name: '',
      email: '',
      phone: '',
      message:''
      
    });
  }


  onSubmit() {
    console.log(this.addOxygenForm.value); 
  }
}
