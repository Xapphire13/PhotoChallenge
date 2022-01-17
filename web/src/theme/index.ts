export default {
  palette: {
    background0: "#272737",
    background1: "#3F3F59",
    white: "#FFF",
    black: "#000",
    faint: "#808080",
    primary: "#F61067",
    primaryText: "#FBAAC8", // Text friendly version of primary
    modalBackdrop: "#FFFFFF44",
  },
  cornerRadius: {
    small: {
      borderRadius: "4px",
    },
    medium: {
      borderRadius: "8px",
    },
  },
  spacing: {
    "4px": "4px",
    "8px": "8px",
    "12px": "12px",
    "16px": "16px",
    "24px": "24px",
    "32px": "32px",
    "64px": "64px",
  },
  elevation: {
    primary: {
      boxShadow: "5px 5px 20px #00000055",
    },
  },
  typography: {
    base: {
      small: {
        fontSize: "12px",
        lineHeight: 1.5,
      },
      medium: {
        fontSize: "14px",
        lineHeight: 1.5,
      },
      large: {
        fontSize: "16px",
        lineHeight: 1.5,
      },
    },
    title: {
      small: {
        fontSize: "22px",
        lineHeight: 1.5,
      },
      medium: {
        fontSize: "28px",
        lineHeight: 1.5,
      },
      large: {
        fontSize: "32px",
        lineHeight: 1.5,
      },
    },
  },
  responsive: {
    /** 1280px or larger  */
    largeAndAbove: "@media screen and (min-width: 1280px)",
    /** 768px or larger  */
    mediumAndAbove: "@media screen and (min-width: 768px)",
    /** 320px or larger  */
    smallAndAbove: "@media screen and (min-width: 320px)",
  },
};
