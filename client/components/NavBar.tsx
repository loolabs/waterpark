import React from 'react'
import styled, { css } from 'styled-components'
import { colours, fontWeight, desktopFontSize, mobileFontSize, width, smallerThan } from '../styles'
import Link from 'next/link'
import { useRouter } from 'next/router'

const NavBarContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background: ${colours.white};
  padding: 14px 24px;
  box-shadow: 0px 2px 10px rgba(34, 34, 34, 0.1);
  position: fixed;
  top: 0;
  z-index: 8;
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

  @media ${smallerThan(width.mobile)} {
    font-size: ${mobileFontSize.subtitle1};
    margin: 0px 13px;
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
  @media (max-width: 425px) {
    display: block;
  }
`
LogoW.defaultProps = {
  src: '/W.svg',
  alt: 'Waterpark logo',
}

const LogoWaterpark = styled.img`
  display: block;
  @media (max-width: 425px) {
    display: none;
  }
`
LogoWaterpark.defaultProps = {
  src: '/Waterpark.svg',
  alt: 'Waterpark logo',
}

export const NavBar = () => {
  const router = useRouter()

  return (
    <NavBarContainer>
      <Link href="/">
        <LogoContainer>
          <LogoWaterpark />
          <LogoW />
        </LogoContainer>
      </Link>
      <div>
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
      </div>
    </NavBarContainer>
  )
}
