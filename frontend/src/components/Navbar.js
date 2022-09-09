import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { breakpoints as bp } from '../utils/layout'
import styled from 'styled-components'
import colors from '../utils/colors'
import { FaBars, FaTimes } from 'react-icons/fa'

const NavbarContainer = styled.nav`
  width: 100%;
  height: 10vh;
  background: #ff6347;
  display: flex;
  align-items: center;
  justify-content: space-between;
  align-items: center;
`

const MobileNavbarLinks = styled.div`
  display: flex;
  flex-direction: column;
`

const NavbarLinks = styled.div`
  display: none;

  @media (min-width: ${bp.lg}) {
    display: flex;
    flex-direction: row;
  }
`
const BrandLinkItem = styled.h1`
  display: flex;
  flex-direction: row;
  color: ${colors.offWhite};
  margin: 10px 10px;
  padding: 10px;
  font-size: 30px;
`

const BurgerMenu = styled.div`
  display: flex;
  flex-direction: row;
  margin: 10px 20px;
  padding: 5px;
  color: ${colors.offWhite};
  font-size: 30px;

  @media (min-width: ${bp.lg}) {
    display: none;
  }
`

const LinkItemContainer = styled.div`
 display: flex;
 justify-content: center
 align-items:center
 margin:20px ;

 > a {
  text-decoration: none;
 }

`
const LinkItem = styled.h1`
  color: ${colors.offWhite};
  margin: 10px 10px;
  padding: 10px 20px;
  font-size: 20px;
`
const BrandContainer = styled.div`
  display: flex;
  flex-direction: row;
  white-space: nowrap;

  > a {
    text-decoration: none;
  }
`

const MenuContainer = styled.div`
  display: flex;
`

const MobileMenuContainer = styled.ul`
  position: absolute;
  display: flex;
  justify-content: center;
  left: 0;
  top: 8vh;
  width: 100%;
  height: 100vh;
  background: #ff6347;
  transform: translateX(0%);
  transition: transform 0.3s ease-out;
  z-index: 1;

  &.active {
    transform: translateX(-100%);
    transition: transform 0.3s ease-in;
  }
`

const Navbar = () => {
  const [click, setClick] = useState(true)
  const categoryMenu = () => setClick(!click)

  return (
    <NavbarContainer>
      <BrandContainer>
        <Link to='/'>
          <BrandLinkItem>KODIGO</BrandLinkItem>
        </Link>
      </BrandContainer>
      <MenuContainer>
        <NavbarLinks>
          <LinkItemContainer>
            <Link to='/'>
              <LinkItem>HOME</LinkItem>
            </Link>
          </LinkItemContainer>
          <LinkItemContainer>
            <Link to='/create-notes'>
              <LinkItem> + CREATE A NOTE</LinkItem>
            </Link>
          </LinkItemContainer>
          <LinkItemContainer>
            <Link to='/about'>
              <LinkItem>ABOUT</LinkItem>
            </Link>
          </LinkItemContainer>
        </NavbarLinks>
        <BurgerMenu onClick={categoryMenu}>
          {click ? <FaBars /> : <FaTimes />}
          <MobileMenuContainer
            className={click ? 'category active' : 'category'}
            onClick={categoryMenu}
          >
            <MobileNavbarLinks>
              <LinkItemContainer>
                <Link to='/'>
                  <LinkItem>HOME</LinkItem>
                </Link>
              </LinkItemContainer>
              <LinkItemContainer>
                <Link to='/create-notes'>
                  <LinkItem>CREATE A NOTE</LinkItem>
                </Link>
              </LinkItemContainer>
              <LinkItemContainer>
                <Link to='/about'>
                  <LinkItem>ABOUT</LinkItem>
                </Link>
              </LinkItemContainer>
            </MobileNavbarLinks>
          </MobileMenuContainer>
        </BurgerMenu>
      </MenuContainer>
    </NavbarContainer>
  )
}

export default Navbar
