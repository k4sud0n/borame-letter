import React, { useEffect } from 'react';
import TextTransition, { presets } from 'react-text-transition';
import backgroundImage from '../../../assets/image/background1.png';

const TEXTS = [
  '인편지기,',
  '인편친구,',
  '동기,',
];

const Banner = () => {
    const [index, setIndex] = React.useState(0);

    useEffect(() => {
      const intervalId = setInterval(() =>
        setIndex(index => index + 1),
        1000
      );
      return () => clearTimeout(intervalId);
    }, []);
  

    return (
        <div className="border-b border-inherit bg-sky-300">
            <div className="md:flex justify-between container mx-auto p-5">
                <div className="mt-7 tracking-wide">
                    <div className="text-3xl md:text-6xl font-extrabold text-white drop-shadow-md">모든 공군 훈련병들의</div>
                    <TextTransition
                        className="mt-3.5 text-6xl font-extrabold text-white drop-shadow-md"
                        text={ TEXTS[index % TEXTS.length] }
                        springConfig={ presets.wobbly }
                    />
                    <div className="mt-3.5 text-5xl md:text-6xl font-extrabold text-white drop-shadow-md">보라매인편</div>
                </div>
                <img className="drop-shadow-md md:w-1/3 md:h-1/3" src={backgroundImage} />
            </div>
        </div>
    )
}

export default Banner;
