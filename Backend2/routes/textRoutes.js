import express from "express";
import fetch from "node-fetch";

const router = express.Router();

// Helper function to apply corrections
const applyCorrections = (text, matches) => {
  let correctedText = text;
  // Sort matches by offset in reverse order to avoid replacing at incorrect indices
  matches.sort((a, b) => b.offset - a.offset);
  matches.forEach((match) => {
    const startIndex = match.offset;
    const endIndex = match.offset + match.length;
    const replacement = match.replacements[0]?.value || ""; // Use the first suggested correction
    correctedText =
      correctedText.slice(0, startIndex) +
      replacement +
      correctedText.slice(endIndex);
  });
  return correctedText;
};

router.post("/check", async (req, res) => {
  const { text } = req.body;

  if (!text) {
    return res
      .status(400)
      .json({ message: "Text is required for grammar check" });
  }

  try {
    // Send a request to the LanguageTool API for grammar checking
    const response = await fetch("https://api.languagetool.org/v2/check", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
      },
      body: new URLSearchParams({
        text,
        language: "en-US", // Set the language to US English
      }),
    });

    const data = await response.json();

    // If there are grammar mistakes (matches)
    if (data.matches.length > 0) {
      const correctedText = applyCorrections(text, data.matches);
      return res.json({
        success: true,
        originalText: text,
        correctedText: correctedText,
        matches: data.matches, // Optional: return matches for reference
      });
    }

    // No corrections needed
    return res.json({
      success: true,
      originalText: text,
      correctedText: text,
      message: "No grammar issues found.",
    });
  } catch (error) {
    console.error("Error checking text:", error);
    res.status(500).json({ message: "Error checking text" });
  }
});

export default router;
