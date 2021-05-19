const width = Object.freeze({
  mobileS: '320px',
  mobileM: '375px',
  mobileL: '425px',
  mobile: '1024px',
  tablet: '768px',
  laptop: '1024px',
  laptopL: '1440px',
  desktop: '2560px',
})

export const device = Object.freeze({
  mobileS: `(max-width: ${width.mobileS})`,
  mobileM: `(max-width: ${width.mobileM})`,
  mobileL: `(max-width: ${width.mobileL})`,
  mobile: `(max-width: ${width.mobile})`,
  tablet: `(max-width: ${width.tablet})`,
  laptop: `(max-width: ${width.laptop})`,
  laptopL: `(min-width: ${width.laptopL})`,
  desktop: `(min-width: ${width.desktop})`,
  desktopL: `(min-width: ${width.desktop})`,
})

export const mobile = '425px'
export const tablet = `768px`
export const largerThan = (size: string): string => `(min-width: ${size})`
