import { express } from "express";
const router = express.Router();
import {
  setAcceptedTokens,
  releaseLockedTokens,
  getBalanceOfTokensLockedByUser,
  getUsedCollateral,
  depositPvt,
  requestCredit,
  payCredit,
  getBalanceOfTokensAvailable
} from "../controllers/contractInteractionController";


router.post("/set-accepted-token", (req, res) => {
  const { tokenAddress, isAccepted } = req.body;
  setAcceptedTokens(
    tokenAddress,
    isAccepted
  ).then((ret) => {
    res.send(ret);
  }
  ).catch((err) => {
    console.log(err);
    throw err;
  });
});

router.post("/release-locked-tokens", (req, res) => {
  const { tokenAddress, recipient, user, amount } = req.body;
  releaseLockedTokens(
    tokenAddress,
    recipient,
    user,
    amount
  ).then((ret) => {
    res.send(ret);
  }
  ).catch((err) => {
    console.log(err);
    throw err;
  });
});

router.net("/get-balance-of-tokens-locked-by-user", (req, res) => {
  const { user, tokenAddress } = req.body;
  getBalanceOfTokensLockedByUser(
    user,
    tokenAddress
  ).then((ret) => {
    res.send(ret);
  }
  ).catch((err) => {
    console.log(err);
    throw err;
  });
});

router.get("/get-used-collateral", (req, res) => {
  const { user, tokenAddress } = req.body;
  getUsedCollateral(
    user,
    tokenAddress
  ).then((ret) => {
    res.send(ret);
  }
  ).catch((err) => {
    console.log(err);
    throw err;
  });
});

router.post("/deposit-pvt", (req, res) => {
  const {
    amount,
    token,
    user
  } = req.body;
  depositPvt(
    amount,
    token,
    user
  ).then((ret) => {
    res.send(ret);
  }
  ).catch((err) => {
    console.log(err);
    throw err;
  });
});

router.post("/request-credit", (req, res) => {
  const {
    creditOrderDto,
  } = req.body;
  requestCredit(
    creditOrderDto,
  ).then((ret) => {
    res.send(ret);
  }
  ).catch((err) => {
    console.log(err);
    throw err;
  });
});

router.post("/pay-credit", (req, res) => {
  const {
    orderId,
    user,
    isPaid
  } = req.body;
  payCredit(
    orderId,
    user,
    isPaid
  ).then((ret) => {
    res.send(ret);
  }
  ).catch((err) => {
    console.log(err);
    throw err;
  });
});

router.get("/get-balance-of-tokens-available", (req, res) => {
  const { user, tokenAddress } = req.body;
  getBalanceOfTokensAvailable(
    user,
    tokenAddress
  ).then((ret) => {
    res.send(ret);
  }
  ).catch((err) => {
    console.log(err);
    throw err;
  });
});


