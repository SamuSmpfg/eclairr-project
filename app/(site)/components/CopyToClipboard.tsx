export const CopyToClipboard = (text: string) => {
  if (!navigator.clipboard) {
    return
  }

  return navigator.clipboard.writeText(text)
  .catch(() => {
    console.error('Navigator Clipboard: Could not copy Text')
  })
}