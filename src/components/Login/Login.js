import Task from "../Task/Task";

export default {
  name: "Login",
  data() {
    return {
      login: "",
      password: "",
      title: "Log in",
      isSignUp: false,
      signButton: "Sign up",
    };
  },
  methods: {
    async verifyLogin() {
      let user = {
        login: this.login,
        password: this.password,
      };

      let response = await fetch("http://localhost:8000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charsdwe=utf-8",
        },
        body: JSON.stringify(user),
      });
      if (response.ok) {
        this.$router.push("/task");
      }
    },
    async registerUser() {
      let user = {
        login: this.login,
        password: this.password,
      };

      let response = await fetch("http://localhost:8000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charsdwe=utf-8",
        },
        body: JSON.stringify(user),
      });
      if (response.ok) {
        console.log("User created ");
        this.signUp();
      } else {
        let res = await response.json();
        alert(res.error);
      }
    },
    confirmed() {
      this.login = this.$refs.login.value;
      this.password = this.$refs.password.value;
      if (this.isSignUp == false) this.verifyLogin();
      else this.registerUser();
    },
    signUp() {
      if (!this.isSignUp) {
        this.title = "Sign up";
        this.signButton = "Log in";
        this.isSignUp = true;
      } else {
        this.title = "Log in";
        this.signButton = "Sign up";
        this.isSignUp = false;
      }
    },
  },
};
