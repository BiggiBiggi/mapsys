import { deepmerge } from "@mui/utils";

const defaultThemeInvariants = {
  typography: {
    h6: {
      fontWeight: 400,
    },
  },
  sidebar: {
    width: 240,
    closedWidth: 50,
  },
  components: {
    MuiAutocomplete: {
      defaultProps: {
        fullWidth: true,
      },
      variants: [
        {
          props: {},
          style: ({ theme }) => ({
            [theme.breakpoints.down("sm")]: { width: "100%" },
          }),
        },
      ],
    },
    MuiTextField: {
      defaultProps: {
        variant: "filled",
        margin: "dense",
        size: "large",
        fullWidth: true,
      },
      variants: [
        {
          props: {},
          style: ({ theme }) => ({
            [theme.breakpoints.down("sm")]: { width: "100%" },
          }),
        },
      ],
    },
    MuiFormControl: {
      defaultProps: {
        variant: "filled",
        margin: "dense",
        size: "small",
        fullWidth: true,
      },
    },
    RaSimpleFormIterator: {
      defaultProps: {
        fullWidth: true,
      },
    },
    RaTranslatableInputs: {
      defaultProps: {
        fullWidth: true,
      },
    },
  },
};

export const defaultLightTheme = deepmerge(defaultThemeInvariants, {
  palette: {
    background: {
      default: "#566b73",
    },
    secondary: {
      light: "#6ec6ff",
      main: "#24323e",
      dark: "#566b73",
      contrastText: "#66e4f2",
    },
  },
  components: {
    MuiFilledInput: {
      styleOverrides: {
        root: {
          backgroundColor: "rgba(0, 0, 0, 0.04)",
          "&$disabled": {
            backgroundColor: "rgba(0, 0, 0, 0.04)",
          },
        },
      },
    },
  },
});

export const defaultDarkTheme = deepmerge(defaultThemeInvariants, {
  palette: {
    mode: "dark",
    primary: {
      main: "#90caf9",
    },
    background: {
      default: "#313131",
    },
  },
});

export const defaultTheme = defaultLightTheme;
