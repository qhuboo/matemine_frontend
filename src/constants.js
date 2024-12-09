const BREAKPOINTS = {
  mobileMax: 550,
  tabletMax: 1100,
  laptopMax: 1500,
};

const QUERIES = {
  mobileAndSmaller: `max-width: ${BREAKPOINTS.mobileMax / 16}rem`,
  tabletAndSmaller: `max-width: ${BREAKPOINTS.tabletMax / 16}rem`,
  laptopAndSmaller: `max-width: ${BREAKPOINTS.laptopMax / 16}rem`,
};

const validPerPageOptions = ["12", "24", "48", "76"];

const validSortOptions = [
  "alpha-desc",
  "alpha-asc",
  "rating-desc",
  "rating-asc",
  "price-desc",
  "price-asc",
];

export { QUERIES, validPerPageOptions, validSortOptions };
