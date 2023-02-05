const PATTERNS = [
  "TTTTTTF",
  "FTTFFFF",
  "TTFTTFT",
  "TTTTFFT",
  "FTTFFTT",
  "TFTTFTT",
  "TFTTTTT",
  "TTTFFFF",
  "TTTTTTT",
  "TTTTFTT",
];
const OFFSETS = [
  "0,0",
  "57.5,2.5",
  "57.5,62.5",
  "0,120",
  "-2.5,62.5",
  "-2.5,2.5",
  "0,60",
];
const ROTATIONS = [
  "0",
  "90",
  "90",
  "0",
  "90",
  "90",
  "0",
];

function SevenSegment({digit}) {
  return (
    <div className="sevenSegment">
      <svg viewBox="0 0 75 150" xmlns="http://www.w3.org/2000/svg">
        {
          Array.from(Array(7).keys())
            .map(segno => (
              <polygon
                points="10,15 15,20 60,20 65,15 60,10 15,10"
                fill={PATTERNS[digit][segno] === 'T' ? "#EEAA66" : "rgba(150,50,50, 0.1)"}
                transform={`translate(${OFFSETS[segno]}) rotate(${ROTATIONS[segno]} 10 15)`}
              />
            ))
        }
      </svg>
    </div>
  );
}

export default SevenSegment;
