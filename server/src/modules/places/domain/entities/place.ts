import { UniqueEntityID } from '../../../../shared/domain/unique-entity-id'
import { Result } from '../../../../shared/core/result'
import { AggregateRoot } from '../../../../shared/domain/aggregate-root'
import { PlaceCreated } from '../events/place-created'

interface PlaceProps {
  name: string
  description: string
  address: string
  onCampus: boolean
  links: {
    url?: string
    bannerImage: string
    iconImage: string
  }
  tags: Array<string>
  //TODO reviews
}

export class Place extends AggregateRoot<PlaceProps> {
  public static create(props: PlaceProps, id?: UniqueEntityID): Result<Place, Error> {
    const isNewPlace = id === undefined
    const place = new Place(
      {
        ...props,
      },
      id
    )

    if (isNewPlace) place.addDomainEvent(new PlaceCreated(place))

    return Result.ok(place)
  }

  private constructor(props: PlaceProps, id?: UniqueEntityID) {
    super(props, id)
  }

  get name(): string {
    return this.props.name
  }

  get description(): string {
    return this.props.description
  }

  get address(): string {
    return this.props.address
  }

  get onCampus(): boolean {
    return this.props.onCampus
  }

  get url(): string | undefined {
    return this.props.links.url
  }

  get bannerImage(): string {
    return this.props.links.bannerImage
  }

  get iconImage(): string {
    return this.props.links.iconImage
  }

  get tags(): Array<string> {
    return this.props.tags
  }
}
