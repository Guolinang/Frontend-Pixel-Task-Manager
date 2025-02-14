<template>
  <div class="main">
    <div class="h_container">
      <div class="h_view">
        <div class="h_back">
          <div class="h_character_conteiner">
            <img :src="currentBody" alt="" class="h_body" id="body" />
            <img :src="currentFace" alt="" class="h_face" id="face" />
            <img :src="currentHair" alt="" class="h_hair" id="hair" />
            <img :src="currentDress" alt="" class="h_dress" id="dress" />
            <img :src="currentOther" alt="" class="h_other" id="other" />
          </div>
        </div>
      </div>
      <div class="h_changes">
        <div class="h_title">
          <button class="h_title_elements" v-on:click="flag = 1">Body</button>
          <button class="h_title_elements" v-on:click="flag = 2">Face</button>
          <button class="h_title_elements" v-on:click="flag = 3">Hair</button>
          <button class="h_title_elements" v-on:click="flag = 4">Dress</button>
          <button class="h_title_elements" v-on:click="flag = 5">Other</button>
        </div>
        <div class="h_table">
          <div class="h_s_body" v-if="flag == 1">
            <img
              src="@/assets/images/character/body/body1.png"
              alt=""
              class="h_s_body_img"
              id="body1"
              v-on:click="bodiesIndex = 0"
            />
            <img
              src="@/assets/images/character/body/body2.png"
              alt=""
              class="h_s_body_img"
              id="body2"
              v-on:click="bodiesIndex = 1"
            />
            <img
              src="@/assets/images/character/body/body3.png"
              alt=""
              class="h_s_body_img"
              id="body3"
              v-on:click="bodiesIndex = 2"
            />
            <img
              src="@/assets/images/character/body/body4.png"
              alt=""
              class="h_s_body_img"
              id="body4"
              v-on:click="bodiesIndex = 3"
            />
          </div>
          <div class="h_s_body" v-if="flag == 2">
            <img
              src="@/assets/images/character/face/face1.png"
              alt=""
              class="h_s_body_img"
              id="face1"
              v-on:click="facesIndex = 0"
            />
            <img
              src="@/assets/images/character/face/face2.png"
              alt=""
              class="h_s_body_img"
              id="face2"
              v-on:click="facesIndex = 1"
            />
            <img
              src="@/assets/images/character/face/face3.png"
              alt=""
              class="h_s_body_img"
              id="face3"
              v-on:click="facesIndex = 2"
            />
            <img
              src="@/assets/images/character/face/face4.png"
              alt=""
              class="h_s_body_img"
              id="face4"
              v-on:click="facesIndex = 3"
            />
          </div>
          <div class="h_s_body" v-if="flag == 3">
            <img
              src="@/assets/images/character/hair/hair1.png"
              alt=""
              class="h_s_body_img"
              id="hair1"
              v-on:click="hairIndex = 0"
            />
            <img
              src="@/assets/images/character/hair/hair2.png"
              alt=""
              class="h_s_body_img"
              id="hair2"
              v-on:click="hairIndex = 1"
            />
            <img
              src="@/assets/images/character/hair/hair3.png"
              alt=""
              class="h_s_body_img"
              id="hair3"
              v-on:click="hairIndex = 2"
            />
            <img
              src="@/assets/images/character/hair/hair4.png"
              alt=""
              class="h_s_body_img"
              id="hair4"
              v-on:click="hairIndex = 3"
            />
          </div>

          <div class="h_s_body" v-if="flag == 4">
            <img
              src="@/assets/images/character/dress/dress1.png"
              alt=""
              class="h_s_body_img"
              id="dress1"
              v-on:click="dressIndex = 0"
            />
            <img
              src="@/assets/images/character/dress/dress2.png"
              alt=""
              class="h_s_body_img"
              id="dress2"
              v-on:click="dressIndex = 1"
            />
            <img
              src="@/assets/images/character/dress/dress3.png"
              alt=""
              class="h_s_body_img"
              id="dress3"
              v-on:click="dressIndex = 2"
            />
            <img
              src="@/assets/images/character/dress/dress4.png"
              alt=""
              class="h_s_body_img"
              id="dress4"
              v-on:click="dressIndex = 3"
            />
          </div>
          <div class="h_s_body" v-if="flag == 5">
            <img
              src="@/assets/images/character/other/other1.png"
              alt=""
              class="h_s_body_img"
              id="other1"
              v-on:click="otherIndex = 0"
            />
            <img
              src="@/assets/images/character/other/other2.png"
              alt=""
              class="h_s_body_img"
              id="other2"
              v-on:click="otherIndex = 1"
            />
            <img
              src="@/assets/images/character/other/other3.png"
              alt=""
              class="h_s_body_img"
              id="other3"
              v-on:click="otherIndex = 2"
            />
            <img
              src="@/assets/images/character/other/other4.png"
              alt=""
              class="h_s_body_img"
              id="other4"
              v-on:click="otherIndex = 3"
            />
          </div>
        </div>
      </div>
      <button class="h_accept" v-on:click="closeCharacter">Accept</button>
    </div>
  </div>
</template>

<style src="./Character.css"></style>
<script src="./Character.js"></script>
