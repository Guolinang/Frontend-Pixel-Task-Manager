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
      currentCharacter: [],
      wisdom: 0,
      intelligence: 0,
      strength: 0,
      constitution: 0,
      charisma: 0,
      level: 0,
      name: "Guwa",
      hp: 100,
      exp: 100,
    };
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
    closeHero([IndexBody, IndexFace, IndexHair, IndexDress, IndexOther]) {
      this.bodiesIndex = IndexBody;
      this.facesIndex = IndexFace;
      this.hairIndex = IndexHair;
      this.dressIndex = IndexDress;
      this.otherIndex = IndexOther;
      this.showHero = false;
      let hero_data = {
        body: IndexBody,
        face: IndexFace,
        hair: IndexHair,
        dress: IndexDress,
        other: IndexOther,
      };
      console.log(hero_data);
    },

    confirm() {
      let user_data = {
        login: this.$refs.login.value,
        password: this.$refs.password.value,
      };
      console.log(user_data);
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
