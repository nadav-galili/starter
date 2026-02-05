export interface UserProfile {
  id: string;
  email: string;
  displayName?: string;
  photoUrl?: string;
  bio?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface UpdateProfileData {
  displayName?: string;
  photoUrl?: string;
  bio?: string;
}

export interface IUserRepository {
  getProfile(userId: string): Promise<UserProfile | null>;
  updateProfile(userId: string, data: UpdateProfileData): Promise<UserProfile>;
  deleteAccount(userId: string): Promise<void>;
}
