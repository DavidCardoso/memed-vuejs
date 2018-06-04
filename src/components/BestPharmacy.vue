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
export default {
  name: 'BestPharmacy',
  props: {
    pharmacy: {
      type: Object,
      required: true
    }
  },
  computed: {
    distance: function () {
      return this.pharmacy.matrix.distance
        ? '(a ' + this.pharmacy.matrix.distance + ')'
        : ''
    }
  }
}
</script>

<style scoped></style>
