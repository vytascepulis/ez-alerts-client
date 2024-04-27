import { useEffect, useRef } from 'react';

interface Props {
  src: string;
  volume: number;
}

const useAudio = ({ src, volume }: Props) => {
  const refSrc = useRef('');
  const refVolume = useRef(0);

  const initAudio = () => {
    const mp3audio = new Audio(refSrc.current);
    mp3audio.volume = refVolume.current / 100;
    mp3audio.play();
  };

  useEffect(() => {
    refSrc.current = src;
  }, [src]);

  useEffect(() => {
    refVolume.current = volume;
  }, [volume]);

  return { initAudio };
};

export default useAudio;
