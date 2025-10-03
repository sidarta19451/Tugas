import { Component } from '@angular/core';

@Component({
  selector: 'app-registrationform',
  templateUrl: './registrationform.component.html',
  styleUrls: ['./registrationform.component.css']
})
export class RegistrationformComponent {
  model = {
    nama: '',
    nisn: '',
    email: '',
    phone: '',
    asalSekolah: '',
    alamat: '',
    nilai: null,
    jurusan: '',
    jenisKelamin: '',
    ekstrakulikuler: {
      pramuka: false,
      futsal: false,
      basket: false
    }
  };

  submittedData: any = null;

  onSubmit() {
    this.submittedData = { ...this.model };
    console.log('Captured form values:', this.submittedData);
    alert('Form submitted successfully!');
  }
}
