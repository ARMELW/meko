import { checkConfig } from "./config";

export async function bootstrap() {
	console.log("Application is bootstrapping...");
	await checkConfig();

	console.log("Application bootstrapped successfully.");
}
