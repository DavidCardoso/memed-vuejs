<template>
  <table class="table table-hover">
  <tbody>
    <tr v-for="(pharmacy, index) in pharmacies" :key="index" v-if="index && !hasBestPharmacy">
      <td style="vertical-align: middle;">
        <i class="fas fa-map-marker-alt"></i>
      </td>
      <td class="text-left">
        <span class="font-weight-bold">{{ pharmacy.attributes.nome }}</span>
        <span>{{ printDistanceDuration(pharmacy) }},</span>
        <br>
        <div v-show="pharmacy.id">
          <span>Total: </span>
          <span class="price">{{ pharmacy.totalPrice }}</span>
        </div>
      </td>
    </tr>
  </tbody>
  </table>
</template>

<script>
export default {
  name: 'PharmaciesList',
  props: {
    pharmacies: {
      type: Array,
      required: true
    }
  },
  mounted: function () {
    console.log('[1] mounted PharmaciesList')
  },
  computed: {
    hasBestPharmacy: function () {
      return this.$store.bestPharmacy
    }
  },
  methods: {
    printDistanceDuration: function (pharmacy) {
      return `(a ${pharmacy.matrix.distance}, em ${pharmacy.matrix.duration} de carro)`
    }
  }
}
</script>

<style scoped></style>
