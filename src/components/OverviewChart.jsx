import { ResponsiveLine } from "@nivo/line";
import React from "react";

const OverviewChart = ({ data, themeCol }) => {
  // eslint-disable-line react-hooks/exhaustive-deps
  if (!data) return <div>Data not present</div>;
  else
    return (
      <ResponsiveLine
        data={data}
        theme={{
          axis: {
            domain: {
              line: {
                stroke: themeCol,
              },
            },
            legend: {
              text: {
                fill: themeCol,
              },
            },
            ticks: {
              line: {
                stroke: themeCol,
                strokeWidth: 1,
              },
              text: {
                fill: themeCol,
              },
            },
          },
          legends: {
            text: {
              fill: themeCol,
            },
          },
          tooltip: {
            container: {
              color: "dark",
            },
          },
        }}
        colors={() => themeCol}
        margin={{ top: 50, right: 80, bottom: 80, left: 80 }}
        xScale={{ type: "point" }}
        yScale={{
          type: "linear",
          min: "auto",
          max: "auto",
          stacked: true,
          reverse: false,
        }}
        yFormat=" >-.2f"
        curve="linear"
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: -45,
          legend: "",
          legendOffset: 36,
          legendPosition: "middle",
        }}
        axisLeft={{
          orient: "bottom",
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "Close",
          legendOffset: -40,
          legendPosition: "middle",
        }}
        enableGridX={false}
        enableGridY={false}
        pointSize={5}
        pointColor={{ theme: "background" }}
        pointBorderWidth={2}
        pointBorderColor={{ from: "serieColor" }}
        pointLabelYOffset={-12}
        useMesh={true}
        // animate={false}
        legends={
          undefined
          //   [
          //   {
          //     anchor: "bottom-right",
          //     direction: "column",
          //     justify: false,
          //     translateX: 100,
          //     translateY: 0,
          //     itemsSpacing: 0,
          //     itemDirection: "left-to-right",
          //     itemWidth: 80,
          //     itemHeight: 20,
          //     itemOpacity: 0.75,
          //     symbolSize: 12,
          //     symbolShape: "circle",
          //     symbolBorderColor: "rgba(0, 0, 0, .5)",
          //     effects: [
          //       {
          //         on: "hover",
          //         style: {
          //           itemBackground: "rgba(0, 0, 0, .03)",
          //           itemOpacity: 1,
          //         },
          //       },
          //     ],
          //   },
          // ]
        }
      />
    );
};

export default OverviewChart;
