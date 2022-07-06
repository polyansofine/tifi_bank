import * as React from "react";
import PropTypes from "prop-types";
import { alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

import { visuallyHidden } from "@mui/utils";
import { Avatar, AvatarGroup, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { LP_TOKENS } from "../../../config/LP_tokens";
import { TOKENS } from "../../../config/token";

function createData(token, calories, fat, carbs, protein) {
  return {
    token,

    calories,
    fat,
    carbs,
    protein,
  };
}

const lp_tokens = [
  createData(LP_TOKENS[0], 305, 3.7, 67, 4.3),
  createData(LP_TOKENS[1], 452, 25.0, 51, 4.9),
  // createData(LP_TOKENS[1], 262, 16.0, 24, 6.0),
  // createData(LP_TOKENS[0], 159, 6.0, 24, 4.0),
  // createData(LP_TOKENS[0], 356, 16.0, 49, 3.9),
  // createData(LP_TOKENS[0], 408, 3.2, 87, 6.5),
  // createData(LP_TOKENS[1], 237, 9.0, 37, 4.3),
  // createData(LP_TOKENS[0], 375, 0.0, 94, 0.0),
  // createData(LP_TOKENS[1], 518, 26.0, 65, 7.0),
  // createData(LP_TOKENS[0], 392, 0.2, 98, 0.0),
  // createData(LP_TOKENS[0], 318, 0, 81, 2.0),
  // createData(LP_TOKENS[0], 360, 19.0, 9, 37.0),
  // createData(LP_TOKENS[0], 437, 18.0, 63, 4.0),
];
const tokens = [
  createData(TOKENS[0], 305, 3.7, 67, 4.3),
  createData(TOKENS[1], 452, 25.0, 51, 4.9),
  createData(TOKENS[2], 262, 16.0, 24, 6.0),
  // createData(TOKENS[1], 159, 6.0, 24, 4.0),
  // createData(TOKENS[0], 356, 16.0, 49, 3.9),
  // createData(TOKENS[0], 408, 3.2, 87, 6.5),
  // createData(TOKENS[1], 237, 9.0, 37, 4.3),
  // createData(TOKENS[0], 375, 0.0, 94, 0.0),
  // createData(TOKENS[1], 518, 26.0, 65, 7.0),
  // createData(TOKENS[2], 392, 0.2, 98, 0.0),
  // createData(TOKENS[0], 318, 0, 81, 2.0),
  // createData(TOKENS[2], 360, 19.0, 9, 37.0),
  // createData(TOKENS[0], 437, 18.0, 63, 4.0),
];

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  {
    id: "name",
    numeric: false,
    disablePadding: true,
    label: "Name",
  },
  {
    id: "calories",
    numeric: true,
    disablePadding: false,
    label: "TVL",
  },
  {
    id: "fat",
    numeric: true,
    disablePadding: false,
    label: "Volume 1d",
  },
  {
    id: "carbs",
    numeric: true,
    disablePadding: false,
    label: "Fees 1d",
  },
  {
    id: "protein",
    numeric: true,
    disablePadding: false,
    label: "APY",
  },
];

function EnhancedTableHead(props) {
  const { order, orderBy, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {/* <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              "aria-label": "select all desserts",
            }}
          />
        </TableCell> */}
        {headCells.map((headCell) => (
          <TableCell
            sx={{
              color: "#cad2c5",
              pl: 2,
              "&.MuiTableCell-root": {
                borderBottom: "1px solid #445760",
              },
            }}
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            // align="center"
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              //   active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              <Typography>{headCell.label}</Typography>
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  //   numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  //   onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  //   rowCount: PropTypes.number.isRequired,
};

const EnhancedTableToolbar = (props) => {
  const { numSelected } = props;

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            ),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: "1 1 100%" }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          sx={{ flex: "1 1 100%" }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          Top pools
        </Typography>
      )}
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

export default function InfoTable({ info }) {
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("calories");
  //   const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const navigate = useNavigate();
  const [rows, setRows] = React.useState(info === "Token" ? tokens : lp_tokens);
  // console.log("rows==", rows);
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };
  React.useEffect(() => {
    setRows(info === "Token" ? tokens : lp_tokens);
  }, [info]);

  //   const handleSelectAllClick = (event) => {
  //     if (event.target.checked) {
  //       const newSelecteds = rows.map((n) => n.name);
  //       setSelected(newSelecteds);
  //       return;
  //     }
  //     setSelected([]);
  //   };

  const handleClick = (event, token, info) => {
    if (info === "Token") {
      navigate(`../token/${token.address}`);
    } else {
      navigate(`../pool/${token.address}`);
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  //   const isSelected = (name) => selected.indexOf(name) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  return (
    <Box sx={{ width: "100%", mt: 4 }}>
      {/* <Paper sx={{ width: "100%", mb: 2,backgroud:'' }}> */}
      <EnhancedTableToolbar />
      <TableContainer sx={{ border: "1px solid #445760", borderRadius: 4 }}>
        <Table
          sx={{
            minWidth: 750,
          }}
          aria-labelledby="tableTitle"
        >
          <EnhancedTableHead
            // numSelected={selected.length}
            order={order}
            orderBy={orderBy}
            // onSelectAllClick={handleSelectAllClick}
            onRequestSort={handleRequestSort}
            rowCount={rows.length}
          />
          <TableBody>
            {/* if you don't need to support IE11, you can replace the `stableSort` call with:
                 rows.slice().sort(getComparator(order, orderBy)) */}
            {stableSort(rows, getComparator(order, orderBy))
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => {
                // const isItemSelected = isSelected(row.name);
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <TableRow
                    hover
                    onClick={(event) => handleClick(event, row.token, info)}
                    role="checkbox"
                    // aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={index}
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
                      id={labelId}
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
                      <Grid container alignItems="center" columnSpacing={2}>
                        <Grid item>
                          {info === "Token" ? (
                            <Avatar
                              alt={row.token.title}
                              src={`/images/tokens/${row.token.address}.png`}
                            />
                          ) : (
                            <AvatarGroup>
                              <Avatar
                                alt={row.token.token0_name}
                                src={`/images/tokens/${row.token.token0_address}.png`}
                              />
                              <Avatar
                                alt={row.token1_name}
                                src={`/images/tokens/${row.token.token1_address}.png`}
                              />
                            </AvatarGroup>
                          )}
                        </Grid>
                        <Grid item>
                          {info === "Token" ? (
                            <Typography>{row.token.title}</Typography>
                          ) : (
                            <Typography>
                              {row.token.token0_name}/{row.token.token1_name}
                            </Typography>
                          )}
                        </Grid>
                      </Grid>
                    </TableCell>
                    <TableCell
                      sx={{
                        color: "#cad2c5",
                        "&.MuiTableCell-root": {
                          borderBottom: "1px solid #445760",
                        },
                      }}
                      align="right"
                    >
                      {row.calories}
                    </TableCell>
                    <TableCell
                      sx={{
                        color: "#cad2c5",
                        "&.MuiTableCell-root": {
                          borderBottom: "1px solid #445760",
                        },
                      }}
                      align="right"
                    >
                      {row.fat}
                    </TableCell>
                    <TableCell
                      sx={{
                        color: "#cad2c5",
                        "&.MuiTableCell-root": {
                          borderBottom: "1px solid #445760",
                        },
                      }}
                      align="right"
                    >
                      {row.carbs}
                    </TableCell>
                    <TableCell
                      sx={{
                        color: "#cad2c5",
                        "&.MuiTableCell-root": {
                          borderBottom: "1px solid #445760",
                        },
                      }}
                      align="right"
                    >
                      {row.protein}
                    </TableCell>
                  </TableRow>
                );
              })}
            {emptyRows > 0 && (
              <TableRow
                style={{
                  height: 53 * emptyRows,
                }}
              >
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        sx={{ color: "#cad2c5" }}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      {/* </Paper> */}
    </Box>
  );
}
