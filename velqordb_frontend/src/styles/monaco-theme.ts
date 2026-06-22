import type { editor } from 'monaco-editor'

export const velqorLightTheme: editor.IStandaloneThemeData = {
  base: 'vs',
  inherit: true,
  rules: [
    { token: 'keyword.sql', foreground: '2563EB', fontStyle: 'bold' },
    { token: 'string.sql', foreground: '10B981' },
    { token: 'number.sql', foreground: 'F59E0B' },
    { token: 'comment.sql', foreground: '64748B', fontStyle: 'italic' },
    { token: 'operator.sql', foreground: '0F172A' },
    { token: 'identifier.sql', foreground: '14B8A6' },
  ],
  colors: {
    'editor.background': '#FFFFFF',
    'editor.foreground': '#0F172A',
    'editorLineNumber.foreground': '#94A3B8',
    'editorLineNumber.activeForeground': '#64748B',
    'editorGutter.background': '#F8FAFC',
    'editor.selectionBackground': '#DBEAFE',
    'editor.lineHighlightBackground': '#F8FAFC',
    'editorCursor.foreground': '#2563EB',
    'editorIndentGuide.background': '#E2E8F0',
    'editorIndentGuide.activeBackground': '#CBD5E1',
  },
}
