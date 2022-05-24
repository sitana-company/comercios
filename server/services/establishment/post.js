
const dbCategory = _db.queryFirst(`
    SELECT * FROM categoria WHERE codigo = ?
`, _req.getString('category'))

if (dbCategory) {
    _db.insert(
        'estabelecimento',
        _val.map()
            .set('categoria_id', dbCategory.getInt('id'))
            .set('nome', _req.getString('name'))
            .set('telefone', _req.getString('telephone'))
            .set('email', _req.getString('email'))
    )
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
