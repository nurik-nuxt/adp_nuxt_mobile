<template>
  <div class="px-5 pt-20">
    <!--Icon and Tittle-->
    <div class="flex flex-col justify-center">
      <svg class="m-auto" width="64" height="61" viewBox="0 0 64 61" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M40.5492 60.5634H20.1318C8.84358 60.2708 0 51.3665 0 40.2746C8.01258e-08 34.8974 2.13607 29.7405 5.93829 25.9383C9.74051 22.1361 14.8974 20 20.2746 20C25.6517 20 30.8086 22.1361 34.6109 25.9383C38.4131 29.7405 40.5492 34.8974 40.5492 40.2746V60.5634ZM20.3424 48.9433H28.9433V40.2746C28.9433 37.9755 28.03 35.7706 26.4043 34.1449C24.7786 32.5192 22.5737 31.6059 20.2746 31.6059C17.9755 31.6059 15.7706 32.5192 14.1449 34.1449C12.5192 35.7706 11.6059 37.9755 11.6059 40.2746C11.6059 45.0747 15.346 48.7863 20.3424 48.9433Z" fill="black"/>
        <path d="M60.4347 20.6665H48.8289V60.6803H60.4347V20.6665Z" fill="black"/>
        <path d="M56.6625 14.6786H49.325V8.61161C49.325 6.34183 49.5605 5.19266 50.0387 4.18982C50.6013 3.00431 51.4716 1.99146 52.5589 1.25687C53.6462 0.52229 54.9107 0.0928895 56.2206 0.0134527C57.5304 -0.0659841 58.8375 0.207453 60.0056 0.805247C61.1737 1.40304 62.1601 2.30329 62.8618 3.41212C63.5635 4.52095 63.9549 5.79774 63.9951 7.10933C64.0352 8.42093 63.7228 9.71928 63.0903 10.869C62.4578 12.0187 61.5284 12.9777 60.3991 13.6459C59.2698 14.3141 57.9818 14.667 56.6696 14.6679L56.6625 14.6786Z" fill="#39B54A"/>
      </svg>
      <h1 class="my-6 m-auto not-italic font-bold	text-xl">Amanat Digital Platform</h1>
    </div>
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
  console.log(v$.value.$validate())
  const isFormCorrect = await v$.value.$validate();
  if (isFormCorrect) {
    console.log("is correct")
    let response = await login(form)
    console.log(response)
  }
}

</script>