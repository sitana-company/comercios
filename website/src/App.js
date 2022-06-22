
import { Button, Form, Input, Upload, notification } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

import _service from '@netuno/service-client';

import CategorySelect from './components/CategorySelect';
import ProductMultiSelect from './components/ProductMultiSelect';
import ServiceMultiSelect from './components/ServiceMultiSelect';

import logo from './logo.svg';
import './App.less';

function App() {
  const onFinish = (values) => {
    const formData = new FormData();
    formData.append('category', values.category);
    formData.append('name', values.name);
    formData.append('telephone', values.telephone);
    formData.append('email', values.email);
    formData.append('products', JSON.stringify(values.products));
    formData.append('services', JSON.stringify(values.services));

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
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Form
          name="basic"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          initialValues={{
          }}
          onFinish={onFinish}
          autoComplete="off"
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
            label="Prudotos"
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

          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </header>
    </div>
  );
}

export default App;
