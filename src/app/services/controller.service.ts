import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Simulation } from '../models/simulation.model';
import { SimulationWithStats } from '../models/simulation-with-stats.model';

const baseUrl = 'http://localhost:8080/api/simulation';

@Injectable({
  providedIn: 'root'
})
export class ControllerService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<Simulation[]> {
    return this.http.get<Simulation[]>(baseUrl);
  }

  delete(id: any): Observable<any> {
    return this.http.delete(`${baseUrl}/${id}`);
  }

  create(data: any): Observable<any> {
    return this.http.post(baseUrl, data);
  }

  get(id: string): Observable<SimulationWithStats> {
    let url = `${baseUrl}/${id}`;
    return this.http.get<SimulationWithStats>(url);
  }

  update(id: any, data: any): Observable<any> {
    return this.http.put(`${baseUrl}/${id}`, data);
  }
}
