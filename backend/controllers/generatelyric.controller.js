import { GoogleGenerativeAI } from "@google/generative-ai";
import SongTitles from "../schema/titleschema.js";

const generatelyric = async (req, res) => {
    try {
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
        const songs= await SongTitles.find();
        const songlist = songs.map((song)=>song.title);
        const prompt = `
        You are an AI that strictly returns responses in **pure JSON format** (without markdown, formatting, or explanations).

        1️⃣ **Select truly a random song** from this list:
        ${songlist}.
        Ensure **fair distribution** of songs over multiple requests.
        2️⃣ **Generate randomly 3 lines of lyrics ** from the middle of the selected song.
        **Extract exactly 3 lines of lyrics** **from the middle section** of the selected song.  
        - **DO NOT** use the intro, first verse, or chorus.  
        - **DO NOT** select the same snippet repeatedly for the same song.  
        - Make sure the lyrics feel **fresh, engaging, and immersive.**  
        **Make the game more interactive & challenging:**  
        - The lyrics should feel **mysterious & intriguing** rather than being obvious.  
        - **Avoid phrases that directly give away the song title.**  
        3️⃣ **DO NOT** reveal the song title or hint at it in the lyrics.
        Don't select a song multiple times in a row with same lyrics.
        Try to change the lyrics every time you select a song and allow to be more interacting and gaming mood.

        📌 **Response Format (STRICTLY JSON ONLY):**  
        Return **only** this valid JSON object, without any extra words:
        {
          "title": "bad liar",
          "lyrics": "I see the colors in your eyes, Fading like a moonless night, A whisper lost in silent skies."
        }

        ⚠ **Strict Rules:**
        - **NO markdown formatting** (Do not use \`\`\`json).
        - **NO explanations, no extra text** (Only return the JSON object).
        - **Ensure JSON is machine-readable** (Must be a valid JSON structure).
        - **The "title" should always be lowercase**.
        `;

        const response = await model.generateContent(prompt);
        const rawText = response?.response?.candidates?.[0]?.content?.parts?.[0]?.text;
        if (!rawText) {
            throw new Error("Invalid response format from Gemini API");
        }
        const match = rawText.match(/```json\n([\s\S]*?)\n```/);
        let jsonResponse;
        if (match && match[1]) {
            jsonResponse = match[1];
        } else {
            throw new Error("Didn't responded.");
        }
        let parsedResponse;
        try {
            parsedResponse = JSON.parse(jsonResponse);
        } catch (error) {
            throw new Error("did not return valid JSON.");
        }
        const { title, lyrics } = parsedResponse;
        return res.json({ title, lyrics });
    } catch (error) {
        res.status(500).json({ error: "Error generating lyrics", details: error.message });
    }
};
export default generatelyric;