import * as d3 from "d3";
import { useEffect, useRef } from "react";
import styled from "styled-components";
import { tablet } from "../../utils/style";

const LegendContainer = styled.div`
  display: flex;
  align-items: center;
  position: absolute;
  top: 30px;
  right: 10px;
  z-index: 2;

  @media screen and (max-width: ${tablet}px) {
    top: 15px;
    left: -15px;
  }
`;
export default function ColorLegend(): JSX.Element {
  const legendWidth = 100;
  const legendHeight = 8;
  const cScale = d3
    .scaleDiverging(d3.interpolateRdBu)
    .domain([0.45, 0.5, 0.55]);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current && !containerRef.current.querySelector("svg")) {
      const margins = { top: 30, right: 20, bottom: 10, left: 30 };
      const svg = d3
        .select(containerRef.current)
        .append("svg")
        .attr("width", legendWidth + margins.left + margins.right) // Add extra width for labels
        .attr("height", legendHeight + margins.top + margins.bottom); // Add extra height for labels

      const defs = svg.append("defs");
      const linearGradient = defs
        .append("linearGradient")
        .attr("id", "linear-gradient");
      const ticks: number[] = [];
      for (let i = 0.45; i <= 0.55; i = i + 0.01) {
        ticks.push(i);
      }
      linearGradient
        .selectAll("stop")
        .data(
          ticks.map((t, i, n) => ({
            offset: `${(100 * i) / n.length}%`,
            color: cScale(t),
          }))
        )
        .enter()
        .append("stop")
        .attr("offset", (d) => d.offset)
        .attr("stop-color", (d) => d.color);

      const g = svg
        .append("g")
        .attr("transform", `translate(${margins.left}, ${margins.top})`);

      g.append("rect")
        .attr("x", 0)
        .attr("y", -5)
        .attr("width", legendWidth)
        .attr("height", legendHeight)
        .style("fill", "url(#linear-gradient)");

      // Add percentage labels
      const displayTicks = [0.45, 0.5, 0.55];

      g.selectAll("text")
        .data(displayTicks)
        .enter()
        .append("text")
        .attr("x", (_, i, n) => (legendWidth * i) / (n.length - 1))
        .attr("y", legendHeight + 10)
        .attr("text-anchor", "middle")
        .attr("font-size", "10px")
        .text((d) => `${(d * 100).toFixed(0)}%`)
        .attr("fill", "white");

      g.append("text")
        .attr("x", -10)
        .attr("y", -15)
        .attr("font-size", "10px")
        .text("% of female population")
        .attr("text-anchor", "start")
        .attr("fill", "white");
    }
  }, [cScale]);

  return <LegendContainer ref={containerRef}></LegendContainer>;
}
