import styled from 'styled-components'
import { colours, largerThan, smallerThan, width } from '../../styles'
import Modal from 'react-modal'
import { useState, Fragment } from 'react'

const SubmitButton = styled.button`
  font-size: 18px;
  background-color: ${colours.primary1};
  color: ${colours.white};
  font-family: Inter, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell,
    Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
  font-weight: 600;
  padding: 5px;
  border-radius: 5px;
  border: 3px solid ${colours.primary1};
  cursor: pointer;

  &:hover {
    background-color: ${colours.white};
    color: ${colours.primary1};
  }
`

const SubmitReviewBanner = styled.div`
  @media ${largerThan(width.tablet)} {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  margin-bottom: 15px;
`

const ModalStyle = {
  content: {
    width: '50%',
    minWidth: width.mobileS,
    minHeight: width.mobile,
    height: '50%',
    margin: 'auto',
    textAlign: 'center',
    inset: '0'
  },
  overlay: {
    zIndex: '9',
  },
}

Modal.setAppElement('#__next')

export const SubmitReview = ({ className, name }: { className?: string; name: string }) => {
  const [modalIsOpen, setIsOpen] = useState(false)

  const openModal = () => {
    setIsOpen(true)
  }
  const closeModal = () => {
    setIsOpen(false)
  }

  return (
    <Fragment>
      <SubmitReviewBanner>
        <h3>What are your thoughts on {name}?</h3>
        <SubmitButton onClick={openModal}>SUBMIT REVIEW</SubmitButton>
      </SubmitReviewBanner>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Example Modal"
        style={ModalStyle}
      >
        <button onClick={closeModal}>close</button>
        <div>I am a modal</div>
        <form>
          <input />
          <button>tab navigation</button>
          <button>stays</button>
          <button>inside</button>
          <button>the modal</button>
        </form>
      </Modal>
    </Fragment>
  )
}

export const SubmitReviewForm = () => {
  const [modalIsOpen, setIsOpen] = useState(false)

  const openModal = () => {
    setIsOpen(true)
  }
  const closeModal = () => {
    setIsOpen(false)
  }

  return <div></div>
}
