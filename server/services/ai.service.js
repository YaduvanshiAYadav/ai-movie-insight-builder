require('dotenv').config();
const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

exports.summarizeReviews = async (reviews) => {
  if (!reviews || reviews.length === 0) return "No reviews found to analyze.";

  try {
    // Aapki list se uthaya gaya sabse stable model
    const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });

    const prompt = `Summarize these movie reviews in 2-3 sentences and state the overall sentiment (Positive/Negative/Mixed): \n\n ${reviews.slice(0, 5).join("\n\n")}`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    return text;

  } catch (error) {
    console.error("Gemini Final Error:", error.message);
    
    // Agar flash-latest mein issue aaye toh 2.0-flash try karega (jo aapki list mein hai)
    try {
        const fallback = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
        const res = await fallback.generateContent(prompt);
        return res.response.text();
    } catch (err) {
        return "AI Analysis is currently processing. Please refresh in a moment!";
    }
  }
};