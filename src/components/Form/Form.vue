<template>
  <div v-show="showModal">
    <Calendar
      @close="showModal = false"
      id="m_calendar"
      @date-picked="
        (date) => {
          dateGet(date);
        }
      "
    />
    <div @click="closeModal" class="overlay" style="z-index: 200"></div>
  </div>

  <div class="form_box">
    <div class="form_window">
      <div class="form">
        <div class="header_form" v-if="i_flag == false">Your quest</div>
        <div class="header_form" v-if="i_flag == true">Create quest</div>
        <div class="input_fields">
          <div class="in_rect">
            <div class="line" :class="{ red: this.warnings.name }">
              <label for="input_name" style="margin-right: 7vh"> Name• </label>
              <input
                type="text"
                class="input_s"
                id="input_name"
                v-model="t_name"
              />
            </div>
          </div>
          <div class="in_rect">
            <div class="line">
              <label for="input_s_description"> Short description• </label>
              <input
                type="text"
                class="input_s"
                id="input_s_description"
                v-model="t_s_desc"
              />
            </div>
          </div>
          <div class="in_rect">
            <div class="line">
              <label for="input_s_description"> Important• </label>
              <button
                v-if="t_important == true"
                class="important"
                v-on:click="t_important = false"
              ></button>
              <button
                v-if="t_important == false"
                class="important_u"
                v-on:click="t_important = true"
              ></button>
            </div>
          </div>
          <div class="in_line">
            <div class="in_rect_s">
              <div class="line">
                <label
                  for="input_type"
                  class="dropdown"
                  :class="{ red: this.warnings.type }"
                  >Type•</label
                >
                <input
                  type="text"
                  class="input_sl"
                  id="input_type"
                  v-model="t_type"
                />
              </div>
            </div>
            <div class="in_rect_s">
              <div class="line">
                <span class="dropdown" :class="{ red: this.warnings.stat }"
                  >Stat•</span
                >
                <div>
                  <select class="c_stat" v-model="t_stat">
                    <option class="opt">str</option>
                    <option class="opt">int</option>
                    <option class="opt">char</option>
                    <option class="opt">wis</option>
                    <option class="opt">cnst</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          <div class="in_rect">
            <div class="line">
              Difficulty•
              <div class="stars">
                <button
                  class="un_star"
                  id="s_fir"
                  :class="{ a_star: stars[0] }"
                  @click="
                    stars[0] = true;
                    stars[1] = false;
                    stars[2] = false;
                    t_difficulty = 1;
                  "
                ></button>
                <button
                  class="un_star"
                  id="s_sec"
                  :class="{ a_star: stars[1] }"
                  @click="
                    stars[0] = true;
                    stars[1] = true;
                    stars[2] = false;
                    t_difficulty = 2;
                  "
                ></button>
                <button
                  class="un_star"
                  id="s_the"
                  :class="{ a_star: stars[2] }"
                  @click="
                    stars[0] = true;
                    stars[1] = true;
                    stars[2] = true;
                    t_difficulty = 3;
                  "
                ></button>
              </div>
            </div>
          </div>
          <div class="in_rect">
            <div
              v-on:click="showModal = true"
              id="Calendar"
              class="line"
              :class="{ red: this.warnings.urgency }"
              @date-picked="dateGet()"
            >
              Deadline•
              <div class="date_pick">{{ day }}.{{ month + 1 }}.{{ year }}</div>
            </div>
          </div>
          <div class="in_rect">
            <div class="line">
              Repeat•
              <ul class="repeat_pick">
                <li
                  class="repeat"
                  :class="{ repeat_a: t_repeat[0] }"
                  @click="t_repeat[0] = !t_repeat[0]"
                >
                  Mon
                </li>
                <li
                  class="repeat"
                  :class="{ repeat_a: t_repeat[1] }"
                  @click="t_repeat[1] = !t_repeat[1]"
                >
                  Tues
                </li>
                <li
                  class="repeat"
                  :class="{ repeat_a: t_repeat[2] }"
                  @click="t_repeat[2] = !t_repeat[2]"
                >
                  Wed
                </li>
                <li
                  class="repeat"
                  :class="{ repeat_a: t_repeat[3] }"
                  @click="t_repeat[3] = !t_repeat[3]"
                >
                  Thurs
                </li>
                <li
                  class="repeat"
                  :class="{ repeat_a: t_repeat[4] }"
                  @click="t_repeat[4] = !t_repeat[4]"
                >
                  Fri
                </li>
                <li
                  class="repeat"
                  :class="{ repeat_a: t_repeat[5] }"
                  @click="t_repeat[5] = !t_repeat[5]"
                >
                  Sat
                </li>
                <li
                  class="repeat"
                  :class="{ repeat_a: t_repeat[6] }"
                  @click="t_repeat[6] = !t_repeat[6]"
                >
                  Sun
                </li>
              </ul>
            </div>
          </div>
          <div class="in_rect_sub">
            <div class="sub">
              <div class="line">Subtask•</div>
              <ul class="subtask">
                <li>
                  <input
                    id="sub1"
                    type="text"
                    placeholder="<task1>"
                    class="text subt"
                    v-model="t_subtask[0]"
                  />
                </li>
                <li>
                  <input
                    id="sub2"
                    type="text"
                    placeholder="<task2>"
                    class="text subt"
                    v-model="t_subtask[1]"
                  />
                </li>
                <li>
                  <input
                    id="sub3"
                    type="text"
                    placeholder="<task3>"
                    class="text subt"
                    v-model="t_subtask[2]"
                  />
                </li>
              </ul>
            </div>
          </div>
          <div class="in_rect_l">
            <div class="line">
              <label for="l_description"> Description• </label>
              <div class="aaa">
                <textarea
                  class="input_l"
                  name="l_description"
                  id="l_description"
                  cols="1"
                  rows="10"
                  v-model="t_l_desc"
                >
                </textarea>
              </div>
            </div>
          </div>
        </div>
        <div class="footer_form" v-if="i_flag == true">
          <button class="form_button" @click="formDecline">Decline</button>
          <button class="form_button" @click="formAccept">Accept</button>
        </div>
        <div class="footer_form" v-if="i_flag == false">
          <button class="form_button" @click="formDelete">Delete</button>
          <button class="form_button_done" @click="formDone">Done</button>
          <button class="form_button" @click="formOk">OK</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script src="./Form.js"></script>
<style src="./Form.css"></style>
