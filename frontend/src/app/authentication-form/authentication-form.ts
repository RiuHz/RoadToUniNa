import { Component, inject, input, output } from '@angular/core';
import { AuthRequest } from '../services/rest-backend/auth-request.type';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-authentication-form',
  imports: [ReactiveFormsModule],
  templateUrl: './authentication-form.html',
  styleUrl: './authentication-form.scss',
})
export class AuthenticationForm {
  submitText = input('Invia');
  submitForm = output<AuthRequest>();

  toastr = inject(ToastrService);

  form = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(16)
    ])
  });

  onSubmit() {
    if (this.form.invalid) {
      this.toastr.error('I dati inseriti non hanno passato la validazione...', 'Oops! Dati non validi!')
    } else {
      this.submitForm.emit({
        username: this.form.value.username as string,
        password: this.form.value.password as string
      });
    }
  }
}
