import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { searchedPost } from '../service/search';
import { logout } from '../service/logout';
import { currentUser } from '../service/current_user';

const Nav = styled.nav`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  background-color: blue;
  padding: 10px;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const Logo = styled.div`
  color: #fff;
  font-size: 24px;
  font-weight: bold;
  cursor: pointer;
`;

const NavigationItems = styled.ul`
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
  align-items: center;
  gap: 5px;

  @media (max-width: 768px) {
    margin-top: 10px;
  }
`;

const NavigationItem = styled.li`
  margin-left: 15px;

  @media (max-width: 768px) {
    margin: 5px 0;
  }
`;

const NavLink = styled(Link)`
  color: #fff;
  text-decoration: none;
`;

const ProfileIcon = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #333;
  font-weight: bold;
  cursor: pointer;
  position: relative;

  &:after {
    content: '\u25BE';
    font-size: 14px;
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    display: none;
  }

  &:hover {
    background-color: #eee;
    &:after {
      display: block;
    }
  }
`;

const DropdownMenu = styled.div`
  position: absolute;
  top: 60px;
  right: 22%;
  display: ${(props) => (props.visible ? 'flex' : 'none')};
  background-color: #fff;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.2);
  border-radius: 5px;
  padding: 10px;
  flex-direction: column;
  gap: 5px;
`;

const DropdownButton = styled.button`
  display: block;
  width: 100%;
  padding: 8px;
  text-align: left;
  border: none;
  background-color: transparent;
  cursor: pointer;

  &:hover {
    background-color: #f2f2f2;
  }
`;

const SearchBar = styled.input`
  padding: 8px;
  border: none;
  border-radius: 5px;
  width: 200px;

  @media (max-width: 768px) {
    margin-top: 10px;
    width: 100%;
  }
`;

const LogoutButton = styled.button`
  background: none;
  color: white;
  border: none;
  font-size: 16px;
  cursor: pointer;
`;

const Navbar = ({ setSearchedPosts}) => {
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState("");
  const navigate = useNavigate();

  async function fetchData(params) {
    setSearchedPosts(await searchedPost(params))
  }

  async function fetchUser() {
    setUser(await currentUser());
  }
  useEffect(() => {
    fetchUser();
  }, [])

  useEffect(() => {
    if (user.id) {
      setIsLoggedIn(true);
    }
  })

  const handleChange = (e) => {
    const params = {
      query: e.target.value
    }
    fetchData(params);
  }

  const handleProfileClick = () => {
    setDropdownVisible(!isDropdownVisible);
  };

  function handleLogout() {
    logout();
    navigate("/");
  }

  function handleProfile() {
    navigate("/user/profile");
  }

  function  handleSubscription () {
    navigate("/subscription")
  }

  function goHome () {
    navigate("/");
  }

  return (
    <Nav>
      <Logo onClick={goHome}>Blogs</Logo>
      <SearchBar type="text" placeholder="Search..." onChange={handleChange} />
      <NavigationItems>
        {isLoggedIn && <NavigationItem>
          <NavLink to="/new-blog">Write</NavLink>
        </NavigationItem>}
        {!isLoggedIn && <NavigationItem>
          <NavLink to="/login">Login</NavLink>
        </NavigationItem>}
        {!isLoggedIn && <NavigationItem>
          <NavLink to="/signup">Signup</NavLink>
        </NavigationItem>}
        {isLoggedIn && <NavigationItem>
          <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
        </NavigationItem>}
        <NavigationItem>
          <ProfileIcon onClick={handleProfileClick}>U</ProfileIcon>
          <DropdownMenu visible={isDropdownVisible}>
            {isLoggedIn && <LogoutButton onClick={() => handleProfile()} style={{ color: "#000" }}>Profile</LogoutButton>}
            {!isLoggedIn && <NavLink to="/login" style={{ color: "#000" }}>Login</NavLink>}
            {!isLoggedIn && <NavLink to="/signup" style={{ color: "#000" }}>Signup</NavLink>}
            {isLoggedIn && <NavLink style={{ color: "#000" }} onClick={handleLogout}>Logout</NavLink>}
          </DropdownMenu>
        </NavigationItem>
        {isLoggedIn && <NavigationItem>
          <LogoutButton onClick={handleSubscription}>Subscription</LogoutButton>
        </NavigationItem>}
      </NavigationItems>
    </Nav>
  );
};

export default Navbar;
