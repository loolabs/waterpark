import React from 'react'
import styled, { css } from 'styled-components'
import { colours, device, fontWeight, desktopFontSize, mobileFontSize } from '../styles'
import { useViewport } from './hooks'
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
  z-index: 1;
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

  @media ${device.mobileL} {
    font-size: ${mobileFontSize.subtitle1};
    margin: 0px 13px;
  }

  &:hover {
    color: ${colours.black};
    cursor: pointer;
  }
`

const Logo = styled.img`
  &:hover {
    cursor: pointer;
  }
`

export const NavBar = () => {
  const { width } = useViewport()
  const router = useRouter()

  return (
    <NavBarContainer>
      <Link href="/">
        {width > 425 ? (
          <Logo src="/Waterpark.svg" alt="Waterpark logo" />
        ) : (
          <Logo src="/W.svg" alt="Waterpark logo" />
        )}
      </Link>

      <div>
        <Link href="/events">
          <NavBarOption isActive={router.pathname == '/events' || router.pathname == '/'}>
            Events
          </NavBarOption>
        </Link>
        <Link href="/clubs">
          <NavBarOption isActive={router.pathname == '/clubs'}>Clubs</NavBarOption>
        </Link>
      </div>
    </NavBarContainer>
  )
}
