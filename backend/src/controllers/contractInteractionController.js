// setting dotenv
import dotenv from 'dotenv';
import {
  setAcceptedTokens,
  releaseLockedTokens
} from "./blockchain/contractInteractionPublic.js";

import {
  depositPvt,
  requestCredit,
  payCredit,
  getBalanceOfTokensAvailable,
  getUsedCollateral,
} from "./blockchain/contractInteractionPvt.js";

dotenv.config({ path: './.env' });

export const setAcceptedTokensMethod = async (
  tokenAddress,
  isAccepted
) => {
  const ret = await setAcceptedTokens(
    process.env.PRIVATE_KEY,
    process.env.PUBLIC_CHAIN_PROVIDER_URL,
    process.env.CREDCHAIN_ADDRESS,
    tokenAddress,
    isAccepted
  );

  return ret;
}

export const releaseLockedTokensMethod = async(
  tokenAddress,
  recipient,
  user,
  amount
) => {
  const ret = await releaseLockedTokens(
    process.env.PRIVATE_KEY,
    process.env.PUBLIC_CHAIN_PROVIDER_URL,
    process.env.CREDCHAIN_ADDRESS,
    tokenAddress,
    recipient,
    user,
    amount
  );

  return ret;
}

export const getBalanceOfTokensLockedByUserMethod = async (
  user,
  tokenAddress
) => {
  const ret = await getBalanceOfTokensAvailable(
    process.env.PRIVATE_KEY,
    process.env.PUBLIC_CHAIN_PROVIDER_URL,
    process.env.CREDCHAIN_ADDRESS,
    user,
    tokenAddress
  );

  return ret;
}

export const getUsedCollateralMethod = async (
  user,
  tokenAddress
) => {
  const ret = await getUsedCollateral(
    process.env.PRIVATE_KEY_FOR_PVT_CHAIN,
    process.env.PRIVATE_CHAIN_PROVIDER_URL,
    process.env.CREDCHAIN_PVT_ADDRESS,
    user,
    tokenAddress
  );

  return ret;
}

export const depositPvtMethod = async (
  amount,
  token,
  user
) => {
  const ret = await depositPvt(
    process.env.PRIVATE_KEY_FOR_PVT_CHAIN,
    process.env.PRIVATE_CHAIN_PROVIDER_URL,
    process.env.CREDCHAIN_PVT_ADDRESS,
    amount,
    token,
    user
  );

  return ret;
}

export const requestCreditMethodMethod = async (
  creditOrderDto
) => {
  const ret = await requestCredit(
    creditOrderDto,
    process.env.PRIVATE_KEY_FOR_PVT_CHAIN,
    process.env.PRIVATE_CHAIN_PROVIDER_URL,
    process.env.CREDITOR_ADDRESS
  );

  return ret;
}

export const payCreditMethod = async (
  orderId,
  user,
  isPaid
) => {
  const ret = await payCredit(
    orderId,
    user,
    isPaid,
    process.env.PRIVATE_KEY_FOR_PVT_CHAIN,
    process.env.PRIVATE_CHAIN_PROVIDER_URL,
    process.env.CREDITOR_ADDRESS
  );
}

export const getBalanceOfTokensAvailableMethod = async (
  user,
  tokenAddress
) => {
  const ret = await getBalanceOfTokensAvailable(
    process.env.PRIVATE_KEY_FOR_PVT_CHAIN,
    process.env.PRIVATE_CHAIN_PROVIDER_URL,
    process.env.CREDCHAIN_PVT_ADDRESS,
    user,
    tokenAddress
  );

  return ret;
}

