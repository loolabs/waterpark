import { UniqueEntityID } from '../../../shared/domain/unique-entity-id';
import { WashroomEntity } from '../../../shared/infra/db/entities/places/washroom.entity';
import { Washroom } from '../domain/entities/washroom';
import { WashroomDTO } from './washroom-dto';

export class WashroomMap {
  public static toDTO(washroom: Washroom): WashroomDTO {
    return {
      ...washroom.props,
      //TODO reviews
    };
  }

  public static toDomain(washroomEntity: WashroomEntity): Washroom {
    const { place } = washroomEntity;
    const washroomResult = Washroom.create(
      {
        name: place.name,
        description: place.description,
        address: place.address,
        onCampus: place.onCampus,
        links: {
          url: place.url,
          bannerImage: place.bannerImage,
          iconImage: place.iconImage,
        },
        tags: place.tags.getItems().map((tag) => tag.name),
        // TODO reviews
      },
      new UniqueEntityID(place.id)
    );
    if (washroomResult.isErr()) throw new Error(); // TODO: error handling

    return washroomResult.value;
  }

  public static async toPersistence(washroom: Washroom): Promise<WashroomEntity> {
    const washroomEntity = new WashroomEntity();
    washroomEntity.place.name = washroom.name;
    washroomEntity.place.description = washroom.description;

    return washroomEntity;
  }
}
