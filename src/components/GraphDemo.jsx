import React from "react";
// import OverviewChart from "./OverviewChart";
import dynamic from "next/dynamic";

const OverviewChart = dynamic(() => import("./OverviewChart"), {
  ssr: false,
});

const data = [
  {
    id: "japan",
    color: "hsl(174, 70%, 50%)",
    data: [
      {
        x: "plane",
        y: 244,
      },
      {
        x: "helicopter",
        y: 31,
      },
      {
        x: "boat",
        y: 213,
      },
      {
        x: "train",
        y: 14,
      },
      {
        x: "subway",
        y: 19,
      },
      {
        x: "bus",
        y: 261,
      },
      {
        x: "car",
        y: 205,
      },
      {
        x: "moto",
        y: 28,
      },
      {
        x: "bicycle",
        y: 159,
      },
      {
        x: "horse",
        y: 283,
      },
      {
        x: "skateboard",
        y: 155,
      },
      {
        x: "others",
        y: 117,
      },
    ],
  },
  {
    id: "france",
    color: "hsl(152, 70%, 50%)",
    data: [
      {
        x: "plane",
        y: 165,
      },
      {
        x: "helicopter",
        y: 121,
      },
      {
        x: "boat",
        y: 9,
      },
      {
        x: "train",
        y: 233,
      },
      {
        x: "subway",
        y: 5,
      },
      {
        x: "bus",
        y: 15,
      },
      {
        x: "car",
        y: 220,
      },
      {
        x: "moto",
        y: 95,
      },
      {
        x: "bicycle",
        y: 113,
      },
      {
        x: "horse",
        y: 123,
      },
      {
        x: "skateboard",
        y: 95,
      },
      {
        x: "others",
        y: 128,
      },
    ],
  },
  {
    id: "us",
    color: "hsl(10, 70%, 50%)",
    data: [
      {
        x: "plane",
        y: 288,
      },
      {
        x: "helicopter",
        y: 121,
      },
      {
        x: "boat",
        y: 43,
      },
      {
        x: "train",
        y: 208,
      },
      {
        x: "subway",
        y: 234,
      },
      {
        x: "bus",
        y: 296,
      },
      {
        x: "car",
        y: 139,
      },
      {
        x: "moto",
        y: 200,
      },
      {
        x: "bicycle",
        y: 273,
      },
      {
        x: "horse",
        y: 127,
      },
      {
        x: "skateboard",
        y: 219,
      },
      {
        x: "others",
        y: 145,
      },
    ],
  },
  {
    id: "germany",
    color: "hsl(93, 70%, 50%)",
    data: [
      {
        x: "plane",
        y: 296,
      },
      {
        x: "helicopter",
        y: 211,
      },
      {
        x: "boat",
        y: 197,
      },
      {
        x: "train",
        y: 245,
      },
      {
        x: "subway",
        y: 6,
      },
      {
        x: "bus",
        y: 149,
      },
      {
        x: "car",
        y: 130,
      },
      {
        x: "moto",
        y: 247,
      },
      {
        x: "bicycle",
        y: 274,
      },
      {
        x: "horse",
        y: 282,
      },
      {
        x: "skateboard",
        y: 121,
      },
      {
        x: "others",
        y: 9,
      },
    ],
  },
  {
    id: "norway",
    color: "hsl(95, 70%, 50%)",
    data: [
      {
        x: "plane",
        y: 210,
      },
      {
        x: "helicopter",
        y: 285,
      },
      {
        x: "boat",
        y: 131,
      },
      {
        x: "train",
        y: 111,
      },
      {
        x: "subway",
        y: 269,
      },
      {
        x: "bus",
        y: 201,
      },
      {
        x: "car",
        y: 89,
      },
      {
        x: "moto",
        y: 278,
      },
      {
        x: "bicycle",
        y: 139,
      },
      {
        x: "horse",
        y: 106,
      },
      {
        x: "skateboard",
        y: 79,
      },
      {
        x: "others",
        y: 182,
      },
    ],
  },
];
const GraphDemo = () => {
  return (
    <div className="border-solid border-dark border-2 h-[500px]">
      GB
      <OverviewChart data={data} />
    </div>
  );
};

export default GraphDemo;
