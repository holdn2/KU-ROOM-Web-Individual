export interface GuideStep {
  icon: string;
  label?: string;
  isCircle?: boolean;
}

export interface GuideScreenshots {
  left: string;
  right: string;
  alt: string;
}

export interface GuideCardData {
  title: string;
  screenshots: GuideScreenshots;
  positionLabel: string;
  steps: GuideStep[];
}
