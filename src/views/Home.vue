<template>
  <div class="d-flex flex-column bg" style="height: 100vh; width: 100vw">
    <div class="my-auto px-3">
      <div class="mb-3 mx-auto w-100 border-bottom" style="max-width: 1000px">
        <h1>Fire Chat</h1>
        <section id="firebaseui-auth-container"></section>
      </div>
      <a class="mt-3" href="#">簡單登入，輕鬆聊天</a>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase'
import * as firebaseui from 'firebaseui'
import 'firebaseui/dist/firebaseui.css'

export default {
  name: 'Home',
  mounted() {
    const ui = new firebaseui.auth.AuthUI(firebase.auth())
    const uiConfig = {
      signInSuccessUrl: '/Chat',
      signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID],
    }
    ui.start('#firebaseui-auth-container', uiConfig)
  },
}
</script>
