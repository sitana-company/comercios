
const dbEstablishment = _db.get('estabelecimento', _req.getString('uid'))
_exec.sleep(4000)
if (!dbEstablishment) {
    _header.status(404)
    _exec.stop()
}

const dbCategory = _db.get('categoria', dbEstablishment.getInt('categoria_id'))

const dbProducts = _db.query(`
    SELECT produto.* 
    FROM estabelecimento_produto
        INNER JOIN produto ON  estabelecimento_produto.produto_id = produto.id
    WHERE estabelecimento_id = ?
    `, dbEstablishment.getInt('id')
)

const dbServices = _db.query(`
    SELECT servico.* 
    FROM estabelecimento_servico
        INNER JOIN servico ON  estabelecimento_servico.servico_id = servico.id
    WHERE estabelecimento_id = ?
    `, dbEstablishment.getInt('id')
)

const data = _val.map()
    .set('uid', dbEstablishment.getString('uid'))
    .set('name', dbEstablishment.getString('nome'))
    .set('telephone', dbEstablishment.getString('telefone'))
    .set('email', dbEstablishment.getString('email'))
    .set(
        'category', 
        _val.map()
            .set('name', dbCategory.getString('nome'))
            .set('code', dbCategory.getString('codigo'))
    )

const products = _val.list()
for (const dbProduct of dbProducts) {
    products.add(
        _val.map()
            .set('name', dbProduct.getString('nome'))
            .set('code', dbProduct.getString('codigo'))
    )
}
data.set('products', products)

const services = _val.list()
for (const dbService of dbServices) {
    services.add(
        _val.map()
            .set('name', dbService.getString('nome'))
            .set('code', dbService.getString('codigo'))
    )
}
data.set('services', services)

_out.json(
    data
)
