import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Stop } from 'src/app/models/stop.model';

@Injectable({ providedIn: 'root' })
export class StopService {
  private apiUrl = 'https://localhost:7221/api/stop';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Stop[]> {
    return this.http.get<Stop[]>(this.apiUrl);
  }

  add(stop: Stop): Observable<Stop> {
    return this.http.post<Stop>(this.apiUrl, stop);
  }

  update(id: string, stop: Partial<Stop>): Observable<Stop> {
    return this.http.put<Stop>(`${this.apiUrl}/${id}`, stop);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
