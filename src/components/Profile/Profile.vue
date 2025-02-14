<template>
  <div v-show="showHero">
    <div class="overlay"></div>
    <Character id="m_hero" @close-character="closeHero" />
  </div>

  <div class="p_main_container">
    <div class="p_cloud"></div>
    <div class="menu">
      <div class="menu_conteiner">
        <p class="menu_title" v-on:click="m_b_task">Quest page</p>
        <p class="menu_title" v-on:click="m_b_profile">Your hero</p>
        <p class="menu_title" v-on:click="m_b_login">Exit</p>
      </div>
    </div>
    <div class="back">
      <img src="@/assets/images/Profile_dragon.png" alt="" class="dragon_p" />
      <div class="content">
        <div class="title">Profile</div>
        <div class="character_window">
          <div class="character">
            <div class="character_conteiner">
              <img :src="currentBody" class="c_body" />
              <img :src="currentFace" alt="" class="c_face" />
              <img :src="currentHair" alt="" class="c_hair" />
              <img :src="currentDress" alt="" class="c_dress" />
              <img :src="currentOther" alt="" class="c_other" />
            </div>
          </div>
          <div class="statistics">
            <p class="stat">name {{ name }}</p>
            <p class="stat">level {{ level }}</p>
            <p class="stat" style="color: #bf80ff">exp</p>
            <span style="float: right; margin-right: 10px; color: #bf80ff">
              {{ exp }}/100</span
            >
            <p class="stat" style="color: #ff8066">hp</p>
            <span style="float: right; margin-right: 10px; color: #ff8066"
              >{{ hp }}/100</span
            >
            <br />
            <p class="stat">
              str
              <span style="float: right; margin-right: 10px">{{
                strength
              }}</span>
            </p>
            <p class="stat">
              int<span style="float: right; margin-right: 10px">{{
                intelligence
              }}</span>
            </p>
            <p class="stat">
              char<span style="float: right; margin-right: 10px">{{
                charisma
              }}</span>
            </p>
            <p class="stat">
              wis<span style="float: right; margin-right: 10px">{{
                wisdom
              }}</span>
            </p>
            <p class="stat">
              cnst<span style="float: right; margin-right: 10px">{{
                constitution
              }}</span>
            </p>
            <button class="change_h" v-on:click="showHero = true">
              change
            </button>
          </div>
        </div>
        <div class="achievement">
          <div class="title_ach">Achievements</div>
          <div class="achievement_container">
            <div class="achiev_view" v-if="flag_a == 1">
              <img
                src="@/assets/images/Achievments/day1.png"
                alt=""
                class="achiev_img"
              />
              <img
                src="@/assets/images/Achievments/day3.png"
                alt=""
                class="achiev_img"
              />
              <img
                src="@/assets/images/Achievments/day5_n.png"
                alt=""
                class="achiev_img"
              />
            </div>
            <div class="achiev_view" v-if="flag_a == 2">
              <img
                src="@/assets/images/Achievments/day1.png"
                alt=""
                class="achiev_img"
              />
            </div>
            <div class="achiev_view" v-if="flag_a == 3">
              <img
                src="@/assets/images/Achievments/day5_n.png"
                alt=""
                class="achiev_img"
              />
            </div>
            <div class="achiev_list">
              <ul class="achiev_ul">
                <p class="achiev_ul_header">Categories</p>
                <button v-on:click="flag_a = 1" class="achiev_li">Days</button>
                <br />
                <button v-on:click="flag_a = 2" class="achiev_li">Stats</button>
                <br />
                <button v-on:click="flag_a = 3" class="achiev_li">Types</button>
              </ul>
            </div>
          </div>
        </div>
        <div class="change_log_data">
          <p style="margin-top: 10px; text-align: center; width: 100%">
            Change log data
          </p>
          <div class="change_container">
            <form @submit.prevent="confirmed" class="c_login_window">
              <div class="c_login_title">{{ title }}</div>
              <div class="c_login_text">
                <label for="login"> Login </label>
                <input
                  ref="login"
                  type="text"
                  class="c_login_prompt"
                  id="login"
                />
              </div>
              <div class="c_login_text">
                <label for="password"> Password </label>
                <input
                  ref="password"
                  type="text"
                  class="c_login_prompt"
                  id="password"
                />
              </div>
              <div class="c_login_options">
                <button
                  type="submit"
                  class="c_login_confirm"
                  v-on:click="confirm"
                >
                  Confirm
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script src="./Profile.js"></script>
<style src="./Profile.css"></style>
