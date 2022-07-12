import React, { useEffect, useState } from 'react';

import {Select} from "antd";

import _service from '@netuno/service-client';

function ServiceMultiSelect(props) {
    const [ list, setList ] = useState([]);
    useEffect(() => {
        _service({
            url: "/service/list",
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
            <Select mode="multiple" style={{width: '100%'}} {...props}>
                {
                    list.map((item) => {
                        return <Select.Option value={item.code}>{item.name}</Select.Option>
                    })
                }
            </Select>
        </div>
    );
}

export default ServiceMultiSelect;