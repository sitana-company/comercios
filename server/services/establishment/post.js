
const dbCategory = _db.queryFirst(`
    SELECT * FROM categoria WHERE codigo = ?
`, _req.getString('category'))

/*
if (_req.getFile('photo')) {
    const photo = _req.getFile('photo')
    const storage = _storage.filesystem('server', photo.getName())
    photo.save(storage)
}*/

const storage = _storage.filesystem('server', 'default.jpg')

if (dbCategory) {
    const dbEstablishmentID = _db.insert(
        'estabelecimento',
        _val.map()
            .set('categoria_id', dbCategory.getInt('id'))
            .set('nome', _req.getString('name'))
            .set('telefone', _req.getString('telephone'))
            .set('email', _req.getString('email'))
            .set('fotografia', _req.getFile('photo') || storage.file())
    )

    const dbEstablishment = _db.get('estabelecimento', dbEstablishmentID)

    _out.json(
        _val.map()
            .set('result', true)
            .set('uid', dbEstablishment.getString('uid'))
    )
} else {
    _header.status(404)
    _out.json(
        _val.map()
            .set('error', true)
            .set('code', 'category-not-found')
    )
}
