export interface UploadOptions {
  path: string;
  contentType?: string;
  metadata?: Record<string, string>;
}

export interface UploadResult {
  path: string;
  url: string;
  size: number;
}

export interface IStorageRepository {
  upload(file: Blob | ArrayBuffer, options: UploadOptions): Promise<UploadResult>;
  download(path: string): Promise<Blob>;
  delete(path: string): Promise<void>;
  getUrl(path: string): Promise<string>;
}
