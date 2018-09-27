import { Component, OnInit, Inject } from '@angular/core';
import {Http} from "@angular/http"
import { Auth } from '../services/auth.service';
import { MatDialogConfig, MatDialog } from '@angular/material';
import { MyDialogComponent } from '../my-dialog/my-dialog.component';

@Component({
  selector: 'app-monthly-task',
  templateUrl: './monthly-task.component.html',
  styleUrls: ['./monthly-task.component.css']
})
export class MonthlyTaskComponent implements OnInit {

  alltasks:any
  profile:any

  constructor(private auth:Auth,@Inject(Http) public _http,public dialog: MatDialog){ 
    this.auth.handleAuthentication();
    if(this.auth.isAuthenticated())
    if (this.auth.userProfile!==undefined) {
      this.profile = this.auth.userProfile;
      this.getTasks();
    } else {
      this.auth.getProfile((err, profile) => {
        this.profile = profile;
        this.getTasks();
      });
    }
   }

  ngOnInit() {
  }

  private getTasks(){
    console.log("I'm getting tasks");
    this._http.post('/tasks',{username:this.profile.nickname,type:"Monthly"}).subscribe(resulttask=>{
      this.alltasks = JSON.parse(resulttask._body);
    });
  }
  private deleteTask(id:any){
    this._http.delete('/deletetask/'+id).subscribe(result=>{
      this.getTasks();
    })
  }

  openDialog(task) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = task;
    let dialogRef = this.dialog.open(MyDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(value => {
      console.log(`Dialog sent: ${value}`); 
      if(`${value}`!=="Closed"){
        value.create_date = new Date()
        this._http.put('/updatetask/'+task._id,value).subscribe(reslut=>{
          this.getTasks()        
        });
      }
    });
  }
}
