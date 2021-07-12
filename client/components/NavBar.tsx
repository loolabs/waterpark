import React, { useState } from 'react'
import styled, { css } from 'styled-components'
import {
  colours,
  fontWeight,
  desktopFontSize,
  mobileFontSize,
  width,
  smallerThan,
  largerThan,
} from '../styles'
import Link from 'next/link'
import { useRouter } from 'next/router'

const NavBarRow = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background: ${colours.white};
  padding: 14px 24px;
`

const NavBarOption = styled.a<any>`
  font-style: normal;
  font-weight: ${fontWeight.bold};
  font-size: ${desktopFontSize.subtitle1};
  line-height: 120%;
  text-transform: uppercase;
  color: ${colours.neutralDark1};
  ${(props: any) =>
    props.isActive &&
    css`
      color: ${colours.black};
    `};
  margin: 0px 32px;

  @media ${smallerThan(width.tablet)} {
    font-size: ${mobileFontSize.subtitle2};
    margin: 0px 8px;
  }

  @media ${smallerThan(width.mobileL)} {
    font-size: ${mobileFontSize.subtitle1};
    margin: 12px 12px;
  }

  &:hover {
    color: ${colours.black};
    cursor: pointer;
  }
`

const LogoContainer = styled.div`
  &:hover {
    cursor: pointer;
  }
`

const LogoW = styled.img`
  display: none;
  @media ${smallerThan(width.tablet)} {
    display: block;
  }
`
LogoW.defaultProps = {
  src: '/W.svg',
  alt: 'Waterpark logo',
}

const LogoWaterpark = styled.img`
  display: block;
  @media ${smallerThan(width.tablet)} {
    display: none;
  }
`
LogoWaterpark.defaultProps = {
  src: '/Waterpark.svg',
  alt: 'Waterpark logo',
}

const NavbarItemsStyling = styled.div`
  display: flex;
  justify-content: space-between;

  @media ${smallerThan(width.mobileL)} {
    flex-direction: column;
    align-items: flex-end;
  }
`

const NavBarContainer = styled.div`
  position: fixed;
  top: 0;
  z-index: 1;
  width: 100%;
  box-shadow: 0px 2px 10px rgba(34, 34, 34, 0.1);
  background-color: white;
`

// There is a hardcoded drop-down max-height value. It is equal to 46 * (number of navigation elements, currently 3).
// 46 = Height of nav text + height of top and bottom margins.
// Why hardcoded: CSS transitions cannot accept auto values. So, we need to calculate the height before animating.
const NavBarDropdown = styled.div`
  overflow: hidden;
  transition-property: max-height;
  transition: 0.2s ease-in-out;
  max-height: 0px;
  &.dropped-down {
    max-height: 138px;
  }
`

const HideOnMobile = styled.div`
  @media ${smallerThan(width.mobileL)} {
    display: none;
  }
`

const ShowOnMobile = styled.div`
  @media ${largerThan(width.mobileL)} {
    display: none;
  }
`

const NavbarItems = () => {
  const router = useRouter()
  return (
    <NavbarItemsStyling>
      <Link href="/housing">
        <NavBarOption isActive={router.pathname == '/housing' || router.pathname == '/'}>
          Housing
        </NavBarOption>
      </Link>
      <Link href="/study-spots">
        <NavBarOption isActive={router.pathname == '/study-spots'}>Study Spots</NavBarOption>
      </Link>
      <Link href="/washrooms">
        <NavBarOption isActive={router.pathname == '/washrooms'}>Washrooms</NavBarOption>
      </Link>
    </NavbarItemsStyling>
  )
}

const HamburgerMenu = styled.img<{ active: boolean }>`
  padding: 5px;
  border-style: solid;
  border-width: 1px;
  border-radius: 5px;
  background-color: ${(props) => (props.active ? colours.neutralLight1 : colours.white)};
`

export const NavBar = () => {
  let [openDrawer, setOpenDrawer] = useState(false)

  return (
    <NavBarContainer>
      <NavBarRow>
        <Link href="/">
          <LogoContainer>
            <LogoWaterpark />
            <LogoW />
          </LogoContainer>
        </Link>
        <HideOnMobile>
          <NavbarItems />
        </HideOnMobile>
        <ShowOnMobile>
          <HamburgerMenu
            src={window.location.origin + '/hamburger-menu.svg'}
            alt="dropdown"
            height="27"
            width="27"
            onClick={() => {
              setOpenDrawer(!openDrawer)
            }}
            active={openDrawer}
          />
        </ShowOnMobile>
      </NavBarRow>
      <ShowOnMobile>
        <NavBarDropdown className={openDrawer ? 'dropped-down' : ''}>
          <NavbarItems />
        </NavBarDropdown>
      </ShowOnMobile>
    </NavBarContainer>
  )
}
