import React, { useState, useEffect } from "react";
import axios from "axios";
import SearchIcon from "@mui/icons-material/Search";
import { Link } from "react-router-dom";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import { userRequest } from "../../services/requestMethods";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: "10px 10px 0 0 ",
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  height: "31.25px",
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
    height: "31.25px",
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
  marginTop: "4px",
  border: hasValue ? `4px solid #8d66ad` : "none",
  borderRadius: "0 0 10px 10px",
  borderTop: "none",
  padding: hasValue ? theme.spacing(1) : 0,
  backgroundColor: "#1b0749",
}));

const UserName = styled("h2")({
  color: "#8d66ad",
  fontSize: "18px",
});

const NoUsers = styled("div")(({ theme }) => ({
  color: "#8d66ad",
  fontSize: "16px",
  textAlign: "center",
  marginTop: "16px",
  fontWeight: "bold",
}));

const UserContainer = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  marginBottom: "8px",
}));

const Avatar = styled("div")(({ theme }) => ({
  backgroundColor: "#1b0749",
  color: "#8d66ad",
  border: "2px solid #8d66ad",
  width: "30px",
  height: "30px",
  borderRadius: "50%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  marginRight: "8px",
}));

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

  const handleClear = () => {
    setSearchValue("");
    setUsers([]);
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
      {searchValue && (
        <button
          onClick={handleClear}
          style={{
            position: "absolute",
            right: "10px",
            top: "50%",
            transform: "translateY(-50%)",
            backgroundColor: "transparent",
            border: "none",
            color: "#8d66ad",
            cursor: "pointer",
            fontSize: "16px",
            display: "flex",
            alignItems: "center",
          }}
        >
          X
        </button>
      )}
      <ScrollableList hasValue={searchValue !== ""}>
        {searchValue && users.length === 0 && (
          <NoUsers>Brak użytkownika o podanej nazwie</NoUsers>
        )}
        {users.map((user) => (
          <Link to={`/users/${user.username}/${user._id}`} key={user._id}>
            <UserContainer>
              <Avatar>{user.username.slice(0, 2)}</Avatar>
              <UserName>{user.username}</UserName>
            </UserContainer>
          </Link>
        ))}
      </ScrollableList>
    </Search>
  );
};

export default SearchUser;
