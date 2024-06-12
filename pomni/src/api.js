import axios from 'axios';

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
const apiEndpoint = import.meta.env.VITE_API_ENDPOINT;
const apiUser = import.meta.env.VITE_API_USER;
const apiPassword = import.meta.env.VITE_API_PASSWORD;

export async function fetchQuestions() {
  try {
    const response = await axios.get(`${apiBaseUrl}${apiEndpoint}`, {
      auth: {
        username: apiUser,
        password: apiPassword
      }
    });

    const data = response.data;

    if (!data.Quizz || data.Quizz.length === 0) {
      return [];
    }

    return data.Quizz[0].map((question) => ({
      question: question.question,
      answers: question.answers.map((ans) => ({
        text: ans.text,
        isCorrect: ans.isCorrect
      })),
      correct: question.answers.find((ans) => ans.isCorrect).text
    }));
  } catch (error) {
    console.error('Error fetching quiz questions:', error);
    return [];
  }
}