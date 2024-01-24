import React, { useRef, useEffect, useState } from "react";
import {
  select,
  scaleLinear,
  line,
  max,
  curveCardinal,
  axisBottom,
  axisLeft,
  zoom,
} from "d3";

import useResizeObserver from "./useResizeObserver.jsx";

const data = [];

const GraphDemo2 = ({ classes }) => {
  return (
    <div>
      <div
        className={`bg-dark bg-opacity-10 rounded-xl overflow-hidden  ${classes}`}
        style={{ overflow: "hidden" }}
      ></div>
    </div>
  );
};

export default GraphDemo2;
