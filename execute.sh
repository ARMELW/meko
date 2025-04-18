# #!/bin/bash

# cd src/pages || exit

# # Fonction de conversion PascalCase → kebab-case
# to_kebab_case() {
#   echo "$1" | sed -E 's/([a-z])([A-Z])/\1-\2/g' | sed 's/Page//' | tr '[:upper:]' '[:lower:]'
# }

# # Fonction pour créer une page
# create_page() {
#   subfolder=$1
#   component=$2
#   filename=$(to_kebab_case "$component")
#   filepath="$subfolder/${filename}page.tsx"

#   mkdir -p "$(dirname "$filepath")"
#   echo "function $component() {" > "$filepath"
#   echo "  return <div>$component</div>;" >> "$filepath"
#   echo "}" >> "$filepath"
#   echo "" >> "$filepath"
#   echo "export { $component };" >> "$filepath"
#   echo "✅ Created $filepath"
# }

# # Neutral
# create_page "neutral/loading" "LoadingPage"

# # Public
# create_page "public/auth" "CreateParentAccountPage"
# create_page "public/auth" "LoginPage"
# create_page "public/auth" "ForgotPasswordPage"
# create_page "public/auth" "CreateNewPasswordPage"
# create_page "public/landing" "LandingPage"

# # Private

# ## Onboarding / Profile
# create_page "private/onboarding" "ChooseProfilePage"
# create_page "private/onboarding" "CreateChildAccountPage"
# create_page "private/onboarding" "WelcomePage"
# create_page "private/onboarding" "ChooseAvatarPage"

# ## Learning
# create_page "private/learning" "HomePage"
# create_page "private/learning" "ModuleDetailPage"
# create_page "private/learning" "LessonPage"

# ## Monitoring
# create_page "private/monitoring" "ChildMonitoringPage"
# create_page "private/monitoring" "ResultSearchPage"

# ## Settings
# create_page "private/settings" "SettingPage"

# ## Subscription
# create_page "private/subscription" "ChooseSubscriptionPage"
# create_page "private/subscription" "SubscriptionSettingPage"
# create_page "private/subscription" "PaymentPage"
