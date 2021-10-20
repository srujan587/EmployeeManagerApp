import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from './employee';
import { HttpClient } from "@angular/common/http"
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private apiServiceUrl= environment.apiBaseUrl;

    constructor (private http: HttpClient){}

    public getEmployees():Observable<Employee[]>{
        return this.http.get<Employee[]>(`${this.apiServiceUrl}/Employee/all`);
    }

    public addEmployee(employee : Employee):Observable<Employee>{
        return this.http.post<Employee>(`${this.apiServiceUrl}/Employee/add`,employee);
    }

    public updateEmployee(employee : Employee):Observable<Employee>{
        return this.http.put<Employee>(`${this.apiServiceUrl}/Employee/update`,employee);
    }

    public deleteEmployee(id : number):Observable<void>{
        return this.http.delete<void>(`${this.apiServiceUrl}/Employee/delete/${id}`);
    }

    public searchEmployee(name:string) : Observable<Employee[]>{
        return this.http.get<Employee[]>(`${this.apiServiceUrl}/Employee/search/${name}`);
    }
}
