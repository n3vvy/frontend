import React, { useState } from "react";
import { makeStyles } from "@mui/styles";
import IconButton from "@mui/material/IconButton";
import WarningIcon from "@mui/icons-material/Warning";
import MenuItem from "@mui/material/MenuItem";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import { useSelector } from "react-redux";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import CircularProgress from "@mui/material/CircularProgress";
import Checkbox from "@mui/material/Checkbox";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import Typography from "@mui/material/Typography";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  menuItem: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  checkboxLabel: {
    color: "#8d66ad",
    fontWeight: "bold",
    textShadow: "1px 1px 10px #8d66ad",
  },
  warningIcon: {
    marginRight: theme.spacing(1),
  },
  otherTextField: {
    marginTop: theme.spacing(2),
  },
  dialogTitle: {
    backgroundColor: "#1b0749",
    color: "#8d66ad",
    fontWeight: "bold",
    textShadow: "1px 1px 10px #8d66ad",
  },
  dialogContent: {
    backgroundColor: "#1b0749",
  },
  otherReasonInput: {
    "& label": {
      color: "#8d66ad",
      fontWeight: "bold",
      textShadow: "1px 1px 10px #8d66ad",
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "#8d66ad",
      },
      "&:hover fieldset": {
        borderColor: "#8d66ad",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#8d66ad",
      },
      "& input": {
        color: "#8d66ad",
        fontWeight: "bold",
      },
    },
  },
  dialogActions: {
    backgroundColor: "#1b0749",
  },
  cancelButton: {
    color: "#8d66ad",
    fontWeight: "bold",
    textShadow: "1px 1px 10px #8d66ad",
  },
  customButton: {
    color: "#8d66ad",
    fontWeight: "bold",
    textShadow: "1px 1px 10px #8d66ad",
    border: "2px solid #8d66ad",
  },
  successDialog: {
    backgroundColor: "#1b0749",
  },
  successDialogTitle: {
    backgroundColor: "#1b0749",
    color: "#8d66ad",
    fontWeight: "bold",
    textShadow: "1px 1px 10px #8d66ad",
  },
  successDialogText: {
    color: "#8d66ad",
    margin: theme.spacing(2),
  },
  successDialogActions: {
    backgroundColor: "#1b0749",
  },
}));

const createReport = async (reportData) => {
  try {
    const response = await axios.post("https://nevvy.herokuapp.com/api/report/", reportData);
    return response.data;
  } catch (error) {
    console.error("Błąd podczas tworzenia zgłoszenia:", error);
    throw error;
  }
};

const ReportedPosts = ({postId}) => {
  const user = useSelector((state) => state?.user.currentUser);
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedReason, setSelectedReason] = useState("");
  // const [userID, setUserID] = useState(user?._id);
  const [otherReason, setOtherReason] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const reasons = ["Naruszenie regulaminu", "Spam", "Nieodpowiednia treść", "Inne"];

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedReason("");
    setOtherReason("");
    setSuccessMessage("");
    setErrorMessage("");
  };

  const handleSubmit = async () => {
    setLoading(true);

    const reportData = {
      post_id: postId,
      reporter_id: user?._id,
      report_reason: selectedReason != "Inne" ? selectedReason: otherReason,
      report_details: selectedReason === "Inne" ? otherReason : "",
    };

    try {
      await createReport(reportData);
      setSuccessMessage("Zgłoszenie zostało wysłane pomyślnie do Administracji forum!");
    } catch (error) {
      setErrorMessage("Wystąpił błąd podczas wysyłania zgłoszenia. Spróbuj ponownie później.");
    }

    setLoading(false);
    setOpen(false);
    setSelectedReason("");
    setOtherReason("");
  };

  const handleReasonSelect = (reason) => {
    setSelectedReason(reason);
    if (reason !== "Inne") {
      setOtherReason("");
    }
  };

  return (
    <>
      <MenuItem onClick={handleOpen} disableRipple className={classes.menuItem}>
        <WarningIcon className={classes.warningIcon} />
        Zgłoś post
      </MenuItem>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle className={classes.dialogTitle}>Zgłoś post</DialogTitle>
        <DialogContent className={classes.dialogContent}>
          <FormControl component="fieldset">
            {reasons.map((reason) => (
              <FormControlLabel
                key={reason}
                control={
                  <Checkbox
                    checked={selectedReason === reason}
                    onChange={() => handleReasonSelect(reason)}
                    name={reason}
                    color="primary"
                    sx={{
                      "&.Mui-checked": {
                        color: "#8d66ad",
                      },
                    }}
                  />
                }
                label={<Typography className={classes.checkboxLabel}>{reason}</Typography>}
              />
            ))}
          </FormControl>
          {selectedReason === "Inne" && (
            <TextField
              className={`${classes.otherTextField} ${classes.otherReasonInput}`}
              autoFocus
              margin="dense"
              id="other-reason"
              label="Inny powód"
              type="text"
              fullWidth
              value={otherReason}
              onChange={(e) => setOtherReason(e.target.value)}
            />
          )}
        </DialogContent>
        <DialogActions className={classes.dialogActions}>
          {loading ? (
            <CircularProgress />
          ) : (
            <>
              <Button onClick={handleClose} className={classes.cancelButton}>
                Anuluj
              </Button>
              <Button
                onClick={handleSubmit}
                color="primary"
                disabled={selectedReason === "" && otherReason === ""}
              >
                Zgłoś
              </Button>
            </>
          )}
        </DialogActions>
      </Dialog>
      <Dialog open={successMessage !== "" || errorMessage !== ""} onClose={handleClose}>
        <DialogTitle className={classes.successDialogTitle}>
          {successMessage !== "" ? "Sukces!" : "Błąd!"}
        </DialogTitle>
        <DialogContent className={classes.successDialog}>
          <p className={classes.successDialogText}>
            {successMessage !== "" ? successMessage : errorMessage}
          </p>
        </DialogContent>
        <DialogActions className={classes.successDialogActions}>
          <Button onClick={handleClose} className={classes.cancelButton}>
            Zamknij
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ReportedPosts;
