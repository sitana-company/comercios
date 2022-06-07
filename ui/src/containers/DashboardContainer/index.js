import React, { useState, useEffect, useRef } from "react";

import CategorySelect from "../../components/CategorySelect";
import EstablishmentAutoComplete from "../../components/EstablishmentAutoComplete";
import EstablishmentTable from "../../components/EstablishmentTable";

import "./index.less";

function DashboardContainer() {
  return (
    <div className="my-dashboard">
      <p>Categoria</p>
      <CategorySelect />
      <p>Auto Complete</p>
      <EstablishmentAutoComplete />
      <p>Tabela</p>
      <EstablishmentTable />
    </div>
  );
}

export default DashboardContainer;