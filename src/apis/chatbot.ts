// 챗봇 관련 api
import axios from "axios";

const CHATBOT_API_URL = "https://kuis.shop/api/v1/ai/chat?question=";

interface ChatbotResponse {
  answer: string;
}

export const getChatbotAnswerApi = async (question: string) => {
  try {
    const response = await axios.get<ChatbotResponse>(
      CHATBOT_API_URL + question,
      {
        headers: { "Content-Type": "application/json" },
      }
    );

    return response.data.answer;
  } catch (error: any) {
    return error.response.data;
  }
};
