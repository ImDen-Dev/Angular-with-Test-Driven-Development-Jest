import { Component } from '@angular/core';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent {
  disabled = true;
  password = '';
  passwordRepeat = '';
  username = '';
  email = '';
  onChangePassword(event: Event): void {
    this.password = (event.target as HTMLInputElement).value;
  }
  onChangePasswordRepeat(event: Event): void {
    this.passwordRepeat = (event.target as HTMLInputElement).value;
  }
  onChangeUsername(event: Event): void {
    this.username = (event.target as HTMLInputElement).value;
  }
  onChangeEmail(event: Event): void {
    this.email = (event.target as HTMLInputElement).value;
  }

  onClickSignUp() {
    fetch('/api/1.0/users', {
      method: 'POST',
      body: JSON.stringify({
        username: this.username,
        email: this.email,
        password: this.password,
      }),
    });
  }

  isDisabled(): boolean {
    return this.password ? this.password !== this.passwordRepeat : true;
  }
}
