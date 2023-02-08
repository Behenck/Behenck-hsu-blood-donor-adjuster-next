import { theme } from '@/styles/theme'
import 'styled-components'

type ThemeType = typeof theme

declare module 'styled-components' {
  export interface DefaultTheme extends ThemeType {}
}