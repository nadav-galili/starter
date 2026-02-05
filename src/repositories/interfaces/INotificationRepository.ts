export interface NotificationMessage {
  id: string;
  title?: string;
  body?: string;
  data?: Record<string, string>;
}

export type MessageHandler = (message: NotificationMessage) => void;

export interface INotificationRepository {
  register(): Promise<void>;
  unregister(): Promise<void>;
  getToken(): Promise<string | null>;
  onMessage(handler: MessageHandler): () => void;
}
