<template>

  <!--Sms Code Verification Form-->
  <form @submit.prevent="verifySmsCode">
    <BaseTextField
        :label="'ИИН'"
        :placeholder="'123456789012'"
        v-model:inputValue="form.iin"
        :is-error="v$.iin.$error"
        :type="'iin'"
    />
    <div class="flex justify-between items-center">
      <BaseTextField
          :label="'Телефон'"
          :placeholder="'+7 776 169 41 43'"
          class="flex-1"
          v-model:inputValue="form.mobile_phone"
          :is-error="v$.mobile_phone.$error"
          :type="'phone'"
      />
      <BaseButton
          class="flex-1 ml-2.5"
          variant="light"
      />
    </div>
  </form>

  <!--Password Verification Form-->
  <form @submit.prevent="makeRegistration">
    <BaseTextField
        :label="'Введите код из SMS'"
        :placeholder="'код SMS'"
        v-model:inputValue="form.code"
        :is-error="t$.code.$error"
        :type="'code'"
    />
    <BaseTextField
        :label="'Придумайте пароль'"
        :placeholder="'Пароль'"
        v-model:inputValue="form.password"
        :type="'password'"
        :is-error="t$.password.$error"
    />
    <BaseTextField
        :label="'Повторите пароль еще раз'"
        :placeholder="'Пароль'"
        v-model:inputValue="form.password_confirmation"
        :type="'password'"
        :is-error="t$.password_confirmation.$error"
    />
    <BaseButton variant="green">Зарегистрироваться</BaseButton>
  </form>
</template>

<script setup>
import { useAuthStore } from "~/stores/auth";
import useValidate from '@vuelidate/core'
import { required } from "@vuelidate/validators";

definePageMeta({
  layout: 'blank'
})
let { sendVerifyCode } = useAuthStore()
let { registration } = useAuthStore()

let form = reactive({
  iin: '',
  mobile_phone: '',
  code: '',
  password: '',
  password_confirmation: '',
})

const smsCodeRules = computed(() => {
  return {
    iin: { required },
    mobile_phone: { required }
  }
})

const v$ = useValidate(smsCodeRules, form)
const verifySmsCode = async () => {
  const isSmsCodeFormCorrect = await v$.value.$validate()
  if (isSmsCodeFormCorrect) {
    let resp = await sendVerifyCode({mobile_phone: form.mobile_phone})
    console.log(resp)
  }
}

const passwordSendRules = computed(() => {
  return {
    code: { required },
    password: { required },
    password_confirmation: { required }
  }
})

const t$ = useValidate(passwordSendRules, form)

const makeRegistration = async () => {
  const isPasswordCorrectFormat = await t$.value.$validate()
  if(isPasswordCorrectFormat) {
    console.log("Make registration")
    let reg = await registration({ body: form })
    console.log(reg)
  }
}

</script>