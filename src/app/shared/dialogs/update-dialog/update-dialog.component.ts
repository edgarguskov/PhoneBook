import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Contact } from 'src/app/shared/interfaces/contact.interface';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ContactsService } from '../../services/contacts.service';

@Component({
  selector: 'app-update-dialog',
  templateUrl: './update-dialog.component.html',
  styleUrls: ['./update-dialog.component.scss'],
})
export class UpdateDialogComponent implements OnInit {
  updateForm: FormGroup = new FormGroup({
    firstName: new FormControl('', [Validators.required, Validators.maxLength(50), Validators.minLength(3)]),
    lastName: new FormControl('', [Validators.required, Validators.maxLength(50), Validators.minLength(3)]),
    phoneNumber: new FormControl('', [Validators.required, Validators.maxLength(20), Validators.minLength(9)]),
    eMail: new FormControl('', [Validators.required, Validators.maxLength(200)]),
  });

  private contactToUpdate: Contact;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Contact,
    private readonly contactService: ContactsService,
    private readonly dialogRef: MatDialogRef<UpdateDialogComponent>,
  ) {
    this.contactToUpdate = data;
  }

  ngOnInit(): void {
    this.updateForm.controls['firstName'].setValue(this.contactToUpdate.firstName);
    this.updateForm.controls['lastName'].setValue(this.contactToUpdate.lastName);
    this.updateForm.controls['phoneNumber'].setValue(this.contactToUpdate.phoneNumber);
    this.updateForm.controls['eMail'].setValue(this.contactToUpdate.eMail);
  }

  onSubmit(): void {
    const updateContact: Contact = {
      id: this.contactToUpdate.id,
      firstName: this.updateForm.controls['firstName'].value as string,
      lastName: this.updateForm.controls['lastName'].value as string,
      phoneNumber: this.updateForm.controls['phoneNumber'].value as string,
      eMail: this.updateForm.controls['eMail'].value as string,
    };

    this.contactService.updateContact(updateContact);

    this.dialogRef.close(true);
  }
}
