import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Liquidity from ".";
import YourLiquidity from "./YourLiquidity";
import RemovePad from "./YourLiquidity/RemovePad";
import { ethers } from "ethers";
import { LP_TOKENS } from "../../config/LP_tokens";
import { minABI } from "../../config/TiFI_min_abi";
import * as liquidityActions from "../../store/actions";
import { TOKENS } from "../../config/token";
import _ from "lodash";

const LiquidityPage = () => {
  const { address, provider } = useSelector(
    ({ authReducers }) => authReducers.auth.auth
  );
  const { remove } = useSelector(
    ({ tokenReducers }) => tokenReducers.liquidity
  );
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getData = async () => {
      await getBalance();
    };
    if (address && provider) {
      getData();
    }
  }, [address, provider]);
  const getBalance = async () => {
    setLoading(true);
    let tmp = [];
    const signer = provider.getSigner();

    // let contract0 = new ethers.Contract(LP_TOKENS[0].address, minABI, signer);
    // let contract1 = new ethers.Contract(LP_TOKENS[1].address, minABI, signer);
    try {
      if (address != null) {
        await Promise.all(
          LP_TOKENS.map(async (item, index) => {
            let contract = new ethers.Contract(item.address, minABI, signer);
            const lp_val0 = await contract.balanceOf(address);
            const temp_val = lp_val0 / 10 ** 18;
            if (temp_val > 0) {
              tmp.push({
                balance: temp_val,
                token0Title: item.token0_name,
                token1Title: item.token1_name,
                address: item.address,
                token0Address:
                  TOKENS[
                    _.findIndex(TOKENS, (o) => o.title == item.token0_name)
                  ].address,
                token1Address:
                  TOKENS[
                    _.findIndex(TOKENS, (o) => o.title == item.token1_name)
                  ].address,
              });
            }
          })
        );
        // const lp_val1 = await contract1.balanceOf(address);
        // console.log("balance==", lp_val0 / 10 ** 18, lp_val1 / 10 ** 18);
        // let temp = [];
        console.log("tmp--", tmp);

        dispatch(liquidityActions.getLiquidityBalance(tmp));
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
    }
  };
  return (
    <div>
      {remove.balance ? <RemovePad /> : <YourLiquidity loading={loading} />}
      {/* <Liquidity /> */}
    </div>
  );
};

export default LiquidityPage;
