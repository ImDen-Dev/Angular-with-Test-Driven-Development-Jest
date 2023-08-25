import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { SignUpComponent } from './sign-up.component';

describe('SignUpComponent', () => {
  let component: SignUpComponent;
  let fixture: ComponentFixture<SignUpComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SignUpComponent],
      imports: [HttpClientTestingModule],
    });
    fixture = TestBed.createComponent(SignUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('Layout', () => {
    it('has Sign-up header', () => {
      const signUp = fixture.nativeElement as HTMLElement;
      const h1 = signUp.querySelector('h1');
      expect(h1?.textContent).toBe('Sign Up');
    });

    it('has username input', () => {
      const signUp = fixture.nativeElement as HTMLElement;
      const input = signUp.querySelector('input[id="username"]');
      const label = signUp.querySelector('label[for="username"]');
      expect(input).toBeTruthy();
      expect(label).toBeTruthy();
      expect(label?.textContent).toContain('Username');
    });

    it('has email input', () => {
      const signUp = fixture.nativeElement as HTMLElement;
      const input = signUp.querySelector('input[id="email"]');
      const label = signUp.querySelector('label[for="email"]');
      expect(input).toBeTruthy();
      expect(label).toBeTruthy();
      expect(label?.textContent).toContain('E-mail');
    });

    it('has password input', () => {
      const signUp = fixture.nativeElement as HTMLElement;
      const input = signUp.querySelector('input[id="password"]');
      const label = signUp.querySelector('label[for="password"]');
      expect(input).toBeTruthy();
      expect(label).toBeTruthy();
      expect(label?.textContent).toContain('Password');
    });

    it('has password type for password input', () => {
      const signUp = fixture.nativeElement as HTMLElement;
      const input = signUp.querySelector(
        'input[id="password"]',
      ) as HTMLInputElement;
      expect(input.type).toBe('password');
    });

    it('has password repeat input', () => {
      const signUp = fixture.nativeElement as HTMLElement;
      const input = signUp.querySelector('input[id="passwordRepeat"]');
      const label = signUp.querySelector('label[for="passwordRepeat"]');
      expect(input).toBeTruthy();
      expect(label).toBeTruthy();
      expect(label?.textContent).toContain('Password Repeat');
    });

    it('has password type for password repeat input', () => {
      const signUp = fixture.nativeElement as HTMLElement;
      const input = signUp.querySelector(
        'input[id="passwordRepeat"]',
      ) as HTMLInputElement;
      expect(input.type).toBe('password');
    });

    it('has Sign-up button', () => {
      const signUp = fixture.nativeElement as HTMLElement;
      const button = signUp.querySelector('button');
      expect(button?.textContent).toBe('Sign Up');
    });

    it('disables the button initially', () => {
      const signUp = fixture.nativeElement as HTMLElement;
      const button = signUp.querySelector('button');
      expect(button?.disabled).toBeTruthy();
    });
  });

  describe('Interactions', () => {
    it('enables the button when the password and password repeat fields have same value', () => {
      const signUp = fixture.nativeElement as HTMLElement;
      const passwordInput = signUp.querySelector(
        'input[id="password"]',
      ) as HTMLInputElement;
      const passwordRepeatInput = signUp.querySelector(
        'input[id="passwordRepeat"]',
      ) as HTMLInputElement;

      passwordInput.value = 'P4ssword';
      passwordInput.dispatchEvent(new Event('input'));

      passwordRepeatInput.value = 'P4ssword';
      passwordRepeatInput.dispatchEvent(new Event('input'));

      fixture.detectChanges();

      const button = signUp.querySelector('button');
      expect(button?.disabled).toBeFalsy();
    });

    it('sends username, email, and password to backend after clicking the button', () => {
      const httpTestingController = TestBed.inject(HttpTestingController);

      const signUp = fixture.nativeElement as HTMLElement;
      const usernameInput = signUp.querySelector(
        'input[id="username"]',
      ) as HTMLInputElement;
      const emailInput = signUp.querySelector(
        'input[id="email"]',
      ) as HTMLInputElement;
      const passwordInput = signUp.querySelector(
        'input[id="password"]',
      ) as HTMLInputElement;
      const passwordRepeatInput = signUp.querySelector(
        'input[id="passwordRepeat"]',
      ) as HTMLInputElement;

      usernameInput.value = 'User1';
      usernameInput.dispatchEvent(new Event('input'));

      emailInput.value = 'email@email.com';
      emailInput.dispatchEvent(new Event('input'));

      passwordInput.value = 'P4ssword';
      passwordInput.dispatchEvent(new Event('input'));

      passwordRepeatInput.value = 'P4ssword';
      passwordRepeatInput.dispatchEvent(new Event('input'));

      fixture.detectChanges();

      const button = signUp.querySelector('button');
      button?.click();

      const req = httpTestingController.expectOne('/api/1.0/users');
      const requestBody = req.request.body;

      expect(requestBody).toEqual({
        username: 'User1',
        email: 'email@email.com',
        password: 'P4ssword',
      });

      expect(button?.disabled).toBeFalsy();
    });
  });
});
