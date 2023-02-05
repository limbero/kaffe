import './App.css';
import SevenSegment from './SevenSegment';
import { useEffect, useRef, useState } from 'react';

const recipe = [
  {
    time: 100,
    explanation: 'Pour 50 grams of water',
  },
  {
    time: 50,
    explanation: 'Gently swirl',
  },
  {
    time: 300,
    explanation: 'Let bloom',
  },
  {
    time: 100,
    explanation: 'Pour up to 100 grams',
  },
  {
    time: 100,
    explanation: 'Pause',
  },
  {
    time: 100,
    explanation: 'Pour to 150 grams',
  },
  {
    time: 100,
    explanation: 'Pause',
  },
  {
    time: 100,
    explanation: 'Pour to 200 grams',
  },
  {
    time: 100,
    explanation: 'Pause',
  },
  {
    time: 100,
    explanation: 'Pour to 250 grams',
  },
  {
    time: 50,
    explanation: 'Gently swirl and let drain',
  },
]

function App() {
  const [step, setStep] = useState(0);
  const [elapsed, setElapsed] = useState(0);
  const [timer, setTimer] = useState(recipe[step].time);
  const [start, setStart] = useState(false);
  const tick = useRef();
  const keyboardRef = useRef(null);

  useEffect(() => {
    keyboardRef.current.focus();
  }, []);

  const pause = () => {
    if (!start) {
      if (timer > 0) {
        setStart(true);
        return;
      } else {
        setStep(0);
        setElapsed(0);
        setStart(false);
        setTimer(recipe[0].time);
        return;
      }
    } else {
      setStart(false);
      return;
    }
  };
  const pauseWithSpace= (e) => {
    if (e.key === " ") {
      pause();
    }
  };

  useEffect(() => {
    if (start) {
      tick.current = setInterval(() => {
        setElapsed((elapsed) => {
          return elapsed + 1;
        });
        setTimer((timer) => {
          if (timer === 0) {
            if (step < recipe.length-1) {
              clearInterval(tick.current);
              setStep(step+1);
              return recipe[step+1].time-1;
            } else {
              return 0;
            }
          }
          return timer - 1;
        });
      }, 100);
    } else {
      clearInterval(tick.current);
    }
    return () => clearInterval(tick.current); // <-- clear on unmount!
  }, [start, step]);

  const minutes = Math.floor((timer/10) / 60);
  const seconds = Math.floor(timer/10) % 60;
  const tenths = timer % 10;

  const elapsedMinutes = Math.floor((elapsed/10) / 60);
  const elapsedSeconds = Math.floor(elapsed/10) % 60;
  const elapsedTenths = elapsed % 10;

  return (
    <div
      className="kaffe"
      onKeyDown={pauseWithSpace}
      onClick={pause}
      tabIndex="0"
      ref={keyboardRef}>
      <div className="vertcenter">
        <div className="minidisplay">
          {
            String(Math.max(elapsedMinutes, 0)).padStart(2, '0').split('').map((digit, index) => (<SevenSegment key={index} digit={digit} onColor="rgba(150,50,50, .8)" />))
          }
          <div className="colon">
            <svg viewBox="0 0 24 150" xmlns="http://www.w3.org/2000/svg">
              <circle cx="12" cy="50" r="6" fill="rgba(150,50,50, .8)" />
              <circle cx="12" cy="100" r="6" fill="rgba(150,50,50, .8)" />
            </svg>
          </div>
          {
            String(Math.max(elapsedSeconds, 0)).padStart(2, '0').split('').map((digit, index) => (<SevenSegment key={index} digit={digit} onColor="rgba(150,50,50, .8)" />))
          }
          <div className="period">
            <svg viewBox="0 0 24 150" xmlns="http://www.w3.org/2000/svg">
              <circle cx="6" cy="140" r="6" fill="rgba(150,50,50, .8)" />
            </svg>
          </div>
          <SevenSegment digit={elapsedTenths} onColor="rgba(150,50,50, .8)" />
        </div>
        <div className="display">
          {
            String(Math.max(minutes, 0)).padStart(2, '0').split('').map((digit, index) => (<SevenSegment key={index} digit={digit} />))
          }
          <div className="colon">
            <svg viewBox="0 0 24 150" xmlns="http://www.w3.org/2000/svg">
              <circle cx="12" cy="50" r="6" fill="#EEAA66" />
              <circle cx="12" cy="100" r="6" fill="#EEAA66" />
            </svg>
          </div>
          {
            String(Math.max(seconds, 0)).padStart(2, '0').split('').map((digit, index) => (<SevenSegment key={index} digit={digit} />))
          }
          <div className="period">
            <svg viewBox="0 0 24 150" xmlns="http://www.w3.org/2000/svg">
              <circle cx="6" cy="140" r="6" fill="#EEAA66" />
            </svg>
          </div>
          <SevenSegment digit={tenths} />
        </div>
        <div className="explanation">
          {recipe[step].explanation}
        </div>
      </div>
    </div>
  );
}

export default App;
