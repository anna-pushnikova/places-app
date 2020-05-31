export default function loadFile(file, reader) {
  const boundary = '-------314159265358979323846'
  const delimiter = "\r\n--" + boundary + "\r\n"
  const close_delim = "\r\n--" + boundary + "--"

  const contentType = file.type || 'application/octet-stream'
  const metadata = {
    'name': file.name,
    'mimeType': contentType
  }

  const base64Data = btoa(reader.result)
    
  const multipartRequestBody =
    delimiter +
    'Content-Type: application/json\r\n\r\n' +
    JSON.stringify(metadata) +
    delimiter +
    'Content-Type: ' + contentType + '\r\n' +
    'Content-Transfer-Encoding: base64\r\n' +
    '\r\n' +
    base64Data +
    close_delim

  return multipartRequestBody
}


