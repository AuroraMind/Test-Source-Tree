import { RegistrationService } from './registration.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms'
import { PasswordValidator } from './shared/password.validator';
import { forbiddenNameValidator } from './shared/user-name.validator';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  registrationForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private _registrationService:RegistrationService
    ) {}

  get userName() {
    return this.registrationForm.get('userName');
  }

  get email() {
    return this.registrationForm.get('email');
  }

  get alternateEmails() {
    return this.registrationForm.get('alternateEmails') as FormArray;
  }

  addAlternateEmail() {
    this.alternateEmails.push(this.fb.control(''));
  }

  ngOnInit(){

    this.registrationForm = this.fb.group({
      userName: ['', [Validators.required, Validators.minLength(2), forbiddenNameValidator(/password/)]],
      email: [''],
      subscribe: [false],
      password: ['',[Validators.required]],
      confirmPassword: [''],
      address: this.fb.group({
        city: [''],
        state: [''],
        postalCode: [''],
      }),
      alternateEmails: this.fb.array([])
      
     },
        {validator: PasswordValidator} 
    );
     this.registrationForm.get('subscribe')?.valueChanges
      .subscribe( checkedvalue => 
        {
          const email = this.registrationForm.get('email');
          if(checkedvalue)
          {
            email?.setValidators(Validators.required)
          } else {
            email?.clearValidators();
          }
          email?.updateValueAndValidity();
        }
        );
  }

  onSubmit() {
    this._registrationService.register(this.registrationForm.value)
      .subscribe(
        response =>console.log("Success!! ", response),
        error => console.log("Error!! ", error)
      )
  }

  
  /*registrationForm = new FormGroup( 
    {
    userName: new FormControl( '', [Validators.required, Validators.minLength(2), forbiddenNameValidator]),
    password: new FormControl(''),
    confirmPassword: new FormControl(''),

    address: new FormGroup(
      {
        city: new FormControl(''),
        state: new FormControl(''),
        postalCode: new FormControl('')
      }
    )
  });*/ //FormGroup & FormControl Approach

  loadApiData() {
    //this.registrationForm.setValue(
      /*this.registrationForm.patchValue(
      {
        userName:'Bruce',
        password:'test',
        confirmPassword:'test',
        
        address: {
          city:'LA',
          state:'California',
          postalCode:'4544789789'
        }
      }
    )*/
  }

}
