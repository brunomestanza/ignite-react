import 'styled-components'
import { defaultTheme } from '../styles/themes/default'

type ThemeType = typeof defaultTheme

declare module 'styled-components' {
  // Sobreescreve a tipagem do styled-components para utilizarmos o theme
  export interface DefaultTheme extends ThemeType {}
}
