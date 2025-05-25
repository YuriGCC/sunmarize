import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { nasapower } from '../../models/nasapower.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NasapowerService {
  private apiUrl = 'https://power.larc.nasa.gov/api/temporal/daily/point';

  constructor(private http: HttpClient) { }

  getSolarIrradiation(lat: string, lon: string, startDate: string, endDate: string): Observable<nasapower> {
    const params = {
      parameters: 'ALLSKY_SFC_SW_DWN',
      community: 'RE',
      latitude: lat,
      longitude: lon,
      start: startDate,
      end: endDate,
      format: 'JSON'
    };
    return this.http.get<nasapower>(this.apiUrl, { params });
  }
}
