export const width = Object.freeze({
  mobileS: '320px',
  mobileM: '375px',
  mobile: '425px',
  tablet: '768px',
  laptop: '1024px',
  laptopL: '1440px',
  desktop: '2560px',
})

export const largerThan = (size: string): string => `(min-width: ${size})`
export const smallerThan = (size: string): string => `(max-width: ${size})`
