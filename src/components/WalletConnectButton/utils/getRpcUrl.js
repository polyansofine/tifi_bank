import sample from "lodash/sample";

// Array of available nodes to connect to
export const nodes = [
  "https://data-seed-prebsc-1-s1.binance.org:8545",
  "https://data-seed-prebsc-1-s1.binance.org:8545",
  "https://data-seed-prebsc-1-s1.binance.org:8545",
];
// export const nodes = process.env.REACT_APP_NODE_1
const getNodeUrl = () => {
  return sample(nodes);
};

export default getNodeUrl;
