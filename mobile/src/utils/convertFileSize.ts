export function convertFileSize(size: number) {
  if (size < 1024) return `${(size).toFixed(0)} KB`;
  if (size < 1048576) return `${(size / 1024).toFixed(0)} MB`;
  if (size < 1073741824) return `${(size / 1048576).toFixed(0)} GB`;
}