import { Component } from '@angular/core';
import { User } from './user';
import { EnrollmentService } from './enrollment.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  topics = ['Angular','Node','Vue'];
  topicHasError = true;
  submitted = false;
  errorMsg='';

  userModel = new User( 'sssss', 'rob@test.com', 1234445555, 'default', 'morning', true);

  constructor( private _enrollmentService: EnrollmentService ) {}

  validateTopic(value:string) {
    if(value==='default') {
      this.topicHasError=true;
    }
    else
    {
      this.topicHasError=false;
    }
  }

  onSubmit(userForm:any) {
    this.submitted=true;
    this._enrollmentService.enroll(this.userModel)
      .subscribe(
        data => console.log('Success! ', data),
        error => {
          this.errorMsg=error.statusText;
        }
      )
    console.log(userForm);
  }

}
