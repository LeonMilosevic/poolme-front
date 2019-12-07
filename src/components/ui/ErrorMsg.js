import React from "react";
// material ui
import { makeStyles } from "@material-ui/core/styles";
import Snackbar from "@material-ui/core/Snackbar";
import SnackbarContent from "@material-ui/core/SnackbarContent";

const useStyles = makeStyles(theme => ({
  close: {
    padding: theme.spacing(0.5)
  },
  snackbar: {
    [theme.breakpoints.down("xs")]: {
      bottom: 90
    }
  },
  root: {
    background: "red"
  }
}));

const ErrorMsg = props => {
  const classes = useStyles();
  const [open] = React.useState(false);

  return (
    <div>
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        open={props.msg === "" ? open : true}
        className={classes.snackbar}
      >
        <SnackbarContent
          style={{
            backgroundColor: "#ff0000"
          }}
          message={<span id="client-snackbar">{props.msg}</span>}
        />
      </Snackbar>
    </div>
  );
};

export default ErrorMsg;
