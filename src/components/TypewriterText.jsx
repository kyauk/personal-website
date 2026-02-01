import { useState, useEffect } from 'react';

const greetings = [
  'Welcome!',
  'Hi there!',
  'Hello there!',
  'Hey!',
  'Howdy!',
  'Mingalaba!',
  'Greetings!',
  'Hiya!',
  "How's the coffee?",
  "What's for lunch?",
  "What's next?",
  "How do we push the frontier?",
  "Summer or Winter?",
];

const COOLDOWN = 5;

export default function TypewriterText({ className = '' }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [recentIndices, setRecentIndices] = useState([0]);

  useEffect(() => {
    const currentWord = greetings[currentIndex];

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        // Typing
        if (displayText.length < currentWord.length) {
          setDisplayText(currentWord.slice(0, displayText.length + 1));
        } else {
          // Pause before deleting
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        // Deleting
        if (displayText.length > 0) {
          setDisplayText(displayText.slice(0, -1));
        } else {
          // Move to random next word (with 5-word cooldown)
          setIsDeleting(false);
          const available = greetings
            .map((_, i) => i)
            .filter((i) => !recentIndices.includes(i));
          const next = available[Math.floor(Math.random() * available.length)];
          setCurrentIndex(next);
          setRecentIndices((prev) => [...prev.slice(-(COOLDOWN - 1)), next]);
        }
      }
    }, isDeleting ? 50 : 80);

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, currentIndex, recentIndices]);

  return (
    <span className={className}>
      {displayText}
      <span className="inline-block w-[2px] h-[1em] bg-current ml-[2px] align-middle animate-blink" />
    </span>
  );
}
