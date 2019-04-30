import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl,FormArray,FormBuilder } from '@angular/forms';
import { ApiService } from '../api.service';

declare var $:any;


@Component({
  selector: 'app-expense',
  templateUrl: './expense.component.html',
  styleUrls: ['./expense.component.less']
})
export class ExpenseComponent implements OnInit {

  expenseType:any=[];
  expenseForm:FormGroup;
  users:FormArray;
  expenseList:any=[];
  @ViewChild('bulkUploadModal') bulkUploadModal : any; 
  bulkUploadData={
    header:[],
    rows:[]
  }

  constructor(private formBuilder:FormBuilder,private api:ApiService) { }

  ngOnInit() {
    this.api.getExpenseType().subscribe(data=>{
      console.log(data);
      this.expenseType=data;
    })
    this.expenseForm = this.formBuilder.group({
      type:"",
      date:"",
      description:"",
      users: this.formBuilder.array([this.createUser()]),
      amount:""
    });

    this.api.getAllExpense().subscribe((data:any)=>{
        data.forEach(expense => {
              let users = "| "
              expense.Users.forEach(u => {
                users+=u.name + " | "
              });
              this.expenseList.push({
                date:expense.date,
                category:expense.ExpenseType.name,
                description:expense.description,
                amount:expense.totalAmount,
                status:expense.ReimbursementStatus.id,
                users:users
              })
        });
    })
  }

  onSubmit(){
      let value = this.expenseForm.value
      let body = {
          type:value.type,
          date:value.date,
          description:value.description,
          users:[
            ],
          amount:value.amount
      }

      value.users.forEach(element => {
          body.users.push({
            email:element.email
          })
      });

      console.log(body)

      this.api.postData(body).subscribe(data=>{
        console.log(data);
      })
  }

  changeType(e){
    console.log(e)
  }

  createUser(): FormGroup {
    return this.formBuilder.group({
      email: ''
      // sharePercentage: ''
    });
  }

  addUser():void{
    this.users = this.expenseForm.get('users') as FormArray;
    this.users.push(this.createUser());
  }
  removeUser(i){
    console.log(i);
    this.users = this.expenseForm.get('users') as FormArray;
    this.users.removeAt(i);
  }

  fileUpload(files){
    console.log(files);
    let csvRows=[];
    let headers=[];
    let rows=[];
    if(files && files.length > 0) {
      let file : File = files.item(0); 
        console.log(file.name);
        console.log(file.size);
        console.log(file.type);
        if(file.name.split('.')[1]=='csv'){

          let reader: FileReader = new FileReader();
          reader.readAsText(file);
          reader.onload = (e) => {
             let csv: string = reader.result as string;
             csvRows = csv.split('\n');
             console.log(csvRows)
             for (let i = 0; i < csvRows.length; i++) {
               const element = csvRows[i];
               if(i==0){
                 headers = element.split(',');
               }
               else{
                 let row = element.split(',');
                 row[3] = row[3].split('|');
                 rows.push(row);
               }
             }
             this.bulkUploadData.header=headers;
             this.bulkUploadData.rows=rows;
             $(this.bulkUploadModal.nativeElement).modal('show');
             console.log(rows);
          }

        }
        else{
            console.log("file type error!")
        }

      }
  }

  async bulkSubmit() {
    
    console.log('Saving bulk data !');
    this.bulkUploadData.rows.forEach(async (row)=>{
      let body = {
          type:row[1],
          date:row[0],
          description:row[2],
          users:[
            ],
          amount:row[4]
      }
      row[3].forEach(element => {
          body.users.push({
            email:element
          })
      });

      console.log(body)

      await this.api.postData(body).subscribe(data=>{
        console.log(data);
      })
      
    })

  }

}
