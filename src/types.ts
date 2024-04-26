export interface DisplaySettings {
  duration: number;
  animationIn: string;
  animationOut: string;
}

export interface AudioSettings {
  volume: number;
  base64: string;
}

export interface Settings {
  text: {
    specialColor: string;
  };
  audio: AudioSettings;
  display: DisplaySettings;
  queueDelay: number;
}

export interface Content {
  textContent: string;
  image: string;
}
