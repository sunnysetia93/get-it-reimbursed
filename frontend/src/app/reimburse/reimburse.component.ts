import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reimburse',
  templateUrl: './reimburse.component.html',
  styleUrls: ['./reimburse.component.less']
})
export class ReimburseComponent implements OnInit {

  expenseList=[];
  statusTypes:any=[];
  selectedStatusId=""
  constructor(private api:ApiService,private router:Router) { }

  ngOnInit() {
    this.api.getStatusTypes().subscribe((result:any)=>{
      console.log(result);
      this.statusTypes=result.data;
    })
    this.api.getAllExpense().subscribe((result:any)=>{
      // console.log(result.body[0].id)
      result.body.forEach(expense => {
            let users = "| "
            expense.Users.forEach(u => {
              users+=u.name + " | "
            });
            this.expenseList.push({
              id:expense.id,
              date:expense.date,
              category:expense.ExpenseType.name,
              description:expense.description,
              amount:expense.totalAmount,
              status:expense.ReimbursementStatus.id,
              users:users,
              selectedNewStatusFlag:false,
              selectedStatus:0
            })
      });
    })
  }
  // to change the disabled state of the update button
  changeStatusId(eId,event){
    if(eId.status!==parseInt(event.target.value)){
      eId.selectedNewStatusFlag=true
      eId.selectedStatus=event.target.value
    }
    else{
      eId.selectedNewStatusFlag=false
      eId.selectedStatus=eId.status
    }
  }
  updateStatus(expense){
    if(expense.selectedStatus!=expense.status){
        let body = {
          expenseId:expense.id,
          statusId:parseInt(expense.selectedStatus)
        }
        this.api.updateExpense(body).subscribe((result:any)=>{
            if(result.success){
              expense.selectedNewStatusFlag=false;
              expense.selectedStatus=result.body.statusId
            }
        })
    }
  }

  logout(){
    this.api.logout().subscribe((result:any)=>{
      if(result && result.success){
        localStorage.removeItem('token');
        this.router.navigate(['/login'])
      }
    })
  }
}
