import dotenv from 'dotenv'
import inquirer from 'inquirer'
import { removeTonLp } from './bin/removeTonLiquidity';
import { removeUsdtLp } from './bin/removeUsdtLiquidity';
dotenv.config()

async function main() {
    const questions = [
        {
            type: 'list',
            name: 'action',
            message: 'Choose action',
            // 'Remove TON Liquidity', 
            choices: ['Remove USDT Liquidity', 'Cancel'],
        },
        {
            type: 'input',
            name: 'account',
            message: 'Enter mnemonic (Use spaces to separate)',
            when: answers => ['Remove TON Liquidity', 'Remove USDT Liquidity'].includes(answers.action)
        },
        {
            type: 'input',
            name: 'liquidity',
            message: 'Enter amount',
            when: answers => ['Remove TON Liquidity', 'Remove USDT Liquidity'].includes(answers.action) && answers.account
        }
    ];
    const { action, account, liquidity } = await inquirer.prompt(questions)
    switch (action) {
        case 'Remove TON Liquidity': {
            removeTonLp(account, liquidity)
        }; break;
        case 'Remove USDT Liquidity': {
            removeUsdtLp(account, liquidity)
        }; break;
    }

}

main();