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
			}
		}
	},
	onboarding: {
		welcome: {
			title: "Bienvenue sur Meko Academy {name} !",
			description: "Moi, c'est Fifou, ton compagnon d'aventure. Ensemble, on va explorer un monde rempli de défis amusants et apprendre plein de choses tout en s'amusant ! Prêt(e) à commencer ?"
		},
		profile: {
			title: "Choisis ton profil",
			noChildren: "Vous n'avez pas encore ajouté d'enfant à votre compte."
		},
		avatar: {
			title: "Choisis ton avatar",
			description: "Commence par choisir ton avatar. Tu pourras toujours le changer plus tard si tu le souhaites.",
			noAvatars: "Aucun avatar disponible pour le moment.",
			success: "Avatar sélectionné avec succès",
			successDescription: "Tu peux le changer à tout moment dans les paramètres de ton profil."
		},
		createChild: {
			title: "Création compte enfant",
			subtitle: "Renseignez les informations concernant l'enfant",
			firstName: "Nom",
			lastName: "Prénom",
			birthday: "Date de naissance",
			placeholders: {
				firstName: "Entrez le nom",
				lastName: "Entrez le prénom"
			},
			submit: "Créer le compte"
		}
	},
	common: {
		trial: 'Essai gratuit de 7 jours',
		month: 'Mois',
		dashboard: 'Tableau de bord',
		ready:  'Commencer maintenant !'
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
      errors: {
         email: {
            required: 'L\'email est requis',
            invalid: 'Format d\'email invalide'
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
	}

};

export default fr;
