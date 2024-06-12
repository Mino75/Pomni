<template>
  <div id="app">
    <h1>Quiz App</h1>
    <button @click="startQuiz" v-if="!quizStarted">Start Quiz</button>
    <Quiz v-if="quizStarted" :questions="questions" @endQuiz="endQuiz" />
  </div>
</template>

<script>
import { ref } from 'vue';
import Quiz from './components/Quiz.vue';
import { fetchQuestions } from './api';

export default {
  components: { Quiz },
  setup() {
    const quizStarted = ref(false);
    const questions = ref([]);

    const startQuiz = async () => {
      quizStarted.value = true;
      questions.value = await fetchQuestions();
    };

    const endQuiz = () => {
      quizStarted.value = false;
    };

    return { quizStarted, startQuiz, questions, endQuiz };
  },
};
</script>