import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Button, Container, Dropdown, Header, Image, Menu, Segment } from "semantic-ui-react";
import StaffService from "../services/StaffService";
import UserService from "../services/UserService";
import Login from "./Login";
import SignUp from "./SignUp";


export default function Navi() {

  const email = localStorage.getItem("email")
  const [user, setUser] = useState({})
  let userService = new UserService()
  let staffService = new StaffService()
  const [isStaff, setIsStaff] = useState(false)

  useEffect(() => {
    userService.getByEmail(email).then(result => setUser(result.data.data))
    staffService.getByEmail(email).then((result) => setIsStaff(result.data.success))

  }, [])


  const handleSignOut = () => {
    localStorage.removeItem("email")
    window.location.reload()
    window.location.replace("/")
  }


  return (
    <Menu borderless fixed="top" >
      <Container>
        <Menu.Item color="violet" position="left">
          <Header
            as="h4"
            as={NavLink}
            to="/home"
            color="violet"
            className="orbitron"
            icon="handshake"
            content="HRMS"
          />
        </Menu.Item>
        <Menu.Item
          as={NavLink}
          to="/home"
          icon="home"
          content="Ana Sayfa"
          position="left"
        />
        <Menu.Item
          as={NavLink}
          to="/jobadvertisements"
          icon="newspaper"
          content="İş İlanları"
          position="left"
        />
        <Menu.Item
          as={NavLink}
          to="/candidates"
          icon="user"
          content="Adaylar"
          position="left"
        />
        <Menu.Item
          as={NavLink}
          to="/employers"
          icon="building outline"
          content="Firmalar"
          position="left"
        />


        {

          localStorage.getItem("email") == null ? <Menu.Menu position="right">
            <Menu.Item position="right"><Login /></Menu.Item>
            <Menu.Item position="right">
              <SignUp />
            </Menu.Item>
          </Menu.Menu>
            :
            <Menu.Menu position="right">
              <Menu.Item>
                <Dropdown
                  button
                  className='icon'
                  floating
                  labeled
                  icon='user'
                  text={user.email}>
                  <Dropdown.Menu>
                    {
                      user.identityNumber != null &&
                       <div>
                        <Dropdown.Item><Button content="Profile Git" fluid color="facebook" as={NavLink} to={`/candidates/${user.id}`} /></Dropdown.Item>
                      </div>
                    }
                    {
                      user.companyName != null &&
                      <Dropdown.Item><Button content="Profile Git" fluid color="facebook" as={NavLink} to={`/employers/${user.id}`} /></Dropdown.Item>

                    }
                    {
                     isStaff &&
                      <Dropdown.Item><Button content="Profile Git" fluid color="facebook" as={NavLink} to="/admin" /></Dropdown.Item>

                    }
                        <Dropdown.Item><Button content="Çıkış Yap" fluid color="facebook" onClick={() => handleSignOut()} /></Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </Menu.Item>
            </Menu.Menu>}

      </Container>
    </Menu>
  );
}
