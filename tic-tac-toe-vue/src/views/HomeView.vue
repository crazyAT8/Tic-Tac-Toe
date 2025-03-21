<template>
    <div>
      <h1>Welcome to Tic Tac Toe!</h1>
      <TicTacToe />
    </div>
  </template>
  
  <script>
  import TicTacToe from '@/components/TicTacToe.vue';
  
  export default {
    components: {
      TicTacToe,
    },
  };
  </script>