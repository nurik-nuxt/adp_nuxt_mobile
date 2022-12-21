<template>
  <form class="px-5 py-9">
    <div class="mb-5">
      <label class="block font-normal text-sm text-gray-100">В какую страну</label>
      <BaseMultipleSelect
          :options="dictionary['countries'] ? dictionary['countries'].filter(c => c.country_id !== 1) : dictionary['countries']"
      />
    </div>
    <div class="mb-5">
      <label class="block font-normal text-sm text-gray-100">Период</label>
      <DatePicker/>
    </div>
    <BaseTab :items="items"/>
    <div class="mt-10">
      <BaseTab :items="items2" @clicked="onClick" :selected-tab="range"/>
    </div>

<!--    <div class="mb-5">-->
<!--      <label for="countries" class=" block font-normal text-sm text-gray-100">В какую страну</label>-->
<!--      <select id="countries" class="px-2.5 py-3 rounded-md border-none outline-0 block w-full bg-gray-150">-->
<!--        <option selected>Japan</option>-->
<!--        <option value="US">United States</option>-->
<!--        <option value="CA">Canada</option>-->
<!--        <option value="FR">France</option>-->
<!--        <option value="DE">Germany</option>-->
<!--      </select>-->
<!--    </div>-->
  </form>
</template>

<script setup>

const items = ref([
  {
    id: 1,
    title: 'до 2'
  },
  {
    id: 2,
    title: '3—65'
  },
  {
    id: 3,
    title: '66—80'
  }
])

const items2 = ref([
  {
    id: 1,
    title: 'Разовая'
  },
  {
    id: 2,
    title: 'Полгода'
  },
  {
    id: 3,
    title: 'Год'
  }
])

const range = ref({})

const onClick = (item) => {
  range.value = item
}

import { useDictionaryStore } from "~/stores/dictionary";
import DatePicker from "~/components/common/DatePicker";

const dictionaryStore = useDictionaryStore()

const dictionary = computed(() => {
  return dictionaryStore.dictionaries
})

onMounted(async () => {
  await dictionaryStore.fetchDictionaries('countries',{where:{alpha_code:{operator: 'IS%20NOT',value:'NULL'},is_excluded:0}},true)
})

</script>