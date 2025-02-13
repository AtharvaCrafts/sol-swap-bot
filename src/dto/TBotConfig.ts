export interface BotConfig {
    privateWallet: string;
    contractAddress: string;
    volumeThreshold: number; // Custom volume setting
    isActive: boolean; // Start/stop feature
}