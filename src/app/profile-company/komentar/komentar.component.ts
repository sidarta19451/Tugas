import { Component } from '@angular/core';

@Component({
  selector: 'app-komentar',
  templateUrl: './komentar.component.html',
  styleUrls: ['./komentar.component.css']
})
export class KomentarComponent {
  commentForm ={
    name: '',
    email: '',
    comment: '',
  };

  comments: any[] =[];

  onSubmit() {
    if (this.commentForm.name && this.commentForm.email && this.commentForm.comment) {
      this.comments.push({
        name: this.commentForm.name,
        email: this.commentForm.email,
        comment: this.commentForm.comment,
        date: new Date().toLocaleDateString()
      });
      this.commentForm = {name:'', email:'', comment:''};
    }
  }
}
