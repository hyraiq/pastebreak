import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import { globalIgnores } from 'eslint/config'

export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs['recommended-latest'],
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
  },

  // Source: https://github.com/shadcn-ui/ui/issues/1534#issuecomment-2820638787
  {
    files: ['**/ui/**/*.ts', '**/ui/**/*.tsx', '**/tools/theme-provider.tsx'],
    rules: {
      'react-refresh/only-export-components': 'off',
    },
  }
])
