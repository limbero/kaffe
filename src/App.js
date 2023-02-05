import './App.css';
import SevenSegment from './SevenSegment';
import { useEffect, useRef, useState } from 'react';

const recipe = [
  {
    time: 100,
    explanation: 'pour 50 grams',
  },
  {
    time: 50,
    explanation: 'swirl',
  },
  {
    time: 300,
    explanation: 'bloom',
  },
  {
    time: 100,
    explanation: 'pour to 100 grams',
  },
  {
    time: 100,
    explanation: 'pause',
  },
  {
    time: 100,
    explanation: 'pour to 150 grams',
  },
  {
    time: 100,
    explanation: 'pause',
  },
  {
    time: 100,
    explanation: 'pour to 200 grams',
  },
  {
    time: 100,
    explanation: 'pause',
  },
  {
    time: 100,
    explanation: 'pour to 250 grams',
  },
  {
    time: 50,
    explanation: 'swirl and let drain',
  },
]

function App() {
  const [step, setStep] = useState(0);
  const [timer, setTimer] = useState(recipe[step].time);
  const [start, setStart] = useState(false);
  const firstStart = useRef(true);
  const tick = useRef(); // <-- React ref

  useEffect(() => {
    if (firstStart.current) {
      firstStart.current = !firstStart.current;
      return;
    }

    if (start) {
      tick.current = setInterval(() => { // <-- set tick ref current value
        setTimer((timer) => {
          if (timer === 0) {
            if (step === (recipe.length-1)) {
              clearInterval(tick.current);
              return 0;
            } else {
              clearInterval(tick.current);
              setStep(step+1);
              return recipe[step+1].time;
            }
          }
          return timer - 1;
        });
      }, 100);
    } else {
      clearInterval(tick.current); // <-- access tick ref current value
    }

    return () => clearInterval(tick.current); // <-- clear on unmount!
  }, [start, step]);

  const minutes = Math.floor((timer/10) / 60);
  const seconds = Math.floor(timer/10) % 60;
  const tenths = timer % 10;

  return (
    <div className="kaffe" onClick={() => {
        if (timer > 0) {
          if (!start) {
            setStart(true);
            return;
          } else {
            setStart(false);
            return;
          }
        } else {
          setStep(0);
          setStart(false);
          setTimer(recipe[0].time);
        }
      }}>
      <div className="vertcenter">
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
