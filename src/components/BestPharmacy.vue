<template>
  <table class="table table-hover">
  <tbody>
    <tr>
      <td style="vertical-align: middle;">
        <i class="fas fa-flag"></i>
      </td>
      <td class="text-left">
        <span class="font-weight-bold">{{ bestPharmacy.attributes.nome }}</span>
        <span>{{ printDistanceDuration }}</span>
        <br>
        <div v-show="bestPharmacy.id">
          <span>Total: </span>
          <span class="price">{{ bestPharmacy.totalPrice }}</span>
        </div>
      </td>
    </tr>
  </tbody>
  </table>
</template>

<script>
import { mapState, mapGetters, mapMutations } from 'vuex'

export default {
  name: 'BestPharmacy',
  mounted: function () {
    console.log('[1] mounted BestPharmacy')
    this.updateBestPharmacy()
    console.log('[2] mounted BestPharmacy')
    this.updatePrescriptedMedicaments()
    console.log('[3] mounted BestPharmacy')
  },
  computed: {
    printDistance () {
      return this.$store.getters.printDistance()
    },
    ...mapState(['bestPharmacy']),
    ...mapGetters(['printDistanceDuration'])
  },
  methods: {
    ...mapMutations(['updateBestPharmacy', 'updatePrescriptedMedicaments'])
  }
}
</script>

<style scoped></style>
