import { useCallback } from 'react'
import Editor from '@monaco-editor/react'
import type { editor } from 'monaco-editor'
import * as monaco from 'monaco-editor'
import { velqorLightTheme } from '@/styles/monaco-theme'

monaco.editor.defineTheme('velqor-light', velqorLightTheme)

interface SqlEditorProps {
  value: string
  onChange: (value: string) => void
  onRun?: () => void
  onFormat?: () => void
  readOnly?: boolean
  height?: string
}

export function SqlEditor({ value, onChange, onRun, onFormat, readOnly, height = '100%' }: SqlEditorProps) {
  const handleMount = useCallback(
    (ed: editor.IStandaloneCodeEditor) => {
      ed.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter, () => onRun?.())
      ed.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyMod.Shift | monaco.KeyCode.KeyF, () => onFormat?.())
    },
    [onRun, onFormat],
  )

  return (
    <Editor
      height={height}
      language="sql"
      theme="velqor-light"
      value={value}
      onChange={(v) => onChange(v ?? '')}
      onMount={handleMount}
      options={{
        readOnly,
        minimap: { enabled: false },
        fontSize: 13,
        fontFamily: '"Geist Mono", ui-monospace, monospace',
        lineNumbers: 'on',
        scrollBeyondLastLine: false,
        wordWrap: 'on',
        padding: { top: 12, bottom: 12 },
        renderLineHighlight: 'line',
        scrollbar: { verticalScrollbarSize: 8, horizontalScrollbarSize: 8 },
      }}
    />
  )
}
