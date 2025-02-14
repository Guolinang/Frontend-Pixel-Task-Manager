export default {
  data() {
    return {
      today: new Date(),
      date: new Date(),
      days: [
        1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
        21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31,
      ],
      tmp_days: [],
      flag: true,
      month: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ],
      month_count: new Date().getMonth(),
      year_count: new Date().getFullYear(),
      day_count: new Date().getDate(),
      t_month: 0,
      t_year: 0,
    };
  },
  created() {
    let day_count = new Date(
      this.today.getFullYear(),
      this.today.getMonth() + 1,
      0
    ).getDate();

    this.t_month = this.today.getMonth();
    this.t_year = this.today.getFullYear();
    this.tmp_days = [
      1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
      22, 23, 24, 25, 26, 27, 28, 29, 30, 31,
    ];
    this.tmp_days = this.tmp_days.splice(0, day_count);
    this.fillCalendar(this.today.getFullYear(), this.today.getMonth());
  },
  methods: {
    datePicked(picked) {
      if (picked == "") return;

      this.$emit(
        "date-picked",
        new Date(this.year_count, this.month_count, picked)
      );
      this.month_count = new Date().getMonth();
      this.year_count = new Date().getFullYear();
      this.changeDays();
    },
    fillCalendar(year, month) {
      let weekDay = new Date(year, month, 1).getDay();
      weekDay = (weekDay + 6) % 7;

      for (let i = 0; i < weekDay; i++) {
        this.tmp_days.unshift(" ");
      }
    },

    changeDays() {
      let day_count = new Date(
        this.year_count,
        this.month_count + 1,
        0
      ).getDate();
      this.tmp_days = [
        1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
        21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31,
      ];

      this.tmp_days = this.tmp_days.splice(0, day_count);
      this.fillCalendar(this.year_count, this.month_count);
    },
    monthLeft() {
      if (this.month_count == 0) {
        this.month_count = 11;
        this.year_count--;
      } else {
        this.month_count = this.month_count - 1;
      }
      this.changeDays();
    },

    monthRight() {
      if (this.month_count == 11) {
        this.month_count = 0;
        this.year_count++;
      } else {
        this.month_count = this.month_count + 1;
      }
      this.changeDays();
    },
  },
};
