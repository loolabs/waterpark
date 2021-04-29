import { useRouter } from 'next/router'
import styled from 'styled-components'
import { Club } from '../../context'
import { fontWeight, PageTitle } from '../../styles'
import { Category } from './Category'

const BackArrow = styled.img`
  margin-top: 64px;
  cursor: pointer;
`

const Logo = styled.img`
  border-radius: 100%;
  display: block;
  margin-top: 40px;
  height: 100px;
  width: 100px;
`

const ClubName = styled(PageTitle)`
  margin-bottom: 0;
  margin-top: 32px;
`

const Links = styled.div`
  display: flex;
  margin-top: 16px;
`

const SocialLink = styled.a`
  text-decoration: underline;
`

const ClubMetaData = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
  margin-top: 16px;
`

const MemberCount = styled.div`
  font-style: italic;
  font-weight: ${fontWeight.bold};
`

const CategoriesWrapper = styled.div`
  display: flex;
  margin-right: -4px;
`

const ClubDescription = styled.p`
  line-height: 1.3;
  margin-top: 24px;
  margin-bottom: 24px;
`

interface ClubInfoProps {
  club: Club
}

export const ClubInfo = ({ club }: ClubInfoProps) => {
  const router = useRouter()

  const { name, description, iconURL, tags } = club
  const links = [club.facebookLink, club.twitterLink, club.instagramLink, club.websiteLink]
  const linksThatExist = links.filter((l) => l !== undefined)

  return (
    <div>
      <BackArrow src="/back-arrow.svg" width="28px" onClick={() => router.back()} />

      <Logo src={iconURL} alt="" />
      <ClubName> {name}</ClubName>

      <Links>
        {linksThatExist.map((l, i) => (
          <SocialLink key={`social-link-${i}`}>{l}</SocialLink>
        ))}
      </Links>

      <ClubMetaData>
        <MemberCount>20-30 members</MemberCount>
        <Categories tags={tags} />
        {/* TODO: color code the tags */}
      </ClubMetaData>

      <ClubDescription>{description}</ClubDescription>
    </div>
  )
}

const Categories = ({ tags }: { tags: Array<string> }) => (
  <CategoriesWrapper>
    {tags.map((t, i) => (
      <Category key={`category-tag-${i}`}>{t}</Category>
    ))}
  </CategoriesWrapper>
)
