import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FavoritesService {
  private apiUrl = 'http://localhost:3000';
  private http = inject(HttpClient);

  addFavorite(locationId: string, userId: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/locations/${locationId}/favorite`, {
      userId,
      locationId,
    });
  }

  removeFavorite(locationId: string, userId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/locations/${locationId}/favorite`, {
      body: { userId },
    });
  }

  isFavorite(locationId: string, userId: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.apiUrl}/locations/${locationId}/favorite/check/${userId}`);
  }
}

