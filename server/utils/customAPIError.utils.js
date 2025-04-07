
export const customAPIError = (code, message, at) => {
  const error = new Error(message)
  error.code = code
  error.at = at
  return error
}