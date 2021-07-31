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
import { Faculty, Status, RatingCriteria } from '../../utils'

const SubmitButton = styled.button`
  font-size: 18px;
  background-color: ${colours.primary2};
  color: ${colours.white};
  font-family: ${fontInter};
  font-weight: 600;
  padding: 5px;
  border-radius: 5px;
  border: 3px solid ${colours.primary2};
  cursor: pointer;

  &:hover {
    background-color: ${colours.white};
    color: ${colours.primary2};
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
    position: 'relative',
    width: '50%',
    minWidth: 'min(90%, ' + width.mobile + ')',
    maxHeight: '90vh',
    overflowX: 'auto',
    overflowY: 'auto',
    height: 'max(auto, 80%)',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: '5vh',
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

interface Ratings {
  [ratingName: string]: number
}

interface AboutYouData {
  faculty: Faculty
  status: Status
}

const RatingLabel = styled.p`
  margin-top: 10px;
  margin-bottom: 10px;
`

const ModalRating = styled(
  ({
    className,
    ratingName,
    onRatingChange,
    rating,
  }: {
    className?: string
    ratingName: string
    onRatingChange: (number: number) => void
    rating: number
  }) => {
    const capitalizeFirstLetter = (str: string): string => {
      return str.charAt(0).toUpperCase() + str.slice(1)
    }

    return (
      <div className={className}>
        <RatingLabel>{capitalizeFirstLetter(ratingName)}</RatingLabel>
        <ReactStars
          count={5}
          char={'●'}
          value={rating}
          size={24}
          color1={'#DDDDDD'}
          color2={colours.primary2}
          edit={true}
          onChange={onRatingChange}
          half={false}
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
  font-size: 1em;
`

const AboutYou = styled.h3`
  text-align: left;
  width: 100%;
  margin-left: 10px;
  margin-right: 10px;
`

const CancelButton = styled.button`
  background: white;
  border: medium solid #ff6961;
  border-radius: 5px;
  font-family: ${fontInter};
  font-weight: ${fontWeight.bold};
  color: #ff6961;
  width: 100px;
  padding: 5px 20px;
  font-size: ${desktopFontSize.body1};
  margin-right: 20px;
  cursor: pointer;

  @media ${smallerThan(width.mobileS)} {
    margin-bottom: 10px;
  }

  &:hover {
    background: #ff6961;
    color: white;
  }
`

const PostButton = styled.button`
  background: ${colours.primary2};
  border-radius: 5px;
  font-family: ${fontInter};
  font-weight: ${fontWeight.bold};
  color: white;
  width: 100px;
  padding: 5px 20px;
  border: medium solid ${colours.primary2};
  font-size: ${desktopFontSize.body1};
  cursor: pointer;

  @media ${smallerThan(width.mobileS)} {
    margin-bottom: 10px;
  }

  &:hover {
    background: white;
    color: ${colours.primary2};
  }
`

const ButtonDiv = styled.div`
  display: flex;
  justify-content: flex-end;

  margin-left: 10px;
  margin-right: 10px;
`

const DropdownRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-left: 10px;
  margin-right: 10px;
`

const Dropdown = styled.select`
  padding: 5px;
  border-radius: 5px;
  background: white;
  font-family: ${fontInter};
  &:hover {
    background: ${colours.neutralLight1};
  }
`

const DropdownLabel = styled.label`
  text-align: left;
  margin-right: 10px;
`

const CloseButton = styled.svg`
  fill: rgb(100, 100, 100);
  cursor: pointer;
  &:hover {
    fill: rgb(0, 0, 0);
  }
`

const ModalContent = ({
  onRequestClose,
  resourceSlug,
}: {
  onRequestClose: () => void
  resourceSlug: string
}) => {
  const [comment, setComment] = useState('')

  const initialRatings: Ratings = RatingCriteria[resourceSlug].reduce(
    (o, key) => ({ ...o, [key]: 0 }),
    {}
  )
  const [ratings, setRatings] = useState<Ratings>(initialRatings)

  const changeRatings = (label: string, score: number) => {
    setRatings({ ...ratings, [label]: score })
  }

  const changeComment = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value)
  }

  const [aboutYou, setAboutYou] = useState<AboutYouData>({
    faculty: Faculty.Mathematics,
    status: Status.Other,
  })

  const changeFaculty = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setAboutYou({ ...aboutYou, faculty: Faculty[e.target.value] })
  }

  const changeStatus = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setAboutYou({ ...aboutYou, status: Status[e.target.value] })
  }

  const onRequestPost = () => {
    Object.keys(ratings).map((key) => (ratings[key] *= 10))
    const response = { ...ratings, comment, ...aboutYou }
    console.log(response)
    // TODO post response
    onRequestClose()
  }

  return (
    <>
      <ModalHeaderRow>
        <ModalTitle>Add a Review</ModalTitle>
        <CloseButton
          onClick={onRequestClose}
          xmlns="http://www.w3.org/2000/svg"
          height="24px"
          viewBox="0 0 24 24"
          width="24px"
          fill="#000000"
        >
          <path d="M0 0h24v24H0V0z" fill="none" />
          <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z" />
        </CloseButton>
      </ModalHeaderRow>
      <form>
        {Object.keys(ratings).map((name) => {
          return (
            <ModalRating
              key={name}
              rating={ratings[name]}
              ratingName={name}
              onRatingChange={(score) => {
                changeRatings(name, score)
              }}
            />
          )
        })}
        <ModalCommentDiv>
          <ModalComment
            placeholder="Leave a comment"
            value={comment}
            onChange={changeComment}
            rows={5}
            cols={50}
            required={true}
          />
        </ModalCommentDiv>
        <AboutYou>About You</AboutYou>
        <DropdownRow>
          <DropdownLabel htmlFor="faculty">Faculty or Affiliation </DropdownLabel>
          <Dropdown name="faculty" onChange={changeFaculty}>
            {Object.entries(Faculty).map(([key, value]) => {
              return (
                <option key={key} value={key}>
                  {value}
                </option>
              )
            })}
          </Dropdown>
        </DropdownRow>
        <br />
        <DropdownRow>
          <DropdownLabel htmlFor="status">Reviewer Status </DropdownLabel>
          <Dropdown name="status" onChange={changeStatus}>
            {Object.entries(Status).map(([key, value]) => {
              return (
                <option key={key} value={key}>
                  {value}
                </option>
              )
            })}
          </Dropdown>
        </DropdownRow>
        <br />
        <ButtonDiv>
          <CancelButton type="button" onClick={onRequestClose}>
            Cancel
          </CancelButton>
          <PostButton onClick={onRequestPost}>Post</PostButton>
        </ButtonDiv>
      </form>
    </>
  )
}

// here for accessiblity, TODO: check
Modal.setAppElement('#__next')

export const SubmitReview = ({
  className,
  name,
  resourceSlug,
}: {
  className?: string
  name: string
  resourceSlug: string
}) => {
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
        <SubmitButton onClick={openModal}>Add Review</SubmitButton>
      </SubmitReviewBanner>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Example Modal"
        style={ModalStyle}
      >
        <ModalContent onRequestClose={closeModal} resourceSlug={resourceSlug} />
      </Modal>
    </Fragment>
  )
}
