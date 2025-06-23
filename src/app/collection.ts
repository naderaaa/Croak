import {Component, OnInit} from '@angular/core';
import { UserService, User } from './user.service';

@Component({
  selector: 'app-collection',
  template: `
    
    @for (item of models; track item.username) {
      {{ item.username }} 
      {{ item.tasks }}
       
    }
  
  `,
})
export class Collection implements OnInit {
  models: User[] = [];
   constructor(private userService: UserService) {}

  ngOnInit() {
    this.userService.getAll().subscribe(data => {
      this.models = data;
    });
  }
 }
