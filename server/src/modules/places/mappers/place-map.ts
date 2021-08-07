import { UniqueEntityID } from '../../../shared/domain/unique-entity-id';
import { PlaceEntity } from '../../../shared/infra/db/entities/places/place.entity';
import { Place } from '../domain/entities/place';
import { PlaceDTO } from './place-dto';

export class PlaceMap {
  public static toDTO(place: Place): PlaceDTO {
    return {
      ...place.props,
      //TODO reviews
    };
  }

  public static toDomain(placeEntity: PlaceEntity): Place {
    const placeResult = Place.create(
      {
        name: placeEntity.name,
        description: placeEntity.description,
        address: placeEntity.address,
        onCampus: placeEntity.onCampus,
        links: {
          url: placeEntity.url,
          bannerImage: placeEntity.bannerImage,
          iconImage: placeEntity.iconImage,
        },
        tags: placeEntity.tags.getItems().map((tag) => tag.name),
        // TODO reviews
      },
      new UniqueEntityID(placeEntity.id)
    );
    if (placeResult.isErr()) throw new Error(); // TODO: error handling

    return placeResult.value;
  }

  public static async toPersistence(place: Place): Promise<PlaceEntity> {
    const placeEntity = new PlaceEntity();
    placeEntity.name = place.name;
    placeEntity.description = place.description;

    return placeEntity;
  }
}
