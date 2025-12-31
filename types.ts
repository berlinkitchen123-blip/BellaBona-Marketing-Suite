export enum AppView {
  DASHBOARD = 'DASHBOARD',
  COPYWRITER = 'COPYWRITER',
  IMAGE_STUDIO = 'IMAGE_STUDIO',
  CAMPAIGNS = 'CAMPAIGNS',
}

export interface Campaign {
  id: string;
  name: string;
  status: 'active' | 'draft' | 'completed';
  platform: 'instagram' | 'linkedin' | 'email' | 'twitter';
  engagement: number;
}

export interface GeneratedContent {
  id: string;
  type: 'text' | 'image';
  content: string; // Text body or Base64 image
  timestamp: number;
  prompt: string;
}

export interface ChartDataPoint {
  name: string;
  value: number;
  value2?: number;
}
