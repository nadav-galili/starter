export interface AuthUser {
  id: string;
  email: string;
  emailVerified: boolean;
  displayName?: string;
  photoUrl?: string;
}

export interface AuthCredentials {
  email: string;
  password: string;
}

export interface SignUpData extends AuthCredentials {
  displayName?: string;
}

export interface IAuthRepository {
  signIn(credentials: AuthCredentials): Promise<AuthUser>;
  signUp(data: SignUpData): Promise<AuthUser>;
  signOut(): Promise<void>;
  getCurrentUser(): Promise<AuthUser | null>;
  resetPassword(email: string): Promise<void>;
}
