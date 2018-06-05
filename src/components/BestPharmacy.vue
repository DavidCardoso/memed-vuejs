<template>
  <table class="table table-hover">
  <tbody>
    <tr>
      <td style="vertical-align: middle;">
        <i class="fas fa-flag"></i>
      </td>
      <td class="text-left">
        <span class="font-weight-bold">{{ pharmacy.attributes.nome }}</span>
        <span>{{ distance }}</span>
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
    ...mapState({
      pharmacy: 'bestPharmacy'
    }),
    ...mapGetters(['distance'])
  },
  methods: {
    ...mapMutations(['updateBestPharmacy', 'updatePrescriptedMedicaments'])
  }
}
</script>

<style scoped></style>
