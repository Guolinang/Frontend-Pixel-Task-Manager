import Calendar from "../Calendar/Calendar.vue";
import Form from "../Form/Form.vue";
import { onUpdated, ref } from "vue";

export default {
  components: {
    Calendar,
    Form,
  },
  data() {
    return {
      window: {
        width: 0,
      },
      firstUpd: true,
      showModal: false,
      showForm: false,
      flagL: false,
      flagR: false,
      flagC: true,
      date: new Date(),
      date_list: [0, 0, 0, 0, 0, 0, 0],
      day: 0,
      c_name: "",
      c_s_desc: "",
      c_type: "",
      c_stat: "",
      c_difficulty: 0,
      c_urgency: new Date(),
      c_repeat: [false, false, false, false, false, false, false],
      c_subtask: [],
      c_l_desc: "",
      c_important: false,
      c_flag: false,
      quote: "The way up is difficult, but how good is the viewing",
      tasks: [],
      tasks_past: [],
      tasks_important: [],
    };
  },

  created() {
    window.addEventListener("resize", this.handleResize);
    this.handleResize();
  },
  destroyed() {
    window.removeEventListener("resize", this.handleResize);
  },
  mounted() {
    // this.windowWidth = ref(window.innerWidth);
    // console.log(this.windowWidth);
    this.date_list[3] = new Date().getDate();
    let month = new Date(
      this.date.getFullYear(),
      this.date.getMonth(),
      0
    ).getDate();
    let now = new Date(
      this.date.getFullYear(),
      this.date.getMonth() + 1,
      0
    ).getDate();
    for (let i = 2; i >= 0; i--) {
      if (this.date_list[i + 1] == 1) {
        this.date_list[i] = month;
      } else {
        this.date_list[i] = this.date_list[i + 1] - 1;
      }
    }
    for (let i = 4; i < 7; i++) {
      if (this.date_list[i - 1] == now) {
        this.date_list[i] = 1;
      } else {
        this.date_list[i] = this.date_list[i - 1] + 1;
      }
    }
    this.day = this.date.getDate();
  },
  watch: {},
  async updated() {
    if (this.firstUpd) {
      this.firstUpd = false;
      await this.refreshTask();
    }
  },
  methods: {
    async refreshTask() {
      let response = await fetch(
        `http://localhost:8000/tasks?date=${this.date.toISOString()}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json;charset=utf-8",
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      if (response.ok) {
        let res = await response.json();
        //console.log(res);
        this.tasks = res.today;
        this.tasks.forEach((el) => {
          el.urgency = new Date(el.urgency);
          let newRep = [];
          for (let i = 0; i < el.repeat.length; i++) {
            if (el.repeat[i] == "0") {
              newRep.push(false);
            } else {
              newRep.push(true);
            }
          }
          el.repeat = newRep;
          el.subtask = el.subtask.split("|");
        });

        this.tasks_important = res.important;
        this.tasks_important.forEach((el) => {
          el.urgency = new Date(el.urgency);
          let newRep = [];
          for (let i = 0; i < el.repeat.length; i++) {
            if (el.repeat[i] == "0") {
              newRep.push(false);
            } else {
              newRep.push(true);
            }
          }
          el.repeat = newRep;
          el.subtask = el.subtask.split("|");
        });

        this.tasks_past = res.unfinished;
        this.tasks_past.forEach((el) => {
          el.urgency = new Date(el.urgency);
          let newRep = [];
          for (let i = 0; i < el.repeat.length; i++) {
            if (el.repeat[i] == "0") {
              newRep.push(false);
            } else {
              newRep.push(true);
            }
          }
          el.repeat = newRep;
          el.subtask = el.subtask.split("|");
        });
      }
      // console.log(this.tasks);
    },

    handleResize() {
      this.window.width = window.innerWidth;
    },
    closeModal() {
      this.showModal = false;
    },

    createTask(obj) {
      this.showForm = false;
      this.refreshTask();
    },

    changeTask(obj) {
      this.showForm = false;
      this.refreshTask();
    },

    doneTask(obj) {
      this.showForm = false;
      this.refreshTask();
    },

    deleteTask(obj) {
      this.showForm = false;
      this.refreshTask();
    },

    clickLeft() {
      if (this.flagR == true) {
        this.flagR = false;
        this.flagC = true;
        this.flagL = false;
      } else {
        this.flagR = false;
        this.flagC = false;
        this.flagL = true;
      }
    },

    clickRight() {
      if (this.flagL == true) {
        this.flagL = false;
        this.flagC = true;
        this.flagR = false;
      } else {
        this.flagL = false;
        this.flagC = false;
        this.flagR = true;
      }
    },

    changeCalendar() {
      this.date_list[3] = new Date(this.date).getDate();
      let month = new Date(
        this.date.getFullYear(),
        this.date.getMonth(),
        0
      ).getDate();
      let now = new Date(
        this.date.getFullYear(),
        this.date.getMonth() + 1,
        0
      ).getDate();
      for (let i = 2; i >= 0; i--) {
        if (this.date_list[i + 1] == 1) {
          this.date_list[i] = month;
        } else {
          this.date_list[i] = this.date_list[i + 1] - 1;
        }
      }
      for (let i = 4; i < 7; i++) {
        if (this.date_list[i - 1] == now) {
          this.date_list[i] = 1;
        } else {
          this.date_list[i] = this.date_list[i - 1] + 1;
        }
      }
      this.day = this.date.getDate();
    },

    changeback() {
      this.date = new Date();
      this.changeCalendar();
      this.refreshTask();
    },

    mainGetDate(g_date) {
      this.date = new Date(
        g_date.getFullYear(),
        g_date.getMonth(),
        g_date.getDate(),
        4
      );

      this.showModal = false;
      this.changeCalendar();
      this.refreshTask();
    },

    showTForm(i) {
      console.log(i, this.tasks[i]);
      this.c_name = this.tasks[i].name;
      this.c_s_desc = this.tasks[i].s_desc;
      this.c_type = this.tasks[i].type;
      this.c_stat = this.tasks[i].stat;
      this.c_difficulty = this.tasks[i].difficulty;
      this.c_urgency = this.tasks[i].urgency;
      this.c_repeat = this.tasks[i].repeat;
      this.c_subtask = this.tasks[i].subtask;
      this.c_l_desc = this.tasks[i].l_desc;
      this.c_id = this.tasks[i].id;
      this.c_flag = false;
      this.showForm = true;
      this.c_important = this.tasks[i].important;
    },

    m_b_task() {
      this.$router.push("/task");
    },

    m_b_profile() {
      this.$router.push("/profile");
    },

    m_b_login() {
      this.$router.push("/");
    },
  },
};
