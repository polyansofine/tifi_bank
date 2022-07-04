/* eslint-disable eqeqeq */
import { Avatar, AvatarGroup, Box, Grid, Typography } from "@mui/material";
import _ from "lodash";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { LP_TOKENS } from "../../../config/LP_tokens";
import InfoLayout from "../InfoLayout";
import ItemDetail from "./ItemDetail";
import ItemDetailCard from "./ItemDetailCard";
import { motion } from "framer-motion/dist/framer-motion";
import TokenDetailTable from "./TokenDetailTable";
import TransactionTable from "./TransactionTable";
import { TOKENS } from "../../../config/token";
import InfoChart from "../../InfoChart";

const data = [
  {
    title: "Liquidity",
    volume: 45632,
    percent: 23,
  },
  {
    title: "Volume",
    volume: 45632,
    percent: -63,
  },
  {
    title: "Fees",
    volume: 45632,
    percent: 23,
  },
  {
    title: "Tx",
    volume: 45632,
    percent: 23,
  },
  {
    title: "Avg.Trade",
    volume: 45632,
    percent: 23,
  },
  {
    title: "Utilization",
    volume: 45632,
    percent: 23,
  },
];

const DetailPage = ({ info }) => {
  const { address } = useParams();
  const [token, setToken] = useState();
  //   console.log("address=", address);
  useEffect(() => {
    if (info === "Token") {
      if (address) {
        setToken(_.find(TOKENS, (o) => o.address == address));
      }
    } else {
      if (address) {
        setToken(_.find(LP_TOKENS, (o) => o.address == address));
      }
    }
  }, [address, info]);
  //   console.log("address==", token);
  return (
    <>
      {info === "Token" ? (
        <InfoLayout
          title={
            <Grid container justifyContent="space-between" alignItems="center">
              <Grid item>
                <Grid container direction="column">
                  <Grid item>
                    <Grid container alignItems="center" columnSpacing={2}>
                      <Grid item>
                        <Avatar
                          alt={token?.token0_name}
                          src={`/images/tokens/${token?.address}.png`}
                        />
                      </Grid>
                      <Grid item>
                        <Typography variant="h4">{token?.title}</Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item>
                    <Typography>
                      Dive deeper in the analytics of {token?.title} Token.
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item>
                <Grid container columnSpacing={2}>
                  <Grid item>
                    <Typography sx={{ color: "#727173" }}>Price</Typography>
                    <Typography>
                      $1.00 <span style={{ color: "red" }}>-0.47%</span>
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography sx={{ color: "#727173" }}>
                      Market Cap
                    </Typography>
                    <Typography>
                      $49368620 <span style={{ color: "green" }}>0.17%</span>
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          }
        >
          <Grid container spacing={4}>
            <Grid item md={6}>
              <ItemDetail>
                <InfoChart />
              </ItemDetail>
            </Grid>
            <Grid item md={6}>
              <ItemDetail>
                <InfoChart />
              </ItemDetail>
            </Grid>
          </Grid>
          <Grid container spacing={4} sx={{ mt: 2 }}>
            {[data[0], data[1], data[2]].map((item, index) => (
              <Grid item md={4} key={index}>
                <ItemDetailCard
                  title={item.title}
                  volume={item.volume}
                  percent={item.percent}
                />
              </Grid>
            ))}
          </Grid>
          {token && <TokenDetailTable token={token} />}
          <Typography variant="h5" sx={{ mt: 4, mb: 2 }}>
            Transactions
          </Typography>
          {token && <TransactionTable token={token} />}
        </InfoLayout>
      ) : (
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
                  Dive deeper in the analytics of the {token?.name} liquidity
                  pool.
                </Typography>
              </Grid>
            </Grid>
          }
        >
          <Grid container spacing={4} sx={{ mb: 4 }}>
            <Grid item md={6}>
              <ItemDetail>
                <InfoChart />
              </ItemDetail>
            </Grid>
            <Grid item md={6}>
              <ItemDetail>
                <InfoChart />
              </ItemDetail>
            </Grid>
          </Grid>
          <Grid container columnSpacing={4}>
            <Grid item md={6}>
              <ItemDetail>
                <Grid container alignItems="center" columnSpacing={1}>
                  <Grid item>
                    <Avatar
                      alt={token?.token0_name}
                      sx={{ width: 36, height: 36 }}
                      src={`/images/tokens/${token?.token0_address}.png`}
                    />
                  </Grid>
                  <Grid item>
                    <Typography variant="h5">16456 </Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant="h6">{token?.token0_name}</Typography>
                  </Grid>
                </Grid>
                <Grid container alignItems="center" sx={{ mt: 1 }}>
                  <Grid item>
                    <Typography>
                      1{token?.token0_name} = 0.00345{token?.token0_name}($304)
                    </Typography>
                  </Grid>
                </Grid>
              </ItemDetail>
            </Grid>
            <Grid item md={6}>
              <ItemDetail>
                <Grid container alignItems="center" columnSpacing={1}>
                  <Grid item>
                    <Avatar
                      alt={token?.token1_name}
                      sx={{ width: 36, height: 36 }}
                      src={`/images/tokens/${token?.token1_address}.png`}
                    />
                  </Grid>
                  <Grid item>
                    <Typography variant="h5">16456 </Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant="h6">{token?.token1_name}</Typography>
                  </Grid>
                </Grid>
                <Grid container alignItems="center" sx={{ mt: 1 }}>
                  <Grid item>
                    <Typography>
                      1{token?.token1_name} = 0.00345{token?.token1_name}($304)
                    </Typography>
                  </Grid>
                </Grid>
              </ItemDetail>
            </Grid>
          </Grid>
          <Grid container spacing={4} sx={{ mt: 2 }}>
            {data.map((item, index) => (
              <Grid item md={4} key={index}>
                <ItemDetailCard
                  title={item.title}
                  volume={item.volume}
                  percent={item.percent}
                />
              </Grid>
            ))}
          </Grid>
          {token && <TokenDetailTable token={token} />}
          <Typography variant="h5" sx={{ mt: 4, mb: 2 }}>
            Transactions
          </Typography>
          {token && <TransactionTable token={token} />}
        </InfoLayout>
      )}
    </>
  );
};

export default DetailPage;
