<template>
  <div>
    <div class="l_base">
      <div class="l_main_container">
        <form @submit.prevent="confirmed" class="login_window">
          <div class="login_title">{{ title }}</div>
          <div class="login_text">
            <label for="login"> Login </label>
            <input ref="login" type="text" class="login_prompt" id="login" />
          </div>
          <div class="login_text">
            <label for="password"> Password </label>
            <input
              ref="password"
              type="text"
              class="login_prompt"
              id="password"
            />
          </div>
          <div class="login_options">
            <button type="button" class="login_sign_up" @click="signUp">
              {{ signButton }}
            </button>
            <button type="submit" class="login_confirm">Confirm</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script src="./Login.js"></script>
<style src="./Login.css"></style>
