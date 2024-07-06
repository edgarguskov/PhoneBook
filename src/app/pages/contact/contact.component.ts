import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ContactsService } from '../../shared/services/contacts.service';
import { ActivatedRoute } from '@angular/router';
import { Contact } from '../../shared/interfaces/contact.interface';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactComponent implements OnInit {
  contact: Contact | null = null;

  constructor(
    private readonly contactService: ContactsService,
    private readonly activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.getContactById();
  }

  getContactById(): void {
    const id = this.activatedRoute.snapshot.params['id'];

    if (id) {
      this.contact = this.contactService.getContactById(id);
    }
  }
}
