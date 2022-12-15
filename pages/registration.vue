<template>
  <form>
    <BaseTextField
        :label="'ИИН'"
        :placeholder="'123456789012'"
        v-model:input-value="form.iin"
    />
    <div class="flex justify-between items-center">
      <BaseTextField
          :label="'Телефон'"
          :placeholder="'+7 776 169 41 43'"
          class="flex-1"
          v-model:input-value="form.mobile_phone"
      />
      <BaseButton
          class="flex-1 ml-2.5"
          variant="light"
          @clicked="verifySmsCode"
      />
    </div>
    <BaseTextField
        :label="'Введите код из SMS'"
        :placeholder="'код SMS'"
        v-model:input-value="form.code"
    />
    <BaseTextField
        :label="'Придумайте пароль'"
        :placeholder="'Пароль'"
        v-model:input-value="form.password"
        :type="'password'"
    />
    <BaseTextField
        :label="'Повторите пароль еще раз'"
        :placeholder="'Пароль'"
        v-model:input-value="form.password_confirmation"
        :type="'password'"
    />
  </form>
  <BaseButton variant="green">Зарегистрироваться</BaseButton>
</template>

<script setup>
import { useAuthStore } from "~/stores/auth";
import useValidate from '@vuelidate/core'
import { required } from "@vuelidate/validators";

definePageMeta({
  layout: 'blank'
})
let { sendVerifyCode } = useAuthStore()

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
    console.log("Valid")
  } else {
    console.log("Invalid")
  }
  // await sendVerifyCode({
  //   mobile_phone: form.mobile_phone
  // })
}


</script>