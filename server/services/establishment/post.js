
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

    const productsCodes = _val.fromJSON(_req.getString('products'))
    for (const productCode of productsCodes) {
        const dbProduct = _db.queryFirst(`
            SELECT * FROM produto WHERE codigo = ?
        `, productCode)
        if (dbProduct) {
            _db.insert(
                'estabelecimento_produto',
                _val.map()
                    .set('estabelecimento_id', dbEstablishmentID)
                    .set('produto_id', dbProduct.getInt('id'))
            )
        }
    }

    const servicesCodes = _val.fromJSON(_req.getString('services'))
    for (const serviceCode of servicesCodes) {
        const dbService = _db.queryFirst(`
            SELECT * FROM servico WHERE codigo = ?
        `, serviceCode)
        if (dbService) {
            _db.insert(
                'estabelecimento_servico',
                _val.map()
                    .set('estabelecimento_id', dbEstablishmentID)
                    .set('servico_id', dbService.getInt('id'))
            )
        }
    }

    _out.json(
        _val.map()
            .set('result', true)
    )
} else {
    _header.status(404)
    _out.json(
        _val.map()
            .set('error', true)
            .set('code', 'category-not-found')
    )
}
