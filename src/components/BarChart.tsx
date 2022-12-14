import { Box } from "@mui/material";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
  ChartData,
  ChartOptions,
} from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  ChartDataLabels
);

const barChartOptions: ChartOptions<"bar"> = {
  indexAxis: "y" as const,
  responsive: true,
  skipNull: true,
  scales: {
    x: {
      display: false,
      stacked: true,
    },
    y: {
      display: false,
      stacked: true,
    },
  },
  datasets: {
    bar: {
      barThickness: 30,
      minBarLength: 30,
    },
  },
  maintainAspectRatio: false,
  plugins: {
    legend: {
      align: "center",
      position: "bottom",
      labels: {
        boxWidth: 20,
        boxHeight: 20,
        font: {
          family: "Titillium Web",
          lineHeight: "16px",
          size: 16,
          weight: "bold",
        },
        textAlign: "left",
      },
    },
    datalabels: {
      color: "white",
      labels: {
        title: {
          font: {
            weight: "bold",
          },
        },
      },
      font: {
        size: 14,
      },
    },
  },
};

type BarChartProps = {
  chartHeight?: number | string;
  data: ChartData<"bar", number[], string>;
};

export const BarChart = ({ chartHeight, data }: BarChartProps) => {
  return (
    <Box height={chartHeight}>
      <Bar options={barChartOptions} data={data} />
    </Box>
  );
};
