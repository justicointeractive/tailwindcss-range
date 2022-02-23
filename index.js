const plugin = require("tailwindcss/plugin");
const {
  default: flattenColorPalette,
} = require("tailwindcss/lib/util/flattenColorPalette");
const { parseColor, formatColor } = require("tailwindcss/lib/util/color");

function colorWithAlpha(color, alpha) {
  color = parseColor(color);
  if (color == null) {
    return null;
  }
  color.alpha = alpha;
  return formatColor(color);
}

module.exports = plugin(
  function ({ addDefaults, matchUtilities, addComponents, theme }) {
    addDefaults("range-slider", {
      "--tw-range-slider-thumb-color": "#0375fe",
      "--tw-range-slider-thumb-glow-opacity": "0.25",
      "--tw-range-slider-thumb-box-shadow-color": colorWithAlpha(
        "#0375fe",
        "var(--tw-range-slider-thumb-glow-opacity)"
      ),
      "--tw-range-slider-thumb-box-shadow-blur": "0",
      "--tw-range-slider-thumb-box-shadow-spread": "3px",
      "--tw-range-slider-thumb-box-shadow":
        "0 0 var(--tw-range-slider-thumb-box-shadow-blur) var(--tw-range-slider-thumb-box-shadow-spread) var(--tw-range-slider-thumb-box-shadow-color)",
      "--tw-range-slider-thumb-size": "1em",

      "--tw-range-slider-track-progress": "0",
      "--tw-range-slider-track-progress-color": "#ffffff",
      "--tw-range-slider-track-color": "#efefef",
      "--tw-range-slider-track-height": "0.5em",
    });

    matchUtilities(
      {
        "range-slider-thumb": (value) => {
          return {
            "--tw-range-slider-thumb-color": value,
            "--tw-range-slider-thumb-box-shadow-color": colorWithAlpha(
              value,
              "var(--tw-range-slider-thumb-glow-opacity)"
            ),
          };
        },
        "range-slider-track": (value) => {
          return {
            "--tw-range-slider-track-color": value,
          };
        },
        "range-slider-track-progress": (value) => {
          return {
            "--tw-range-slider-track-progress-color": value,
          };
        },
      },
      {
        values: flattenColorPalette(theme("rangeSliderColor")),
        type: ["color"],
      }
    );

    matchUtilities(
      {
        "range-slider-thumb": (value) => {
          return {
            "--tw-range-slider-thumb-size": value,
          };
        },
        "range-slider-track": (value) => {
          return {
            "--tw-range-slider-track-height": value,
          };
        },
      },
      {
        type: ["length"],
      }
    );

    const thumb = {
      appearance: "none",
      backgroundColor: "var(--tw-range-slider-thumb-color)",
      height: "var(--tw-range-slider-thumb-size)",
      width: "var(--tw-range-slider-thumb-size)",
      borderRadius: "var(--tw-range-slider-thumb-size)",
    };

    const track = {
      appearance: "none",
      background:
        "linear-gradient(to right, var(--tw-range-slider-track-progress-color) var(--tw-range-slider-track-progress)%, var(--tw-range-slider-track-color) var(--tw-range-slider-track-progress)%)",
      height: "var(--tw-range-slider-track-height)",
      borderRadius: "var(--tw-range-slider-track-height)",
    };

    addComponents({
      ".range-slider": {
        "@defaults range-slider": {},
        backgroundColor: "transparent",
        appearance: "none",
        height: "calc(var(--tw-range-slider-thumb-size))",

        "&::-webkit-slider-thumb": {
          ...thumb,
          marginTop:
            "calc((var(--tw-range-slider-track-height) - var(--tw-range-slider-thumb-size)) * 0.5)",
        },
        "&:focus::-webkit-slider-thumb": {
          boxShadow: "var(--tw-range-slider-thumb-box-shadow)",
        },
        "&::-webkit-slider-runnable-track": track,
        "&::-moz-range-thumb": thumb,
        "&::-moz-range-track": track,
      },
    });
  },
  {
    theme: {
      rangeSliderColor: ({ theme }) => theme("colors"),
    },
  }
);
