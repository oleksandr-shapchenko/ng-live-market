import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { GetAssetsResponse } from './models/responses/get-assets-response.interface';
import { GetCountBackBarsResponse } from './models/responses/get-count-back-bars-response.interface';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class FintachartsApiService {
  private _http = inject(HttpClient);
  private _auth = inject(AuthService);

  private getHeaders() {
    return {
      Authorization: `Bearer ${this._auth.getAccessToken()}`,
    };
  }

  getAssets(symbol: string, page = 1, size = 30, provider = 'oanda', kind = 'forex'): Observable<GetAssetsResponse> {
    const url = `/api/instruments/v1/instruments`;
    const params = new HttpParams()
      .set('provider', provider)
      .set('kind', kind)
      .set('symbol', symbol)
      .set('page', page.toString())
      .set('size', size.toString());

    return this._http.get<GetAssetsResponse>(url, { params, headers: this.getHeaders() });
  }

  getCountBackBars(
    instrumentId: string,
    provider = 'oanda',
    interval = 10,
    periodicity = 'minute',
    barsCount = 200
  ): Observable<GetCountBackBarsResponse> {
    const url = `/api/bars/v1/bars/count-back`;
    const params = new HttpParams()
      .set('instrumentId', instrumentId)
      .set('provider', provider)
      .set('interval', interval)
      .set('periodicity', periodicity)
      .set('barsCount', barsCount.toString());

    return this._http.get<GetCountBackBarsResponse>(url, { params, headers: this.getHeaders() });
  }
}
