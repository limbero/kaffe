import './App.css';
import SevenSegment from './SevenSegment';
import { useEffect, useRef, useState } from 'react';

function App() {
  const [timer, setTimer] = useState(1500); // 25 minutes
  const [start, setStart] = useState(true);
  const firstStart = useRef(true);
  const tick = useRef(); // <-- React ref

  useEffect(() => {
    if (firstStart.current) {
      firstStart.current = !firstStart.current;
      return;
    }

    if (start) {
      tick.current = setInterval(() => { // <-- set tick ref current value
        setTimer((timer) => timer - 1);
      }, 1000);
    } else {
      clearInterval(tick.current); // <-- access tick ref current value
    }

    return () => clearInterval(tick.current); // <-- clear on unmount!
  }, [start]);

  const minutes = Math.floor(timer / 60);
  const seconds = timer % 60;

  const timeString = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  

  return (
    <div className="kaffe">
      <div className="display">
        {
          String(minutes).padStart(2, '0').split('').map(digit => (<SevenSegment digit={digit} />))
        }
        <div className="colon">
          <svg viewBox="0 0 24 150" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="50" r="6" fill="#EEAA66" />
            <circle cx="12" cy="100" r="6" fill="#EEAA66" />
          </svg>
        </div>
        {
          String(seconds).padStart(2, '0').split('').map(digit => (<SevenSegment digit={digit} />))
        }
      </div>
    </div>
  );
}

export default App;
