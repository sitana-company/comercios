import React, { useEffect, useState } from 'react';

import {Table, Tag} from "antd";

import _service from '@netuno/service-client';

const columns = [
    {
      title: 'Nome',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Telefone',
      dataIndex: 'telephone',
      key: 'telephone',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Categoria',
      dataIndex: 'category',
      key: 'category',
      render: (category) => {
          let color = 'red';
          if (category.code == 'farmacia') {
            color = 'blue';
          } else if (category.code == 'bar') {
            color = 'green';
          }
          return <Tag color={color}>
            {category.name}
          </Tag>
      }
    },
  ];

function EstablishmentTable() {
    const [ list, setList ] = useState([]);
    useEffect(() => {
        _service({
            url: "/establishment/list",
            success: (response) => {
                setList(response.json);
            },
            fail: (e) => {
                console.log("Service Error", e);
            }
        });
    }, []);
    
    return (
        <div>
            <Table columns={columns} dataSource={list} />
        </div>
    );
}

export default EstablishmentTable;