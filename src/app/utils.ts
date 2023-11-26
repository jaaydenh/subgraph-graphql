export const selectedStyle = (sortField: string, field: string) => {
  return `${sortField === field ? 'selected' : ''}`
}

export const selectedHeaderStyle = (sortField: string, field: string) => {
  return `${sortField === field ? 'selectedHeader' : ''}`
}