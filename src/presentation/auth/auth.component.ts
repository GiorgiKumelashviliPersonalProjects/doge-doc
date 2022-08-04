import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { AuthActions } from './auth.actions';

@Component({
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {
  validateForm!: FormGroup;

  constructor(
    private readonly fb: FormBuilder,
    private readonly store: Store,
    private readonly router: Router
  ) {}

  submitForm(): void {
    if (this.validateForm.valid) {
      this.store
        .dispatch(
          new AuthActions.Authenticate(this.validateForm.value.userName)
        )
        .subscribe(() => this.router.navigate(['/']));
    } else {
      Object.values(this.validateForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      userName: [null, [Validators.required]],
    });
  }
}
