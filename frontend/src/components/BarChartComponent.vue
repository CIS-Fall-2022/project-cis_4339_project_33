
<template>
  <canvas ref="myChart" style = "margin-left:100px; margin-right:100px; margin-bottom:30px;" ></canvas>
</template>

<script>
import { Chart, registerables } from 'chart.js'


Chart.register(...registerables);
export default {
  props: {
    label: {
      type: Array,
    },
    chartData: {
      type: Array,
    },
  },
  async mounted() {
    //console.log(this.chartData);
    await new Chart(this.$refs.myChart, {
      type: "bar",
      data: {
        labels: this.label,
        datasets: [
          {
            label: "Attendance per Event",
            data: this.chartData,
            backgroundColor: "#CC003399",

          },
        ],
      },
      options: {
        responsive: true,
        scale: {
         
               max: 20,
        },
        maintainAspectRatio: true,
      }
      
    });
  },
};
</script>
