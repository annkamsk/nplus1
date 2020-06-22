import Typography from "typography"
import fairyGatesTheme from "typography-theme-fairy-gates"
fairyGatesTheme.overrideThemeStyles = () => ({
  body: {
    fontFamily: "Lato, sans-serif",
    fontWeight: 100,
    lineHeight: 1.40
  },
  h3: {
    color: "pink",
    fontFamily: "Lato, sans-serif",
    fontWeight: 900,
    letterSpacing: "0.3rem",
  },
  h4: {
    color: "white",
    fontFamily: "Lato, sans-serif",
    textTransform: "uppercase",
  },
  em: {
    fontStyle: "italic",
    letterSpacing: "0.1rem"
  }
})

const typography = new Typography(fairyGatesTheme)

export default typography
export const rhythm = typography.rhythm