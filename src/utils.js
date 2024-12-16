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

  protectedPost: (url) => async (body) => {
    // console.log("Making the initial request");
    const initialResponse = await fetch(url, {
      method: "POST",
      credentials: "include",
      headers: {
        Authorization: `Bearer ${body.accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ gameId: body.gameId }),
    });
    const initialData = await initialResponse.json();

    if (!initialResponse.ok) {
      // If the backend returns a message that the access token is expired
      // hit the refresh route and get a new token pain
      if (initialData.message === "Access token expired") {
        // console.log("Hitting the refresh route");
        const refreshResponse = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/auth/refresh`,
          {
            method: "POST",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email: body.email }),
          }
        );

        const refreshData = await refreshResponse.json();

        if (!refreshResponse.ok) {
          const error = new Error(refreshData.message);
          error.message = refreshData.message;
          throw error;
        }

        // Check if the refresh was successful
        if (refreshData.accessToken) {
          // console.log("Retrying the fetch");
          // Retry the request with the new access token
          const retryResponse = await fetch(url, {
            method: "POST",
            credentials: "include",
            headers: {
              Authorization: `Bearer ${refreshData.accessToken}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ gameId: body.gameId }),
          });
          const retryData = await retryResponse.json();
          if (!retryResponse.ok) {
            const error = new Error(retryData.message);
            error.message = retryData.message;
            throw error;
          }

          retryData.accessToken = refreshData.accessToken;

          return retryData;
        }
      }
    }

    return initialData;
  },
};

export { find_game, fetchWrapper };
