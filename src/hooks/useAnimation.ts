import { useEffect, useRef, useState } from 'react';
import useTimeout from './useTimeout.ts';
import { ANIMATION_DURATION } from '../contants.ts';

interface Props {
  duration: number;
  animationIn: string;
  animationOut: string;
}

// const animations = [
//     ['animate__fadeInUp', 'animate__fadeOutUp'],
//     ['animate__flipInX', 'animate__flipOutX'],
//     ['animate__rollIn', 'animate__rollOut'],
// ];

const useAnimation = ({ duration, animationIn, animationOut }: Props) => {
  const [isShowing, setIsShowing] = useState(false);
  const [state, setState] = useState('');

  const refAnimationIn = useRef('');
  const refAnimationOut = useRef('');
  const refDuration = useRef(0);

  const afterAnimationDuration = () => {
    startShowDuration();
  };

  const afterShowDuration = () => {
    setState(refAnimationOut.current);
    startCleanup();
  };

  const cleanup = () => {
    setState(null);
    setIsShowing(false);
  };

  const { startTimer: startShowDuration } = useTimeout(
    afterShowDuration,
    refDuration.current,
  );

  const { startTimer: startAnimationDuration } = useTimeout(
    afterAnimationDuration,
    ANIMATION_DURATION,
  );

  const { startTimer: startCleanup } = useTimeout(cleanup, ANIMATION_DURATION);

  const initAnimation = () => {
    setState(refAnimationIn.current);
    startAnimationDuration();

    setIsShowing(true);
  };

  useEffect(() => {
    refAnimationIn.current = animationIn;
    refAnimationOut.current = animationOut;
    refDuration.current = duration;
  }, [animationIn, animationOut, duration]);

  return { initAnimation, animationState: state, isShowing };
};

export default useAnimation;
