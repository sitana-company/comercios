import React, { useEffect, useState } from 'react';

import {Table, Tag, Button} from "antd";

import _service from '@netuno/service-client';

import Detail from './Detail';

function EstablishmentTable() {
    const [ list, setList ] = useState([]);
    const [ detailUID, setDetailUID ] = useState(null);
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
      {
        title: 'Ações',
        key: 'action',
        render: (_, record) => (
          <>
          <Button onClick={() => onDetail(record.uid) }>Detalhes</Button>
          </>
        ),
      },
    ];
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
    const onDetail = (uid) => {
      setDetailUID(uid);
    }
    return (
        <div>
            <Table columns={columns} dataSource={list} />
            <Detail uid={detailUID} onClose={() => setDetailUID(null) } />
        </div>
    );
}

export default EstablishmentTable;