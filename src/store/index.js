import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import gapi from 'google-distance-api'

Vue.use(Vuex)

const pharmaciesEndpoint = 'https://wydfdauvw5.execute-api.sa-east-1.amazonaws.com/desafio/farmacias'

export default new Vuex.Store({
  state: {
    bestPharmacy: {
      id: 0,
      attributes: {
        nome: 'Buscando...'
      },
      matrix: {
        distance: 0,
        duration: 0
      },
      totalPrice: 0
    },
    pharmacies: [],
    prescriptedMedicaments: [
      {
        qty: 1,
        unit: 'unidade',
        name: 'Ácido zoledrônico 4mg',
        icon: './static/medicine-bottle-01.png',
        price: 0.00
      },
      {
        qty: 1,
        unit: 'unidade',
        name: 'Água para injeção 1mL',
        icon: './static/medicine-bottle-01.png',
        price: 0.00
      },
      {
        qty: 1,
        unit: 'unidade',
        name: 'Bromazepam 3mg',
        icon: './static/medicine-bottle-01.png',
        price: 0.00
      }
    ]
  },
  mutations: {
    updatePharmacies (state, pharmacies) {
      state.pharmacies = pharmacies
    },
    updatePharmacy (state, pharmacy) {
      state.pharmacy = pharmacy
    }
  },
  actions: {
    // get user device | memed geolocation
    getUserLocation () {
      return ['-23.5648304,-46.6436604']
    },
    // matrix API destinations
    getDestinations ({ state }) {
      const destinations = state.pharmacies.reduce(function (result, pharmacy) {
        result.push(pharmacy.attributes.lat + ',' + pharmacy.attributes.lon)
        return result
      }, [])
      return destinations
    },
    // fetch ALL pharmacies data
    fetchPharmacies: async function ({ state, commit, dispatch }) {
      // request PHARMACIES
      await dispatch('getPharmacies')
        .then(function (response1) {
          let pharmacies = response1.data.data
          pharmacies.forEach(function (pharmacy) {
            // request all MEDICAMENTS of each pharmacy
            dispatch('getPharmaciesMedicaments', pharmacy.id)
              .then(function (response2) {
                // keep only the PRESCRIPTED medicaments
                let meds = response2.data.data.attributes.medicamentos.filter(function (med) {
                  const matched = state.prescriptedMedicaments.find(function (m) {
                    return m.name === med.nome
                  })
                  return matched !== undefined
                })
                pharmacy.medicamentos = meds
                // calculate the TOTAL PRICE based on the matched medicaments
                pharmacy.totalPrice = meds.reduce(function (total, med) {
                  return total + med.preco
                }, 0)
              })
              .catch(function (error) {
                console.log(`Error trying to fetch pharmacies (id ${pharmacy.id}): ${error}`)
              })
          })
          // SAVE changes
          commit('updatePharmacies', pharmacies)
          // request and update MAPS MATRIX data of the pharmacies
          dispatch('getPharmaciesMatrix')
        })
        .catch(function (error) {
          console.log(`Error trying to fetch pharmacies: ${error}`)
        })
    },
    // get pharmacies basic data
    getPharmacies: async function ({ state }) {
      return axios.get(pharmaciesEndpoint)
    },
    // get pharmacies medicaments data (name, price)
    getPharmaciesMedicaments: async function ({ state }, id) {
      return axios.get(`${pharmaciesEndpoint}/${id}`)
    },
    // get pharmacies matrix data (distance, duration)
    getPharmaciesMatrix: async function ({ state, commit, dispatch }) {
      // get origins
      const origins = await dispatch('getUserLocation').then(function (result) {
        return result
      })
      // get destinations
      const destinations = await dispatch('getDestinations').then(function (result) {
        return result
      })
      // prepare request options
      const options = {
        key: process.env.GAPI_KEY,
        mode: 'driving',
        origins: origins,
        destinations: destinations
      }
      // request all distance/duration from origins to destinations
      gapi.distance(options, function (error, response) {
        if (error) {
          return console.log('Error fetching matrix api: ' + error)
        }
        // as known that MAPS DISTANCE MATRIX api
        // returns at the same order of the destinations
        // it is possible to iterate each pharmacies and set its matrix data
        // using a simple loop
        let pharmacies = state.pharmacies
        response.forEach(function (item, index) {
          pharmacies[index].matrix = item
        })
        // SAVE changes
        commit('updatePharmacies', pharmacies)
      })
    }
  }
})
