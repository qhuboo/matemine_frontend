export const api = {
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

  protectedPost: (url) => async (payload) => {
    // console.log("Making the initial request");
    const initialResponse = await fetch(url, {
      method: "POST",
      credentials: "include",
      headers: {
        Authorization: `Bearer ${payload.accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload.body),
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
            body: JSON.stringify({ email: payload.email }),
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
            body: JSON.stringify(payload.body),
          });
          const retryData = await retryResponse.json();
          if (!retryResponse.ok) {
            const error = new Error(retryData.message);
            error.message = retryData.message;
            throw error;
          }

          return { data: retryData, accessToken: refreshData.accessToken };
        }
      }
    }

    return { data: initialData };
  },
  protectedGet: (url, payload) => async () => {
    console.log("Making the initial request");
    const initialResponse = await fetch(url, {
      method: "GET",
      credentials: "include",
      headers: {
        Authorization: `Bearer ${payload.accessToken}`,
        "Content-Type": "application/json",
      },
    });
    const initialData = await initialResponse.json();

    if (!initialResponse.ok) {
      // If the backend returns a message that the access token is expired
      // hit the refresh route and get a new token pain
      if (initialData.message === "Access token expired") {
        console.log("Hitting the refresh route");
        const refreshResponse = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/auth/refresh`,
          {
            method: "POST",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email: payload.email }),
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
          console.log("Retrying the fetch");
          // Retry the request with the new access token
          const retryResponse = await fetch(url, {
            method: "GET",
            credentials: "include",
            headers: {
              Authorization: `Bearer ${refreshData.accessToken}`,
              "Content-Type": "application/json",
            },
          });
          const retryData = await retryResponse.json();
          if (!retryResponse.ok) {
            const error = new Error(retryData.message);
            error.message = retryData.message;
            throw error;
          }

          return { data: retryData, accessToken: refreshData.accessToken };
        }
      }
    }

    return { data: initialData };
  },
};
