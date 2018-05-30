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
        <span>Total: </span>
        <span class="price">{{ total_price }}</span>
      </td>
    </tr>
  </tbody>
  </table>
</template>

<script>
export default {
  name: 'pharmacy',
  props: {
    pharmacy: {
      type: Object,
      required: true
    }
  },
  data () {
    return {}
  },
  computed: {
    distance () {
      return '(a ' + this.pharmacy.distance.text + ')'
    },
    total_price () {
      return 99.99
    }
  }
}
</script>

<style scoped></style>
