import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { city } from '../../models/city.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OpenStreetService {
  private url = 'https://nominatim.openstreetmap.org/search';

  constructor(private http: HttpClient) { }

  getLatLonCity(city: string): Observable<city[]> {
    const params = {
      q: city.replace(/ /g, '+'),
      format: 'json',
      limit: '1',
      addressdetails: '1',
      countrycodes: 'br'
    };
    return this.http.get<city[]>(this.url, { params });
  }
}
