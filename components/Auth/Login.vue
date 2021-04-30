<template>
	<div class="form-container">
		<div class="d-flex justify-content-center align-center my-3">
			<b-avatar
				size="5em"
				:variant="$colorMode.preference === 'light' ? 'dark' : 'light'"
			></b-avatar>
		</div>
		<b-form @submit.prevent="onSubmit" @reset.prevent="onReset">
			<b-form-group
				class="my-3"
				id="input-group-1"
				label="Email address:"
				label-for="input-1"
			>
				<b-form-input
					id="input-1"
					v-model="user.email"
					type="email"
					placeholder="Enter your email"
					required
					name="email"
				></b-form-input>
				<small class="text-danger text-center" v-if="errors && errors.email">
					{{ errors.email }}
				</small>
			</b-form-group>

			<b-form-group
				class="my-3"
				id="input-group-2"
				label="Your password:"
				label-for="input-2"
			>
				<b-input-group>
					<b-form-input
						id="input-2"
						v-model="user.password"
						:class="
							'border ' + errors && errors.password ? 'border-danger ' : ' '
						"
						:type="passType"
						placeholder="Enter your password"
						required
						name="password"
					></b-form-input>
					<b-input-group-append>
						<i
							class="fa fa-eye"
							aria-hidden="true"
							v-if="passType === 'password'"
							@click="changePassTypeHandler('text')"
						></i>
						<i
							class="fa fa-eye-slash"
							aria-hidden="true"
							@click="changePassTypeHandler('password')"
							v-else
						></i>
					</b-input-group-append>
				</b-input-group>
				<small class="text-danger text-center" v-if="errors && errors.password">
					{{ errors.password }}
				</small>
			</b-form-group>
			<button type="submit" class="d-block mx-auto py-2 px-5 btn btn-golden">
				Login
			</button>
			<small class="text-center text-danger" v-if="login_error">
				{{ login_error }}
			</small>
		</b-form>

		<div class="d-flex justify-content-between align-items-center my-3">
			<p class="m-0">
				Don't have an account?
				<button
					class="btn btn-link"
					@click="changeToRegisterHandler"
					style="vertical-align: initial; padding: 0"
				>
					Sign up
				</button>
				now!
			</p>
			<button class="btn btn-link" @click="showTestingCredits">
				Guest User
			</button>
		</div>

		<div class="my-3" v-if="testingCreds">
			<h5 class="text-center">
				You can test it using the following credintials ... but I encourage you
				to have your own personal account
			</h5>
			<p class="pt-3 pb-1">Email: test15@gmail.com</p>
			<p>Password: test12345</p>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				errors: {
					email: null,
					password: null,
				},
				login_error: null,
				user: {
					email: "",
					password: "",
				},
				passType: "password",
				testingCreds: false,
			};
		},
		methods: {
			onSubmit() {
				this.$auth
					.loginWith("local", {
						data: {
							email: this.user.email,
							password: this.user.password,
						},
					})
					.then((res) => {
						//console.log(res);
						this.$router.push("/");
					})
					.catch((err) => {
						this.login_error = err?.response?.data?.message;
						this.errors.email = err.response?.data?.errors?.email?.msg;
						this.errors.password = err.response?.data?.errors?.password?.msg;
					});
				// this.onReset();
			},
			onReset() {
				// Reset our form values
				this.user.email = "";
				this.user.password = "";
				this.passType = "password";
				// Trick to reset/clear native browser form validation state
			},
			changePassTypeHandler(type) {
				this.passType = type;
			},
			changeToRegisterHandler() {
				this.$emit("register");
			},
			showTestingCredits() {
				this.testingCreds = !this.testingCreds;
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