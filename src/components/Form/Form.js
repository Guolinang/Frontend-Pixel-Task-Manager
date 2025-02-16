import { computed, watch } from "vue";
import Calendar from "../Calendar/Calendar.vue";

export default {
  props: {
    i_name: String,
    i_s_desc: String,
    i_type: String,
    i_stat: String,
    i_diff: Array,
    i_urgency: Date,
    i_repeat: Array,
    i_subtask: Array,
    i_l_desc: String,
    i_flag: Boolean,
    i_id: Number,
    i_important: Boolean,
  },
  data() {
    return {
      t_name: this.i_name || "",
      t_s_desc: "",
      t_type: "",
      t_stat: "",
      cur_stat: 0,
      t_difficulty: 0,
      stars: [false, false, false],
      t_urgency: new Date(),
      t_repeat: [false, false, false, false, false, false, false],
      t_subtask: [],
      t_l_desc: "",
      t_important: false,
      showModal: false,
      t_flag: false,
      warnings: {
        name: false,
        type: false,
        stat: false,
        urgency: false,
      },
      day: 0,
      month: 0,
      year: 0,
      flag_done: false,
      t_id: 0,
    };
  },

  components: {
    Calendar,
  },

  created() {
    this.day = new Date().getDay();
    this.month = new Date().getMonth();
    this.year = new Date().getFullYear();
  },

  watch: {
    i_id(i_id) {
      this.t_id = i_id;
    },
    i_name(i_name) {
      this.t_name = i_name;
    },

    i_s_desc(i_s_desc) {
      this.t_s_desc = i_s_desc;
    },

    i_type(i_type) {
      this.t_type = i_type;
    },

    i_important(i_important) {
      this.t_important = i_important;
    },

    i_stat(i_stat) {
      this.t_stat = i_stat;
    },
    i_diff(i_diff) {
      if (i_diff == 0) {
        this.t_difficulty = 0;
        this.stars = [false, false, false];
      } else if (i_diff == 1) {
        this.t_difficulty = 1;
        this.stars = [true, false, false];
      } else if (i_diff == 2) {
        this.t_difficulty = 2;
        this.stars = [true, true, false];
      } else if (i_diff == 3) {
        this.t_difficulty = 3;
        this.stars = [true, true, true];
      }
      console.log("D:", this.difficulty);
    },
    i_subtask(i_subtask) {
      this.t_subtask[0] = i_subtask[0];
      this.t_subtask[1] = i_subtask[1];
      this.t_subtask[2] = i_subtask[2];
      if (i_subtask[0] == undefined) {
        this.t_subtask[0] = "";
      }
      if (i_subtask[1] == undefined) {
        this.t_subtask[1] = "";
      }
      if (i_subtask[2] == undefined) {
        this.t_subtask[2] = "";
      }
    },
    i_repeat(i_repeat) {
      this.t_repeat = i_repeat;
    },

    i_l_desc(i_l_desc) {
      this.t_l_desc = i_l_desc;
    },

    i_urgency(i_urgency) {
      this.t_urgency = i_urgency;
      this.day = i_urgency.getDay();
      this.month = i_urgency.getMonth();
      this.year = i_urgency.getFullYear();
    },
  },

  methods: {
    formAccept() {
      this.warnings = {
        name: false,
        type: false,
        stat: false,
      };
      let flag = false;
      if (this.t_name == "") {
        this.warnings.name = true;
        flag = true;
      }
      if (this.t_type == "") {
        this.warnings.type = true;
        flag = true;
      }
      if (this.t_stat == "") {
        this.warnings.stat = true;
        flag = true;
      }
      if (flag == true) {
        return;
      }

      this.t_id = new DataTransfer().getTime;
      this.t_subtask[1] = document.getElementById("sub1").value;
      this.t_subtask[2] = document.getElementById("sub2").value;
      this.t_subtask[3] = document.getElementById("sub3").value;
      this.$emit("accept-form", {});
      this.createTask();
      this.clean();
    },
    async createTask() {
      let repStr = "";
      for (let i = 0; i < this.t_repeat.length; i++) {
        if (this.t_repeat[i] == true) {
          repStr += "1";
        } else {
          repStr += "0";
        }
      }

      let tmpdate = new Date(
        this.t_urgency.getFullYear(),
        this.t_urgency.getMonth(),
        this.t_urgency.getDate(),
        4
      );

      let response = await fetch("http://localhost:8000/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
          Authorization: localStorage.getItem("token"),
        },

        body: JSON.stringify({
          name: this.t_name,
          s_desc: this.t_s_desc,
          type: this.t_type,
          stat: this.t_stat,
          difficulty: this.t_difficulty,
          urgency: tmpdate,
          repeat: repStr,
          subtask: this.t_subtask.join("|"),
          l_desc: this.t_l_desc,
          important: this.t_important,
          done: false,
        }),
      });
    },

    async deleteTask() {
      let response = await fetch("http://localhost:8000/tasks", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
          Authorization: localStorage.getItem("token"),
        },

        body: JSON.stringify({
          id: this.t_id,
        }),
      });
      if (!response.ok) {
        alert("Error deleting task");
      }
    },

    async updateTask() {
      let repStr = "";
      for (let i = 0; i < this.t_repeat.length; i++) {
        if (this.t_repeat[i] == true) {
          repStr += "1";
        } else {
          repStr += "0";
        }
      }

      let tmpdate = new Date(
        this.t_urgency.getFullYear(),
        this.t_urgency.getMonth(),
        this.t_urgency.getDate(),
        4
      );

      console.log(this.difficulty);

      console.log({
        id: this.t_id,
        name: this.t_name,
        s_desc: this.t_s_desc,
        type: this.t_type,
        stat: this.t_stat,
        difficulty: this.t_difficulty,
        urgency: tmpdate,
        repeat: repStr,
        subtask: this.t_subtask.join("|"),
        l_desc: this.t_l_desc,
        important: this.t_important,
        done: this.flag_done,
      });

      let response = await fetch("http://localhost:8000/tasks", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
          Authorization: localStorage.getItem("token"),
        },
        body: JSON.stringify({
          id: this.t_id,
          name: this.t_name,
          s_desc: this.t_s_desc,
          type: this.t_type,
          stat: this.t_stat,
          difficulty: this.t_difficulty,
          urgency: tmpdate,
          repeat: repStr,
          subtask: this.t_subtask.join("|"),
          l_desc: this.t_l_desc,
          important: this.t_important,
          done: this.flag_done,
        }),
      });
      if (!response.ok) {
        alert("Error updating task");
      }
    },

    formDecline() {
      this.warnings = {
        name: false,
        type: false,
        stat: false,
        urgency: false,
      };
      this.clean();
      this.$emit("decline-form");
    },

    async formOk() {
      this.warnings = {
        name: false,
        type: false,
        stat: false,
        urgency: false,
      };
      let flag = false;
      if (this.t_name == "") {
        this.warnings.name = true;
        flag = true;
      }
      if (this.t_type == "") {
        this.warnings.type = true;
        flag = true;
      }
      if (this.t_stat == "") {
        this.warnings.stat = true;
        flag = true;
      }
      if (flag == true) {
        return;
      }

      await this.updateTask();

      this.$emit("change-form", {});
      this.clean();
    },

    async formDelete() {
      await this.deleteTask();

      this.$emit("delete-form", {});
      this.clean();
    },

    async formDone() {
      this.$emit("done-form", {
        name: this.t_name,
        s_desc: this.t_s_desc,
        type: this.t_type,
        stat: this.t_stat,
        difficulty: this.t_difficulty,
        urgency: this.t_urgency,
        repeat: this.t_repeat,
        subtask: this.t_subtask,
        l_desc: this.t_l_desc,
        important: this.t_important,
        flag_done: true,
      });
      this.flag_done = true;
      await this.updateTask();
      this.clean();
    },

    clean() {
      this.t_name = "";
      this.t_s_desc = "";
      this.t_type = "";
      this.t_stat = "";
      this.cur_stat = 0;
      this.t_difficulty = 0;
      this.stars = [false, false, false];
      this.t_urgency = new Date();
      this.day = new Date().getDate();
      this.month = new Date().getMonth();
      this.year = new Date().getFullYear();
      this.t_repeat = [false, false, false, false, false, false, false];
      this.t_subtask[0] = "";
      this.t_subtask[1] = "";
      this.t_subtask[2] = "";
      this.t_l_desc = "";
      this.t_important = false;
    },

    closeModal() {
      this.showModal = false;
    },
    dateGet(g_date) {
      this.t_urgency = new Date(g_date);
      this.showModal = false;
      this.day = this.t_urgency.getDate();
      this.month = this.t_urgency.getMonth();
      this.year = this.t_urgency.getFullYear();
    },
  },
};
