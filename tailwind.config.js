/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./node_modules/tw-elements/dist/js/**/*.{js,jsx,ts,tsx}"],
  variants: {
    extend: {
      // ...
     transitionTimingFunction: ['hover', 'focus'],
    }
  },
  theme: {
    extend: {
      colors: {
        orange: "#f99a0e",
        gray: {
          "100": "#8e8e94",
          "200": "rgba(0, 0, 0, 0.6)",
          "300": "rgba(0, 0, 0, 0.87)",
          "400": "rgba(0, 0, 0, 0.23)",
          "500": "rgba(255, 255, 255, 0.2)",
        },
        softblue:"#78A7FF",
        blue:" #306FC7",
        aliceblue: "#416EC1",
        whitesmoke: "#eaeaea",
        saddlebrown: "#99600a",
        peru: "#9e6104",
        "primary-contrast": "#fff",
        slategray: "#F4F9FD",
        darkslategray: {
          "100": "#434343",
          "200": "#424242",
          "300": "#303030",
        },
        cornflowerblue: {
          "100": "#4dabff",
          "200": "#1262af",
          "300": "#1262ae",
        },
        gainsboro: {
          "100": "#e0e0e0",
          "200": "rgba(226, 226, 226, 0.1)",
        },
        lavender: "#ccdcec",
        darkgray: "#999",
        yellowgreen: "#79ca00",
        gold: "#fdbf00",
        sandybrown: "#ff9b53",
        lightgray: "#cecece",
        silver: "#bdbdbd",
        dimgray: "#616161",
        skyblue: "#8DBCFD",
        peach:"#FF7B7B",
        slate:"#EFEFEF",
        lightBlue:"#F4F9FD",
        red:"#FF0000",
        green:"#2CAB00",
        lightYellow:"#FFF6D4",
        yellow:"#F9C718",
        navy:"#6488ea",
        darkBlue:"#002962"
      },
      transitionTimingFunction: {
        'in-expo': 'cubic-bezier(0.95, 0.05, 0.795, 0.035)',
        'out-expo': 'cubic-bezier(0.19, 1, 0.22, 1)',
       },
      // transitionTimingFunction: ['hover', 'focus'],
      borderColor: ['active'],
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      },
      borderRadius: {
        "10xs": "3px",
        "4xl-2": "23.2px",
        "5xs-5": "7.5px",
        xs: "12px",
        "28xl-8": "47.8px",
        'none': '0',
        'sm': '0.125rem',
        'md': '0.375rem',
        'lg': '0.5rem',
        'full': '9999px',
        'large': '12px',
        '2xl':'20px'
      },
    },
    fontSize: {
      sm: '0.8rem',
      base: '1rem',
      lg:'1.125rem',
      xl: '1.25rem',
      '2xl': '1.563rem',
      '3xl': '1.953rem',
      '4xl': '2.441rem',
      '5xl': '3.052rem',
    },
    opacity: {
      '67': '.67',
      '40':'.47'
    },
    fontWeight: {
      thin: '100',
      hairline: '100',
      extralight: '200',
      light: '300',
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
      extrabold: '800',
      'extra-bold': '800',
      black: '900',
    },
    borderWidth: {
      '1': '1px',
      '0': '0',
      '2': '2px',
      '3': '3px',
      '4': '4px',
      '5': '5px',
      '6': '6px',
      '8': '8px',
    },
    lineHeight: {
      'extra-loose': '2.5',
      '12': '3rem',
      '7':'1.75rem'
    },
    borderSpacing: {
      '7': '1rem',
    },
    outlineWidth: {
      1:'1px',
      5: '5px',
    },
    // screens: {
      
    //   '3xl': '1920px',
    // },
  },
  corePlugins: {
    preflight: false,
    
  },
};
