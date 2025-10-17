import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, map } from 'rxjs';
import { Contact } from './contact.model';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private contactsSubject = new BehaviorSubject<Contact[]>([]);
  private filterSubject = new BehaviorSubject<boolean | null>(null); // null = all, true = online, false = offline

  contacts$ = this.contactsSubject.asObservable();
  filter$ = this.filterSubject.asObservable();

  filteredContacts$ = combineLatest([this.contacts$, this.filter$]).pipe(
    map(([contacts, filter]) => {
      if (filter === null) {
        return contacts;
      }
      return contacts.filter(contact => contact.online === filter);
    })
  );

  constructor() {
    // Add sample data
    this.addSampleContacts();
  }

  setFilter(filter: boolean | null) {
    this.filterSubject.next(filter);
  }

  addContact(contact: Contact) {
    const currentContacts = this.contactsSubject.value;
    this.contactsSubject.next([...currentContacts, contact]);
  }

  updateContact(updatedContact: Contact) {
    const currentContacts = this.contactsSubject.value;
    const updatedContacts = currentContacts.map(contact =>
      contact.id === updatedContact.id ? updatedContact : contact
    );
    this.contactsSubject.next(updatedContacts);
  }

  deleteContact(id: number) {
    const currentContacts = this.contactsSubject.value;
    const filteredContacts = currentContacts.filter(contact => contact.id !== id);
    this.contactsSubject.next(filteredContacts);
  }

  private addSampleContacts() {
    const sampleContacts: Contact[] = [
      { id: 1, name: 'Alice Johnson', online: true },
      { id: 2, name: 'Bob Smith', online: false },
      { id: 3, name: 'Charlie Brown', online: true },
      { id: 4, name: 'Diana Prince', online: false },
      { id: 5, name: 'Eve Wilson', online: true },
      { id: 6, name: 'Frank Miller', online: false },
      { id: 7, name: 'Grace Lee', online: true },
      { id: 8, name: 'Henry Ford', online: false }
    ];
    this.contactsSubject.next(sampleContacts);
  }
}
