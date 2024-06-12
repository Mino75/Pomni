<template>
    <div>
      <Timer :time="time" @timeUp="nextQuestion" />
      <div v-if="currentQuestion < questions.length">
        <h2>{{ questions[currentQuestion].question }}</h2>
        <div v-for="(answer, index) in questions[currentQuestion].answers" :key="index">
          <button @click="selectAnswer(answer.text)">{{ answer.text }}</button>
        </div>
      </div>
      <div v-else>
        <h2>Quiz Completed!</h2>
        <p>Your score: {{ score }}</p>
        <button @click="$emit('endQuiz')">Restart</button>
      </div>
    </div>
  </template>
  
  <script>
  import { ref } from 'vue';
  import Timer from './Timer.vue';
  
  export default {
    components: { Timer },
    props: ['questions'],
    setup(props) {
      const currentQuestion = ref(0);
      const score = ref(0);
      const time = ref(30);
  
      const selectAnswer = (selectedAnswer) => {
        if (selectedAnswer === props.questions[currentQuestion.value].correct) {
          score.value += time.value;
        }
        nextQuestion();
      };
  
      const nextQuestion = () => {
        if (currentQuestion.value < props.questions.length - 1) {
          currentQuestion.value++;
          time.value = 30;
        }
      };
  
      return { currentQuestion, selectAnswer, nextQuestion, score, time };
    },
  };
  </script>