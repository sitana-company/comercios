import React, { useEffect, useState } from 'react';

import {Select} from "antd";

import _service from '@netuno/service-client';

function EstablishmentAutoComplete({categoryCode}) {
    const [ list, setList ] = useState([]);

    useEffect(() => {
        _service({
            url: "/establishment/list",
            data: {categoryCode},
            success: (response) => {
                setList(response.json);
            },
            fail: (e) => {
                console.log("Service Error", e);
            }
        });
    }, [categoryCode]);

    const onSearch = (value) => {
        _service({
            url: "/establishment/list",
            data: {search: value, categoryCode},
            success: (response) => {
                setList(response.json);
            },
            fail: (e) => {
                console.log("Service Error", e);
            }
        });
    };
    
    return (
        <div>
            <Select 
                style={{width: '80%'}}
                onSearch={onSearch}
                filterOption={(input, option) => true}
                showSearch
                allowClear
            >
                {
                    list.map((item) => {
                        return (
                            <Select.Option value={item.uid}>
                                {item.name}
                                &nbsp;-&nbsp;
                                {item.category.name}
                            </Select.Option>
                        );
                    })
                }
            </Select>
        </div>
    );
}

export default EstablishmentAutoComplete;