import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent {
  password = '';
  passwordRepeat = '';
  username = '';
  email = '';

  constructor(private httpClient: HttpClient) {}

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
    this.httpClient
      .post('/api/1.0/users', {
        username: this.username,
        email: this.email,
        password: this.password,
      })
      .subscribe();
  }

  isDisabled(): boolean {
    return this.password ? this.password !== this.passwordRepeat : true;
  }
}
