import React from 'react';

import { Button, Form, Input, Typography, Space, notification } from 'antd';
import { MinusCircleTwoTone, PlusOutlined } from '@ant-design/icons';

import _service from '@netuno/service-client';

import ProductMultiSelect from '../../components/ProductMultiSelect';
import ServiceMultiSelect from '../../components/ServiceMultiSelect';

const { Title } = Typography;

function ExtraForm({ establishmentUID, onEnd }) {
    const onFinish = (values) => {
        _service({
            method: 'POST',
            url: "/establishment/extra",
            data: { ...values, uid: establishmentUID },
            success: (response) => {
                notification.success({
                    message: 'Estabelecimento',
                    description: 'O estabelecimento foi criado com sucesso.'
                });
                if (onEnd) {
                    onEnd();
                }
            },
            fail: (e) => {
                console.error("Service Error", e);
                notification.error({
                    message: 'Estabelecimento',
                    description: 'Não foi possível criar o estabelecimento.'
                });
            }
        });
    };
    return (
        <div>
            <Form
                name="basic"
                initialValues={{
                }}
                onFinish={onFinish}
                autoComplete="off"
                layout="vertical"
            >
                <Form.Item
                label="Produtos"
                name="products"
                rules={[
                    {
                    required: true,
                    message: 'Preencha os produtos!',
                    },
                ]}
                >
                    <ProductMultiSelect />
                </Form.Item>

                <Form.Item
                label="Serviços"
                name="services"
                rules={[
                    {
                    required: true,
                    message: 'Preencha os serviços!',
                    },
                ]}
                >
                    <ServiceMultiSelect />
                </Form.Item>
                <Title level={5}>Outros Contatos</Title>
                <Form.List name="contacts">
                {(fields, { add, remove }) => (
                    <>
                    {fields.map(({ key, name, ...restField }) => (
                        <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline" size="large">
                        <Form.Item
                            {...restField}
                            name={[name, 'description']}
                            rules={[{ required: true, message: 'Falta preencher a descrição.' }]}
                        >
                            <Input placeholder="Descrição..." />
                        </Form.Item>
                        <Form.Item
                            {...restField}
                            name={[name, 'contact']}
                            rules={[{ required: true, message: 'Falta preencher a contato.' }]}
                        >
                            <Input placeholder="Contato..." />
                        </Form.Item>
                        <MinusCircleTwoTone twoToneColor="#eb2f96" onClick={() => remove(name)} />
                        </Space>
                    ))}
                    <Form.Item>
                        <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                        Adicionar
                        </Button>
                    </Form.Item>
                    </>
                )}
                </Form.List>

                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Próximo
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
}

export default ExtraForm;