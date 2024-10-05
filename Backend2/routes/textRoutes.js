import express from "express";

const router = express.Router();

// Simple grammar correction logic (for example purposes)
const verbs = {
  go: { past: "went", present: "goes", future: "will go" },
  be: { past: "was/were", present: "is/are", future: "will be" },
  do: { past: "did", present: "does", future: "will do" },
  have: { past: "had", present: "has", future: "will have" },
  // Add more verbs here
};

// Helper function to detect the tense of the sentence
const detectTense = (sentence) => {
  const words = sentence.split(" ");
  for (let i = 0; i < words.length; i++) {
    const word = words[i].toLowerCase();
    for (let verb in verbs) {
      if (verbs[verb].past.includes(word)) return "past";
      if (verbs[verb].present.includes(word)) return "present";
      if (verbs[verb].future.includes(word)) return "future";
    }
  }
  return "unknown";
};

// Helper function to check subject-verb agreement
// Updated function to check subject-verb agreement for "I", "he", "she", etc.
const checkSubjectVerbAgreement = (sentence) => {
  const singularSubjects = ["he", "she", "it", "i"];
  const pluralSubjects = ["they", "we", "you"];
  const words = sentence.toLowerCase().split(" ");

  let subject = words[0];
  let verb = words[1];

  // Handle "I" special case
  if (subject === "i" && verb === "are") {
    return {
      error: true,
      correction: "am",
      message: `"I" should be paired with "am"`,
    };
  }

  // Other singular/plural agreement checks
  if (
    singularSubjects.includes(subject) &&
    verb !== "is" &&
    verb.endsWith("s")
  ) {
    return {
      error: true,
      correction: "is",
      message: `Subject "${subject}" should pair with "is"`,
    };
  } else if (pluralSubjects.includes(subject) && !verb.endsWith("s")) {
    return {
      error: true,
      correction: verb + "s",
      message: `Subject "${subject}" should pair with "${verb + "s"}"`,
    };
  } else {
    return { error: false, message: "Correct subject-verb agreement" };
  }
};

// Updated function to apply corrections
const applyCorrections = (text) => {
  const subjectVerbAgreement = checkSubjectVerbAgreement(text);

  let correctedText = text;

  // Apply correction for subject-verb agreement
  if (subjectVerbAgreement.error) {
    correctedText = correctedText.replace(
      "are",
      subjectVerbAgreement.correction
    );
  }

  return { correctedText, subjectVerbAgreement };
};

// POST route to check grammar
router.post("/check", (req, res) => {
  const { text } = req.body;

  if (!text) {
    return res
      .status(400)
      .json({ message: "Text is required for grammar check" });
  }

  try {
    // Apply grammar corrections
    const { correctedText, tense, subjectVerbAgreement } =
      applyCorrections(text);

    return res.json({
      success: true,
      originalText: text,
      correctedText,
      tense,
      subjectVerbAgreement,
    });
  } catch (error) {
    console.error("Error checking text:", error);
    return res.status(500).json({ message: "Error processing grammar check" });
  }
});

export default router;
