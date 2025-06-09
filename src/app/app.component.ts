import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})


export class AppComponent {
  title = 'Croak';
  taskFieldRequested = false;
  numFrogTasks = 0;
  tasks: Task[] = [new Task("Call mom", "", "Small")];

  constructor(private sanitizer: DomSanitizer) {}

  
  frogForm = new FormGroup({
    task: new FormControl('', Validators.required),
    frogName: new FormControl(''),
    frogSize: new FormControl('', Validators.required),
  });

  addTask() {
    if (this.taskFieldRequested == false) {
      this.taskFieldRequested = true;
    } else {
      this.taskFieldRequested = false;
    }
  }

  handleSubmit() {
    if (this.frogForm.value.frogName == "") {
      alert("New frog created!");

      this.addFrog(this.frogForm.value.task + "", "", this.frogForm.value.frogSize + "");
      
    } else {
      alert(this.frogForm.value.frogName + " created!");
            this.addFrog(this.frogForm.value.task + "", this.frogForm.value.frogName + "", this.frogForm.value.frogSize + "");

    }
  }

  addFrog(taskMsg:string, name:string, size:string) {
    this.numFrogTasks++;
    let task = new Task(taskMsg, name, size);
    this.tasks.push(task);

  }

  tasksToHTML(): SafeHtml {
    let ret = "Nothing";
    let count = 0;
    this.tasks.forEach(x => ret += `<input type="checkbox" name="task${count}" value="task${count}"><label for="task${count++}">${x.description}</label>`);

    return this.sanitizer.bypassSecurityTrustHtml(ret);
  }
}

class Task {
  description: string;
  name: string;
  size: string;

  constructor(desc: string, name: string | undefined, size:string){
    this.description = desc;
    this.size = size;
    if (name != undefined) {
      this.name = name;
    } else {
      this.name = this.assignName();
    }
  }

  assignName() {
    let val = Math.random()*6;
    let ret = "";
    if (val >= 0 && val < 1) {
      ret = "Buffles";
    } else if (val >= 1 && val < 2) {
      ret = "Robert";
    } else if (val >= 2 && val < 3) {
      ret = "Grog";
    } else if (val >= 3 && val < 4) {
      ret = "Quibbit";
    } else if (val >= 4 && val < 5) {
      ret = "Shmooch";
    } else {
      ret = "idk im out of names";
    }
    return ret;
  }

  
}