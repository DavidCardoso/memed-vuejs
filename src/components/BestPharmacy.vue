<template>
  <div class="pt-1">
    <div class="sticky-top text-left bg-white">
      <div class="d-inline-block align-top">
        <button class="btn btn-light">
          <i class="fas fa-arrow-left"></i>
        </button>
      </div>
      <div class="d-inline-block">
        <span class="d-block">{{ title }}</span>
        <span class="msg d-block">{{ button_msg }}</span>
      </div>
    </div>
    <medicaments-list :medicaments="medicaments"></medicaments-list>
    <p class="alert alert-light msg">{{ alert_msg }}</p>
  </div>
</template>

<script>
import MedicamentsList from './MedicamentsList'

export default {
  name: 'BestPharmacy',
  components: {
    MedicamentsList
  },
  data () {
    return {
      title: 'Encontrar Farmácia',
      msgs: [
        '',
        'A Prescrição Digital Memed não dispensa a apresentação da sua versão impressa à farmácia. O médico responsável por esta prescrição não possui qualquer tipo de vínculo com os preços e/ou farmácias apresentados.',
        'Serviço oferecido por Memed'
      ],
      medicaments: [
        {
          qty: 1,
          unit: 'unidade',
          name: 'Ácido zoledrônico 4mg',
          icon: './static/medicine-bottle-01.png'
        },
        {
          qty: 1,
          unit: 'unidade',
          name: 'Água para injeção 1mL',
          icon: './static/medicine-bottle-01.png'
        },
        {
          qty: 1,
          unit: 'unidade',
          name: 'Bromazepam 3mg',
          icon: './static/medicine-bottle-01.png'
        }
      ]
    }
  },
  computed: {
    alert_msg () {
      return this.msgs[1]
    },
    button_msg () {
      return this.msgs[2]
    }
  },
  methods: {
    backToPrescription () {
      this.$router.go(-1)
    }
  }
}
</script>

<style scoped></style>
