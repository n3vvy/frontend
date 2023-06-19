import React, { useState, useEffect } from "react";
import axios from "axios";
import SearchIcon from "@mui/icons-material/Search";
import { Link } from "react-router-dom";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import { userRequest } from "../../services/requestMethods";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  height: "25px",
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));



const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(0, 0, 0, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    height: "25px",
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

const ScrollableList = styled("div")(({ theme, hasValue }) => ({
  maxHeight: "150px",
  overflowY: "auto",
  marginTop: "8px",
  border: hasValue ? `2px solid #8d66ad` : "none",
  borderRadius: "10px",
  borderTop: "none",
  padding: hasValue ? theme.spacing(1) : 0,
}));

const UserName = styled("h2")({
    color: "#8d66ad",
    fontSize: "16px", // Zmniejszona wartość
  });

const SearchUser = () => {
  const [searchValue, setSearchValue] = useState("");
  const [users, setUsers] = useState([]);
  const [originalUsers, setOriginalUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const result = await userRequest.get("/users/all-users");
      setOriginalUsers(result.data);
    };
    fetchUsers();
  }, []);

  const handleSearch = (e) => {
    setSearchValue(e.target.value);
    if (e.target.value !== "") {
      const filteredUsers = originalUsers.filter((user) =>
        user.username.toLowerCase().includes(e.target.value.toLowerCase())
      );
      setUsers(filteredUsers);
    } else {
      setUsers([]);
    }
  };

  return (
    <Search style={{ backgroundColor: "#1b0749", border: "3px solid #8d66ad" }}>
      <SearchIconWrapper>
        <SearchIcon />
      </SearchIconWrapper>
      <StyledInputBase
        placeholder="Wyszukaj.."
        inputProps={{ "aria-label": "search" }}
        value={searchValue}
        onChange={handleSearch}
      />
      <ScrollableList hasValue={searchValue !== ""}>
        {searchValue &&
          users.map((user) => (
            <Link to={`/users/${user.username}/${user._id}`}>
            <div key={user._id}>
              <UserName>{user.username}</UserName>
            </div>
            </Link>
          ))}
      </ScrollableList>
    </Search>
  );
};

export default SearchUser;
