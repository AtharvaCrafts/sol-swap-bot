interface BotConfig {
    privateWallet: string;
    contractAddress: string;
    volumeThreshold: number; // Custom volume setting
    isActive: boolean; // Start/stop feature
}

const config: BotConfig = {
    privateWallet: '',
    contractAddress: '',
    volumeThreshold: 0,
    isActive: false,
};

export default config;
