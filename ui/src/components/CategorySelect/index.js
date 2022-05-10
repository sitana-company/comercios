import React, { useEffect, useState } from 'react';

import {Select} from "antd";

import _service from '@netuno/service-client';

function CategorySelect() {
    const [ list, setList ] = useState([]);
    useEffect(() => {
        _service({
            url: "/category/list",
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
        {JSON.stringify(list)}
        <Select style={{width: '300px'}}>
            {
                list.map((item) => {
                    return <Select.Option value={item.code}>{item.name}</Select.Option>
                })
            }
        </Select>
        </div>
    );
}

export default CategorySelect;