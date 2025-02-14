<template>
  <div class="t_base">
    <div v-show="showForm">
      <Form
        ref="form"
        @close="showForm = false"
        @decline-form="showForm = false"
        @accept-form="
          (obj) => {
            createTask(obj);
          }
        "
        @change-form="
          (obj) => {
            changeTask(obj);
          }
        "
        @delete-form="
          (obj) => {
            deleteTask(obj);
          }
        "
        @done-form="
          (obj) => {
            doneTask(obj);
          }
        "
        :i_flag="f_flag"
        :i_name="c_name"
        :i_s_desc="c_s_desc"
        :i_type="c_type"
        :i_date="c_date"
        :i_time="c_time"
        :i_stat="c_stat"
        :i_priority="c_priority"
        :i_l_desc="c_l_desc"
        :i_id="c_id"
        :i_diff="c_difficulty"
        :i_subtask="c_subtask"
        :i_repeat="c_repeat"
        :i_urgency="c_urgency"
        :i_important="c_important"
      />
      <div @click="closeForm" class="overlay"></div>
    </div>

    <div v-show="showModal">
      <Calendar
        @close="showModal = false"
        id="m_calendar"
        @date-picked="
          (date) => {
            mainGetDate(date);
          }
        "
      />
      <div @click="closeModal" class="overlay"></div>
    </div>

    <div class="main_container">
      <div class="menu">
        <div class="menu_conteiner">
          <p class="menu_title" v-on:click="m_b_task">Quest page</p>
          <p class="menu_title" v-on:click="m_b_profile">Your hero</p>
          <p class="menu_title" v-on:click="m_b_login">Exit</p>
        </div>
      </div>
      <img src="@/assets/images/Cloud2.png" class="cloud2" />
      <img src="@/assets/images/dragon.png" class="dragon" id="dragon" />
      <div class="main_window">
        <div class="calendar_background">
          <button v-on:click="changeback" class="calendar_back"></button>
          <ul class="calendar">
            <div v-for="day_c in date_list">
              <li class="date cur" v-if="day_c == day">{{ day_c }}</li>
              <li class="date" v-if="day_c != day">{{ day_c }}</li>
            </div>
          </ul>
          <button
            v-on:click="showModal = true"
            id="Modal"
            class="calendar_arrowright"
          ></button>
        </div>
        <div class="tabs" v-if="window.width < 800">
          <div v-if="flagL == false" class="past_tasks">
            <div @click="clickLeft" class="arrowleft"></div>
          </div>
          <div v-if="flagL == true" class="past_tasks_full">
            <div class="full">
              <div class="list">
                <div class="plus_line">
                  <h2 class="header">Past quest</h2>
                </div>
                <ul
                  class="task_list"
                  v-for="(task, index) in tasks_past"
                  :key="index"
                >
                  <li class="task" @click="showTForm(index)">
                    <div class="task_header">
                      {{ task.name }}
                    </div>
                    <div class="star" v-if="task.difficulty == 0">
                      <div class="star_u"></div>
                      <div class="star_u"></div>
                      <div class="star_u"></div>
                    </div>
                    <div class="star" v-if="task.difficulty == 1">
                      <div class="star_a"></div>
                      <div class="star_u"></div>
                      <div class="star_u"></div>
                    </div>
                    <div class="star" v-if="task.difficulty == 2">
                      <div class="star_a"></div>
                      <div class="star_a"></div>
                      <div class="star_u"></div>
                    </div>
                    <div class="star" v-if="task.difficulty == 3">
                      <div class="star_a"></div>
                      <div class="star_a"></div>
                      <div class="star_a"></div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div v-if="flagC == true" class="present_tasks">
            <div class="plus_line">
              <h2 class="header">Quest log</h2>
              <button
                v-on:click="(showForm = true), (f_flag = true)"
                id="Form"
                class="plus"
              ></button>
            </div>
            <ul class="task_list" v-for="(task, index) in tasks" :key="index">
              <li class="task" @click="showTForm(index)">
                <div class="task_header">
                  {{ task.name }}
                </div>
                <div class="star" v-if="task.difficulty == 0">
                  <div class="star_u"></div>
                  <div class="star_u"></div>
                  <div class="star_u"></div>
                </div>
                <div class="star" v-if="task.difficulty == 1">
                  <div class="star_a"></div>
                  <div class="star_u"></div>
                  <div class="star_u"></div>
                </div>
                <div class="star" v-if="task.difficulty == 2">
                  <div class="star_a"></div>
                  <div class="star_a"></div>
                  <div class="star_u"></div>
                </div>
                <div class="star" v-if="task.difficulty == 3">
                  <div class="star_a"></div>
                  <div class="star_a"></div>
                  <div class="star_a"></div>
                </div>
              </li>
            </ul>
          </div>
          <div v-if="flagR == false" class="future_tasks">
            <div @click="clickRight" class="arrowright"></div>
          </div>
          <div v-if="flagR == true" class="future_tasks_full">
            <div class="full">
              <div class="list">
                <div class="plus_line">
                  <h2 class="header">Important quest</h2>
                </div>
                <ul
                  class="task_list"
                  v-for="(task, index) in tasks_important"
                  :key="index"
                >
                  <li class="task" @click="showTForm(index)">
                    <div class="task_header">
                      {{ task.name }}
                    </div>
                    <div class="star" v-if="task.difficulty == 0">
                      <div class="star_u"></div>
                      <div class="star_u"></div>
                      <div class="star_u"></div>
                    </div>
                    <div class="star" v-if="task.difficulty == 1">
                      <div class="star_a"></div>
                      <div class="star_u"></div>
                      <div class="star_u"></div>
                    </div>
                    <div class="star" v-if="task.difficulty == 2">
                      <div class="star_a"></div>
                      <div class="star_a"></div>
                      <div class="star_u"></div>
                    </div>
                    <div class="star" v-if="task.difficulty == 3">
                      <div class="star_a"></div>
                      <div class="star_a"></div>
                      <div class="star_a"></div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div class="tabs" v-if="window.width >= 800 && window.width < 1000">
          <div v-if="flagL == false" class="past_tasks">
            <div @click="clickLeft" class="arrowleft"></div>
          </div>
          <div v-if="flagL == true" class="past_tasks_full">
            <div class="full">
              <div class="list">
                <div class="plus_line">
                  <h2 class="header">Past quest</h2>
                </div>
                <ul
                  class="task_list"
                  v-for="(task, index) in tasks_past"
                  :key="index"
                >
                  <li class="task" @click="showTForm(index)">
                    <div class="task_header">
                      {{ task.name }}
                    </div>
                    <div class="star" v-if="task.difficulty == 0">
                      <div class="star_u"></div>
                      <div class="star_u"></div>
                      <div class="star_u"></div>
                    </div>
                    <div class="star" v-if="task.difficulty == 1">
                      <div class="star_a"></div>
                      <div class="star_u"></div>
                      <div class="star_u"></div>
                    </div>
                    <div class="star" v-if="task.difficulty == 2">
                      <div class="star_a"></div>
                      <div class="star_a"></div>
                      <div class="star_u"></div>
                    </div>
                    <div class="star" v-if="task.difficulty == 3">
                      <div class="star_a"></div>
                      <div class="star_a"></div>
                      <div class="star_a"></div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            <div @click="clickRight" class="arrowleft open_arrow"></div>
          </div>

          <div v-if="flagC == true" class="present_tasks">
            <div class="plus_line">
              <h2 class="header">Quest log</h2>
              <button
                v-on:click="(showForm = true), (f_flag = true)"
                id="Form"
                class="plus"
              ></button>
            </div>
            <ul class="task_list" v-for="(task, index) in tasks" :key="index">
              <li class="task" @click="showTForm(index)">
                <div class="task_header">
                  {{ task.name }}
                </div>
                <div class="star" v-if="task.difficulty == 0">
                  <div class="star_u"></div>
                  <div class="star_u"></div>
                  <div class="star_u"></div>
                </div>
                <div class="star" v-if="task.difficulty == 1">
                  <div class="star_a"></div>
                  <div class="star_u"></div>
                  <div class="star_u"></div>
                </div>
                <div class="star" v-if="task.difficulty == 2">
                  <div class="star_a"></div>
                  <div class="star_a"></div>
                  <div class="star_u"></div>
                </div>
                <div class="star" v-if="task.difficulty == 3">
                  <div class="star_a"></div>
                  <div class="star_a"></div>
                  <div class="star_a"></div>
                </div>
              </li>
            </ul>
          </div>
          <div class="future_tasks_full">
            <div class="full">
              <div class="list">
                <div class="plus_line">
                  <h2 class="header">Important quest</h2>
                </div>
                <ul
                  class="task_list"
                  v-for="(task, index) in tasks_important"
                  :key="index"
                >
                  <li class="task" @click="showTForm(index)">
                    <div class="task_header">
                      {{ task.name }}
                    </div>
                    <div class="star" v-if="task.difficulty == 0">
                      <div class="star_u"></div>
                      <div class="star_u"></div>
                      <div class="star_u"></div>
                    </div>
                    <div class="star" v-if="task.difficulty == 1">
                      <div class="star_a"></div>
                      <div class="star_u"></div>
                      <div class="star_u"></div>
                    </div>
                    <div class="star" v-if="task.difficulty == 2">
                      <div class="star_a"></div>
                      <div class="star_a"></div>
                      <div class="star_u"></div>
                    </div>
                    <div class="star" v-if="task.difficulty == 3">
                      <div class="star_a"></div>
                      <div class="star_a"></div>
                      <div class="star_a"></div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <!--================================================-->
        <div class="tabs" v-if="window.width > 1000">
          <div class="past_tasks_full">
            <div class="full">
              <div class="list">
                <div class="plus_line">
                  <h2 class="header">Past quest</h2>
                </div>
                <ul
                  class="task_list"
                  v-for="(task, index) in tasks_past"
                  :key="index"
                >
                  <li class="task" @click="showTForm(index)">
                    <div class="task_header">
                      {{ task.name }}
                    </div>
                    <div class="star" v-if="task.difficulty == 0">
                      <div class="star_u"></div>
                      <div class="star_u"></div>
                      <div class="star_u"></div>
                    </div>
                    <div class="star" v-if="task.difficulty == 1">
                      <div class="star_a"></div>
                      <div class="star_u"></div>
                      <div class="star_u"></div>
                    </div>
                    <div class="star" v-if="task.difficulty == 2">
                      <div class="star_a"></div>
                      <div class="star_a"></div>
                      <div class="star_u"></div>
                    </div>
                    <div class="star" v-if="task.difficulty == 3">
                      <div class="star_a"></div>
                      <div class="star_a"></div>
                      <div class="star_a"></div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div v-if="flagC == true" class="present_tasks">
            <div class="plus_line">
              <h2 class="header">Quest log</h2>
              <button
                v-on:click="(showForm = true), (f_flag = true)"
                id="Form"
                class="plus"
              ></button>
            </div>
            <ul class="task_list" v-for="(task, index) in tasks" :key="index">
              <li class="task" @click="showTForm(index)">
                <div class="task_header">
                  {{ task.name }}
                </div>
                <div class="star" v-if="task.difficulty == 0">
                  <div class="star_u"></div>
                  <div class="star_u"></div>
                  <div class="star_u"></div>
                </div>
                <div class="star" v-if="task.difficulty == 1">
                  <div class="star_a"></div>
                  <div class="star_u"></div>
                  <div class="star_u"></div>
                </div>
                <div class="star" v-if="task.difficulty == 2">
                  <div class="star_a"></div>
                  <div class="star_a"></div>
                  <div class="star_u"></div>
                </div>
                <div class="star" v-if="task.difficulty == 3">
                  <div class="star_a"></div>
                  <div class="star_a"></div>
                  <div class="star_a"></div>
                </div>
              </li>
            </ul>
          </div>

          <div class="future_tasks_full">
            <div class="full">
              <div class="list">
                <div class="plus_line">
                  <h2 class="header">Important quest</h2>
                </div>
                <ul
                  class="task_list"
                  v-for="(task, index) in tasks_important"
                  :key="index"
                >
                  <li class="task" @click="showTForm(index)">
                    <div class="task_header">
                      {{ task.name }}
                    </div>
                    <div class="star" v-if="task.difficulty == 0">
                      <div class="star_u"></div>
                      <div class="star_u"></div>
                      <div class="star_u"></div>
                    </div>
                    <div class="star" v-if="task.difficulty == 1">
                      <div class="star_a"></div>
                      <div class="star_u"></div>
                      <div class="star_u"></div>
                    </div>
                    <div class="star" v-if="task.difficulty == 2">
                      <div class="star_a"></div>
                      <div class="star_a"></div>
                      <div class="star_u"></div>
                    </div>
                    <div class="star" v-if="task.difficulty == 3">
                      <div class="star_a"></div>
                      <div class="star_a"></div>
                      <div class="star_a"></div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <h2 class="quote">
          {{ quote }}
        </h2>
      </div>
    </div>
  </div>
</template>

<script src="./Task.js"></script>
<style src="./Task.css"></style>
