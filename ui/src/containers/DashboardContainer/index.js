import React, { useState, useEffect, useRef } from "react";

import {Row, Col} from "antd";

import CategorySelect from "../../components/CategorySelect";
import EstablishmentAutoComplete from "../../components/EstablishmentAutoComplete";
import EstablishmentTable from "../../components/EstablishmentTable";

import "./index.less";

function DashboardContainer() {
  const [ categoryCode, setCategoryCode ] = useState(null);
  const onCategoryChange = (newCategoryCode) => {
    setCategoryCode(newCategoryCode);
    console.log('Dashboard > newCategoryCode', newCategoryCode);
  };
  return (
    <div className="my-dashboard">
      <Row>
        <Col md={12}>
          <p>Categoria</p>
          <CategorySelect onChange={onCategoryChange} />
        </Col>
        <Col md={12}>
          <p>Estabelecimento</p>
          <EstablishmentAutoComplete categoryCode={categoryCode} />
        </Col>
      </Row>
      <hr/>
      <p>Tabela</p>
      <EstablishmentTable />
    </div>
  );
}

export default DashboardContainer;