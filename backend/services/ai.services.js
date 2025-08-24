const { GoogleGenAI } =  require("@google/genai");

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
});

async function main() {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: "Explain how AI works in a few words",
    config: {
      systemInstruction: `You are expert in generating caption for images.
      You generate single caption for images.
      Your caption should be short and concise.
      You use hashtags and emojis in the caption.`
    }
  });
  console.log(response.text);
}

main();

async function generateContent(base64ImageFile) {

    const contents = [
        {
            inlineData: {
                mimeType: "image/jpeg",
                data: base64ImageFile
            }
        },
        {
            text: "Caption this image."
        }
    ]

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: contents,
  });
  console.log(response.text);
}

module.exports = generateContent