<template>
  <div class="form-container">
    <div class="d-flex justify-content-center align-center my-3">
      <b-avatar
        size="5em"
        :variant="$colorMode.preference === 'light' ? 'dark' : 'light'"
      ></b-avatar>
    </div>
    <b-form @submit.prevent="onSubmit" @reset.prevent="onReset">
      <b-form-row>
        <b-col cols="6" xs="12">
          <b-form-group
            class="my-3"
            id="input-group-1"
            label="First Name:"
            label-for="input-1"
          >
            <b-form-input
              :class="
                'border ' + errors && errors.username ? 'border-danger ' : ' '
              "
              id="input-1"
              v-model="user.firstName"
              type="text"
              placeholder="Enter your First Name"
              required
            ></b-form-input>
            <small
              class="text-danger text-center"
              v-if="errors && errors.username"
            >
              {{ errors.username }}
            </small>
          </b-form-group>
        </b-col>
        <b-col cols="6" xs="12">
          <b-form-group
            class="my-3"
            id="input-group-2"
            label="Last Name:"
            label-for="input-2"
          >
            <b-form-input
              :class="
                'border ' + errors && errors.username ? 'border-danger ' : ' '
              "
              id="input-2"
              v-model="user.lastName"
              type="text"
              placeholder="Enter your Last Name"
              required
            ></b-form-input>
            <small
              class="text-danger text-center"
              v-if="errors && errors.username"
            >
              {{ errors.lastName }}
            </small>
          </b-form-group>
        </b-col>
      </b-form-row>
      <b-form-group
        class="my-3"
        id="input-group-3"
        label="Email address:"
        label-for="input-3"
      >
        <b-form-input
          :class="'border ' + errors && errors.email ? 'border-danger ' : ' '"
          id="input-3"
          v-model="user.email"
          type="text"
          placeholder="Enter your email"
          required
        ></b-form-input>
        <small class="text-danger text-center" v-if="errors && errors.email">
          {{ errors.email }}
        </small>
      </b-form-group>
      <b-form-group
        class="my-3"
        id="input-group-4"
        label="Your password:"
        label-for="input-4"
      >
        <b-form-input
          :class="
            'border ' + errors && errors.password ? 'border-danger ' : ' '
          "
          id="input-4"
          v-model="user.password"
          type="password"
          placeholder="Enter your password"
          required
        ></b-form-input>
        <small class="text-danger text-center" v-if="errors && errors.password">
          {{ errors.password }}
        </small>
      </b-form-group>
      <b-form-group
        class="my-3"
        id="input-group-5"
        label="Confirm Password:"
        label-for="input-5"
      >
        <b-form-input
          :class="
            'border ' + errors && errors.confirmPassword
              ? 'border-danger '
              : ' '
          "
          id="input-5"
          v-model="user.confirmPassword"
          type="password"
          placeholder="Enter your password one more time"
          required
        ></b-form-input>
        <small
          class="text-danger text-center"
          v-if="errors && errors.confirmPassword"
        >
          {{ errors.confirmPassword }}
        </small>
      </b-form-group>
      <button type="submit" class="d-block mx-auto py-2 px-5 btn btn-golden">
        Sign up
      </button>
      <caption class="text-center text-danger" v-if="register_error">
        {{
          register_error
        }}
      </caption>
    </b-form>

    <p class="my-3">
      Already have an Account?
      <button
        class="btn btn-link"
        @click="changeToLoginHandler"
        style="vertical-align: initial; padding: 0"
      >
        Sign In!
      </button>
    </p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      errors: {
        email: null,
        password: null,
        firstName: null,
        lastName: null,
        confirmPassword: null,
      },
      user: {
        email: null,
        password: null,
        firstName: null,
        lastName: null,
        confirmPassword: null,
      },
      register_error: null,
    };
  },
  methods: {
    onSubmit() {
      this.errors = {
        email: null,
        password: null,
        firstName: null,
        lastName: null,
        confirmPassword: null,
      };
      //console.log(this.user);
      if (!this.validateForm()) {
        //console.log("that didn't work");
        return;
      }
      this.$axios
        .post("/api/users/register", {
          username: `${this.user.firstName} ${this.user.lastName}`,
          email: this.user.email,
          password: this.user.password,
        })
        .then((res) => {
          if (res.data.id) {
            this.$emit("login");
            this.onReset();
          }
        })
        .catch((err) => {
          this.register_error = err?.response?.data?.message;
          this.errors.email = err.response?.data?.errors?.email?.msg;
          this.errors.password = err.response?.data?.errors?.password?.msg;
          this.errors.username = err.response?.data?.errors?.username?.msg;
          //console.log(this.errors);
        });
      // this.onReset();
    },
    onReset() {
      // Reset our form values

      this.errors = {
        email: null,
        password: null,
        firstName: null,
        lastName: null,
        confirmPassword: null,
      };
      this.user = {
        email: null,
        password: null,
        firstName: null,
        lastName: null,
        confirmPassword: null,
      };
      // Trick to reset/clear native browser form validation state
    },
    changeToLoginHandler() {
      this.$emit("login");
    },
    validateForm() {
      if (this.user.password !== this.user.confirmPassword) {
        this.errors.confirmPassword = "Passwords don't match";
        return false;
      }
      return true;
    },
  },
};
</script>
<style lang="scss" scoped>
.form-container {
  width: 100%;
  max-width: 500px;
  border: 1px solid var(--border-color);
  padding: 10px 15px;
  box-shadow: 0 2px 2px 4px var(--bg-secondary);
}
</style>