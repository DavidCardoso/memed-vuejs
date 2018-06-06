<template>
  <div>
    <div class="pt-1 sticky-top text-left bg-light">
      <div class="d-inline-block align-top">
        <button @click="back()"
                class="btn btn-light">
          <i class="fas fa-arrow-left"></i>
        </button>
      </div>
      <div class="d-inline-block">
        <span class="d-block font-weight-bold">{{ title }}</span>
        <span class="msg d-block">Serviço oferecido por Memed</span>
      </div>
    </div>
    <best-pharmacy></best-pharmacy>
    <pharmacies-list :pharmacies="topTenPharmacies"></pharmacies-list>
  </div>
</template>

<script>
import BestPharmacy from './BestPharmacy'
import PharmaciesList from './PharmaciesList'
import { mapState, mapGetters } from 'vuex'

export default {
  name: 'TopTenPharmacies',
  components: {
    BestPharmacy,
    PharmaciesList
  },
  data: function () {
    return {
      title: 'Top 10 Farmácias'
    }
  },
  mounted: function () {
    console.log('[1] mounted TopTenPharmacies')
    if (this.bestPharmacy === undefined) {
      this.$router.push({ name: 'prescription' })
    }
  },
  computed: {
    // map vuex state
    ...mapState(['bestPharmacy']),
    // map vuex getters
    ...mapGetters(['topTenPharmacies'])
  },
  methods: {
    // history.back()
    back: function () {
      this.$router.go(-1)
    }
  }
}
</script>

<style scoped></style>
