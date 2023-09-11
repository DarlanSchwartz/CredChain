import { Router } from "express";
import {
  setAcceptedTokensMethod,
  releaseLockedTokensMethod,
  getBalanceOfTokensLockedByUserMethod,
  getUsedCollateralMethod,
  depositPvtMethod,
  requestCreditMethodMethod,
  payCreditMethod,
  getBalanceOfTokensAvailableMethod
} from "../controllers/contractInteractionController.js";

const contractRouter = Router();

contractRouter.post("/set-accepted-token", (req, res) => {
  const { tokenAddress, isAccepted } = req.body;
  setAcceptedTokensMethod(
    tokenAddress,
    isAccepted
  ).then((ret) => {
    res.send(ret);
  }
  ).catch((err) => {
    console.log(err);
    return res.status(500).send(err.message);
  });
});

contractRouter.post("/release-locked-tokens", (req, res) => {
  const { tokenAddress, recipient, user, amount } = req.body;
  releaseLockedTokensMethod(
    tokenAddress,
    recipient,
    user,
    amount
  ).then((ret) => {
    res.send(ret);
  }
  ).catch((err) => {
    console.log(err);
    return res.status(500).send(err.message);
  });
});

contractRouter.post("/get-balance-of-tokens-locked-by-user", (req, res) => {
  const { user, tokenAddress } = req.body;
  getBalanceOfTokensLockedByUserMethod(
    user,
    tokenAddress
  ).then((ret) => {
    res.send(ret);
  }
  ).catch((err) => {
    console.log(err);
    return res.status(500).send(err.message);
  });
});

contractRouter.post("/get-used-collateral", (req, res) => {
  const { user, tokenAddress } = req.body;
  getUsedCollateralMethod(
    user,
    tokenAddress
  ).then((ret) => {
    res.send(ret);
  }
  ).catch((err) => {
    console.log(err);
    return res.status(500).send(err.message);
  });
});

contractRouter.post("/deposit-pvt", (req, res) => {
  const {
    amount,
    token,
    user
  } = req.body;
  depositPvtMethod(
    amount,
    token,
    user
  ).then((ret) => {
    res.send(ret);
  }
  ).catch((err) => {
    console.log(err);
    return res.status(500).send(err.message);
  });
});

contractRouter.post("/request-credit", (req, res) => {
  const {
    creditOrderDto,
  } = req.body;
  requestCreditMethodMethod(
    creditOrderDto,
  ).then((ret) => {
    res.send(ret);
  }
  ).catch((err) => {
    console.log(err);
    return res.status(500).send(err.message);
  });
});

contractRouter.post("/pay-credit", (req, res) => {
  const {
    orderId,
    user,
    isPaid
  } = req.body;
  payCreditMethod(
    orderId,
    user,
    isPaid
  ).then((ret) => {
    res.send(ret);
  }
  ).catch((err) => {
    console.log(err);
    return res.status(500).send(err.message);
  });
});

contractRouter.post("/get-balance-of-tokens-available", (req, res) => {
  const { user, tokenAddress } = req.body;
  getBalanceOfTokensAvailableMethod(
    user,
    tokenAddress
  ).then((ret) => {
    res.send(ret);
  }
  ).catch((err) => {
    console.log(err);
    return res.status(500).send(err.message);
  });
});


export default contractRouter;