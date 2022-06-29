/* eslint-disable eqeqeq */
import { Avatar, AvatarGroup, Grid, Typography } from "@mui/material";
import _ from "lodash";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { LP_TOKENS } from "../../../config/LP_tokens";
import InfoLayout from "../InfoLayout";

const DetailPage = () => {
  const { address } = useParams();
  const [token, setToken] = useState();
  //   console.log("address=", address);
  useEffect(() => {
    if (address) {
      setToken(_.find(LP_TOKENS, (o) => o.address == address));
    }
  }, [address]);
  //   console.log("address==", token);
  return (
    <InfoLayout
      title={
        <Grid container direction="column">
          <Grid item>
            <Grid container alignItems="center" columnSpacing={2}>
              <Grid item>
                <AvatarGroup>
                  <Avatar
                    alt={token?.token0_name}
                    src={`/images/tokens/${token?.token0_address}.png`}
                  />
                  <Avatar
                    alt={token?.token1_name}
                    src={`/images/tokens/${token?.token1_address}.png`}
                  />
                </AvatarGroup>
              </Grid>
              <Grid item>
                <Typography variant="h4">{token?.name}</Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Typography>
              Dive deeper in the analytics of the {token?.name} liquidity pool.
            </Typography>
          </Grid>
        </Grid>
      }
    >
      detailPage
    </InfoLayout>
  );
};

export default DetailPage;
