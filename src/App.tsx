import { socket } from './socket.ts';
import { useEffect, useRef, useState } from 'react';
import { Content } from './types.ts';
import { formatText } from './utils.ts';
import './App.css';
import classNames from 'classnames';
import useSettings from './hooks/useSettings.ts';
import useAnimation from './hooks/useAnimation.ts';
import 'animate.css';
import useAudio from './hooks/useAudio.ts';

function App() {
  const { settings, updateSettings } = useSettings();
  const { initAnimation, animationState, isShowing } = useAnimation({
    duration: settings.display.duration,
    animationIn: settings.display.animationIn,
    animationOut: settings.display.animationOut,
  });
  const { initAudio } = useAudio({
    src: settings.audio.base64,
    volume: settings.audio.volume,
  });

  const [content, setContent] = useState<Content>({
    image: '',
    textContent: '',
  });

  const refIsShowing = useRef(false);

  const handleFireAlert = (image: string, text: string) => {
    if (refIsShowing.current) {
      console.log('add to queue');
      return;
    }
    setContent({
      textContent: formatText(text),
      image,
    });

    initAnimation();
    initAudio();
  };

  useEffect(() => {
    socket.on('fire', handleFireAlert);
    socket.on('settings', updateSettings);
  }, []);

  useEffect(() => {
    refIsShowing.current = isShowing;
  }, [isShowing]);

  useEffect(() => {
    document.documentElement.style.setProperty(
      '--special-color',
      settings.text.specialColor,
    );
  }, [settings.text.specialColor]);

  return (
    <div
      className={classNames('wrapper animate__animated', animationState, {
        isShowing,
      })}
    >
      <div className="image-wrapper">
        <img alt="" src={content.image} />
      </div>
      <div className="text-wrapper">
        <span
          dangerouslySetInnerHTML={{
            __html: content.textContent,
          }}
        ></span>
      </div>
    </div>
  );
}

export default App;
