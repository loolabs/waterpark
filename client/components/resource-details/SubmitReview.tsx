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
import { Faculty, Status, resourceLookup, capitalizeFirstLetter } from '../../utils'

const SubmitButton = styled.button`
  font-size: 18px;
  background-color: ${colours.primary2};
  color: ${colours.white};
  font-family: ${fontInter};
  font-weight: 600;
  padding: 8px;
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

  margin-bottom: 16px;
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
  margin: 8px;
  margin-bottom: 16px;
`

const ModalTitle = styled.h2`
  margin: 0;
`

const RedText = styled.span`
  color: red;
`

interface Ratings {
  [ratingName: string]: number
}

interface AboutYouData {
  faculty: Faculty
  status: Status
}

const RatingLabel = styled.p`
  margin-top: 8px;
  margin-bottom: 8px;
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
    return (
      <div className={className}>
        <RatingLabel>{capitalizeFirstLetter(ratingName)}<RedText> *</RedText></RatingLabel>
        <ReactStars
          count={5}
          // Circles are too small on Windows font
          char={navigator.appVersion.indexOf('Win') != -1 ? '⬤' : '●'}
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
  margin-left: 8px;
  margin-right: 8px;
  align-items: center;
`

const ModalCommentDiv = styled.div`
  text-align: left;
  margin: 8px;
`

const ModalComment = styled.textarea`
  margin-top: 8px;
  width: 100%;
  height: 100px;
  resize: none;
  border: none;
  background: #efefef;
  border-radius: 5px;
  outline: none;
  padding: 8px;
  font-family: ${fontInter};
  font-size: 1em;
`

const AboutYou = styled.h3`
  text-align: left;
  width: 100%;
  margin-left: 8px;
  margin-right: 8px;
`

const CancelButton = styled.button`
  background: white;
  border: medium solid #ff6961;
  border-radius: 5px;
  font-family: ${fontInter};
  font-weight: ${fontWeight.bold};
  color: #ff6961;
  width: 100px;
  padding: 4px 16px;
  font-size: ${desktopFontSize.body1};
  margin-right: 16px;
  cursor: pointer;

  @media ${smallerThan(width.mobileS)} {
    margin-bottom: 8px;
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
  padding: 4px 16px;
  border: medium solid ${colours.primary2};
  font-size: ${desktopFontSize.body1};
  cursor: pointer;

  @media ${smallerThan(width.mobileS)} {
    margin-bottom: 8px;
  }

  &:hover {
    background: white;
    color: ${colours.primary2};
  }

  &:disabled {
    border: medium solid ${colours.neutralLight3} !important;
    background: ${colours.neutralLight3} !important;
    color: white !important;
    cursor: not-allowed;
  }
`

const ButtonDiv = styled.div`
  display: flex;
  justify-content: flex-end;

  margin-left: 8px;
  margin-right: 8px;
`

const DropdownRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-left: 8px;
  margin-right: 8px;
`

const Dropdown = styled.select`
  padding: 4px;
  border-radius: 5px;
  background: white;
  font-family: ${fontInter};
  &:hover {
    background: ${colours.neutralLight1};
  }

  &:focus {
    outline: none;
    border-color: ${colours.primary2};
  }

`

const DropdownLabel = styled.label`
  text-align: left;
  margin-right: 8px;
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

  const initialRatings: Ratings = resourceLookup[resourceSlug]['criteria'].reduce(
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
    faculty: null,
    status: null,
  })

  const changeFaculty = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setAboutYou({ ...aboutYou, faculty: Faculty[e.target.value] })
  }

  const changeStatus = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setAboutYou({ ...aboutYou, status: Status[e.target.value] })
  }

  const validate = () => {
    let validated = true;

    Object.keys(ratings).forEach((key) => { if (ratings[key] == 0) { validated = false }})

    if (!aboutYou.faculty) {
      validated = false;
    }
    if (!aboutYou.status) {
      validated = false;
    }

    return validated;
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
            placeholder="Leave a comment (Optional)"
            value={comment}
            onChange={changeComment}
            rows={5}
            cols={50}
          />
        </ModalCommentDiv>

        <AboutYou>About You</AboutYou>

        <DropdownRow>
          <DropdownLabel htmlFor="faculty">Faculty or Affiliation <RedText>*</RedText></DropdownLabel>
          <Dropdown name="faculty" onChange={changeFaculty}>
            <option disabled selected>
              Select an option
            </option>
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
          <DropdownLabel htmlFor="status">Reviewer Status <RedText>*</RedText></DropdownLabel>
          <Dropdown name="status" onChange={changeStatus}>
            <option disabled selected>
              Select an option
            </option>
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
          <PostButton onClick={onRequestPost} disabled={!validate()}>Post</PostButton>
        </ButtonDiv>
      </form>
    </>
  )
}

// here for accessiblity, TODO: check
Modal.setAppElement('#__next')

export const SubmitReview = ({ name, resourceSlug }: { name: string; resourceSlug: string }) => {
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
