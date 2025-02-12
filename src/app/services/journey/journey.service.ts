import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Stop } from 'src/app/models/stop.model';
import { Journey } from 'src/app/models/journey.model';

@Injectable({
  providedIn: 'root',
})
export class JourneyService {
  private apiUrl = 'https://localhost:7221/api/journey';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Journey[]> {
    return this.http.get<Journey[]>(this.apiUrl);
  }

  add(journey: Journey): Observable<Journey> {
    return this.http.post<Journey>(this.apiUrl, journey);
  }

  update(id: string, journey: Partial<Journey>): Observable<Journey> {
    return this.http.put<Journey>(`${this.apiUrl}/${id}`, journey);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
