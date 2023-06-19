  import React from "react";
  import logo from "../../assets/nevvy-logo.png";
  import tlo from "../../assets/tlo.png";
  import LogoutButtton from "../../components/ui/LogoutButtton";
  import AccountCircleIcon from "@mui/icons-material/AccountCircle";
  import AddIcon from "@mui/icons-material/Add";
  import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
  import LockIcon from "@mui/icons-material/Lock";
  import { Link } from "react-router-dom";
  import { Avatar, ListItemText } from "@mui/material";
  import { useSelector } from "react-redux";
  import Button from "@mui/material/Button";
  import Menu from "@mui/material/Menu";
  import MenuItem from "@mui/material/MenuItem";
  import ListItemIcon from "@mui/material/ListItemIcon";
  import Box from "@mui/material/Box";
  import Divider from "@mui/material/Divider";
  import IconButton from "@mui/material/IconButton";
  import Typography from "@mui/material/Typography";
  import Tooltip from "@mui/material/Tooltip";
  import PersonAdd from "@mui/icons-material/PersonAdd";
  import SettingsIcon from "@mui/icons-material/Settings";
  import LogoutIcon from "@mui/icons-material/Logout";
  import SearchIcon from "@mui/icons-material/Search";
  import { styled, alpha } from "@mui/material/styles";
  import InputBase from "@mui/material/InputBase";
  import SearchUser from "./SearchUser";



  const Navbar = () => {
    const user = useSelector((state) => state?.user.currentUser);
    console.log(user)

    const [anchorEl, setAnchorEl] = React.useState(null);
    const [searchValue, setSearchValue] = React.useState("");
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
      setAnchorEl(null);
    };

    const isAdmin = user?.isAdmin === true;


    return (
      <section className="navbar-wrapper">
        <div className="navbar-left">
          <Link to={"/"}>
            <div className="logo-container">
              <span className="neon-text">Nevvy</span>
            </div>
          </Link>
        </div>

        <div className="navbar-center">
          <img src={tlo} height="450px" alt="Tło" />
        </div>

        <div className="navbar-top">
          <div className="navbar-right">
            <SearchUser></SearchUser>
            <React.Fragment>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  textAlign: "center",
                }}
              >
                <Tooltip title="Ustawienia konta">
                  <IconButton
                    onClick={handleClick}
                    size="small"
                    sx={{ ml: 2 }}
                    aria-controls={open ? "account-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? "true" : undefined}
                  >
                    <Avatar sx={{ width: 26, height: 26, fontSize: "small", backgroundColor: "#1b0749", color: "#ffffff", border: "2px solid #8d66ad" }}>
                      {user?.username.slice(0, 2).toUpperCase()}
                    </Avatar>
                  </IconButton>
                </Tooltip>
              </Box>
              <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                PaperProps={{
                  elevation: 0,
                  sx: {
                    overflow: "visible",
                    filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                    mt: 1.5,
                    "& .MuiAvatar-root": {
                      width: 32,
                      height: 32,
                      ml: -0.5,
                      mr: 1,
                    },
                    "&:before": {
                      content: '""',
                      display: "none",
                    },
                    backgroundColor: "rgba(27, 7, 73, 0.9)",
                    border: "3px solid #8d66ad",
                    color: "white",
                  },
                }}
                transformOrigin={{ horizontal: "right", vertical: "top" }}
                anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
              >
                {user && user.username.includes(searchValue) && (
                  <Link to={`/user/${user?.username}`}>
                    <MenuItem>
                      <Avatar sx={{ width: 26, height: 26, fontSize: "small", backgroundColor: "#1b0749", color: "#ffffff", border: "2px solid #8d66ad" }}>
                        {user?.username.slice(0, 2).toUpperCase()}
                      </Avatar>
                      <ListItemText primary="Moje konto" />
                    </MenuItem>
                  </Link>
                )}
                <Divider />
                {user ? (
                  <Link to="/add-new">
                    <MenuItem>
                      <ListItemIcon>
                        <AddIcon fontSize="small" />
                      </ListItemIcon>
                      <ListItemText primary="Dodaj nowy post" />
                    </MenuItem>
                  </Link>
                ) : null}
                {isAdmin ? (
                  <Link to="/ReportPostsInfo">
                    <MenuItem>
                      <ListItemIcon>
                        <LockIcon fontSize="small" />
                      </ListItemIcon>
                      <ListItemText primary="Zgłoszone posty" />
                    </MenuItem>
                  </Link>
                ) : null}
                {user ? (
                  <Link to="/UserSettings">
                    <MenuItem>
                      <ListItemIcon>
                        <SettingsIcon fontSize="small" />
                      </ListItemIcon>
                      <ListItemText primary="Ustawienia" />
                    </MenuItem>
                  </Link>
                ) : null}
                <MenuItem>
                  <LogoutButtton />
                </MenuItem>
              </Menu>
            </React.Fragment>
          </div>
        </div>
      </section>
    );
  };

  export default Navbar;
