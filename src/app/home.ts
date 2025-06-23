import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { NgOptimizedImage, Time} from '@angular/common'
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { TimefmtPipe } from './timefmt.pipe';
import { UserService, User } from './user.service';
import { AESEncryptDecryptService } from './aesencrypt-decrypt.service'; 






@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ReactiveFormsModule, NgOptimizedImage, TimefmtPipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})


export class Home {
  title = 'Croak';
  taskFieldRequested = false;
  loggedin = false;
  showLoginPage = true;
  showCollectionPage = false;
  showLLFTDescription = false;
  numFrogTasks = 0;
  user: User | undefined = undefined;
  userid: number | undefined = undefined;
  tasks: Task[] = [];
  

  constructor(private sanitizer: DomSanitizer, private userService: UserService, private _AESEncryptDecryptService: AESEncryptDecryptService) {}

  frogForm = new FormGroup({
    task: new FormControl('', Validators.required),
    frogName: new FormControl(''),
    frogSize: new FormControl('', Validators.required),
  });

  loginForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  signupForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    confirmPassword: new FormControl('', Validators.required),
  });

  addTask() {
    if (this.taskFieldRequested == false) {
      this.taskFieldRequested = true;
    } else {
      this.taskFieldRequested = false;
    }
  }

  handleLogin() {
    var userList: User[] = [];
    this.userService.getAll().subscribe(data => {
      userList = data;
      
      var found = userList.find((element) => element.username == this.loginForm.value.username);
      if (this._AESEncryptDecryptService.decrypt(found?.password!) == this.loginForm.value.password) {
        this.loggedin = true;
        this.user = found!;
        this.userid = found?.id;
        this.loadInTasks();
      }
    });
  }

  handleSignup() {
    if (this.signupForm.value.password == this.signupForm.value.confirmPassword) {
      this.userService.getAll().subscribe(data => {
        

        if (data.some((element) => element.username == this.signupForm.value.username)) {
          alert("Username unavailable!");
        } else {

          var encryptedPass = this._AESEncryptDecryptService.encrypt(this.signupForm.value.password!);

          var newUser = {
            id: data.length,
            username: this.signupForm.value.username!,
            password: encryptedPass,
            totalNumTasks: 0,
            longestLivingTask: { "description":"a", "name":"b", "size":"c", "creationDate": 0 },
            longestLivingTaskTime: 0,
            tasks: [],
          };

          this.userService.create(newUser).subscribe({
            next: (createdUser) => {
              this.loggedin = true;
              this.user = createdUser!;
              this.userid = createdUser?.id;
              
            },
            error: (err) => {
              console.error("Error creating user:", err);
            }
          });
        }
      });
    }
  }

  handleSubmit() {
    if (this.frogForm.value.frogName == "") {
      var newFrogName = Task.assignName();
      
      alert(newFrogName + " created!");

      this.addFrog(this.frogForm.value.task + "", newFrogName + "", this.frogForm.value.frogSize + "");
      
    } else {
      alert(this.frogForm.value.frogName + " created!");
      this.addFrog(this.frogForm.value.task + "", this.frogForm.value.frogName + "", this.frogForm.value.frogSize + "");

    }
  }

  addFrog(taskMsg:string, name:string, size:string) {
    this.numFrogTasks++;
    let task = new Task(taskMsg, name, size);
    this.tasks.push(task);
    this.user?.tasks.push(task);
    this.user!.totalNumTasks++;

    this.userService.update(this.userid!, this.user!).subscribe(
      (element) => {console.log(this.user?.tasks);}
    );
  }

  loadInTasks() {
    this.user?.tasks.forEach((element) => this.tasks.push(new Task(element.description, element.name, element.size)))
  }

  tasksToHTML(): SafeHtml {
    let ret = "Nothing";
    let count = 0;
    this.tasks.forEach(x => ret += `<input type="checkbox" name="task${count}" value="task${count}"><label for="task${count++}">${x.description}</label>`);

    return this.sanitizer.bypassSecurityTrustHtml(ret);
  }

  removeTask(taskNo:number) {
    let removedTask = this.tasks[taskNo];
    this.userService.get(this.userid!).subscribe(
      (element) => { 
        let lifespan = Date.now() - element.tasks[taskNo].creationDate;
        if (lifespan > element.longestLivingTaskTime || element.longestLivingTaskTime == 0) {
          this.user!.longestLivingTaskTime = lifespan;
          this.user!.longestLivingTask = removedTask;
        }
        this.tasks.splice(taskNo, 1);
        this.user?.tasks.splice(taskNo, 1);
        this.userService.update(this.userid!, this.user!).subscribe(
          (element) => {console.log(this.user?.tasks);}
        );
      }
    );
   
  }

  showCollection() {

    this.showCollectionPage = true;

  }
}

export class Task {
  description: string;
  name: string;
  size: string;
  creationDate: number;
  
  constructor(desc: string, name: string, size:string){
    this.description = desc;
    this.size = size;
    this.name = name;
    this.creationDate = Date.now();
  }

  static assignName() {
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