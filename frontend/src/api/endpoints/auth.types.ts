type RegisterResponse = {
	message: string;
	token: string;
	user: User;
};
type User = {
	name: string;
	email: string;
};
type LoginResponse = {
	message: string;
	token: string;
	user: User;
};
type LogoutResponse = {
	message: string;
};