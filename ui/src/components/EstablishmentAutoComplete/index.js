import React, { useEffect, useState } from 'react';

import {AutoComplete} from "antd";

import _service from '@netuno/service-client';

function EstablishmentAutoComplete() {
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

    const onSearch = (value) => {
        _service({
            url: "/establishment/list",
            data: {search: value},
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
            <AutoComplete 
                style={{width: '300px'}}
                onSearch={onSearch}
            >
                {
                    list.map((item) => {
                        return (
                            <AutoComplete.Option value={item.uid}>
                                {item.name}
                                &nbsp;-&nbsp;
                                {item.category.name}
                            </AutoComplete.Option>
                        );
                    })
                }
            </AutoComplete>
        </div>
    );
}

export default EstablishmentAutoComplete;