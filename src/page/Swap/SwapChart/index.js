import _ from "../../../utils/@lodash";
import { styled, ThemeProvider, useTheme, alpha } from "@mui/material/styles";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Typography from "@mui/material/Typography";
import { motion } from "framer-motion/dist/framer-motion";
import { memo, useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";
import { useDispatch, useSelector } from "react-redux";
import Box from "@mui/material/Box";
import * as chartActions from "../../../store/actions";
import { StyledPaper } from "../../../components/LiquidityComponents/StyledPaper";
// import moment from "moment";

const Root = styled("div")(({ theme }) => ({
  background: `linear-gradient(to right, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.main} 100%)`,
  color: theme.palette.primary.contrastText,
  padding: 20,
  width: "100%",
}));
const formatter = Intl.NumberFormat("en", { notation: "scientific" });
// const tabs = ['24H', '7D', '14D', '30D', '90D', '180D', '1Y', 'ALL'];
const tabs = [
  { title: "24H", day: 1, interval: "hourly" },
  { title: "7D", day: 7, interval: "hourly" },
  { title: "14D", day: 14, interval: "daily" },
  { title: "30D", day: 30, interval: "daily" },
  //   { title: "90D", day: 90, interval: "daily" },
  //   { title: "180D", day: 180, interval: "daily" },
  { title: "1Y", day: 365, interval: "daily" },
  { title: "ALL", day: "max", interval: "daily" },
];
const options = {
  chart: {
    type: "area",
    height: "300px",
    background: "transparent",
    toolbar: {
      show: false,
    },
    zoom: {
      enabled: true,
    },
  },
  theme: {
    mode: "dark",
  },
  dataLabels: {
    enabled: false,
  },
  xaxis: {
    type: "datetime",
    tooltip: {
      enabled: true,
    },
    axisBorder: {
      show: false,
    },
  },
  tooltip: {
    x: {
      format: "dd MMM yyyy",
    },
  },

  yaxis: {
    axisBorder: {
      show: false,
    },

    // decimalsInFloat: 2,
    labels: {
      show: true,
      align: "right",
      minWidth: 0,
      maxWidth: 200,
      style: {
        colors: [],
        fontSize: "12px",
        fontFamily: "Helvetica, Arial, sans-serif",
        fontWeight: 400,
        cssClass: "apexcharts-yaxis-label",
      },
      offsetX: 0,
      offsetY: 0,
      rotate: 0,
      formatter: (value) => formatter.format(value),
      // : (Math.round(value * 100) / 100).toLocaleString();
    },
  },
  markers: {
    size: 3,
    strokeWidth: 1.5,
    strokeOpacity: 1,
    strokeDashArray: 0,
    fillOpacity: 1,
    shape: "circle",
    radius: 1,
    hover: {
      size: 2,
    },
  },
  fill: {
    type: "solid",
    opacity: 0.7,
    gradient: {
      shadeIntensity: 0.4,
      opacityFrom: 1,
      opacityTo: 0.5,
      stops: [30, 100, 100],
    },
  },
  grid: {
    show: true,
    strokeDashArray: 3,
    position: "back",
    xaxis: {
      lines: {
        show: true,
      },
    },
    yaxis: {
      lines: {
        show: true,
      },
    },
    padding: {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
    },
  },
  stroke: {
    show: true,
    curve: "smooth",
    lineCap: "butt",
    width: 1.5,
    dashArray: 0,
  },
};

function SwapChart() {
  const theme = useTheme();
  const dispatch = useDispatch();
  const [tabValue, setTabValue] = useState(2);
  const [series, setSeries] = useState([]);
  const { token0, token1 } = useSelector(
    ({ tokenReducers }) => tokenReducers.token
  );

  const { prices, market_caps, total_volumes } = useSelector(
    ({ tokenReducers }) => tokenReducers.chart.chart
  );
  const [index, setIndex] = useState("prices");
  //   const contrastTheme = useSelector(
  //     selectContrastMainTheme(theme.palette.primary.main)
  //   );
  //   const { assetChart } = useSelector(({ coinList }) => coinList);

  _.setWith(options, "fill.colors", [theme.palette.success.main]);
  _.setWith(options, "markers.colors", [theme.palette.secondary.main]);
  _.setWith(options, "stroke.colors", [theme.palette.primary.contrastText]);
  _.setWith(options, "markers.strokeColors", [
    theme.palette.primary.contrastText,
  ]);
  _.setWith(
    options,
    "grid.borderColor",
    alpha(theme.palette.primary.contrastText, 0.3)
  );
  //   const data = _.merge({}, props.data);
  //   const assetChart = useSelector(
  //     ({ coinList }) => coinList.assetChart.assetChart
  //   );
  //   console.log(
  //     '🚀 -> file: index.js -> line 44 -> CoinChart -> assetChart',
  //     assetChart[0]
  //   );

  useEffect(() => {
    if (token0.title && token1.title) {
      dispatch(
        chartActions.getChartData(
          token1,
          token0,
          tabs[tabValue].day,
          `${tabs[tabValue].interval}`
        )
      );
    }
  }, [token0, token1, tabValue]);
  useEffect(() => {
    if (prices) {
      // const temp = assetChart[`${index}`];
      const tempSeries = [
        { name: "TiFi", data: index === "prices" ? prices : market_caps },
      ];
      setSeries(tempSeries);
    }
  }, [index, prices]);

  return (
    // <ThemeProvider theme={contrastTheme}>
    <StyledPaper text sx={{ p: 4 }}>
      <div>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <div>
            <Typography>
              {token0.title}Price Chart({token0.title}/{token1.title})
            </Typography>

            <Typography>
              <span
                style={{
                  cursor: "pointer",
                  fontWeight: index === "prices" ? 600 : 100,
                }}
                onClick={() => setIndex("prices")}
              >
                {" "}
                Price
              </span>{" "}
              |{" "}
              <span
                style={{
                  cursor: "pointer",
                  fontWeight: index === "market_caps" ? 600 : 100,
                }}
                onClick={() => setIndex("market_caps")}
              >
                MarketCap
              </span>
            </Typography>
          </div>
        </motion.div>

        <div>
          <Tabs
            value={tabValue}
            onChange={(event, value) => setTabValue(value)}
            indicatorColor="secondary"
            textColor="inherit"
            variant="scrollable"
            scrollButtons={false}
            // className="w-full -mx-4 min-h-40"
            // classes={{
            //   indicator: "flex justify-center bg-transparent w-full h-full",
            // }}
            TabIndicatorProps={{
              children: (
                <Box
                  sx={{ bgcolor: "text.disabled" }}
                  //   className="w-full h-full rounded-full opacity-20"
                />
              ),
            }}
          >
            {tabs.map((key) => (
              <Tab key={key.title} disableRipple label={key.title} />
            ))}
          </Tabs>
        </div>
      </div>
      {/* <div className="container relative h-200 sm:h-256 pb-16"> */}
      <ReactApexChart
        options={options}
        series={series}
        type={options.chart.type}
        height={options.chart.height}
      />
      {/* </div> */}
    </StyledPaper>
    // </ThemeProvider>
  );
}

export default memo(SwapChart);
