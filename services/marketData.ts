
import { WatchlistItem } from '../types';
import { INITIAL_WATCHLIST_DATA } from '../constants';

// This is a mock in-memory store for the "live" data.
// In a real app, this would be managed by a WebSocket connection.
let liveDataStore: WatchlistItem[] = JSON.parse(JSON.stringify(INITIAL_WATCHLIST_DATA)); // Deep copy to start

/**
 * Simulates a single tick update for all instruments in the store.
 */
const simulatePriceTick = () => {
    liveDataStore = liveDataStore.map(item => {
        // Simulate a more realistic price fluctuation (e.g., up to 0.1% change per tick)
        const spotChange = (Math.random() - 0.5) * (item.spotPrice * 0.001);
        const nearChange = (Math.random() - 0.5) * (item.nearMonthFuture * 0.001);
        const nextChange = (Math.random() - 0.5) * (item.nextMonthFuture * 0.001);

        const newSpotPrice = Math.max(0, parseFloat((item.spotPrice + spotChange).toFixed(2)));
        const newNearMonthFuture = Math.max(0, parseFloat((item.nearMonthFuture + nearChange).toFixed(2)));
        const newNextMonthFuture = Math.max(0, parseFloat((item.nextMonthFuture + nextChange).toFixed(2)));
        
        return {
            ...item,
            spotPrice: newSpotPrice,
            nearMonthFuture: newNearMonthFuture,
            nextMonthFuture: newNextMonthFuture,
            futurePriceDifference: parseFloat((newNextMonthFuture - newNearMonthFuture).toFixed(2)),
        };
    });
};

// Start the background simulation of market data updates.
// This mimics a live feed that the frontend can connect to.
setInterval(simulatePriceTick, 1500);

/**
 * Fetches the latest watchlist data from our simulated live feed.
 * @returns A Promise that resolves with the current watchlist data.
 */
export const fetchLiveWatchlistData = (): Promise<WatchlistItem[]> => {
    return new Promise(resolve => {
        // Simulate network latency for a more realistic API call feel.
        const latency = 100 + Math.random() * 200; // Random latency between 100ms and 300ms
        setTimeout(() => {
            // Return a deep copy to prevent direct state mutation.
            resolve(JSON.parse(JSON.stringify(liveDataStore)));
        }, latency);
    });
};
