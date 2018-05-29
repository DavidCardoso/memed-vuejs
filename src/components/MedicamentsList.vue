<template>
  <table class="table table-hover">
  <tbody>
    <tr v-for="(med, index) in medicaments" :key="index">
      <td style="vertical-align: middle;">
        <img class="medicine-icon" :src="med.icon">
      </td>
      <td style="text-align: left;">
        <span class="msg metric-unit">{{ metricUnit(med) }}</span>
        <br>
        <span>{{ med.name }}</span>
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
  data () {
    return {}
  },
  methods: {
    metricUnit (med) {
      return med.qty + ' ' + med.unit
    }
  }
}
</script>

<style scoped></style>
