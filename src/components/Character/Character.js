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
  data() {
    return {
      flag: 1,
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
    closeCharacter() {
      this.$emit("close-character", [
        this.bodiesIndex,
        this.facesIndex,
        this.hairIndex,
        this.dressIndex,
        this.otherIndex,
      ]);
    },
  },
};
