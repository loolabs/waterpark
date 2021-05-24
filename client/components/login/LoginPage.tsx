import styled from 'styled-components'
import { colours, device, desktopFontSize, PageTitle } from '../../styles'

const LoginForm = styled.form`
  margin: 20%;
  text-align: center;
  align-items: center;
`

const LoginTitle = styled(PageTitle)`
  margin: 0;
  text-align: left;
`

const FormGroup = styled.div`
  display: flex;
  flex: 0 0 auto;
  flex-flow: row wrap;
  align-items: center;
  margin-bottom: 0;
`

const EmailInput = styled.input``
const PasswordInput = styled.input``
const LoginLabel = styled.label`
  flex-basis: 100px;
  text-align: left;
`

// Placeholder CSS for design later
const SubmitButton = styled.button``

const LoginFooterContainer = styled.div`
  display: flex;
  flex-direction: column;
`

const FooterLink = styled.a``

const LoginFooter = () => {
  return (
    <LoginFooterContainer>
      <FooterLink href="#">Forgot Password</FooterLink>
      <FooterLink href="#">Sign Up</FooterLink>
    </LoginFooterContainer>
  )
}

export const LoginPage = () => {
  return (
    <LoginForm>
      <LoginTitle>Login</LoginTitle>
      <FormGroup>
        <LoginLabel>Username:</LoginLabel>
        <EmailInput type="email" placeholder="Enter email" />
      </FormGroup>
      <FormGroup>
        <LoginLabel>Password:</LoginLabel>
        <PasswordInput type="password" className="form-control" placeholder="Enter password" />
      </FormGroup>
      <SubmitButton type="submit">Submit</SubmitButton>
      <LoginFooter />
    </LoginForm>
  )
}
