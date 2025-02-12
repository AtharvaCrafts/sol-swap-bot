import * as readline from 'readline';
import config from './config';
import fs from 'fs';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function promptUser(question: string): Promise<string> {
    return new Promise((resolve) => {
        rl.question(question, (answer) => {
            resolve(answer);
        });
    });
}

async function updateConfig() {
    const privateWallet = await promptUser('Enter your private wallet: ');
    const contractAddress = await promptUser('Enter the contract address: ');
    const volumeThreshold = await promptUser('Enter the custom volume threshold: ');

    // Update the config object
    config.privateWallet = privateWallet;
    config.contractAddress = contractAddress;
    config.volumeThreshold = parseFloat(volumeThreshold);

    // Save the updated config to the config.ts file
    fs.writeFileSync('./src/config.ts', `export default ${JSON.stringify(config, null, 2)};`);

    console.log('Configuration updated successfully!');
    rl.close();
}

updateConfig();
