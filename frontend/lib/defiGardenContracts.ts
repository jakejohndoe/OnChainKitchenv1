// DeFi Garden Contract ABIs and configuration
import seedTokenAbi from './abis/SeedToken.json'
import stakedSeedTokenAbi from './abis/StakedSeedToken.json'
import seedStakingAbi from './abis/SeedStaking.json'
import gardenDepositAbi from './abis/GardenDeposit.json'
import greenhouseAbi from './abis/Greenhouse.json'

// ABIs are already extracted as arrays in the JSON files
export const SEED_TOKEN_ABI = seedTokenAbi
export const STAKED_SEED_TOKEN_ABI = stakedSeedTokenAbi
export const SEED_STAKING_ABI = seedStakingAbi
export const GARDEN_DEPOSIT_ABI = gardenDepositAbi
export const GREENHOUSE_ABI = greenhouseAbi

// Contract addresses - Sepolia deployment
export const SEED_TOKEN_ADDRESS = '0x8ceffb90082883dEB607f0e1d0e7a8917d93aa94' as const
export const STAKED_SEED_TOKEN_ADDRESS = '0xE80907939621d528324ee4AeB0a47aA405721677' as const
export const SEED_STAKING_ADDRESS = '0x601a3ED64b2f9Aeab533DCe2c2485F046675B583' as const
export const GARDEN_DEPOSIT_ADDRESS = '0xa45919615Dc28423122055be3e1d4766946E4d4e' as const
export const GREENHOUSE_ADDRESS = '0x109d9933a50b9e6982357D3Fa3901ca3A024c237' as const