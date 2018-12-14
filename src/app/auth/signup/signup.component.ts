import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup, AbstractControl, FormControl } from '@angular/forms';

import { AuthService } from '@core/providers/auth.service';
import { StaticMethods } from '@core/static-methods';
import { ModalManager } from '@core/providers/modal-manager';
import { CustomValidators } from '@shared/custom-validators';

import { MatSnackBar, MatSnackBarConfig } from '@angular/material';
import { ResultSnackbar } from '@shared/dialogs/result-snackbar/result.snackbar';

import { PersonType } from '@shared/models/user.model';
import { DocumentFile } from '@shared/models/shared.model';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-signup',
  templateUrl: 'signup.component.html',
  styleUrls: ['signup.component.scss']
})
export class SignupComponent implements OnInit {

  loadedUser = false;

  PersonType = PersonType;
  willRent = false;

  terms = false;

  idTypes = [
    {
      id: 1,
      name: 'Cédula de Ciudadanía'
    },
    {
      id: 2,
      name: 'NIT'
    }
  ];

  errors: any = {};
  signupForm: FormGroup;
  get name() { return this.signupForm.get('name'); }
  get lastName() { return this.signupForm.get('lastName'); }
  get identificationType() { return this.signupForm.get('identificationType'); }
  get identification() { return this.signupForm.get('identification'); }
  get email() { return this.signupForm.get('email'); }
  get phoneNumber() { return this.signupForm.get('phoneNumber'); }
  get passwords() { return this.signupForm.get('passwords'); }
  get password() { return this.passwords.get('password'); }
  get password_confirmation() { return this.passwords.get('password_confirmation'); }

  idFront: DocumentFile;
  idBack: DocumentFile;
  bill: DocumentFile;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private mm: ModalManager,
    private domSanitizer: DomSanitizer,
  ) { }

  ngOnInit() {
    this.signupForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      identificationType: [{ value: 1 }, [Validators.required]],
      identification: ['', [Validators.required]],
      email: ['', [Validators.required, CustomValidators.email()]],
      phoneNumber: ['', [Validators.required, Validators.minLength(7)]],
      passwords: this.formBuilder.group({
        password: ['', [Validators.required, Validators.minLength(8)]],
        password_confirmation: ['', [Validators.required, Validators.minLength(8)]],
      }, { validator: [CustomValidators.matchPasswords] }),
    });
    this.identificationType.setValue(1);
  }

  onSubmit() {
    this.mm.showLoadingDialog();
    const requestParams = {};

    this.authService.signup(requestParams)
      .subscribe(res => {
        this.mm.closeLoadingDialog();
        this.router.navigate(['login']);
      },
        (err) => {
          console.log(err);

          if (typeof err === 'string') {
            this.errors = {
              message: err
            };
          } else {
            this.errors = err;
            StaticMethods.setFormErrors(this.signupForm, this.errors);
          }
        });
  }

  onFile(file, i) {
    console.log(file);
    // if (!file.name.includes('pdf')) {
    //   this.mm.showResultSnackbar('Extensión de Archivo inválida', false);
    //   return;
    // }
    const f = {
      file: file,
      name: file.name,
      url: URL.createObjectURL(file)
    };
    console.log(f);
    switch (i) {
      case 0:
        this.idFront = f;
        break;
      case 1:
        this.idBack = f;
        break;
      case 2:
        this.bill = f;
        break;
    }
  }

  getErrorMessage(formControl: AbstractControl, error?) {
    if (error && error.length) {
      console.log(error[0]);
      return error[0];
    } else {
      return StaticMethods.getFormError(formControl);
    }
  }
}
