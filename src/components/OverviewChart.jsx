import { ResponsiveLine } from "@nivo/line";
import React from "react";

const OverviewChart = ({ data, themeCol, gridCol }) => {
  // eslint-disable-line react-hooks/exhaustive-deps
  if (!data) return <div>Data not present</div>;
  else {
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
          grid: {
            line: {
              stroke: gridCol,
              strokeWidth: 1,
              strokeDasharray: "4 4",
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
        // colors={() => themeCol}

        colors={{ scheme: "category10" }}
        margin={{ top: 50, right: 10, bottom: 100, left: 80 }}
        xScale={{ type: "point" }}
        yScale={{
          type: "linear",
          min: "auto",
          max: "auto",
          stacked: false,
          reverse: false,
        }}
        yFormat=" >-.2f"
        curve="linear"
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: -35,
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
        enableGridX={true}
        enableGridY={true}
        enableArea={false}
        areaOpacity={0.1}
        areaBaselineValue={200}
        pointSize={5}
        pointColor={{ theme: "background" }}
        pointBorderWidth={2}
        pointBorderColor={{ from: "serieColor" }}
        pointLabelYOffset={-12}
        useMesh={true}
        // animate={false}
        legends={[
          {
            anchor: "bottom-left",
            direction: "row",
            justify: false,
            translateX: 100,
            translateY: 82,
            itemsSpacing: 0,
            itemDirection: "left-to-right",
            itemWidth: 100,
            itemHeight: 20,
            itemOpacity: 0.75,
            symbolSize: 12,
            symbolShape: "circle",
            symbolBorderColor: "rgba(0, 0, 0, .5)",
            effects: [
              {
                on: "hover",
                style: {
                  itemBackground: "rgba(0, 0, 0, .03)",
                  itemOpacity: 1,
                },
              },
            ],
          },
        ]}
      />
    );
  }
};

export default OverviewChart;
