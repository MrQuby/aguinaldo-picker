import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [pickedCards, setPickedCards] = useState<number[]>([]);
  const [currentAmount, setCurrentAmount] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [cardAmounts, setCardAmounts] = useState<{ [key: number]: number }>({});

  useEffect(() => {
    // Initialize card amounts with one guaranteed zero
    const amounts: { [key: number]: number } = {};
    const zeroCardIndex = Math.floor(Math.random() * 6);
    
    for (let i = 0; i < 6; i++) {
      if (i === zeroCardIndex) {
        amounts[i] = 0;
      } else {
        amounts[i] = Math.floor(Math.random() * 100) + 1;
      }
    }
    setCardAmounts(amounts);
  }, []);

  const handleCardClick = (cardId: number) => {
    const amount = cardAmounts[cardId];
    setCurrentAmount(amount);
    setShowResult(true);
    setPickedCards([...pickedCards, cardId]);
  };

  const tryAgain = () => {
    setShowResult(false);
    setCurrentAmount(null);
  };

  const startOver = () => {
    setPickedCards([]);
    setShowResult(false);
    setCurrentAmount(null);
    
    // Reinitialize card amounts with new random values and one zero
    const amounts: { [key: number]: number } = {};
    const zeroCardIndex = Math.floor(Math.random() * 6);
    
    for (let i = 0; i < 6; i++) {
      if (i === zeroCardIndex) {
        amounts[i] = 0;
      } else {
        amounts[i] = Math.floor(Math.random() * 100) + 1;
      }
    }
    setCardAmounts(amounts);
  };

  const availableCards = [0, 1, 2, 3, 4, 5].filter(id => !pickedCards.includes(id));

  return (
    <div className="app">
      <h1>🎄 Aguinaldo Picker 🎄</h1>
      {!showResult && <p className="subtitle">Piliin ang sobre para sa iyong aguinaldo!</p>}
      
      {!showResult ? (
        <div className="cards-container">
          {availableCards.map(cardId => (
            <div key={cardId} className="card" onClick={() => handleCardClick(cardId)}>
              <div className="card-front">
                <div className="envelope">✉️</div>
                <p>Click Me!</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="result-view">
          <div className="card flipped">
            <div className="card-back">
              <div className="prize">
                <span className="amount">₱{currentAmount}</span>
                <p className="prize-text">Pesos</p>
                {currentAmount === 0 ? (
                  <>
                    <p className="message">Ooops! 😅</p>
                    <p className="message-sub">Sa susunod na Pasko na ang iyong aguinaldo!</p>
                  </>
                ) : (
                  <>
                    <p className="message">Congratulations!</p>
                    <p className="message-sub">Yan na ang iyong aguinaldo! 🎉</p>
                  </>
                )}
              </div>
            </div>
          </div>

          <div className="action-buttons">
            {pickedCards.length === 1 && availableCards.length > 0 && (
              <button className="reset-button" onClick={tryAgain}>
                Try Again (1 try left)
              </button>
            )}
            <button className="reset-button secondary" onClick={startOver}>
              Start Over
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
