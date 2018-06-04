<template>
  <table class="table table-hover">
  <tbody>
    <tr v-for="(med, index) in medicaments" :key="index">
      <td style="vertical-align: middle;">
        <img class="medicine-icon" :src="med.icon">
      </td>
      <td class="text-left">
        <span class="msg metric-unit">{{ metricUnit(med) }}</span>
        <br>
        <span class="font-weight-bold">{{ med.name }}</span>
        <br>
        <span v-if="med.price" class="price">{{ med.price }}</span>
      </td>
    </tr>
  </tbody>
  </table>
</template>

<script>
export default {
  name: 'MedicamentsList',
  props: {
    medicaments: {
      type: Array,
      required: true
    }
  },
  methods: {
    metricUnit: function (med) {
      return med.qty + ' ' + med.unit
    }
  }
}
</script>

<style scoped>
.metric-unit {
  text-transform: uppercase;
}

.medicine-icon {
  width: 25px;
}
</style>
