import { PlaceEntity } from '../../../../shared/infra/db/entities/places/place.entity';

const mockPlaceEntity = (id: string): PlaceEntity => {
  const placeEntity = new PlaceEntity();
  placeEntity.name = `Place Name ${id}`;
  placeEntity.description = `Place Description ${id}`;
  placeEntity.address = `Place Address ${id}`;
  placeEntity.url = `Place URL ${id}`;
  placeEntity.onCampus = true;
  placeEntity.bannerImage = `Place Banner ${id}`;
  placeEntity.iconImage = `Place Icon ${id}`;
  return placeEntity;
};

export { mockPlaceEntity };
