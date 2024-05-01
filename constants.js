const BREAKPOINTS = {
  mobileMax: 550,
  tabletMax: 1100,
  laptopMax: 1500,
};

const QUERIES = {
  mobileAndSmaller: `max-width: ${BREAKPOINTS.mobileMax}`,
  tabletAndSmaller: `max-width: ${BREAKPOINTS.tabletMax}`,
  laptopAndSmaller: `max-width: ${BREAKPOINTS.laptopMax}`,
};

export { QUERIES };
