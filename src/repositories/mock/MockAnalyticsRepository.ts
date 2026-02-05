import type {
  IAnalyticsRepository,
  AnalyticsEventProperties,
  UserTraits,
} from '../interfaces';

export class MockAnalyticsRepository implements IAnalyticsRepository {
  async track(
    _event: string,
    _properties?: AnalyticsEventProperties
  ): Promise<void> {
    // Mock implementation - no-op
  }

  async identify(_userId: string, _traits?: UserTraits): Promise<void> {
    // Mock implementation - no-op
  }

  async screen(
    _name: string,
    _properties?: AnalyticsEventProperties
  ): Promise<void> {
    // Mock implementation - no-op
  }

  async reset(): Promise<void> {
    // Mock implementation - no-op
  }
}
