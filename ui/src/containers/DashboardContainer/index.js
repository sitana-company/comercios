import React, { useState, useEffect, useRef } from "react";

import CategorySelect from "../../components/CategorySelect";
import EstablishmentTable from "../../components/EstablishmentTable";

import "./index.less";

function DashboardContainer() {
  return (
    <div className="my-dashboard">
      <CategorySelect />
      <EstablishmentTable />
    </div>
  );
}

export default DashboardContainer;