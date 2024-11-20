// import React, { useState, useEffect } from "react";
// import ConfigPanel from "./ConfigPanel";
// import "./App.css";

// const App = () => {
//   // Default word groups for matching
//   const defaultWords = [
//     { word1: "Kuwait", word2: "Kuwait City" },
//     { word1: "Lithuania", word2: "Vilnius" },
//     { word1: "Mali", word2: "Bamako" },
//     { word1: "Malta", word2: "Valletta" },
//     { word1: "India", word2: "New Delhi" },
//     { word1: "Indonesia", word2: "Jakarta" },
//     { word1: "Kiribati", word2: "South Tarawa" },
//     { word1: "Lebanon", word2: "Beirut" },
//   ];

//   const [words, setWords] = useState(defaultWords);
//   const [selected, setSelected] = useState([]);
//   const [matchedPairs, setMatchedPairs] = useState([]);
//   const [attempts, setAttempts] = useState(0);
//   const [gridColumns, setGridColumns] = useState(4);
//   const [itemCount, setItemCount] = useState(8);

//   useEffect(() => {
//     // Shuffle and adjust items on config changes
//     const shuffledWords = [...defaultWords].sort(() => Math.random() - 0.5);
//     setWords(shuffledWords.slice(0, itemCount / 2));
//     setMatchedPairs([]);
//     setSelected([]);
//     setAttempts(0);
//   }, [itemCount]);

//   const handleWordClick = (word) => {
//     if (selected.length === 1) {
//       const [firstWord] = selected;
//       setSelected([...selected, word]);
//       setAttempts((prev) => prev + 1);

//       // Check if the selected pair is a match
//       const pair = words.find(
//         (pair) =>
//           (pair.word1 === firstWord && pair.word2 === word) ||
//           (pair.word1 === word && pair.word2 === firstWord)
//       );

//       if (pair) {
//         // Correct match: Add to matched pairs and remove the pair from the grid
//         setMatchedPairs((prev) => [...prev, pair.word1, pair.word2]);

//         setTimeout(() => {
//           setWords((prevWords) =>
//             prevWords.filter(
//               (w) => w.word1 !== pair.word1 && w.word2 !== pair.word2
//             )
//           );
//         }, 500); // Delay removal to show green feedback
//       }

//       // Clear selection after a delay
//       setTimeout(() => setSelected([]), 500);
//     } else {
//       // First selection
//       setSelected([word]);
//     }
//   };

//   const resetGame = () => {
//     setMatchedPairs([]);
//     setSelected([]);
//     setAttempts(0);
//     const shuffledWords = [...defaultWords].sort(() => Math.random() - 0.5);
//     setWords(shuffledWords.slice(0, itemCount / 2));
//   };

//   return (
//     <div className="app">
//       <h1>Word matching</h1>
//       <ConfigPanel
//         setItemCount={setItemCount}
//         setGridColumns={setGridColumns}
//       />
//       <div
//         className="grid"
//         style={{
//           gridTemplateColumns: `repeat(${gridColumns}, 1fr)`,
//         }}
//       >
//         {words.flatMap((pair) =>
//           [pair.word1, pair.word2].map((word) => (
//             <div
//               key={word}
//               className={`word ${
//                 matchedPairs.includes(word)
//                   ? "matched"
//                   : selected.includes(word)
//                   ? "selected"
//                   : ""
//               }`}
//               onClick={() => handleWordClick(word)}
//             >
//               {word}
//             </div>
//           ))
//         )}
//       </div>
//       <div className="controls">
//         <p>Attempts: {attempts}</p>
//         <button onClick={resetGame}>Reset</button>
//       </div>
//     </div>
//   );
// };

import React, { useState, useEffect } from "react";
import ConfigPanel from "./ConfigPanel";
import "./App.css";

const App = () => {
  // Default word groups for matching
  const defaultWords = [
    { word1: "Kuwait", word2: "Kuwait City" },
    { word1: "Lithuania", word2: "Vilnius" },
    { word1: "Mali", word2: "Bamako" },
    { word1: "Malta", word2: "Valletta" },
    { word1: "India", word2: "New Delhi" },
    { word1: "Indonesia", word2: "Jakarta" },
    { word1: "Kiribati", word2: "South Tarawa" },
    { word1: "Lebanon", word2: "Beirut" },
  ];

  const [words, setWords] = useState(defaultWords);
  const [selected, setSelected] = useState([]);
  const [matchedPairs, setMatchedPairs] = useState([]);
  const [attempts, setAttempts] = useState(0);
  const [gridColumns, setGridColumns] = useState(4);
  const [itemCount, setItemCount] = useState(8);

  useEffect(() => {
    // Shuffle and adjust items on config changes
    const shuffledWords = [...defaultWords].sort(() => Math.random() - 0.5);
    setWords(shuffledWords.slice(0, itemCount / 2));
    setMatchedPairs([]);
    setSelected([]);
    setAttempts(0);
  }, [itemCount]);

  const handleWordClick = (word) => {
    if (selected.length === 1) {
      const [firstWord] = selected;
      setSelected([...selected, word]);
      setAttempts((prev) => prev + 1);

      // Check if the selected pair is a match
      const pair = words.find(
        (pair) =>
          (pair.word1 === firstWord && pair.word2 === word) ||
          (pair.word1 === word && pair.word2 === firstWord)
      );

      if (pair) {
        // Correct match: Add to matched pairs and remove from the grid
        setMatchedPairs((prev) => [...prev, pair.word1, pair.word2]);

        setTimeout(() => {
          setWords((prevWords) =>
            prevWords.filter(
              (w) => w.word1 !== pair.word1 && w.word2 !== pair.word2
            )
          );
        }, 500); // Delay removal to show green feedback
      } else {
        // Incorrect match: Set both words to red temporarily
        setWords((prevWords) => 
          prevWords.map((w) => 
            w.word1 === word || w.word2 === word || w.word1 === firstWord || w.word2 === firstWord
              ? { ...w, status: 'not-matched' }
              : w
          )
        );

        // After delay, reset the selected words
        setTimeout(() => {
          setSelected([]); // Clear selection
          // Reset the status of the words that didn't match
          setWords((prevWords) =>
            prevWords.map((w) => ({
              ...w,
              status: w.status === 'not-matched' ? null : w.status, // Remove the red color after reset
            }))
          );
        }, 500);
      }
    } else {
      // First word selected
      setSelected([word]);
    }
  };

  const resetGame = () => {
    setMatchedPairs([]);
    setSelected([]);
    setAttempts(0);
    const shuffledWords = [...defaultWords].sort(() => Math.random() - 0.5);
    setWords(shuffledWords.slice(0, itemCount / 2));
  };

  return (
    <div className="app">
      <h1>Word Matching</h1>
      <ConfigPanel
        setItemCount={setItemCount}
        setGridColumns={setGridColumns}
      />
      <div
        className="grid"
        style={{
          gridTemplateColumns: `repeat(${gridColumns}, 1fr)`,
        }}
      >
        {words.flatMap((pair) =>
          [pair.word1, pair.word2].map((word) => (
            <div
              key={word}
              className={`word ${
                matchedPairs.includes(word)
                  ? "matched"
                  : selected.includes(word)
                  ? "selected"
                  : ""
              } ${words.find(w => w.word1 === word || w.word2 === word)?.status || ''}`}
              onClick={() => handleWordClick(word)}
            >
              {word}
            </div>
          ))
        )}
      </div>
      <div className="controls">
        <p>Attempts: {attempts}</p>
        <button onClick={resetGame}>Reset</button>
      </div>
    </div>
  );
};

export default App;
