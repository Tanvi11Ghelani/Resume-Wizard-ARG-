import React, { useState, useEffect } from "react";
import axios from "axios";
import "./grammar.css";

const Textarea = () => {
  const [text, setText] = useState("");
  const [totalCount, setTotalCount] = useState(0);
  const [remainingCount, setRemainingCount] = useState(150);

  useEffect(() => {
    setTotalCount(text.length);
    setRemainingCount(150 - text.length);

    if (text.length > 150) {
      alert("Text is above 150 characters");
    }
  }, [text]);

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
  };

  const handleCorrect = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/text/check",
        {
          text,
        }
      );
      const data = response.data;

      const correctedText = data.matches.reduce((acc, match) => {
        const startIndex = match.offset;
        const endIndex = match.offset + match.length;
        const replacement = match.replacements[0]?.value || "";
        return acc.slice(0, startIndex) + replacement + acc.slice(endIndex);
      }, text);

      setText(correctedText);
    } catch (error) {
      console.error("Error correcting text", error);
    }
  };

  return (
    <div className="container">
      <h2>GPES Char Counter</h2>
      <p>
        Check your English Text for Grammar, Spelling, Punctuation Errors with
        GPES Counter
      </p>
      <textarea
        id="textarea"
        className="textarea"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type something here..."
        required
      ></textarea>
      <div className="counter-container">
        <p>
          Total characters: <span id="total-counter">{totalCount}</span>
        </p>
        <p>
          Remaining characters:{" "}
          <span id="remaining-counter">{remainingCount}</span>
        </p>
      </div>
      <div className="butonwa">
        <button id="Button" onClick={handleCorrect}>
          Correct Text
        </button>
        <button id="copy" onClick={handleCopy}>
          Copy Text
        </button>
      </div>
    </div>
  );
};

export default Textarea;
