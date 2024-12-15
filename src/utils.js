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
    console.log("Making the initial request");
    const response = await fetch(url, {
      method: "POST",
      credentials: "include",
      headers: {
        Authorization: `Bearer ${body.accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body.toSend),
    });

    if (!response.ok) {
      const data = await response.json();
      // If the backend returns a message that the access token is expired
      // hit the refresh route and get a new token pain
      if (data.message === "Access token expired") {
        console.log("Hitting the refresh route");
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/auth/refresh`,
          {
            method: "POST",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email: body.toSend.email }),
          }
        );

        if (!response.ok) {
          const data = await response.json();
          const error = new Error(data.message);
          error.message = data.message;
          throw error;
        }

        const data = await response.json();
        // Check if the refresh was successful
        if (data.accessToken) {
          console.log("Retrying the fetch");
          // Retry the request with the new access token
          const retryResponse = await fetch(url, {
            method: "POST",
            credentials: "include",
            headers: {
              Authorization: `Bearer ${data.accessToken}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify(body.toSend),
          });

          if (!retryResponse.ok) {
            const data = await response.json();
            const error = new Error(data.message);
            error.message = data.message;
            throw error;
          }

          const retryData = await retryResponse.json();
          retryData.accessToken = data.accessToken;

          return retryData;
        }
      }
    }

    return response.json();
  },
};

export { find_game, fetchWrapper };
