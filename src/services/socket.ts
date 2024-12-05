import { io } from 'socket.io-client';
import { useAuthStore } from '../store/authStore';

// Use secure WebSocket connection
const SOCKET_URL = 'wss://api.example.com';

class SocketService {
  private socket: any;
  private static instance: SocketService;
  private reconnectAttempts: number = 0;
  private maxReconnectAttempts: number = 5;

  private constructor() {
    this.socket = io(SOCKET_URL, {
      autoConnect: false,
      transports: ['websocket'],
      reconnection: true,
      reconnectionAttempts: this.maxReconnectAttempts,
      reconnectionDelay: 1000,
      timeout: 10000
    });

    this.setupEventListeners();
  }

  private setupEventListeners() {
    this.socket.on('connect', () => {
      console.log('Connected to socket server');
      this.reconnectAttempts = 0;
    });

    this.socket.on('disconnect', (reason: string) => {
      console.log('Disconnected from socket server:', reason);
      if (reason === 'io server disconnect') {
        // Server initiated disconnect, try reconnecting
        this.socket.connect();
      }
    });

    this.socket.on('connect_error', (error: Error) => {
      console.log('Connection error:', error);
      this.reconnectAttempts++;
      
      if (this.reconnectAttempts >= this.maxReconnectAttempts) {
        console.log('Max reconnection attempts reached');
        this.socket.disconnect();
      }
    });
  }

  public static getInstance(): SocketService {
    if (!SocketService.instance) {
      SocketService.instance = new SocketService();
    }
    return SocketService.instance;
  }

  public connect() {
    const user = useAuthStore.getState().user;
    if (user && !this.socket.connected) {
      this.socket.auth = { 
        userId: user.id,
        token: localStorage.getItem('token')
      };
      this.socket.connect();
    }
  }

  public disconnect() {
    if (this.socket.connected) {
      this.socket.disconnect();
    }
  }

  public emit(event: string, data: any) {
    if (this.socket.connected) {
      this.socket.emit(event, data);
    } else {
      console.warn('Socket not connected. Message not sent:', { event, data });
    }
  }

  public on(event: string, callback: (data: any) => void) {
    this.socket.on(event, callback);
  }

  public off(event: string) {
    this.socket.off(event);
  }

  public isConnected(): boolean {
    return this.socket.connected;
  }
}

export const socketService = SocketService.getInstance();