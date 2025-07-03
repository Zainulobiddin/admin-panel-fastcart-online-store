import ApexCharts from "react-apexcharts";

const Chart = () => {
  const options = {
    chart: {
      id: "sales-revenue",
      zoom: {
        enabled: true,
        type: 'x',
        autoScaleYaxis: true
      }
    },
    xaxis: {
      type: "datetime",
      labels: {
        format: "MMM"
      }
    },
    tooltip: {
      x: {
        format: "MMM"
      },
      y: {
        formatter: val => `${val} Orders`
      }
    },
    title: {
      text: "Sales Revenue",
      align: "left"
    }
  };

  const series = [
    {
      name: "Orders",
      data: [
        { x: new Date('2023-01-01').getTime(), y: 8 },
        { x: new Date('2023-02-01').getTime(), y: 5 },
        { x: new Date('2023-03-01').getTime(), y: 15 },
        { x: new Date('2023-04-01').getTime(), y: 10 },
        { x: new Date('2023-05-01').getTime(), y: 35 },
        { x: new Date('2023-06-01').getTime(), y: 30 },
        { x: new Date('2023-07-01').getTime(), y: 35 },
        { x: new Date('2023-08-01').getTime(), y: 50 },
        { x: new Date('2023-09-01').getTime(), y: 45 },
        { x: new Date('2023-10-01').getTime(), y: 25 },
        { x: new Date('2023-11-01').getTime(), y: 25 },
        { x: new Date('2023-12-01').getTime(), y: 35 },
      ]
    }
  ];

  return <ApexCharts options={options} series={series} type="line" height={350} />;
};

export default Chart;
