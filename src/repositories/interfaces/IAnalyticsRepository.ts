export interface AnalyticsEventProperties {
  [key: string]: string | number | boolean | null | undefined;
}

export interface UserTraits {
  email?: string;
  name?: string;
  [key: string]: string | number | boolean | null | undefined;
}

export interface IAnalyticsRepository {
  track(event: string, properties?: AnalyticsEventProperties): Promise<void>;
  identify(userId: string, traits?: UserTraits): Promise<void>;
  screen(name: string, properties?: AnalyticsEventProperties): Promise<void>;
  reset(): Promise<void>;
}
