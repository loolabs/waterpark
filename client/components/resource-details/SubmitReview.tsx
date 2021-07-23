import styled from 'styled-components'
import {
  colours,
  largerThan,
  smallerThan,
  width,
  fontInter,
  fontWeight,
  desktopFontSize,
} from '../../styles'
import Modal from 'react-modal'
import { useState, Fragment } from 'react'
import ReactStars from 'react-stars'
import { Faculty, Status } from '../../utils'

const SubmitButton = styled.button`
  font-size: 18px;
  background-color: ${colours.primary1};
  color: ${colours.white};
  font-family: ${fontInter};
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
    height: '75%',
    margin: 'auto',
    textAlign: 'center',
    inset: '0',
  },
  overlay: {
    zIndex: '9',
  },
}

const ModalHeaderRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 10px;
  margin-bottom: 20px;
`

const ModalTitle = styled.h2`
  margin: 0;
`

const Bar = styled.hr`
  border: transparent;
  border-top: 2px solid black;
`

interface Ratings {
  [ratingName: string]: number
}

const ModalRating = styled(
  ({
    className,
    ratingName,
    onRatingChange,
  }: {
    className?: string
    ratingName: string
    onRatingChange: (number) => void
  }) => {
    return (
      <div className={className}>
        <p>{ratingName}</p>
        <ReactStars
          count={5}
          char={'●'}
          value={0}
          size={24}
          color1={'#DDDDDD'}
          color2={colours.primary1}
          edit={true}
        />
      </div>
    )
  }
)`
  display: flex;
  justify-content: space-between;
  margin-left: 10px;
  margin-right: 10px;
  align-items: center;
`

const ModalCommentDiv = styled.div`
  text-align: left;
  margin: 10px;
`

const ModalComment = styled.textarea`
  margin-top: 10px;
  width: 100%;
  height: 100px;
  resize: none;
  border: none;
  background: #efefef;
  border-radius: 5px;
  outline: none;
  padding: 7px;
  font-family: ${fontInter};
`

const AboutYou = styled.h3`
  text-align: left;
  width: 100%;
  margin-left: 10px;
  margin-right: 10px;
`

const CancelButton = styled.button`
  background: #ff6961;
  border-radius: 5px;
  font-family: ${fontInter};
  font-weight: ${fontWeight.bold};
  color: white;
  width: 100px;
  padding: 10px 20px;
  border: none;
  font-size: ${desktopFontSize.body1};
  margin-right: 20px;
`

const PostButton = styled.button`
  background: #47209d;
  border-radius: 5px;
  font-family: ${fontInter};
  font-weight: ${fontWeight.bold};
  color: white;
  width: 100px;
  padding: 10px 20px;
  border: none;
  font-size: ${desktopFontSize.body1};
`

const ButtonDiv = styled.div``

const DropdownRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-left: 10px;
  margin-right: 10px;
`

const Dropdown = styled.select``

const ModalContent = ({ onRequestClose }: { onRequestClose: () => void }) => {
  const [comment, setComment] = useState('')

  const changeComment = (e) => {
    setComment(e.target.value)
  }

  let ratings: Ratings = {
    'Rating 1': 0,
    'Rating 2': 0,
    'Rating 3': 0,
  }

  return (
    <>
      <ModalHeaderRow>
        <ModalTitle>Add a Review</ModalTitle>
        <svg
          onClick={onRequestClose}
          xmlns="http://www.w3.org/2000/svg"
          height="24px"
          viewBox="0 0 24 24"
          width="24px"
          fill="#000000"
        >
          <path d="M0 0h24v24H0V0z" fill="none" />
          <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z" />
        </svg>
      </ModalHeaderRow>
      <Bar />
      <form>
        {Object.keys(ratings).map((name) => {
          return (
            <ModalRating
              key={name}
              ratingName={name}
              onRatingChange={(score) => {
                ratings[name] = score
                console.log(ratings)
              }}
            />
          )
        })}
        <ModalCommentDiv>
          <label>
            Leave a Comment: <br />
            <ModalComment
              value={comment}
              onChange={changeComment}
              rows={5}
              cols={50}
              required={true}
            />
          </label>
        </ModalCommentDiv>
        <AboutYou>About You:</AboutYou>
        <DropdownRow>
          <label htmlFor="faculty">Faculty/Affiliation: </label>
          <Dropdown name="faculty">
            {Object.values(Faculty).map((value) => {
              console.log('value: ' + value)
              console.log('string: ' + Faculty[value])
              return (
                <option key={value} value={value}>
                  {value}
                </option>
              )
            })}
          </Dropdown>
        </DropdownRow>
        <br />
        <DropdownRow>
          <label htmlFor="status">Reviewer Status: </label>
          <Dropdown name="status">
            {Object.values(Status).map((value) => {
              return (
                <option key={value} value={value}>
                  {value}
                </option>
              )
            })}
          </Dropdown>
        </DropdownRow>
        <br />
        <ButtonDiv>
          <CancelButton onClick={onRequestClose}>Cancel</CancelButton>
          <PostButton>Post</PostButton>
        </ButtonDiv>
      </form>
    </>
  )
}

// here for accessiblity, TODO: check
Modal.setAppElement('#__next')

export const SubmitReview = ({ className, name }: { className?: string; name: string }) => {
  const [modalIsOpen, setIsOpen] = useState(false)
  const [formResponse, setFormResponse] = useState({})

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
        <ModalContent onRequestClose={closeModal} />
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
