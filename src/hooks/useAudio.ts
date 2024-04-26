import { useEffect, useRef } from 'react';

interface Props {
  src: string;
}

const useAudio = ({ src }: Props) => {
  const refSrc = useRef('');

  const initAudio = () => {
    const mp3audio = new Audio(refSrc.current);
    mp3audio.play();
  };

  useEffect(() => {
    refSrc.current = src;
  }, [src]);

  return { initAudio };
};

export default useAudio;
