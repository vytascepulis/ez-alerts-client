import { useEffect, useRef, useState } from 'react';

const useTimeout = (callback: () => void, delay: number) => {
  const [isTriggering, setIsTriggering] = useState(false);
  const savedCallback = useRef(callback);

  useEffect(() => {
    if ((!delay && delay !== 0) || !isTriggering) {
      return;
    }

    const id = setTimeout(() => {
      savedCallback.current();
      setIsTriggering(false);
    }, delay);

    return () => {
      clearTimeout(id);
    };
  }, [delay, isTriggering]);

  const startTimer = () => {
    setIsTriggering(true);
  };

  return { startTimer };
};

export default useTimeout;
