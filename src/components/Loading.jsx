import React, { useState, useEffect } from 'react';

const LoadingPage = () => {
    const [showEmoji, setShowEmoji] = useState(true);

    const emojis = [
        '🧟', '🐱', '🧟', '🐱', '🧟', '🐱', '🧟'
    ];

    return (
        <div style={{
            position:'absolute',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
            width: '100%',
            zIndex: '999999999',
            backgroundColor: '#000'
        }}>
            {showEmoji && (
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    height: 'auto',
                    width: '50%',
                }}>
                    {emojis.map((emoji, index) => (
                        <span
                            key={index}
                            style={{
                                fontSize: '5vw',
                                animation: `fade-in 1s ${0.2 * index}s ease-in`,
                                animationIterationCount: 'infinite'
                            }}
                        >
                            {emoji}
                        </span>
                    ))}
                    <style>{`
            @keyframes fade-in {
              0% {
                opacity: 0;
              }
              100% {
                opacity: 1;
              }
            }
          `}</style>
                </div>
            )}
        </div>
    );
};

export default LoadingPage;
