<template>
  <div id="mc_modal" class="c_modal">
    <div class="c_modal_box">
      <div class="datepicker">
        <div class="datepicker-top">
          <div class="month-selector">
            <button class="arrow_c" v-on:click="monthLeft">
              <i class="calendar_arrowleft_c"></i>
            </button>
            <span class="month-name"
              >{{ month[month_count] }} {{ year_count }}</span
            >
            <button class="arrow_c" v-on:click="monthRight">
              <i class="calendar_arrowright_c"></i>
            </button>
          </div>
        </div>
        <div class="datepicker-calendar">
          <span class="day">Mo</span>
          <span class="day">Tu</span>
          <span class="day">We</span>
          <span class="day">Th</span>
          <span class="day">Fr</span>
          <span class="day">Sa</span>
          <span class="day">Su</span>
          <div v-for="day in tmp_days">
            <button class="dates" v-on:click="datePicked(day)">
              <div
                v-if="
                  day == day_count &&
                  month_count == t_month &&
                  year_count == t_year
                "
                class="active_d"
              >
                {{ day }}
              </div>
              <div
                v-if="
                  day != day_count ||
                  month_count != t_month ||
                  year_count != t_year
                "
              >
                {{ day }}
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style src="./Calendar.css"></style>
<script src="./Calendar.js"></script>
