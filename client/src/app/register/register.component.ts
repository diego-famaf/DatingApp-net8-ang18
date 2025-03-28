import { Component, inject, OnInit, output } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';
import { AccountService } from '../_services/account.service';
import { NgIf } from '@angular/common';
import { TextInputComponent } from "../_forms/text-input/text-input.component";
import { DatePickerComponent } from '../_forms/date-picker/date-picker.component';
import { Router } from '@angular/router';


@Component({
    selector: 'app-register',
    standalone: true,
    templateUrl: './register.component.html',
    styleUrl: './register.component.css',
    imports: [ReactiveFormsModule, NgIf, TextInputComponent,DatePickerComponent]
})
export class RegisterComponent implements OnInit {
 
  private accountService = inject(AccountService);
  private fb = inject(FormBuilder);
  private router = inject(Router);

  cancelRegister = output<boolean>();
  registerForm:FormGroup = new FormGroup({});
  maxDate = new Date();
  validationErrors: string | undefined;


  ngOnInit(): void {
    this.initializeForm();
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18)
  }

  initializeForm(){
    this.registerForm = this.fb.group({
      gender : ['masculino'],
      username : ['',Validators.required],
      knownAs : ['',Validators.required],
      dateOfBirth : ['',Validators.required],
      city : ['',Validators.required],
      country : ['',Validators.required],
      password : ['',[Validators.required,Validators.minLength(4), Validators.maxLength(8)]],
      confirmPassword : ['',[Validators.required,this.matchValues('password')]],
    });
    this.registerForm.controls['password'].valueChanges.subscribe({
      next: () => this.registerForm.controls['confirmPassword'].updateValueAndValidity()
    })
  }

  matchValues(matchTo: string):ValidatorFn{
    return(control:AbstractControl) => {
      return control.value === control.parent?.get(matchTo)?.value? null : {isMatching : true}
    }
  }

  register() {
    const dateOfBirth = this.getDateOnly(this.registerForm.get('dateOfBirth')?.value);
    this.registerForm.patchValue({dateOfBirth:dateOfBirth});
    this.accountService.register(this.registerForm.value).subscribe({
      next: _ => this.router.navigateByUrl('/miembros'),
      error: error =>this.validationErrors = error 
      })
    }
    
  cancel() {
    this.cancelRegister.emit(false);
  }

  private getDateOnly(dateOfBirth: string | undefined){
    if(!dateOfBirth) return;
    return new Date(dateOfBirth).toISOString().slice(0, 10);
  }
}
