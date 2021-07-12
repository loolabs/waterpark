import styled from 'styled-components'
import { colours, fontWeight, fontInter, width, smallerThan, largerThan } from '../styles'

export const SearchInput = styled.input`
  background-image: url(/search-24px.svg);
  background-repeat: no-repeat;
  border: none;
  border-radius: 100vw; // arbitrarily large so that sides are fully rounded
  font-family: ${fontInter};
  font-size: 16px;
  font-weight: ${fontWeight.semiBold};
  margin-left: 16px;

  background-position: 4px 4px;
  background-size: 24px 24px;
  height: 32px;
  margin-right: auto;
  padding-left: 32px;
  padding-right: 0;
  width: 32px;
  @media ${largerThan(width.tablet)} {
    background-color: ${colours.neutralLight1};
    background-position: 12px 8px;
    background-size: 32px 32px;
    height: 48px;
    margin-right: 0;
    padding-left: 48px;
    padding-right: 16px;
    width: 240px;
  }

  :focus,
  :not(:placeholder-shown) {
    outline: none;

    @media ${smallerThan(width.tablet)} {
      background-color: ${colours.neutralLight1};
      background-position: 8px 4px;
      padding-left: 36px;
      padding-right: 12px;
      margin-left: 12px;

      width: 100%;
      transition: width 0.5s;
    }
  }
`
