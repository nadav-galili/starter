import type {
  IUserRepository,
  UserProfile,
  UpdateProfileData,
} from '../interfaces';

export class MockUserRepository implements IUserRepository {
  private profiles: Map<string, UserProfile> = new Map();

  async getProfile(userId: string): Promise<UserProfile | null> {
    return this.profiles.get(userId) ?? null;
  }

  async updateProfile(
    userId: string,
    data: UpdateProfileData
  ): Promise<UserProfile> {
    const existing = this.profiles.get(userId);
    const now = new Date();
    const profile: UserProfile = {
      id: userId,
      email: existing?.email ?? 'mock@example.com',
      createdAt: existing?.createdAt ?? now,
      updatedAt: now,
      ...data,
    };
    this.profiles.set(userId, profile);
    return profile;
  }

  async deleteAccount(userId: string): Promise<void> {
    this.profiles.delete(userId);
  }
}
