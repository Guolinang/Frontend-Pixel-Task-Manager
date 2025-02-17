import Character from "../Character/Character.vue";
import body1 from "@/assets/images/character/body/body1.png";
import body2 from "@/assets/images/character/body/body2.png";
import body3 from "@/assets/images/character/body/body3.png";
import body4 from "@/assets/images/character/body/body4.png";
import face1 from "@/assets/images/character/face/face1.png";
import face2 from "@/assets/images/character/face/face2.png";
import face3 from "@/assets/images/character/face/face3.png";
import face4 from "@/assets/images/character/face/face4.png";
import hair1 from "@/assets/images/character/hair/hair1.png";
import hair2 from "@/assets/images/character/hair/hair2.png";
import hair3 from "@/assets/images/character/hair/hair3.png";
import hair4 from "@/assets/images/character/hair/hair4.png";
import dress1 from "@/assets/images/character/dress/dress1.png";
import dress2 from "@/assets/images/character/dress/dress2.png";
import dress3 from "@/assets/images/character/dress/dress3.png";
import dress4 from "@/assets/images/character/dress/dress4.png";
import other1 from "@/assets/images/character/other/other1.png";
import other2 from "@/assets/images/character/other/other2.png";
import other3 from "@/assets/images/character/other/other3.png";
import other4 from "@/assets/images/character/other/other4.png";

export default {
  components: {
    Character,
  },
  data() {
    return {
      showHero: false,
      flag_a: 1,
      bodies: [body1, body2, body3, body4],
      faces: [face1, face2, face3, face4],
      hair: [hair1, hair2, hair3, hair4],
      dress: [dress1, dress2, dress3, dress4],
      other: [other1, other2, other3, other4],
      bodiesIndex: 0,
      facesIndex: 0,
      hairIndex: 0,
      dressIndex: 0,
      otherIndex: 0,
      wisdom: 0,
      intelligence: 0,
      strength: 0,
      constitution: 0,
      charisma: 0,
      level: 0,
      name: "Guwa",
      hp: 100,
      maxhp: 100,
      exp: 100,
      maxexp: 100,
    };
  },

  async created() {
    let response = await fetch("http://localhost:8000/character", {
      method: "GET",
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    });
    if (response.ok) {
      let data = await response.json();
      this.wisdom = data.wis;
      this.intelligence = data.int;
      this.strength = data.str;
      this.constitution = data.cnst;
      this.charisma = data.char;
      this.level = data.level;
      this.hp = data.hp;
      this.exp = data.exp;
      this.maxexp = data.maxexp;
      this.maxhp = data.maxhp;
      this.hairIndex = data.head;
      this.facesIndex = data.face;
      this.bodiesIndex = data.body;
      this.dressIndex = data.dress;
      this.otherIndex = data.other;
    }
  },

  computed: {
    currentBody() {
      return this.bodies[this.bodiesIndex];
    },

    currentFace() {
      return this.faces[this.facesIndex];
    },

    currentHair() {
      return this.hair[this.hairIndex];
    },

    currentDress() {
      return this.dress[this.dressIndex];
    },

    currentOther() {
      return this.other[this.otherIndex];
    },
  },
  methods: {
    async refreshHero() {
      let response = await fetch("http://localhost:8000/character", {
        method: "GET",
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });
      if (response.ok) {
        let data = await response.json();
        this.wisdom = data.wis;
        this.intelligence = data.int;
        this.strength = data.str;
        this.constitution = data.cnst;
        this.charisma = data.char;
        this.level = data.level;
        this.hp = data.hp;
        this.exp = data.exp;
        this.maxexp = data.maxexp;
        this.maxhp = data.maxhp;
        this.hairIndex = data.head;
        this.facesIndex = data.face;
        this.bodiesIndex = data.body;
        this.dressIndex = data.dress;
        this.otherIndex = data.other;
      }
    },

    closeHero([IndexBody, IndexFace, IndexHair, IndexDress, IndexOther]) {
      let response = fetch("http://localhost:8000/character", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
          Authorization: localStorage.getItem("token"),
        },
        body: JSON.stringify({
          body: IndexBody,
          face: IndexFace,
          head: IndexHair,
          dress: IndexDress,
          other: IndexOther,
          wis: this.wisdom,
          int: this.intelligence,
          str: this.strength,
          cnst: this.constitution,
          char: this.charisma,
          level: this.level,
          hp: this.hp,
          exp: this.exp,
          maxexp: this.maxexp,
          maxhp: this.maxhp,
        }),
      });
      this.refreshHero();
      this.showHero = false;
    },

    confirm() {
      let user_data = {
        login: this.$refs.login.value,
        password: this.$refs.password.value,
      };

      let response = fetch("http://localhost:8000/register", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
          Authorization: localStorage.getItem("token"),
        },
        body: JSON.stringify(user_data),
      });
      console.log(user_data);
      this.$refs.login.value = "";
      this.$refs.password.value = "";
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
