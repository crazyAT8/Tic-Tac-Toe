import { createStore } from 'vuex';

// Create a new Vuex store
const store = createStore({
  // State: Centralized data for the application
  state: {
    scores: {
      X: 0,
      O: 0,
    },
    gameHistory: [], // Array to store game history (e.g., moves, winners)
    soundEnabled: true, // Global sound setting
  },

  // Mutations: Synchronous functions to modify the state
  mutations: {
    // Update scores when a player wins
    UPDATE_SCORE(state, player) {
      state.scores[player]++;
    },

    // Add a game result to the history
    ADD_GAME_HISTORY(state, result) {
      state.gameHistory.push(result);
    },

    // Toggle sound on/off
    TOGGLE_SOUND(state) {
      state.soundEnabled = !state.soundEnabled;
    },

    // Reset scores and game history
    RESET_GAME(state) {
      state.scores = { X: 0, O: 0 };
      state.gameHistory = [];
    },
  },

  // Actions: Asynchronous functions to perform logic and commit mutations
  actions: {
    // Action to update the score when a player wins
    updateScore({ commit }, player) {
      commit('UPDATE_SCORE', player);
    },

    // Action to add a game result to the history
    addGameHistory({ commit }, result) {
      commit('ADD_GAME_HISTORY', result);
    },

    // Action to toggle sound
    toggleSound({ commit }) {
      commit('TOGGLE_SOUND');
    },

    // Action to reset the game
    resetGame({ commit }) {
      commit('RESET_GAME');
    },
  },

  // Getters: Computed properties for the state
  getters: {
    // Get the current scores
    getScores: (state) => state.scores,

    // Get the game history
    getGameHistory: (state) => state.gameHistory,

    // Check if sound is enabled
    isSoundEnabled: (state) => state.soundEnabled,
  },
});

export default store;