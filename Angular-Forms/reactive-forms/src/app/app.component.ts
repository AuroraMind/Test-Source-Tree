import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { forbiddenNameValidator } from './shared/user-name.validator';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  registrationForm = new FormGroup( 
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
  });

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

  get userName() {
    return this.registrationForm.get('userName');
  }
}
