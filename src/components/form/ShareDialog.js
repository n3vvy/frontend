import React, { useState, useEffect } from "react";
import { makeStyles } from "@mui/styles";
import IconButton from "@mui/material/IconButton";
import ShareIcon from "@mui/icons-material/Share";
import MenuItem from "@mui/material/MenuItem";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import TextField from "@mui/material/TextField";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import CircularProgress from "@mui/material/CircularProgress";

const useStyles = makeStyles((theme) => ({
  menuItem: {
    display: "flex",
    alignItems: "center",
  },
  shareIcon: {
    marginRight: theme.spacing(1),
  },
}));

const ShareDialog = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [shortenedUrl, setShortenedUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const url = window.location.href;

  useEffect(() => {
    const getShortenedUrl = async () => {
      setLoading(true);
      try {
        const BITLY_ACCESS_TOKEN = '8c090088321f916a4ec2afcf9a5b82a28696703a'; // Replace with your Bitly API access token
        console.log('URL:', url); // Log the URL to be shortened
        console.log('Bitly Access Token:', BITLY_ACCESS_TOKEN); // Log the Bitly Access Token
        const response = await fetch(`https://api-ssl.bitly.com/v4/shorten`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${BITLY_ACCESS_TOKEN}`,
          },
          body: JSON.stringify({ long_url: url }),
        });
  
        const data = await response.json();
        setShortenedUrl(data.link);
      } catch (error) {
        console.error('Error fetching shortened URL:', error);
      }
      setLoading(false);
    };
  
    if (open && !shortenedUrl) {
      getShortenedUrl();
    }
  }, [open, url, shortenedUrl]);
  

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setCopied(false);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(shortenedUrl);
    setCopied(true);
  };

  return (
    <>
      <MenuItem onClick={handleOpen} disableRipple className={classes.menuItem}>
        <ShareIcon className={classes.shareIcon} />
        Udostępnij
      </MenuItem>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Udostępnij link do strony</DialogTitle>
        <DialogContent>
          {loading ? (
            <CircularProgress />
          ) : (
            <TextField
              autoFocus
              margin="dense"
              id="url"
              label="URL"
              type="text"
              fullWidth
              value={shortenedUrl}
              InputProps={{
                readOnly: true,
                endAdornment: (
                  <IconButton edge="end" onClick={handleCopy}>
                    <FileCopyIcon />
                  </IconButton>
                ),
              }}
            />
          )}
        </DialogContent>
        <DialogActions>
          {copied && (
            <span style={{ marginRight: "auto" }}>Link skopiowany!</span>
          )}
          <Button onClick={handleClose} color="primary">
            Zamknij
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ShareDialog;
