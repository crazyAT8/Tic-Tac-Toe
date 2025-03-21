<template>
    <div class="min-h-screen bg-gray-50 flex flex-col items-center py-8 px-4">
      <div class="w-full max-w-2xl">
        <div class="text-center mb-8">
          <h1 class="text-4xl font-['Pacifico'] text-primary mb-2">
            Tic Tac Toe
          </h1>
          <p class="text-gray-600">Classic game with a modern twist</p>
        </div>
  
        <div class="flex justify-between items-center mb-8">
          <div class="player-panel neumorphic p-4 rounded-lg w-[45%]">
            <div class="flex items-center gap-2 mb-2">
              <input
                type="text"
                class="bg-transparent border-none outline-none text-lg font-medium"
                v-model="player1Name"
                @change="validateName('player1Name', 'Player X')"
              />
              <div class="w-6 h-6 flex items-center justify-center">
                <i class="ri-edit-line text-gray-400"></i>
              </div>
            </div>
            <div class="text-2xl font-bold text-primary">{{ scores.X }}</div>
            <div class="text-sm text-gray-500 mt-1">{{ turn1 }}</div>
          </div>
  
          <div class="player-panel neumorphic p-4 rounded-lg w-[45%]">
            <div class="flex items-center gap-2 mb-2">
              <input
                type="text"
                class="bg-transparent border-none outline-none text-lg font-medium"
                v-model="player2Name"
                @change="validateName('player2Name', 'Player O')"
              />
              <div class="w-6 h-6 flex items-center justify-center">
                <i class="ri-edit-line text-gray-400"></i>
              </div>
            </div>
            <div class="text-2xl font-bold text-secondary">{{ scores.O }}</div>
            <div class="text-sm text-gray-500 mt-1">{{ turn2 }}</div>
          </div>
        </div>
  
        <div class="relative neumorphic p-4 rounded-lg mb-8">
          <div class="grid grid-cols-3 gap-4">
            <div
              v-for="(cell, index) in gameBoard"
              :key="index"
              class="cell neumorphic-inset h-24 rounded flex items-center justify-center text-4xl font-bold cursor-pointer"
              @click="makeMove(index)"
            >
              {{ cell }}
            </div>
          </div>
        </div>
  
        <div class="flex justify-between items-center">
          <button
            class="neumorphic px-6 py-3 rounded-button text-gray-700 font-medium cursor-pointer flex items-center gap-2"
            @click="resetGame"
          >
            <i class="ri-refresh-line"></i>
            Reset Game
          </button>
  
          <div class="flex items-center gap-4">
            <button
              class="neumorphic w-12 h-12 rounded-full cursor-pointer flex items-center justify-center"
              @click="toggleSound"
            >
              <i :class="soundEnabled ? 'ri-volume-up-line' : 'ri-volume-mute-line'"></i>
            </button>
            <button
              class="neumorphic w-12 h-12 rounded-full cursor-pointer flex items-center justify-center"
              @click="openSettings"
            >
              <i class="ri-settings-3-line text-gray-700"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        currentPlayer: "X",
        gameBoard: ["", "", "", "", "", "", "", "", ""],
        gameActive: true,
        soundEnabled: true,
        player1Name: "Player X",
        player2Name: "Player O",
        scores: { X: 0, O: 0 },
        winPatterns: [
          [0, 1, 2],
          [3, 4, 5],
          [6, 7, 8],
          [0, 3, 6],
          [1, 4, 7],
          [2, 5, 8],
          [0, 4, 8],
          [2, 4, 6],
        ],
      };
    },
    computed: {
      turn1() {
        return this.currentPlayer === "X" ? "Your turn" : "Waiting...";
      },
      turn2() {
        return this.currentPlayer === "O" ? "Your turn" : "Waiting...";
      },
    },
    methods: {
      makeMove(index) {
        if (this.gameBoard[index] === "" && this.gameActive) {
          this.gameBoard[index] = this.currentPlayer;
          if (this.checkWin()) {
            this.scores[this.currentPlayer]++;
            this.gameActive = false;
            this.playSound("win");
          } else if (this.gameBoard.every((cell) => cell !== "")) {
            this.gameActive = false;
            this.playSound("draw");
          } else {
            this.currentPlayer = this.currentPlayer === "X" ? "O" : "X";
            this.playSound("move");
          }
        }
      },
      checkWin() {
        return this.winPatterns.some((pattern) => {
          const line = pattern.map((i) => this.gameBoard[i]);
          return line.every((cell) => cell === this.currentPlayer);
        });
      },
      resetGame() {
        this.gameBoard = ["", "", "", "", "", "", "", "", ""];
        this.gameActive = true;
        this.currentPlayer = "X";
        this.playSound("reset");
      },
      playSound(type) {
        if (!this.soundEnabled) return;
        const audio = new Audio();
        switch (type) {
          case "move":
            audio.src = "data:audio/wav;base64,UklGRl9vT19TAElGRg==";
            break;
          case "win":
            audio.src = "data:audio/wav;base64,UklGRl9vT19TAElGRg==";
            break;
          case "draw":
            audio.src = "data:audio/wav;base64,UklGRl9vT19TAElGRg==";
            break;
          case "reset":
            audio.src = "data:audio/wav;base64,UklGRl9vT19TAElGRg==";
            break;
        }
        audio.play().catch(() => {});
      },
      toggleSound() {
        this.soundEnabled = !this.soundEnabled;
      },
      validateName(inputId, defaultName) {
        const input = this[inputId];
        if (!input.trim()) {
          this[inputId] = defaultName;
        }
      },
      openSettings() {
        // Implement settings logic here
      },
    },
  };
  </script>
  
  <style>
  /* Add your styles here */
  </style>