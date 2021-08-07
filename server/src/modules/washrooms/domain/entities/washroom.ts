<<<<<<< HEAD
import { UniqueEntityID } from '../../../../shared/domain/unique-entity-id'
import { Result } from '../../../../shared/core/result'
import { AggregateRoot } from '../../../../shared/domain/aggregate-root'
import { WashroomCreated } from '../events/washroom-created'
=======
import { UniqueEntityID } from '../../../../shared/domain/unique-entity-id';
import { Result } from '../../../../shared/core/result';
import { AggregateRoot } from '../../../../shared/domain/aggregate-root';
import { WashroomCreated } from '../events/washroom-created';
>>>>>>> 254b99c8f433e5f91c174bce3cfb264e5a8dd40f

interface WashroomProps {
  name: string;
  description: string;
  address: string;
  onCampus: boolean;
  links: {
    url?: string;
    bannerImage: string;
    iconImage: string;
  };
  tags: Array<string>;
  //TODO reviews
}

<<<<<<< HEAD

export class Washroom extends AggregateRoot<WashroomProps> {
  public static create(props: WashroomProps, id?: UniqueEntityID): Result<Washroom, Error> {
    const isNewWashroom = id === undefined
    const place = new Washroom(
=======
export class Washroom extends AggregateRoot<WashroomProps> {
  public static create(props: WashroomProps, id?: UniqueEntityID): Result<Washroom, Error> {
    const isNewWashroom = id === undefined;
    const washroom = new Washroom(
>>>>>>> 254b99c8f433e5f91c174bce3cfb264e5a8dd40f
      {
        ...props,
      },
      id
<<<<<<< HEAD
    )

    if (isNewWashroom) place.addDomainEvent(new WashroomCreated(place))

    return Result.ok(place)
  }

  private constructor(props: WashroomProps, id?: UniqueEntityID) {
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

=======
    );

    if (isNewWashroom) washroom.addDomainEvent(new WashroomCreated(washroom));

    return Result.ok(washroom);
  }

  private constructor(props: WashroomProps, id?: UniqueEntityID) {
    super(props, id);
  }

  get name(): string {
    return this.props.name;
  }

  get description(): string {
    return this.props.description;
  }

  get address(): string {
    return this.props.address;
  }

  get onCampus(): boolean {
    return this.props.onCampus;
  }

  get url(): string | undefined {
    return this.props.links.url;
  }

  get bannerImage(): string {
    return this.props.links.bannerImage;
  }

  get iconImage(): string {
    return this.props.links.iconImage;
  }

  get tags(): Array<string> {
    return this.props.tags;
  }
>>>>>>> 254b99c8f433e5f91c174bce3cfb264e5a8dd40f
}
