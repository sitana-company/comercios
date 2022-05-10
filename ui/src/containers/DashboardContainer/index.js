import React, { useState, useEffect, useRef } from "react";

import CategorySelect from "../../components/CategorySelect";

import "./index.less";

function DashboardContainer() {
  return (
    <div className="my-dashboard">
      <CategorySelect />
    </div>
  );
}

export default DashboardContainer;