import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { io, Socket } from 'socket.io-client';
import { DefaultEventsMap } from 'socket.io/dist/typed-events';
import { AuthState } from 'src/presentation/auth/auth.state';
import { consts } from './consts';

@Injectable({ providedIn: 'root' })
export class SocketService {
  private static socketInstance: Socket | null = null;

  constructor(private readonly store: Store) {}

  public connect(): Socket<DefaultEventsMap, DefaultEventsMap> {
    const uuid = this.store.selectSnapshot(AuthState.Uuid);

    if (SocketService.socketInstance == null) {
      SocketService.socketInstance = io(consts.backendApiUrlRoot, {
        transports: ['websocket'],
        timeout: 60000,
        auth: (cb) => cb({ uuid }),
      });
    }

    SocketService.socketInstance.connect();

    return SocketService.socketInstance;
  }

  public getSocket(): Socket<DefaultEventsMap, DefaultEventsMap> | null {
    if (SocketService.socketInstance) {
      return SocketService.socketInstance;
    }

    return null;
  }
}
