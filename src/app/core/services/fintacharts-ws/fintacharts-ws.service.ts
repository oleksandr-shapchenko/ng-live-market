import { inject, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class FintachartsWsService {
  private _auth = inject(AuthService);

  private _socket: WebSocket;

  public messageEventSubject$ = new BehaviorSubject<MessageEvent | null>(null);

  constructor() {
    this._socket = new WebSocket(
      `https://platform.fintacharts.com/api/streaming/ws/v1/realtime?token=${this._auth.getAccessToken()}`
    );
  }

  subscribe(assetId: string): void {
    const subscriptionMessage = {
      type: 'l1-subscription',
      id: '1',
      instrumentId: assetId,
      provider: 'simulation',
      subscribe: true,
      kinds: ['last'],
    };

    this._socket.send(JSON.stringify(subscriptionMessage));

    this._socket.onmessage = (message: MessageEvent) => this.messageEventSubject$.next(message);
  }

  unsubscribe(assetId: string): void {
    const unsubscribeMessage = {
      type: 'l1-subscription',
      id: '1',
      instrumentId: assetId,
      provider: 'simulation',
      subscribe: false,
      kinds: ['last'],
    };

    this._socket.send(JSON.stringify(unsubscribeMessage));
  }

  closeSocket(): void {
    this._socket.close();
  }
}
