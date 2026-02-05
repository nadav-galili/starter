import type {
  IStorageRepository,
  UploadOptions,
  UploadResult,
} from '../interfaces';

export class MockStorageRepository implements IStorageRepository {
  private storage: Map<string, Blob> = new Map();

  async upload(
    file: Blob | ArrayBuffer,
    options: UploadOptions
  ): Promise<UploadResult> {
    const blob = file instanceof Blob ? file : new Blob([file]);
    this.storage.set(options.path, blob);
    return {
      path: options.path,
      url: `mock://storage/${options.path}`,
      size: blob.size,
    };
  }

  async download(path: string): Promise<Blob> {
    const blob = this.storage.get(path);
    if (!blob) {
      throw new Error(`File not found: ${path}`);
    }
    return blob;
  }

  async delete(path: string): Promise<void> {
    this.storage.delete(path);
  }

  async getUrl(path: string): Promise<string> {
    return `mock://storage/${path}`;
  }
}
