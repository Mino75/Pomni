<template>
    <div>
      <p>Time left: {{ timer }}</p>
    </div>
  </template>
  
  <script>
  import { ref, onMounted, onUnmounted, watch } from 'vue';
  
  export default {
    props: ['time'],
    emits: ['timeUp'],
    setup(props, { emit }) {
      const timer = ref(props.time);
  
      const countdown = () => {
        if (timer.value > 0) {
          timer.value--;
        } else {
          emit('timeUp');
        }
      };
  
      let interval;
      onMounted(() => {
        interval = setInterval(countdown, 1000);
      });
  
      onUnmounted(() => {
        clearInterval(interval);
      });
  
      watch(() => props.time, (newTime) => {
        timer.value = newTime;
      });
  
      return { timer };
    },
  };
  </script>