const en = {
   ui: {
      title: "Design system"
   },
   monitoring: {
      children: {
         create: {
            title: "Create child account",
            firstName: "Child's name",
            lastName: "Child's last name",
            birthday: "Date of birth",
            placeholders: {
               firstName: "Enter name",
               lastName: "Enter last name"
            },
            submit: "Create account",
            success: "Child account created successfully"
         },
         add: "Add",
         edit: "Edit",
         delete: "Delete",
         daysLeft: "days left",
         trialInfoActive: "Enjoy your free trial. At the end, you can choose a subscription to continue using Meko Academy.",
         trialInfoInactive: "Your free trial has ended. Please choose a subscription to continue using Meko Academy.",
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
         },
         progress: {
            gamesCompleted: "Games completed",
            gamesInProgress: "Games in progress",
            progressPercent: "Progress",
            totalTimeSpent: "Time spent",
            modules: "Module progress"
         },
         lastActivity: {
            none: "No recent activity"
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
         firstName: "Name",
         lastName: "Last name",
         birthday: "Date of birth",
         placeholders: {
            firstName: "Enter name",
            lastName: "Enter last name"
         },
         submit: "Create account"
      }
   },
   common: {
      trial: '7-day free trial',
      month: 'Month',
      dashboard: 'Dashboard',
      ready: 'Get Started Now!',
      home: 'Home',
      changeProfile: 'Change profile',
      changeAvatar: 'Change avatar',
      search: 'Search game',
      back: 'Back',
      lastActivity: 'Last Activity',
      statistics: 'Statistics'
   },
   menu: {
      childOptions: {
         title: 'Manage child account',
         subscriptions: 'Subscriptions',
         addChild: 'Add child',
         settings: 'Settings'
      }
   },
   settings: {
      title: 'Settings',
      general: 'General',
      currency: {
         title: 'Currency used',
         euro: 'Euro (€)',
         chf: 'Swiss Franc (CHF)'
      },
      language: {
         title: 'Language',
         french: 'Français',
         english: 'English'
      },
      account: {
         title: 'Child Account',
         active: 'Active child account',
         changeProfile: 'Change profile'
      },
      actions: {
         save: 'Save',
         saving: 'Saving...',
         saved: 'Settings saved'
      }
   },
   auth: {
      login: 'Login',
      success: 'A login code has been sent to your email address',
      createAccount: 'Create parent account',
      provideInfo: 'Enter your information',
      firstName: 'name',
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
            invalid: 'Invalid email format',
            alreadyExists: 'This email is already in use. Please log in instead.'
         },
         firstName: {
            required: 'name is required'
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
   games: {
      search: {
         loading: 'Searching...',
         noResults: 'No games found',
         suggestions: 'Suggestions'
      },
      session: {
         started: 'Game session started successfully',
         progressSaved: 'Progress saved',
         completed: 'Game completed successfully!',
         abandoned: 'Game session abandoned',
         error: 'An error occurred',
         modal: {
            title: 'Game Simulation',
            currentSession: 'Current session',
            noSession: 'No active session',
            status: 'Status',
            progress: 'Progress',
            score: 'Score',
            startTime: 'Start time',
            actions: {
               start: 'Start game',
               saveProgress: 'Save progress',
               complete: 'Complete game',
               quit: 'Quit',
               close: 'Close'
            },
            simulation: {
               title: 'Game simulation',
               description: 'This simulation shows the lifecycle of a game session.',
               autoProgress: 'Auto-progress enabled'
            },
            lastActivity: {
               title: 'Last Activity',
               module: 'Module',
               lesson: 'Lesson',
               duration: 'Game Duration',
               minutes: 'minutes',
               relaunch: 'Relaunch',
               noActivity: 'No recent activity',
               loading: 'Loading...',
               error: 'Error loading last activity'
            }
         }
      }
   },
   form: {
      'date-picker': {
         placeholder: 'Select a date'
      },
   },
   subscription: {
      childLimit: {
         reached: "Child limit reached",
         message: "Your current subscription allows up to {{limit}} children. To add more children, please upgrade your subscription.",
         upgrade: "Upgrade",
         free: "Free subscription - 1 child maximum",
         standard: "Standard subscription - 3 children maximum",
         premium: "Premium subscription - Unlimited children"
      },
   },
};

export default en;