import { useEffect, useState } from 'react';
import { AudioSettings, DisplaySettings, Settings } from '../types.ts';
import { uuid } from '../contants.ts';

const useSettings = () => {
  const [settings, setSettings] = useState<Settings>({
    text: {
      specialColor: '',
    },
    audio: {
      base64: '',
      volume: 0,
    },
    display: {
      duration: 0,
      animationIn: '',
      animationOut: '',
    },
    queueDelay: 0,
  });

  const updateSettings = (
    display: DisplaySettings,
    specialColor: string,
    audio: AudioSettings,
  ) => {
    setSettings((prevState) => ({
      ...prevState,
      text: {
        ...prevState.text,
        specialColor,
      },
      audio: {
        ...prevState.audio,
        ...audio,
      },
      display: {
        ...prevState.display,
        ...display,
      },
    }));
  };

  const initSettings = async () => {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/${uuid}/settings`);

    return (await res.json()) as Promise<Settings>;
  };

  useEffect(() => {
    initSettings().then((data) => {
      setSettings(data);
    });
  }, []);

  return { settings, updateSettings };
};

export default useSettings;
