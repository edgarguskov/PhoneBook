import { HostListener, Injectable, OnDestroy } from '@angular/core';
import { Contact } from '../interfaces/contact.interface';
import { CONTACTS_DATA, CONTACTS_KEY } from '../properties/app.properties';

@Injectable({
  providedIn: 'root',
})
export class ContactsService implements OnDestroy {
  private _contacts: Contact[] = [];

  constructor() {
    this.fetchContacts();
  }

  get contacts(): Contact[] {
    return this._contacts;
  }

  @HostListener('window:onbeforeunload', ['$event'])
  setToLocalStorage(): void {
    localStorage.setItem(CONTACTS_KEY, JSON.stringify(this._contacts));
    console.log('11');
  }

  createContact(newContact: Contact): void {
    this._contacts.push(newContact);

    localStorage.setItem(CONTACTS_KEY, JSON.stringify(this._contacts));
  }

  updateContact(updateContact: Contact) {
    const index = this.getContactIndexById(updateContact.id);

    this._contacts[index].firstName = updateContact.firstName;
    this._contacts[index].lastName = updateContact.lastName;
    this._contacts[index].phoneNumber = updateContact.phoneNumber;
    this._contacts[index].eMail = updateContact.eMail;

    localStorage.setItem(CONTACTS_KEY, JSON.stringify(this._contacts));
  }

  deleteContact(id: number) {
    const index = this.getContactIndexById(id);

    this._contacts.splice(index, 1);

    localStorage.setItem(CONTACTS_KEY, JSON.stringify(this._contacts));
  }

  getContactById(id: number): Contact {
    return this._contacts.find((contact: Contact): boolean => contact.id == id)!;
  }

  ngOnDestroy(): void {
    localStorage.setItem(CONTACTS_KEY, JSON.stringify(this._contacts));
    console.log('11');
  }

  private fetchContacts(): void {
    const contacts = localStorage.getItem(CONTACTS_KEY) ? JSON.parse(localStorage.getItem(CONTACTS_KEY)!) : null;

    this._contacts = contacts ? contacts : CONTACTS_DATA;
  }

  private getContactIndexById(id: number): number {
    return this._contacts.findIndex((contact: Contact): boolean => contact.id == id);
  }
}
