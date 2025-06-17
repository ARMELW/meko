const en = {
   ui: {
      title: "Design system"
   },
   monitoring: {
      children: {
         create: {
            title: "Create child account",
            firstName: "Child's first name",
            lastName: "Child's last name",
            birthday: "Date of birth",
            placeholders: {
               firstName: "Enter first name",
               lastName: "Enter last name"
            },
            submit: "Create account",
            success: "Child account created successfully"
         },
         add: "Add",
         edit: "Edit",
         delete: "Delete",
         confirmDelete: {
            title: "Delete child account",
            description: "Are you sure you want to delete this account?",
            verificationSent: "Verification code sent by email",
            success: "Child account successfully deleted",
            error: "Incorrect verification code",
            codeTitle: "Verification Code",
            codeMessage: "Please enter the verification code sent to your email",
            sending: "Sending...",
            sendCode: "Send verification code",
            verify: "Verify",
            verifying: "Verifying...",
            message: "Please confirm that you want to delete this account"
         }
      }
   },
   onboarding: {
      welcome: {
         title: "Welcome to Meko Academy {name}!",
         description: "I'm Fifou, your adventure companion. Together, we'll explore a world full of fun challenges and learn lots of things while having fun! Ready to start?"
      },
      profile: {
         title: "Choose your profile",
         noChildren: "You haven't added any children to your account yet."
      },
      avatar: {
         title: "Choose your avatar",
         description: "Start by choosing your avatar. You can always change it later if you want.",
         noAvatars: "No avatars available at the moment.",
         success: "Avatar successfully selected",
         successDescription: "You can change it anytime in your profile settings."
      },
      createChild: {
         title: "Create child account",
         subtitle: "Enter the child's information",
         firstName: "First name",
         lastName: "Last name",
         birthday: "Date of birth",
         placeholders: {
            firstName: "Enter first name",
            lastName: "Enter last name"
         },
         submit: "Create account"
      }
   },
   common: {
		trial: '7-day free trial',
      month: 'Month',
      dashboard: 'Dashboard',
      ready:  'Get Started Now!',
      home: 'Home',
      changeProfile: 'Change profile',
      changeAvatar: 'Change avatar',
      search: 'Search',
      back: 'Back'
	},
	menu: {
		childOptions: {
			title: 'Manage child account',
			subscriptions: 'Subscriptions',
			addChild: 'Add child',
			settings: 'Settings'
		}
	},
   auth: {
      login: 'Login',
      success: 'A login code has been sent to your email address',
      createAccount: 'Create parent account',
      provideInfo: 'Enter your information',
      firstName: 'First name',
      lastName: 'Last name',
      email: 'Email',
      termsAgreement: 'By creating an account, you agree to Meko Academy\'s',
      termsLink: 'terms and conditions',
      connect: 'Connect',
      signUp: 'Sign Up',
      alreadyHaveAccount: 'Already have an account?',
      errors: {
         email: {
            required: 'Email is required',
            invalid: 'Invalid email format'
         },
         firstName: {
            required: 'First name is required'
         },
         lastName: {
            required: 'Last name is required'
         },
         otp: {
            required: 'Verification code must be 6 digits',
            length: 'Verification code must be 6 digits',
            invalid: 'Verification code must contain only digits'
         }
      },
      logout: 'Logout',
      loggingOut: 'Logout ...'
   },
   landing: {
      heroTitle: "Learn math while having fun!",
      heroDescription: "Turn learning into play! Meko Academy helps your child excel in math with fun, interactive challenges that make mastering addition, subtraction, multiplication, and division exciting.",
      discover: "DISCOVER MEKO ACADEMY IN ACTION!",
      planTitle: "Choose the plan that suits you best",
      mensual: 'Mensual',
      annual: 'Annual',
      switchPlan: 'Switch Plan',
      buyPlan: "Buy the plan"
   },
   modules: {
      loading: 'Loading modules...',
      error: 'Error loading modules',
      noModules: 'No modules available',
      status: {
         not_started: 'TO DISCOVER',
         in_progress: 'IN PROGRESS',
         completed: 'COMPLETED',
         blocked: 'BLOCKED'
      },
      detail: {
         notFound: 'Module not found',
         totalLessons: 'Total lessons',
         totalGames: 'Total games',
         completedGames: 'Completed games',
         progress: 'Progress',
         overallProgress: 'Overall progress',
         completed: 'completed',
         completedAt: 'Completed on',
         lesson: 'Lesson',
         lessons: 'LESSONS',
         games: 'GAMES',
         completedCount: 'COMPLETED',
         launch: 'LAUNCH',
         description: 'Dive into the world of additions and through interactive lessons and fun games, learn to add with ease while taking on fun challenges. Ready to become a master of additions?',
         gameStatus: {
            completed: 'COMPLETED',
            blocked: 'LOCKED',
				available: 'TO DISCOVER',
            in_progress: 'IN PROGRESS'
         }
      }
   },
   form: {
		'date-picker': {
			placeholder: 'Select a date'
		},
	},
};

export default en;