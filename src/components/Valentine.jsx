import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import './Valentine.css';

const messages = [
  "Will you be my lifelong friend, dear buddy? 😊",
  "What? Can't we be best friends forever? 😢",
  "Please, let's promise to stay pals for life! 🥺",
  "You're my best friend! Let's make it official? 💖",
  "Life is better with friends like you! 🌈",
  "Don't make me beg! Let's be lifelong amigos! 🙏",
  "You're the peanut butter to my jelly! Friends forever? 🥪",
  "Friends like you make every day special. Stay forever? 🌟",
  "You're the cheese to my macaroni! Besties for life? 🧀",
  "Our friendship is sweeter than candy! 🍬",
  "You're the sprinkles to my ice cream! 🍦",
  "Together, we're unstoppable! Lifelong partners in crime? 💪",
  "You're the yin to my yang! Eternal friends? ☯️",
  "Friends forever! Let's keep it that way? ♾️",
  "You're the ketchup to my fries! 🍟",
  "Our adventures are the best! More to come? 🚀",
  "You're the marshmallow to my hot cocoa! ☕",
  "Life's a journey, and I'm glad you're my co-pilot! ✈️",
  "You're the harmony to my melody! 🎶",
  "You're the sparkle in my life! ✨",
  "No more options left... Best friends forever? 💌"
];

const getRandomPosition = (modalWidth, modalHeight) => {
  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;

  const maxX = viewportWidth - modalWidth;
  const maxY = viewportHeight - modalHeight;

  const x = Math.random() * maxX;
  const y = Math.random() * maxY;

  return { x, y };
};

const Valentine = () => {
  const [modals, setModals] = useState([{ message: messages[0], position: { x: 0, y: 0 }, showNoButton: true }]);
  const [accepted, setAccepted] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      // Recalculate positions for existing modals on window resize
      setModals((currentModals) =>
        currentModals.map((modal) => ({
          ...modal,
          position: getRandomPosition(300, 150) // Assuming modal width: 300px, height: 150px
        }))
      );
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleAffirmative = () => {
    setAccepted(true);
  };

  const handleNegative = () => {
    if (modals.length < messages.length) {
      const modalElement = document.createElement('div');
      modalElement.className = 'modal';
      modalElement.style.visibility = 'hidden';
      modalElement.style.position = 'absolute';
      modalElement.innerHTML = `<h1>${messages[modals.length]}</h1><button>Absolutely, let's do this! 🎉</button><button>Maybe later. ⏳</button>`;
      document.body.appendChild(modalElement);

      const modalWidth = modalElement.offsetWidth;
      const modalHeight = modalElement.offsetHeight;
      document.body.removeChild(modalElement);

      const position = getRandomPosition(modalWidth, modalHeight);
      const showNoButton = modals.length < messages.length - 1; // Hide "No" button on the last modal
      setModals([...modals, { message: messages[modals.length], position, showNoButton }]);
    }
  };

  return (
    <div className="valentine-container">
      {!accepted ? (
        modals.map((modal, index) => (
          <motion.div
            key={index}
            className="modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            style={{ top: `${modal.position.y}px`, left: `${modal.position.x}px` }}
          >
            <h1>{modal.message}</h1>
            <button className="affirmative-button" onClick={handleAffirmative}>Absolutely, let's do this! 🎉</button>
            {modal.showNoButton && <button className="negative-button" onClick={handleNegative}>Maybe later. ⏳</button>}
          </motion.div>
        ))
      ) : (
        <div className="love-screen">
          <h1>Love You! My Friend 💖</h1>
          <motion.div
            className="heart-animation"
            initial={{ scale: 0 }}
            animate={{ scale: [1, 1.5, 1] }}
            transition={{ repeat: Infinity, duration: 0.8 }}
          >
            ❤️
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default Valentine;
