import { useContext, useRef, useSyncExternalStore, createContext } from "react";

function hashKey(queryKey) {
  return JSON.stringify(queryKey);
}

export class QueryClient {
  constructor() {
    this.cache = new Map();
    this.listeners = new Set();
  }

  subscribe(listener) {
    this.listeners.add(listener); // The listener here is a callback function
    return () => this.listeners.delete(listener); // Returns a function that allows the subscriber to unsubscribe
  }

  get(queryKey) {
    const hash = hashKey(queryKey);

    if (!this.cache.has(hash)) {
      this.set(queryKey, {
        status: "pending",
      });
    }

    return this.cache.get(hash);
  }

  set(queryKey, data) {
    const hash = hashKey(queryKey);
    this.cache.set(hash, { ...this.cache.get(hash), ...data });
    this.listeners.forEach((listener) => listener(queryKey)); // Calls the callback for each listerner with the queryKey
  }

  async obtain({ queryKey, queryFn }) {
    try {
      const data = await queryFn(queryKey);
      this.set(queryKey, { status: "success", data });
    } catch (error) {
      this.set(queryKey, { status: error, error });
    }
  }
}

export function createObserver(queryClient, options) {
  return {
    subscribe(notify) {
      const unsubscribe = queryClient.subscribe((queryKey) => {
        if (hashKey(options.queryKey) === hashKey(queryKey)) {
          notify();
        }
      });

      queryClient.obtain(options);

      return unsubscribe;
    },

    getSnapshot() {
      return queryClient.get(options.queryKey);
    },
  };
}

export function useQuery(options) {
  const queryClient = useContext(QueryClientContext);
  const observerRef = useRef();

  if (!observerRef.current) {
    observerRef.current = createObserver(queryClient, options);
  }

  return useSyncExternalStore(
    observerRef.current.subscribe,
    observerRef.current.getSnapshot
  );
}

const QueryClientContext = createContext();

export function QueryClientProvider({ client, children }) {
  return (
    <QueryClientContext.Provider value={client}>
      {children}
    </QueryClientContext.Provider>
  );
}
