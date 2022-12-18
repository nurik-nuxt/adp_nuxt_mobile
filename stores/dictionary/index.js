import { defineStore } from 'pinia'
import useApi from "~/composables/useApi";
import qs from 'qs'
import { intersection, isEmpty } from 'lodash'

export const useDictionaryStore = defineStore('dictionary',{

    state: () => ({
        dictionaries: {}
    }),

    getters: {
        getDictionaries: (state) => state.dictionaries,
        getFilteredDictionaries: state => (data) => {
            if (data.countries === [] || !data.purpose_id) {
                return state.dictionaries['mst-amount-sums']
            }
            let correctionFactors = []
            let selectedCountries = state.dictionaries.countries.filter(i => data.countries.indexOf(i.alpha_code) !== -1 && (i.correction_factors_amount_sum.length > 0 || i.is_shengen === 1));
            let purpose = state.dictionaries.purposes.find(i => i.id === data.purpose_id)

            for(let index in selectedCountries) {
                if(selectedCountries[index].is_shengen === 1) {
                    correctionFactors.push(state.dictionaries.countries.find(i => i.country_id === 0).correction_factors_amount_sum.map(i => i.amount_id))
                } else {
                    if(!isEmpty(selectedCountries[index].correction_factors_amount_sum)) {
                        correctionFactors.push(selectedCountries[index].correction_factors_amount_sum.map(i => i.amount_id))
                    }
                }
            }

            if(!isEmpty(purpose.correction_factors_amount_sum)) {
                correctionFactors.push(purpose.correction_factors_amount_sum.map(i => i.amount_id))
            }


            if(isEmpty(correctionFactors)) {
                return state.dictionaries['mst-amount-sums']
            } else {
                return state.dictionaries['mst-amount-sums'].filter(i => intersection(...correctionFactors).indexOf(i.id) !== -1)
            }
        },
        getMark: (state) => (markId) => state.dictionaries['car-marks'].find(i => i.id === markId),
        getModelCar: (state) => (markId) => state.dictionaries['car-models'].find(i => i.model_id === markId)

    },

    actions: {
        async fetchDictionaries(dictionary,params,isWith){
            let queryString = qs.stringify(params, { encode: false })
            if (this.dictionaries && this.dictionaries[dictionary] && !params){
                return this.dictionaries
            } else {
                const resp = await useApi(`/dictionary/${dictionary}${isWith ? '?with[]=correctionFactorsAmountSum&' : ''}${queryString}`)
                this.dictionaries[dictionary] = resp
            }
        },
    }

})


