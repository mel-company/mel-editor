import { StateStorage } from "zustand/middleware";

const createDbStorage = (): StateStorage => ({
    getItem: async (name: string): Promise<string | null> => {
        if (typeof window === "undefined") return null;
        try {
            const response = await fetch(`/api/v1/store/${name}`);
            if (!response.ok) {
                throw new Error("Failed to fetch from DB");
            }
            const json = await response.json();
            // If data is null, return null so Zustand uses default state
            if (json.data === null) return null;

            // Zustand expects a stringified JSON (because it parses it itself if using the default persist)
            // BUT, our API returns the actual object/string stored.
            // If our API returns the raw JSON string that was saved, we are good.
            // If our API parses it and returns an object, we might need to stringify it back for Zustand if Zustand expects a string.
            // The default JSONStorage implementation in Zustand expects getItem to return a string.

            // Our server saves: JSON.stringify(storeData) where storeData[key] = value.
            // value is what Zustand saved, which is usually a specific stringified version or object depending on configuration.
            // Wait, Zustand persist with default storage (localStorage) calls JSON.stringify on the state.
            // So 'value' sent to server is ALREADY a stringified state.
            // So 'json.data' returned from server receives that string.
            // So we just return it.

            return json.data;
        } catch (e) {
            console.error("DB Storage getItem error:", e);
            return null;
        }
    },
    setItem: async (name: string, value: string): Promise<void> => {
        if (typeof window === "undefined") return;
        try {
            await fetch(`/api/v1/store/${name}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ value }),
            });
        } catch (e) {
            console.error("DB Storage setItem error:", e);
        }
    },
    removeItem: async (name: string): Promise<void> => {
        // Optional: Implement removal if needed
        console.log("removeItem called for", name);
    },
});

export default createDbStorage;
