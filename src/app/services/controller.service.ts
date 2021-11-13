import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Simulation } from '../models/simulation.model';

const baseUrl = 'http://localhost:8080/api/simulation';

@Injectable({
  providedIn: 'root'
})
export class ControllerService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<Simulation[]> {
    return this.http.get<Simulation[]>(baseUrl);
  }
}
