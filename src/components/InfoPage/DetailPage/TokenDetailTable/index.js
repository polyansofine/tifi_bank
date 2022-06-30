import {
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from "@mui/material";
import React from "react";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
const TokenDetailTable = ({ token }) => {
  return (
    <div>
      <Typography variant="h5" sx={{ mt: 4, mb: 2 }}>
        Information
      </Typography>
      <TableContainer sx={{ border: "1px solid #445760", borderRadius: 4 }}>
        <Table
          sx={{
            minWidth: 750,
          }}
          aria-labelledby="tableTitle"
        >
          <TableBody>
            {/* if you don't need to support IE11, you can replace the `stableSort` call with:
                 rows.slice().sort(getComparator(order, orderBy)) */}

            <TableRow
              hover
              // aria-checked={isItemSelected}
              tabIndex={-1}
              sx={{ cursor: "pointer" }}
              // selected={isItemSelected}
            >
              {/* <TableCell padding="checkbox">
                        <Checkbox
                          color="primary"
                          checked={isItemSelected}
                          inputProps={{
                            "aria-labelledby": labelId,
                          }}
                        />
                      </TableCell> */}
              <TableCell
                component="th"
                scope="row"
                padding="none"
                sx={{
                  color: "#cad2c5",
                  px: 2,
                  py: 1,
                  "&.MuiTableCell-root": {
                    borderBottom: "1px solid #445760",
                  },
                }}
              >
                {token?.name} Address
              </TableCell>
              <TableCell
                sx={{
                  color: "#cad2c5",
                  "&.MuiTableCell-root": {
                    borderBottom: "1px solid #445760",
                  },
                }}
              >
                {token?.token0_name} Address
              </TableCell>
              <TableCell
                sx={{
                  color: "#cad2c5",
                  "&.MuiTableCell-root": {
                    borderBottom: "1px solid #445760",
                  },
                }}
              >
                {token?.token1_name} Address
              </TableCell>
            </TableRow>

            <TableRow
              style={{
                height: 53,
              }}
            >
              <TableCell sx={{ fontSize: 12 }}>
                <a
                  href={`https://testnet.bscscan.com/token/${token?.address}`}
                  target="_blank"
                  rel="noreferrer"
                  style={{ textDecoration: "none", color: "#914AC0" }}
                >
                  <Grid container alignItems="center">
                    <Grid item>
                      <Typography sx={{ fontSize: 12 }}>
                        {token?.address}
                      </Typography>
                    </Grid>
                    <Grid item>
                      <ExitToAppIcon sx={{ fontSize: 16, color: "#cad2c5" }} />
                    </Grid>
                  </Grid>
                </a>
              </TableCell>
              <TableCell sx={{ color: "#914AC0" }}>
                <a
                  href={`https://testnet.bscscan.com/token/${token?.token0_address}`}
                  target="_blank"
                  rel="noreferrer"
                  style={{ textDecoration: "none", color: "#914AC0" }}
                >
                  <Grid container alignItems="center">
                    <Grid item>
                      <Typography sx={{ fontSize: 12 }}>
                        {token?.token0_address}
                      </Typography>
                    </Grid>
                    <Grid item>
                      <ExitToAppIcon sx={{ fontSize: 16, color: "#cad2c5" }} />
                    </Grid>
                  </Grid>
                </a>
              </TableCell>
              <TableCell sx={{ color: "#914AC0", fontSize: 12 }}>
                <a
                  href={`https://testnet.bscscan.com/token/${token?.token1_address}`}
                  target="_blank"
                  rel="noreferrer"
                  style={{ textDecoration: "none", color: "#914AC0" }}
                >
                  <Grid container alignItems="center">
                    <Grid item>
                      <Typography sx={{ fontSize: 12 }}>
                        {token?.token1_address}
                      </Typography>
                    </Grid>
                    <Grid item>
                      <ExitToAppIcon sx={{ fontSize: 16, color: "#cad2c5" }} />
                    </Grid>
                  </Grid>
                </a>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default TokenDetailTable;
