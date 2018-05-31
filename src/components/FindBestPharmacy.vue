<template>
  <div>
    <div class="pt-1 sticky-top text-left bg-light">
      <div class="d-inline-block align-top">
        <button @click="backToPrescription()"
                class="btn btn-light">
          <i class="fas fa-arrow-left"></i>
        </button>
      </div>
      <div class="d-inline-block">
        <span class="d-block font-weight-bold">{{ title }}</span>
        <span class="msg d-block">{{ button_msg }}</span>
      </div>
    </div>
    <best-pharmacy :pharmacy="pharmacy"></best-pharmacy>
    <medicaments-list :medicaments="medicaments"></medicaments-list>
    <p class="alert alert-light msg">{{ alert_msg }}</p>
  </div>
</template>

<script>
import MedicamentsList from './MedicamentsList'
import BestPharmacy from './BestPharmacy'

export default {
  name: 'FindBestPharmacy',
  components: {
    MedicamentsList,
    BestPharmacy
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
          icon: './static/medicine-bottle-01.png',
          price: 9.99
        },
        {
          qty: 1,
          unit: 'unidade',
          name: 'Água para injeção 1mL',
          icon: './static/medicine-bottle-01.png',
          price: 9.99
        },
        {
          qty: 1,
          unit: 'unidade',
          name: 'Bromazepam 3mg',
          icon: './static/medicine-bottle-01.png',
          price: 9.99
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
    },
    pharmacy () {
      return this.getBestPharmacy()
    }
  },
  methods: {
    backToPrescription () {
      this.$router.go(-1)
    },
    getUserLocation () {
      return {
        lat: -23.5648304,
        lon: -46.6436604
      }
    },
    getBestPharmacy () {
      // let userLocation = this.getUserLocation()
      return {
        type: 'farmacias',
        id: 1,
        attributes: {
          nome: 'Farmais',
          lat: -23.5640019,
          lon: -46.6489309
        },
        links: {
          self: 'https://wydfdauvw5.execute-api.sa-east-1.amazonaws.com/desafio/farmacias/1'
        },
        medicamentos: [
          {
            nome: 'Ácido zoledrônico 4mg',
            preco: 10.86
          },
          {
            nome: 'Água para injeção 1mL',
            preco: 30.06
          },
          {
            nome: 'Betaserc 16mg',
            preco: 8.46
          },
          {
            nome: 'Bromazepam 3mg',
            preco: 0.46
          }
        ],
        distance: {
          text: '1,1 km',
          value: 1148
        },
        duration: {
          text: '5 minutos',
          value: 313
        },
        total_price: 99.99,
        status: 'OK'
      }
    }
  }
}
</script>

<style scoped></style>
