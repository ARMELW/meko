const fr = {
	ui: {
		title: "Notre design system",
	},
	monitoring: {
		children: {
			create: {
				title: "Création compte enfant",
				firstName: "Nom de l'enfant",
				lastName: "Prénom de l'enfant",
				birthday: "Date de naissance",
				placeholders: {
					firstName: "Entrez le nom",
					lastName: "Entrez le prénom"
				},
				submit: "Créer le compte",
				success: "Enfant créé avec succès"
			},
			add: "Ajouter",
			edit: "Modifier",
			delete: "Supprimer",
			confirmDelete: {
				title: "Supprimer le compte enfant",
				description: "Êtes-vous sûr de vouloir supprimer ce compte ?",
				verificationSent: "Code de vérification envoyé par email",
				success: "Compte enfant supprimé avec succès",
				error: "Code de vérification incorrect",
				codeTitle: "Code de vérification",
				codeMessage: "Veuillez saisir le code de vérification envoyé à votre email",
				sending: "Envoi en cours...",
				sendCode: "Envoyer le code",
				verify: "Vérifier",
				verifying: "Vérification...",
				message: "Veuillez confirmer la suppression de ce compte"
			},
			progress: {
				gamesCompleted: "Jeux terminés",
				gamesInProgress: "Jeux en cours",
				progressPercent: "Progression",
				totalTimeSpent: "Temps passé",
				modules: "Progression par module"
			},
			lastActivity: {
				none: "Aucune activité récente"
			}
		}
	},
	onboarding: {
		welcome: {
			title: "Bienvenue sur Meko Academy {name} !",
			description: "Je suis Fifou, ton compagnon d'aventure. Ensemble, nous allons explorer un monde rempli de défis amusants et apprendre plein de choses tout en s'amusant ! Prêt à commencer ?"
		},
		profile: {
			title: "Choisis ton profil",
			noChildren: "Vous n'avez pas encore ajouté d'enfant à votre compte."
		},
		avatar: {
			title: "Choisis ton avatar",
			description: "Commence par choisir ton avatar. Tu pourras toujours le changer plus tard si tu veux.",
			noAvatars: "Aucun avatar disponible pour le moment.",
			success: "Avatar sélectionné avec succès",
			successDescription: "Tu peux le modifier à tout moment dans les paramètres de ton profil."
		},
		createChild: {
			title: "Créer un compte enfant",
			subtitle: "Entrez les informations de l'enfant",
			firstName: "Prénom",
			lastName: "Nom",
			birthday: "Date de naissance",
			placeholders: {
				firstName: "Entrez le prénom",
				lastName: "Entrez le nom"
			},
			submit: "Créer le compte"
		}
	},
	common: {
		trial: 'Essai gratuit de 7 jours',
		month: 'Mois',
		dashboard: 'Tableau de bord',
		ready: 'Commencer maintenant !',
		home: 'Accueil',
		changeProfile: 'Changer de profil',
		changeAvatar: "Changer d'avatar",
		search: 'Rechercher un jeu',
		back: 'Retour',
		lastActivity: 'Dernière activité',
		statistics: 'Statistiques',
		loading: 'Chargement...',
		error: 'Une erreur est survenue',
	},
	menu: {
		childOptions: {
			title: 'Gestion compte enfant',
			subscriptions: 'Abonnements',
			addChild: 'Ajouter un enfant',
			settings: 'Paramètres'
		}
	},
	settings: {
		title: 'Paramètres',
		general: 'Général',
		currency: {
			title: 'Devise utilisée',
			euro: 'Euro (€)',
			chf: 'Franc suisse (SFr.)'
		},
		language: {
			title: 'Langue',
			french: 'Français',
			english: 'English'
		},
		account: {
			title: 'Compte Enfant',
			active: 'Compte enfant actif',
			changeProfile: 'Changer de profil'
		},
		actions: {
			save: 'Sauvegarder',
			saving: 'Sauvegarde...',
			saved: 'Paramètres sauvegardés'
		}
	},
	auth: {
		login: 'Connexion',
		success: 'Un code de connexion a été envoyé à votre adresse email',
		createAccount: 'Création compte parent',
		provideInfo: 'Renseignez vos informations',
		firstName: 'Nom',
		lastName: 'Prénom',
		email: 'Email',
		termsAgreement: 'En créant un compte, vous acceptez les',
		termsLink: 'conditions générales',
		connect: 'Se connecter',
		signUp: 'Créer un compte',
		alreadyHaveAccount: 'Vous avez déjà un compte ?',
		verification: {
			success: {
				signup: 'Compte créé avec succès !',
				login: 'Connexion réussie !',
				description: 'Bienvenue sur Meko Academy'
			}
		},
		errors: {
			email: {
				required: 'L\'email est requis',
				invalid: 'Format d\'email invalide',
				alreadyExists: 'Cet email est déjà utilisé. Connectez-vous à la place.'
			},
			firstName: {
				required: 'Le nom est requis'
			},
			lastName: {
				required: 'Le prénom est requis'
			},
			otp: {
				required: 'Le code de vérification doit contenir 6 chiffres',
				length: 'Le code de vérification doit contenir 6 chiffres',
				invalid: 'Le code de vérification doit contenir uniquement des chiffres'
			}
		},
		logout: 'Déconnexion',
		loggingOut: 'Déconnexion ...'
	},
	landing: {
		heroTitle: "Apprendre les maths en s'amusant !",
		heroDescription: "Avec Meko Academy, l'apprentissage des maths devient un jeu ! Grâce à une interface immersive et des défis interactifs, votre enfant progresse en addition, soustraction, multiplication et division tout en s'amusant.",
		discover: 'DÉCOUVREZ MEKO ACADEMY EN ACTION !',
		planTitle: "CHOISISSEZ L'ABONNEMENT QUI VOUS CONVIENT",
		mensual: 'Mensuel',
		annual: 'Annuel',
		switchPlan: 'Changer de cycle de facturation',
		buyPlan: "Acheter l'offre"
	},
	subscription: {
		trialActive: "Essai gratuit actif",
		trialInactive: "Essai gratuit expiré",
		trialStart: "Début de l'essai : {{date}}",
		trialEnd: "Fin de l'essai : {{date}}",
		trialCta: "Activer l'abonnement",
		daysLeft: "jours restants",
		trialInfoActive: "Profitez de l'essai gratuit. À la fin, vous pourrez choisir un abonnement pour continuer à utiliser Meko Academy.",
		trialInfoInactive: "Votre essai gratuit est terminé. Veuillez choisir un abonnement pour continuer à utiliser Meko Academy.",
		childLimit: {
			reached: "Limite d'enfants atteinte",
			message: "Votre abonnement actuel permet d'avoir jusqu'à {{limit}} enfants. Pour ajouter plus d'enfants, veuillez mettre à niveau votre abonnement.",
			upgrade: "Mettre à niveau",
		}
	},
	modules: {
		loading: 'Chargement des modules...',
		error: 'Erreur lors du chargement des modules',
		noModules: 'Aucun module disponible',
		status: {
			not_started: 'À DÉCOUVRIR',
			in_progress: 'EN COURS',
			completed: 'TERMINÉ',
			blocked: 'BLOQUÉ'
		},
		detail: {
			notFound: 'Module non trouvé',
			totalLessons: 'Leçons totales',
			totalGames: 'Jeux totaux',
			completedGames: 'Jeux terminés',
			progress: 'Progression',
			overallProgress: 'Progression générale',
			completed: 'terminés',
			completedAt: 'Terminé le',
			lesson: 'Leçon',
			lessons: 'LEÇONS',
			games: 'JEUX',
			completedCount: 'TERMINÉS',
			launch: 'LANCER',
			description: 'Plonge toi dans le monde des additions et à travers des leçons interactives et des jeux amusants, apprends à additionner avec facilité tout en relevant des défis ludiques. Prêt à devenir un maître des additions ?',
			gameStatus: {
				completed: 'TERMINÉ',
				blocked: 'BLOQUÉ',
				available: 'À DÉCOUVRIR',
				in_progress: 'EN COURS'
			}
		}
	},
	games: {
		search: {
			loading: 'Recherche en cours...',
			noResults: 'Aucun jeu trouvé',
			suggestions: 'Suggestions'
		},
		session: {
			started: 'Session de jeu démarrée avec succès',
			progressSaved: 'Progression sauvegardée',
			completed: 'Jeu terminé avec succès !',
			abandoned: 'Session de jeu abandonnée',
			error: 'Une erreur est survenue',
			modal: {
				title: 'Simulation de Jeu',
				currentSession: 'Session en cours',
				noSession: 'Aucune session active',
				status: 'Statut',
				progress: 'Progression',
				score: 'Score',
				startTime: 'Début',
				actions: {
					start: 'Démarrer le jeu',
					saveProgress: 'Sauvegarder',
					complete: 'Terminer le jeu',
					quit: 'Quitter',
					close: 'Fermer'
				},
				simulation: {
					title: 'Simulation du jeu',
					description: 'Cette simulation montre le cycle de vie d\'une session de jeu.',
					autoProgress: 'Progression automatique activée'
				},
				lastActivity: {
					title: 'Dernière activité',
					module: 'Module',
					lesson: 'Leçon',
					duration: 'Durée de jeu',
					minutes: 'minutes',
					relaunch: 'Relancer',
					noActivity: 'Aucune activité récente',
					loading: 'Chargement...',
					error: 'Erreur lors du chargement de la dernière activité'
				}
			}
		}
	},
	form: {
		'date-picker': {
			placeholder: 'Sélectionner une date'
		},
	}
};

export default fr;
