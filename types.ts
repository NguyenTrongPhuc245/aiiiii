
export enum ActionType {
  REMOVE_BG = 'REMOVE_BG',
  BEAUTIFY = 'BEAUTIFY',
  UPSCALE = 'UPSCALE',
  CUSTOM = 'CUSTOM'
}

export interface CssFilters {
  brightness?: string;
  contrast?: string;
  saturate?: string;
  sepia?: string;
  'hue-rotate'?: string;
  grayscale?: string;
  invert?: string;
}
