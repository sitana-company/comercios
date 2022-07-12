
import { Button, Form, Input, Upload, Space, Typography, notification } from 'antd';
import { UploadOutlined, MinusCircleTwoTone, PlusOutlined } from '@ant-design/icons';

import _service from '@netuno/service-client';

import CategorySelect from './components/CategorySelect';
import ProductMultiSelect from './components/ProductMultiSelect';
import ServiceMultiSelect from './components/ServiceMultiSelect';

import logo from './logo.svg';
import './App.less';

const { Title } = Typography;

function App() {
  const onFinish = (values) => {
    const formData = new FormData();
    formData.append('category', values.category);
    formData.append('name', values.name);
    formData.append('telephone', values.telephone);
    formData.append('email', values.email);
    formData.append('products', JSON.stringify(values.products));
    formData.append('services', JSON.stringify(values.services));
    formData.append('contacts', JSON.stringify(values.contacts));
    if (values.photo && values.photo.fileList.length > 0) {
      formData.append('photo', values.photo.fileList[
        values.photo.fileList.length - 1
      ].originFileObj);
    }
    _service({
      method: 'POST',
      url: "/establishment",
      data: formData,
      success: (response) => {
        notification.success({
          message: 'Estabelecimento',
          description: 'O estabelecimento foi criado com sucesso.'
        });
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

  const uploadCustomRequest = ({file, onSuccess}) => {
    setTimeout(() => {
      onSuccess("ok");
    }, 0);
  }

  const uploadBeforeValidation = (file) => {
    const isPhoto = file.type === 'image/jpg' || file.type === 'image/jpeg';
    if (!isPhoto) {
      notification.error({
        message: 'Imagem Inválida',
        description: 'Apenas é permitido ficheiros de imagem do tipo JPG.'
      });
    }
    return isPhoto || Upload.LIST_IGNORE;
  };

  return (
    <div className="App">
      <img src={logo} className="App-logo" alt="logo" />
      <Form
        name="basic"
        initialValues={{
        }}
        onFinish={onFinish}
        autoComplete="off"
        layout="vertical"
      >
        <Form.Item
          label="Categoria"
          name="category"
          rules={[
            {
              required: true,
              message: 'Preencha a categoria!',
            },
          ]}
        >
          <CategorySelect />
        </Form.Item>

        <Form.Item
          label="Nome"
          name="name"
          rules={[
            {
              required: true,
              message: 'Preencha o seu nome!',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Telefone"
          name="telephone"
          rules={[
            {
              required: true,
              message: 'Preencha o seu telefone!',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              message: 'Preencha o seu email!',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Fotografia"
          name="photo"
        >
          <Upload customRequest={uploadCustomRequest} beforeUpload={uploadBeforeValidation}>
            <Button icon={<UploadOutlined />}>Upload</Button>
          </Upload>
        </Form.Item>

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
            Enviar
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default App;
