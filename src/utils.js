function find_game(game_array, game_id) {
  return game_array.find((game) => game.game_id === game_id);
}

export { find_game };

export const sleepToShowLoadingStates = (ms) =>
  new Promise((resolve) => setTimeout(resolve, ms));
