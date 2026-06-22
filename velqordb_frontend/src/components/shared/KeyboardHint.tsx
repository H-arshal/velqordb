interface KeyboardHintProps {
  keys: string[]
  label?: string
}

export function KeyboardHint({ keys, label }: KeyboardHintProps) {
  return (
    <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
      {label && <span>{label}</span>}
      {keys.map((key) => (
        <kbd key={key}>{key}</kbd>
      ))}
    </span>
  )
}
