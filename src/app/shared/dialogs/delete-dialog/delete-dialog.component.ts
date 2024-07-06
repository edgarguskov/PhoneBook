import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Contact } from '../../interfaces/contact.interface';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ContactsService } from '../../services/contacts.service';

@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DeleteDialogComponent implements OnInit {
  deleteForm: FormGroup = new FormGroup({
    firstName: new FormControl({ value: '', disabled: true }),
    lastName: new FormControl({ value: '', disabled: true }),
    phoneNumber: new FormControl({ value: '', disabled: true }),
    eMail: new FormControl({ value: '', disabled: true }),
  });

  private contactToDelete: Contact;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Contact,
    private readonly contactService: ContactsService,
    private readonly dialogRef: MatDialogRef<DeleteDialogComponent>,
  ) {
    this.contactToDelete = data;
  }

  ngOnInit(): void {
    this.deleteForm.controls['firstName'].setValue(this.contactToDelete.firstName);
    this.deleteForm.controls['lastName'].setValue(this.contactToDelete.lastName);
    this.deleteForm.controls['phoneNumber'].setValue(this.contactToDelete.phoneNumber);
    this.deleteForm.controls['eMail'].setValue(this.contactToDelete.eMail);
  }

  onSubmit(): void {
    let contactId = this.contactToDelete.id;

    this.contactService.deleteContact(contactId);

    this.dialogRef.close(true);
  }

}
