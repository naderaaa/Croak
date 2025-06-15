import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { NgOptimizedImage } from '@angular/common'


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ReactiveFormsModule, NgOptimizedImage],
  template: '<router-outlet/>',
})


export class AppComponent {}
