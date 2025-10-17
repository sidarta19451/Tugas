import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ContactService } from './contact.service';
import { Contact } from './contact.model';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit, OnDestroy {
  contacts: Contact[] = [];
  filter: boolean | null = null; // null = all, true = online, false = offline
  newContact: Contact = { id: 0, name: '', online: true };

  private subscriptions: Subscription = new Subscription();

  constructor(private contactService: ContactService) {}

  ngOnInit() {
    this.subscriptions.add(
      this.contactService.filteredContacts$.subscribe(contacts => {
        this.contacts = contacts;
      })
    );
    this.subscriptions.add(
      this.contactService.filter$.subscribe(filter => {
        this.filter = filter;
      })
    );
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  setFilter(filter: boolean | null) {
    this.contactService.setFilter(filter);
  }

  addContact() {
    if (this.newContact.name.trim()) {
      const contact: Contact = {
        ...this.newContact,
        id: Date.now() // Simple ID generation
      };
      this.contactService.addContact(contact);
      this.newContact = { id: 0, name: '', online: true };
    }
  }

  toggleOnline(contact: Contact) {
    const updatedContact = { ...contact, online: !contact.online };
    this.contactService.updateContact(updatedContact);
  }

  deleteContact(id: number) {
    this.contactService.deleteContact(id);
  }
}
