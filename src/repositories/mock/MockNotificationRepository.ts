import type {
  INotificationRepository,
  MessageHandler,
} from '../interfaces';

export class MockNotificationRepository implements INotificationRepository {
  private token: string | null = null;
  private handlers: Set<MessageHandler> = new Set();

  async register(): Promise<void> {
    this.token = 'mock-push-token';
  }

  async unregister(): Promise<void> {
    this.token = null;
  }

  async getToken(): Promise<string | null> {
    return this.token;
  }

  onMessage(handler: MessageHandler): () => void {
    this.handlers.add(handler);
    return () => {
      this.handlers.delete(handler);
    };
  }
}
