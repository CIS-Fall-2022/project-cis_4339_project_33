<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <main>
    <div>
      <h1 class="font-bold text-4xl text-red-700 tracking-widest text-center mt-10">Welcome</h1>
      <br>
    </div> 
      <div class="column">
        <div>
          <div>
            <h3 class = "font-bold text-3xl text-red-700 tracking-widest text-center mt-10"> Attendance at Recent Events</h3>
            <br>
            <ClientChart
              v-if="!loading && !error"
              :label="labels"
              :chart-data="attendance"
            ></ClientChart>
            <br>
            <br>
            <div class ="column">
              <!-- Table to display Amount of Attendees for the past two months-->
                <table class = "table" v-if="!loading && !error">
                <thead>
                  <tr>
                    <th scope="col" > Recent Events </th>
                    <th scope= "col" > Amount Of Attendees</th>
                  </tr>
                </thead>
                <tbody>
                  
                  <tr v-for="labels , amount in labels"
                  :key = "amount">
                  <td> 
                    {{labels}}
                </td>
                  <td>
                    {{attendance[amount]}}
                </td>
                </tr>

                </tbody>
                </table> 
              
              
              
              </div>

            <!-- Start of loading animation -->
            <div class="mt-40" v-if="loading">
              <p
                class="
                  text-6xl
                  font-bold
                  text-center text-gray-500
                  animate-pulse
                "
              >
                Loading...
              </p>
            </div>
            <!-- End of loading animation -->

            <!-- Start of error alert -->
            <div class="mt-12 bg-red-50" v-if="error">
              <h3 class="px-4 py-1 text-4xl font-bold text-white bg-red-800">
                {{ error.title }}
              </h3>
              <p class="p-4 text-lg font-bold text-red-900">
                {{ error.message }}
              </p>
            </div>
            <!-- End of error alert -->
            <br />
            <br />
          </div>
        </div>
      </div>
</main>
</template>

<!-- Used example code from previous class to complete this portion-->
<script>
import axios from "axios";
import ClientChart from "@/components/BarChartComponent.vue";

export default {
components: {
  ClientChart,
},
data() {
  return {
   
    
    labels: [],
    attendance: [],
    loading: false,
    error: null,
  };
},

methods: {
  async fetchData() {
    try {
      this.error = null;
      this.loading = true;
      const url = `http://localhost:3000/eventData/twoMonthsEvents`;
      const response = await axios.get(url);
      //"re-organizing" - mapping json from the response

      this.labels = response.data.map((item) => item._id);
      this.attendance = response.data.map((item) => item.totalSize);
      
    
  
    } catch (err) {
      if (err.response) {
        // client received an error response (5xx, 4xx)
        this.error = {
          title: "Server Response",
          message: err.message,
        };
      } else if (err.request) {
        // client never received a response, or request never left
        this.error = {
          title: "Unable to Reach Server",
          message: err.message,
        };
      } else {
        // There's probably an error in your code
        this.error = {
          title: "Application Error",
          message: err.message,
        };
      }
    }
    this.loading = false;
  },
},
mounted() {
  this.fetchData();
},
};
</script>
