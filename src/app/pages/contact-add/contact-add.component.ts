import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Contact } from '../../shared/interfaces/contact.interface';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ContactsService } from '../../shared/services/contacts.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contact-add',
  templateUrl: './contact-add.component.html',
  styleUrls: ['./contact-add.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactAddComponent {
  contactForm: FormGroup = new FormGroup({
    firstName: new FormControl('', [Validators.required, Validators.maxLength(50), Validators.minLength(3)]),
    lastName: new FormControl('', [Validators.required, Validators.maxLength(50), Validators.minLength(3)]),
    phoneNumber: new FormControl('', [Validators.required, Validators.maxLength(20), Validators.minLength(9)]),
    eMail: new FormControl('', [Validators.required, Validators.maxLength(200)]),
  });

  constructor(
    private readonly router: Router,
    private readonly contactsService: ContactsService) {
  }

  onSubmit(): void {
    const newContact: Contact = {
      id: Math.floor((Math.random() * 6) + 1),
      firstName: this.contactForm.controls['firstName'].value as string,
      lastName: this.contactForm.controls['lastName'].value as string,
      phoneNumber: this.contactForm.controls['phoneNumber'].value as string,
      eMail: this.contactForm.controls['eMail'].value as string,
    };

    this.contactsService.createContact(newContact);

    void this.router.navigate(['/contacts']);
  }

  onCancel(): void {
    void this.router.navigate(['/contacts']);
  }
}
