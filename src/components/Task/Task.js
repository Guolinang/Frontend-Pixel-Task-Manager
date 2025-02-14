import Calendar from "../Calendar/Calendar.vue";
import Form from "../Form/Form.vue";
import { ref } from "vue";

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
      tasks: [
        {
          name: "Погулять с собакой",
          s_desc: "AAD",
          type: "study",
          stat: "int",
          difficulty: 3,
          urgency: new Date(2020, 1, 1),
          repeat: [false, false, true, false, true, false, false],
          subtask: [":("],
          l_desc: "AAAAAAAAAA",
          flag_done: false,
          id: 1,
          important: false,
        },
        {
          name: "Стать крутым программистом",
          s_desc: "B",
          type: "work",
          stat: "str",
          difficulty: 1,
          urgency: new Date(),
          repeat: [false, true, true, false, true, false, false],
          subtask: ["(:"],
          l_desc: "AAAAAAAAAA",
          flag_done: true,
          id: 2,
          important: true,
        },
        {
          name: "Сдать курсовую работу",
          s_desc: "AAD",
          type: "study",
          stat: "int",
          difficulty: 2,
          urgency: new Date(),
          repeat: [false, false, true, false, true, false, false],
          subtask: [":("],
          l_desc: "AAAAAAAAAA",
          flag_done: false,
          id: 3,
          important: false,
        },
        {
          name: "Сделать ргр",
          s_desc: "B",
          type: "work",
          stat: "str",
          difficulty: 2,
          urgency: new Date(),
          repeat: [false, true, true, false, true, false, false],
          subtask: ["(:"],
          l_desc: "AAAAAAAAAA",
          flag_done: true,
          id: 4,
          important: false,
        },
      ],
      tasks_past: [
        {
          name: "Убраться дома",
          s_desc: "AAD",
          type: "study",
          stat: "int",
          difficulty: 3,
          urgency: new Date(2020, 1, 1),
          repeat: [false, false, true, false, true, false, false],
          subtask: [":("],
          l_desc: "AAAAAAAAAA",
          flag_done: false,
          id: 1,
          important: false,
        },
        {
          name: "Отдохнуть",
          s_desc: "B",
          type: "work",
          stat: "str",
          difficulty: 1,
          urgency: new Date(),
          repeat: [false, true, true, false, true, false, false],
          subtask: ["(:"],
          l_desc: "AAAAAAAAAA",
          flag_done: true,
          id: 2,
          important: true,
        },
      ],
      tasks_important: [
        {
          name: "Найти стажировку",
          s_desc: "AAD",
          type: "study",
          stat: "int",
          difficulty: 3,
          urgency: new Date(2020, 1, 1),
          repeat: [false, false, true, false, true, false, false],
          subtask: [":("],
          l_desc: "AAAAAAAAAA",
          flag_done: false,
          id: 1,
          important: false,
        },
        {
          name: "Выспаться",
          s_desc: "B",
          type: "work",
          stat: "str",
          difficulty: 1,
          urgency: new Date(),
          repeat: [false, true, true, false, true, false, false],
          subtask: ["(:"],
          l_desc: "AAAAAAAAAA",
          flag_done: true,
          id: 2,
          important: true,
        },
      ],
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

  methods: {
    handleResize() {
      this.window.width = window.innerWidth;
    },
    closeModal() {
      this.showModal = false;
    },

    createTask(obj) {
      this.showForm = false;
    },

    changeTask(obj) {
      this.showForm = false;
    },

    doneTask(obj) {
      this.showForm = false;
    },

    deleteTask(obj) {
      this.showForm = false;
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
    },

    mainGetDate(g_date) {
      this.date = new Date(g_date);
      this.showModal = false;
      this.day = this.date.getDate();
      this.changeCalendar();
    },

    showTForm(i) {
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
      this.f_flag = false;
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
