<template>
    <!--Login Form with button submit-->
    <form @submit.prevent="submitForm">
      <BaseTextField
          :placeholder="'Логин'"
          :label="'Логин'"
          :is-error="v$.login.$error"
          v-model:inputValue="form.login"
          :type="'login'"
      />
      <BaseTextField
          :placeholder="'Пароль'"
          :label="'Пароль'"
          :is-error="v$.password.$error"
          v-model:inputValue="form.password"
          :type="'password'"
      />
      <div class="flex items-start mb-5">
        <div class="flex items-center h-5">
          <input id="terms" type="checkbox" value="" class="w-4 h-4 bg-gray-50 rounded border border-gray-300 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800">
        </div>
        <label for="terms" class="block not-italic text-sm font-normal text-gray-100 ml-2.5">Запомнить меня</label>
      </div>
      <button type="submit" class="bg-gray-200 text-gray-100 w-full py-1.5 rounded-md text-base font-normal	not-italic">Войти</button>
    </form>
    <!--Links to reset and registration pages-->
    <div class="flex justify-between mt-6">
      <NuxtLink class="font-medium text-blue-50 dark:text-blue-50 underline" to="/reset">Восстановить пароль</NuxtLink>
      <NuxtLink class="font-medium text-blue-50 dark:text-blue-50 underline" to="/registration">Регистрация</NuxtLink>
    </div>
</template>

<script setup>
import useValidate from '@vuelidate/core'
import { required } from "@vuelidate/validators";
import { useAuthStore } from "~/stores/auth";

definePageMeta({
  layout:"blank"
});

let { login } = useAuthStore()
let form = reactive({
  login: '',
  password: '',
});

const rules = computed(() => {
  return {
    login: { required },
    password: { required }
  }
});

const v$ = useValidate(rules, form);

const submitForm = async () => {
  const isFormCorrect = await v$.value.$validate();
  if (isFormCorrect) {
    let response = await login(form)
    console.log(response)
  }
}

</script>