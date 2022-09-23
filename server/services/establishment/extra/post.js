
const dbEstablishment = _db.get('estabelecimento', _req.getString('uid'))

if (!dbEstablishment) {
    _header.status(404)
    _out.json(
        _val.map()
            .set('error', true)
            .set('code', 'establishment-not-found')
    )
    _exec.stop()
}

const dbEstablishmentID = dbEstablishment.getInt('id')

const productsCodes = _req.getValues('products')
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

const servicesCodes = _req.getValues('services')
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

const contacts = _req.getValues('contacts')
for (const fields of contacts) {
    _db.insert(
        'estabelecimento_contato',
        _val.map()
            .set('estabelecimento_id', dbEstablishmentID)
            .set('descricao', fields.getString('description'))
            .set('contato', fields.getString('contact'))
    )
}

_out.json(
    _val.map()
        .set('result', true)
)
