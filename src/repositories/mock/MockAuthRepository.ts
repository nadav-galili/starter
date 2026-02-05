import type {
  IAuthRepository,
  AuthUser,
  AuthCredentials,
  SignUpData,
} from '../interfaces';

export class MockAuthRepository implements IAuthRepository {
  private currentUser: AuthUser | null = null;

  async signIn(credentials: AuthCredentials): Promise<AuthUser> {
    const user: AuthUser = {
      id: 'mock-user-id',
      email: credentials.email,
      emailVerified: true,
      displayName: 'Mock User',
    };
    this.currentUser = user;
    return user;
  }

  async signUp(data: SignUpData): Promise<AuthUser> {
    const user: AuthUser = {
      id: 'mock-user-id',
      email: data.email,
      emailVerified: false,
      displayName: data.displayName,
    };
    this.currentUser = user;
    return user;
  }

  async signOut(): Promise<void> {
    this.currentUser = null;
  }

  async getCurrentUser(): Promise<AuthUser | null> {
    return this.currentUser;
  }

  async resetPassword(_email: string): Promise<void> {
    // Mock implementation - no-op
  }
}
