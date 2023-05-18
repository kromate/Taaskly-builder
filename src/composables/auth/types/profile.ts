export type ProfileType = {
	id: string | null;
	username: string;
	first_name: string;
	last_name: string;
	email: string;
	phone: string;
	verified_level: number;
	profile_level: number;
	tasker_rating: number | boolean;
	runner_rating: number | boolean;
	created_at: string;
	updated_at: string;
};
