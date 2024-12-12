function find_game(game_array, game_id) {
  return game_array.find((game) => game.game_id === game_id);
}

const fetchWrapper = {
  get: (url) => async () => {
    const response = await fetch(url, {
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const data = await response.json();
      const error = new Error(data.message);
      error.message = data.message;
      throw error;
    }

    return response.json();
  },

  post: (url) => async (body) => {
    const response = await fetch(url, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const data = await response.json();
      const error = new Error(data.message);
      error.message = data.message;
      throw error;
    }

    return response.json();
  },

  protectedPost: (url) => async (body) => {},
};

export { find_game, fetchWrapper };
