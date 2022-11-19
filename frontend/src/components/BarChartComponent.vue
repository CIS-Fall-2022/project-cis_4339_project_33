
<template>
  <canvas ref="myChart"></canvas>
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
            label: "Clients per Event",
            data: this.chartData,
            backgroundColor: "rgba(144,238,144 , 0.9 )",

          },
        ],
      },
      options: {
        responsive: true,
        scale: {
          yAxes: [{
            ticks: {
                fixedStepSize: 1
            }
        }],
        }
      }
      
    });
  },
};
</script>
