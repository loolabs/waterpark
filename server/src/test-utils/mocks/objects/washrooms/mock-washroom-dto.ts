import { WashroomDTO } from '../../../../modules/washrooms/mappers/washroom-dto';

const mockWashroomDTO = (id: string): WashroomDTO => {
  return {
    name: `Place Name ${id}`,
    description: `Place Description ${id}`,
    address: `Place Address ${id}`,
    onCampus: true,
    links: {
      url: `Place URL ${id}`,
      bannerImage: `Place Banner ${id}`,
      iconImage: `Place Icon ${id}`,
    },
    tags: ['tag 1', 'tag 2', 'tag 3'],
  };
};

export { mockWashroomDTO };
