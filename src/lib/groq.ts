import { Groq } from "groq-sdk";

export function createGroqClient() {
	if (!process.env.GROQ_API_KEY) {
		throw new Error("GROQ_API_KEY is niet gezet in environment variables");
	}

	return new Groq({
		apiKey: process.env.GROQ_API_KEY,
	});
}