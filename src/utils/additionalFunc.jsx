import { useSelector } from "react-redux";
export const maskMemberId = (memberId) => {
  if (!memberId || memberId.length <= 2) {
    return memberId;
  }

  const firstChar = memberId[0];
  const lastChar = memberId[memberId.length - 1];
  const maskedChars = "*".repeat(memberId.length - 2);

  return `${firstChar}${maskedChars}${lastChar}`;
};

export const maskWalletAddress = (walletAddress) => {
  if (!walletAddress || walletAddress.length < 10) {
    return walletAddress;
  }

  const lastFourChars = walletAddress.slice(-4);
  const maskedChars = "**** ".repeat(2);

  return `${maskedChars}${lastFourChars}`;
};

export const convertUSDToBNB = async (usdAmount) => {
  try {
    // Fetch current BNB price in USD from CoinGecko
    // const response = await axios.get(
    //   "https://api.coingecko.com/api/v3/simple/price?ids=binancecoin&vs_currencies=usd"
    // );

    const bnbPriceInUSD = 697.65;

    const bnbAmount = usdAmount / bnbPriceInUSD;

    return bnbAmount;
  } catch (error) {
    console.error("Error during conversion:", error);
  }
};

export const roleEnum = {
  ADMIN: "Admin",
  USER: "User",
  PROMOTER: "Promoter",
};

export const FindAdmin = (role) => {
  const userInfo = useSelector((state) => state.userInfo.userInfo);
  return userInfo?.role === role ? true : false;
};

import axios from "axios";

const convertUSDToUSDT = async (amountInUSD) => {
  try {
    // Fetch the current price of USDT in USD from CoinGecko API
    const response = await axios.get(
      "https://api.coingecko.com/api/v3/simple/price",
      {
        params: {
          ids: "tether",
          vs_currencies: "usd",
        },
      }
    );

    // Get the price of 1 USDT in USD
    const priceInUSD = response.data.tether.usd;

    // Convert the USD amount to USDT
    const amountInUSDT = amountInUSD / priceInUSD; // Since 1 USDT is roughly 1 USD
    return amountInUSDT;
  } catch (error) {
    console.error("Error fetching USDT price:", error);
    throw new Error("Failed to fetch USDT price");
  }
};

export default convertUSDToUSDT;

export const maskTwoLetters = (walletAddress) => {
  if (!walletAddress || walletAddress.length < 8) {
    return walletAddress;
  }

  const firstFourChars = walletAddress.slice(0, 4);
  const lastFourChars = walletAddress.slice(-4);
  const maskedChars = "*".repeat(4);

  return `${firstFourChars}${maskedChars}${lastFourChars}`;
};

export const getMoneySymbol = () => {
  return "₹";
};
