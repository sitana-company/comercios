
const storage = _storage.filesystem('server', 'default.jpg')

_header.contentTypeJPG().noCache()

_out.copy(storage.inputStream())
