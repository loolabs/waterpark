import styled from 'styled-components'
import { colours, device, fontWeight, desktopFontSize, mobileFontSize, PageTitle } from '../../styles'
import moment from 'moment'

const ListView = styled.div`
  width: 100%;
`

const ListViewSection = styled.div`
  display: block;
  @media not all and ${device.tablet} {
    display: flex;
  }
`

const ListViewItems = styled.div`
  width: 100%;
`

const ListViewDate = styled.div`
  font-weight: bold;
  font-size: ${desktopFontSize.subtitle2};
  flex-shrink: 0;
  flex-basis: 200px;
  color: ${colours.neutralDark1};
  margin-bottom: 16px;
  @media not all and ${device.tablet} {
    margin-bottom: 0;
  }
`

const LoginDiv = styled.div`
  margin: 20%;
  text-align: center;
  align-items: center;
`

const LoginTitle = styled(PageTitle)`
  margin: 0;
  text-align: left;
`

export const LoginPage = () => {
  
  return (
    <div>
      <LoginDiv>
        <LoginTitle>Login</LoginTitle>
        <form>
          <div className="form-group">
              <label>Username</label>
              <input type="email" className="form-control" placeholder="Enter email" />
          </div>

          <div className="form-group">
              <label>Password</label>
              <input type="password" className="form-control" placeholder="Enter password" />
          </div>
          <button type="submit" className="btn btn-primary btn-block">Submit</button>
          <p className="forgot-password text-right">
              Forgot <a href="#">password?</a>
          </p>
        </form>
      </LoginDiv>
    </div>
  )
}
