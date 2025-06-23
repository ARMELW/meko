import { checkConfig } from "./config";
import i18n from "./services/languages";

export async function bootstrap() {
	console.log("Application is bootstrapping...");
	await checkConfig();

	const savedSettings = localStorage.getItem('meko-settings');
	if (savedSettings) {
		try {
			const settings = JSON.parse(savedSettings);
			if (settings.state?.language) {
				await i18n.changeLanguage(settings.state.language);
			}
		} catch (error) {
			console.error('Erreur lors du chargement des paramètres:', error);
		}
	}

	console.log("Application bootstrapped successfully.");
}
