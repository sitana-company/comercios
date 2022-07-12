import React, { useEffect, useState } from 'react';

import {Modal, Spin} from 'antd';

import _service from '@netuno/service-client';

function Detail({uid, onClose}) {
    const [loading, setLoading] = useState(false);
    const [visible, setVisible] = useState(false);
    const [data, setData] = useState(null);
    useEffect(() => {
        if (uid == null) {
            setVisible(false);
            setLoading(false);
            return;
        }
        setVisible(true);
        setLoading(true);
        _service({
            url: "/establishment",
            data: { uid },
            success: (response) => {
                setLoading(false);
                setData(response.json);
            },
            fail: (e) => {
                setLoading(false);
                console.log("Service Error", e);
            }
        });
    }, [uid]);

    const handleOk = () => {
    };
    
    const handleCancel = () => {
        setVisible(false);
        if (onClose) {
            onClose();
        }
    };
    return (
        <Modal title="Detalhe"
            visible={visible} 
            onOk={handleOk} 
            onCancel={handleCancel}
            footer={[]}>
            {loading && <Spin />}
            {data &&
                <>
                    <p>Nome: <strong>{data.name}</strong></p>
                    <p>E-mail: <strong>{data.email}</strong></p>
                    <p>Telefone: <strong>{data.telephone}</strong></p>
                    <p>Categoria: <strong>{data.category.name}</strong></p>
                    <p>Produtos: <strong>{
                            data.products.map(
                                (item, index) => 
                                    <>
                                        {index > 0 ? <>,&nbsp;</> : null}
                                        <strong>{item.name}</strong>
                                    </>
                            )
                        }</strong>
                    </p>
                    <p>Serviços: {
                        data.services.map(
                            (item, index) => 
                            <>
                                {index > 0 ? <>,&nbsp;</> : null}
                                <strong>{item.name}</strong>
                            </>
                        )
                        }
                    </p>
                    Contatos: 
                    <ul>
                        {
                            data.contacts.map(
                                (item) => 
                                <li>
                                    {item.description}:&nbsp;
                                    <strong>{item.contact}</strong>
                                </li>
                            )
                        }
                    </ul>
                </>
            }
        </Modal>
    );
}

export default Detail;
