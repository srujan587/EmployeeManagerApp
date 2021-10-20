import { HttpErrorResponse, HttpResponse, HttpResponseBase } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { EMPTY } from 'rxjs';
import { Employee } from './employee';
import { EmployeeService } from './employee.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
    public  employees:Employee[];
    public  newemployee: Employee;
    public  editedemployee: Employee;

    constructor(private  employeeservice : EmployeeService){    
    }

    ngOnInit(){
      this.getEmployees();
    }
    public getEmployees() : void{
      this.employeeservice.getEmployees().subscribe(
          (response : Employee[]) => {
            this.employees=response;
          },
          (error: HttpErrorResponse)=>{
            alert(error.message);
          }          
      );
    }

    public onAddEmployee(onAddEmployee:NgForm):void{
      document.getElementById('add-employee-form')?.click();
      this.employeeservice.addEmployee(onAddEmployee.value).subscribe(
        (response:Employee)=>{
          console.log(response);
          this.getEmployees();
        },
        (error:HttpErrorResponse)=>{
          alert(error.message);
        }
      );
    }
    
    public editEmployee(employee:Employee):void{      
      this.employeeservice.updateEmployee(employee).subscribe(
        (response:Employee)=>{
          console.log(response);
          this.getEmployees();
        },
        (error:HttpErrorResponse)=>{
          alert(error.message);
        }
      );
    }

    public deleteEmployee(id: number): void{
      document.getElementById('delete-employee-form')?.click();
      this.employeeservice.deleteEmployee(id).subscribe(
        (response:void)=>{
          console.log(response);
          this.getEmployees();
        },
        (error:HttpErrorResponse)=>{
          alert(error.message);
        }
      );
    }

    public searchEmployee(name:string): void{
      this.employees=[]; 
      if( name === ''){
        this.getEmployees();
      }else{
        this.employeeservice.searchEmployee(name).subscribe(
          (response: Employee[])=>{
            this.employees=response;
          },
          (error: HttpErrorResponse)=>{
            alert(error.message);
          },   
  
        );
      }    
      
    }
    public openModal(employee : Employee,mode : string): void{
      const containernew= document.getElementById('main-container');
      const button= document.createElement('button');
      button.type= 'button';
      button.style.display= 'none';
      button.setAttribute('data-bs-toggle','modal');
      if(mode === 'add'){
        button.setAttribute('data-bs-target','#addEmployeeModal');
      }
      if(mode === 'edit'){
        button.setAttribute('data-bs-target','#editEmployeeModal');
      }
      if(mode === 'delete'){
        button.setAttribute('data-bs-target','#deleteEmployeeModal');
      }
      this.editedemployee=employee;
      containernew?.appendChild(button);
      button.click();
    }
  }
