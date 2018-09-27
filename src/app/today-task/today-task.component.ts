import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogConfig} from '@angular/material';

import {Http} from "@angular/http"
import { Auth } from '../services/auth.service';
import { MyDialogComponent } from '../my-dialog/my-dialog.component';

@Component({
  selector: 'app-today-task',
  templateUrl: './today-task.component.html',
  styleUrls: ['./today-task.component.css']
})
export class TodayTaskComponent implements OnInit {
  
  profile:any;  
  alltasks:any;
  today = new Date();
  data = {username:'', tasks:'', description:'',type:'Today',status:"Not Completed",create_date:new Date()};

  constructor(private auth:Auth,@Inject(Http) public _http,public dialog: MatDialog){ 
    this.auth.handleAuthentication();
    if(this.auth.isAuthenticated())
    if (this.auth.userProfile!==undefined) {
      this.profile = this.auth.userProfile;
      this.data.username = this.profile.nickname;
      this.getTasks();
    } else {
      this.auth.getProfile((err, profile) => {
        this.profile = profile;
        this.data.username = this.profile.nickname;
        this.getTasks();
      });
    }
   }

  ngOnInit() {
  }

  private getTasks(){
    console.log("I'm getting tasks");
    this._http.post('/tasks',{username:this.profile.nickname,type:"Today"}).subscribe(resulttask=>{
      this.alltasks = JSON.parse(resulttask._body);
    });
  }

  private addtask(){    
    this._http.post('/addtask',this.data).subscribe(result=>{
    });
    this.getTasks();
    this.data = {username:this.data.username, tasks:'', description:'',type:'Today',status:"Not Completed",create_date:new Date()};
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
