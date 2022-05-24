
import CategorySelect from './components/CategorySelect';
import { Button, Form, Input, notification } from 'antd';

import _service from '@netuno/service-client';

import logo from './logo.svg';
import './App.less';

function App() {
  const onFinish = (values) => {
    _service({
      method: 'POST',
      url: "/establishment",
      data: values,
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
