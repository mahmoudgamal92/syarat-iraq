import * as Network from 'expo-network';
import { useEffect, useState } from 'react';

export function useNetwork() {
    const [isConnected, setIsConnected] = useState<boolean | null>(null);

    useEffect(() => {
        // Check initial status
        const checkStatus = async () => {
            const status = await Network.getNetworkStateAsync();
            setIsConnected(status.isConnected && status.isInternetReachable);
        };
        checkStatus();

        // Listen for changes
        const subscription = Network.addNetworkStateListener((state) => {
            setIsConnected(state.isConnected && state.isInternetReachable);
        });

        return () => subscription.remove();
    }, []);

    return isConnected;
}
