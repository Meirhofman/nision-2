export type Language = 'en' | 'he';

export interface Translations {
  [key: string]: {
    en: string;
    he: string;
  };
}

export const translations: Translations = {
  // Common
  continue: { en: 'Continue', he: 'המשך' },
  next: { en: 'Next', he: 'הבא' },
  back: { en: 'Back', he: 'חזור' },
  skip: { en: 'Skip', he: 'דלג' },
  updating: { en: 'Updating...', he: 'מעדכן...' },

  // Login
  email: { en: 'Email', he: 'אימייל' },
  password: { en: 'Password', he: 'סיסמה' },
  login: { en: 'Log In', he: 'התחבר' },
  welcomeBack: { en: 'Welcome back!', he: 'ברוך שובך!' },
  readyForGoals: { en: 'Ready for your daily goals?', he: 'מוכן ליעדים היומיים שלך?' },
  gettingStarted: { en: 'Getting started!', he: 'מתחילים!' },
  createAccount: { en: 'New? Create Account', he: 'חדש? צור חשבון' },
  orLoginWith: { en: 'Or log in with', he: 'או התחבר באמצעות' },

  // Post Login Popup
  changeLater: { en: 'You can change all details later.', he: 'תוכל לשנות את כל הפרטים מאוחר יותר.' },

  // Language Selection
  chooseLanguage: { en: 'Choose Language', he: 'בחר שפה' },
  english: { en: 'English', he: 'אנגלית' },
  hebrew: { en: 'Hebrew', he: 'עברית' },

  // Questionnaire - Gender
  genderQuestion: { en: 'What is your gender?', he: 'מה המין שלך?' },
  male: { en: 'Male', he: 'זכר' },
  female: { en: 'Female', he: 'נקבה' },

  // Questionnaire - Age
  ageQuestion: { en: 'How old are you?', he: 'בן כמה אתה?' },
  yearsOld: { en: 'years old', he: 'שנים' },

  // Questionnaire - Weight/Height
  weightHeightQuestion: { en: 'What is your weight and height?', he: 'מה הגובה והמשקל שלך?' },
  weight: { en: 'Weight', he: 'משקל' },
  height: { en: 'Height', he: 'גובה' },
  kg: { en: 'kg', he: 'ק"ג' },
  cm: { en: 'cm', he: 'ס"מ' },

  // Questionnaire - Goal
  goalQuestion: { en: 'What is your main goal?', he: 'מה המטרה העיקרית שלך?' },
  loseWeight: { en: 'Lose Weight', he: 'לרדת במשקל' },
  buildMuscle: { en: 'Build Muscle', he: 'לבנות שריר' },
  improveEndurance: { en: 'Improve Endurance', he: 'לשפר סיבולת' },
  flexibility: { en: 'Flexibility / Stretching', he: 'גמישות / מתיחות' },
  generalHealth: { en: 'General Health / Well-being', he: 'בריאות כללית / רווחה' },
  funPlay: { en: 'Fun / Play', he: 'כיף / משחק' },
  other: { en: 'Other', he: 'אחר' },
  enterGoal: { en: 'Enter your goal...', he: 'הכנס את המטרה שלך...' },

  // Questionnaire - Health
  healthQuestion: { en: 'Health information (for safe recommendations)', he: 'מידע בריאותי (להנחיות מותאמות)' },
  diseasesQuestion: { en: 'Do you have any of the following?', he: 'האם יש לך אחת מהמחלות הבאות?' },
  diabetes: { en: 'Diabetes', he: 'סוכרת' },
  heartDisease: { en: 'Heart disease', he: 'מחלות לב' },
  hypertension: { en: 'Hypertension', he: 'יתר לחץ דם' },
  asthma: { en: 'Asthma', he: 'אסטמה' },
  thyroid: { en: 'Thyroid', he: 'בעיות תירואיד' },
  celiac: { en: 'Celiac', he: 'צליאק' },
  none: { en: 'None', he: 'ללא' },
  allergiesQuestion: { en: 'Allergies (food, medications)', he: 'אלרגיות (מזון, תרופות)' },
  allergiesPlaceholder: { en: 'List any allergies...', he: 'ציין אלרגיות אם יש...' },
  medicalConditions: { en: 'Medical Conditions', he: 'מצבים רפואיים' },
  noMedicalConditions: { en: 'No medical conditions specified', he: 'לא צוינו מצבים רפואיים' },
  noAllergies: { en: 'No allergies specified', he: 'לא צוינו אלרגיות' },
  updateMedicalInfo: { en: 'Update Medical Info', he: 'עדכן מידע רפואי' },
  additionalHealthInfo: { en: 'Additional info', he: 'מידע נוסף' },
  additionalHealthPlaceholder: { en: 'Disorders, conditions, or anything we should know for correct guidance...', he: 'הפרעות, בעיות רפואיות או כל מידע שחשוב לדעת לצורך הנחיות נכונות...' },

  // Questionnaire - Fitness Background
  fitnessQuestion: { en: 'What is your fitness background?', he: 'מה הרקע שלך בכושר?' },
  noBackground: { en: 'No background', he: 'אין רקע' },
  beginner: { en: 'Beginner', he: 'מתחיל' },
  intermediate: { en: 'Intermediate', he: 'בינוני' },
  advanced: { en: 'Advanced', he: 'מתקדם' },

  // Questionnaire - Military
  militaryQuestion: { en: 'Are you preparing for military service?', he: 'האם אתה מתכונן לשירות צבאי?' },
  yes: { en: 'Yes', he: 'כן' },
  no: { en: 'No', he: 'לא' },

  // Completion
  allSet: { en: 'All set!', he: 'הכל מוכן!' },
  letsGetStarted: { en: "Let's get started", he: 'בוא נתחיל' },

  // Main
  points: { en: 'Points', he: 'נקודות' },
  nutrition: { en: 'Nutrition', he: 'תזונה' },
  social: { en: 'Social', he: 'חברתי' },
  workouts: { en: 'Workouts', he: 'אימונים' },
  settings: { en: 'Settings', he: 'הגדרות' },

  // Workouts
  keepMoving: { en: 'Keep moving, stay amazing!', he: 'המשיכו לזוז, תישארו מדהימים!' },
  trainingType: { en: 'Training Type', he: 'סוג האימון' },
  stepsGoal: { en: 'of 8,000 steps', he: 'מתוך 8,000 צעדים' },
  stepsOf: { en: 'steps out of daily goal', he: 'צעדים מתוך היעד היומי' },
  steps: { en: 'Steps', he: 'צעדים' },
  distance: { en: 'Distance', he: 'מרחק' },
  time: { en: 'Time', he: 'זמן' },
  startWorkout: { en: 'Start Workout', he: 'התחל אימון' },
  history: { en: 'History', he: 'היסטוריה' },
  schedule: { en: 'Schedule', he: 'לוח זמנים' },
  scheduleWorkout: { en: 'Schedule Workout', he: 'תזמון אימון' },
  share: { en: 'Share', he: 'שתף' },
  shareWithFriends: { en: 'Share progress & photos with friends', he: 'שתף התקדמות ותמונות עם חברים' },
  summary: { en: 'Summary', he: 'סיכום' },
  training: { en: 'Training', he: 'אימון' },

  // History
  workoutHistory: { en: 'Workout History', he: 'היסטוריית אימונים' },
  nutritionHistory: { en: 'Nutrition History', he: 'היסטוריית תזונה' },
  completed: { en: 'Completed', he: 'הושלם' },
  active: { en: 'Active', he: 'פעיל' },
  today: { en: 'Today', he: 'היום' },
  yesterday: { en: 'Yesterday', he: 'אתמול' },
  walking: { en: 'Walking', he: 'הליכה' },
  running: { en: 'Running', he: 'ריצה' },
  cycling: { en: 'Cycling', he: 'רכיבה' },
  yoga: { en: 'Yoga', he: 'יוגה' },
  dance: { en: 'Dance', he: 'ריקוד' },
  hiit: { en: 'HIIT', he: 'HIIT' },
  swimming: { en: 'Swimming', he: 'שחייה' },

  // Summary
  activitySummary: { en: 'Activity Summary', he: 'סיכום פעילות' },
  daily: { en: 'Daily', he: 'יומי' },
  weekly: { en: 'Weekly', he: 'שבועי' },
  monthly: { en: 'Monthly', he: 'חודשי' },
  calories: { en: 'Calories', he: 'קלוריות' },
  activeTime: { en: 'Active Time', he: 'זמן פעיל' },
  totalSteps: { en: 'Total Steps', he: 'סה"כ צעדים' },
  totalDistance: { en: 'Total Distance', he: 'סה"כ מרחק' },
  totalCalories: { en: 'Total Calories', he: 'סה"כ קלוריות' },
  totalTime: { en: 'Total Time', he: 'סה"כ זמן' },
  stepsThisWeek: { en: 'Steps this Week', he: 'צעדים השבוע' },
  monthFeb: { en: 'February 2026', he: 'פברואר 2026' },

  // Settings
  darkMode: { en: 'Dark Mode', he: 'מצב כהה' },
  startJourney: { en: 'Start your journey', he: 'התחל את המסע שלך' },
  phoneNumber: { en: 'Phone Number', he: 'מספר טלפון' },
  data: { en: 'Data', he: 'נתונים' },
  yourData: { en: 'Your Data', he: 'הנתונים שלך' },
  age: { en: 'Age', he: 'גיל' },
  edit: { en: 'Edit', he: 'ערוך' },
  save: { en: 'Save', he: 'שמור' },
  notifications: { en: 'Notifications', he: 'התראות' },
  rateUs: { en: 'Rate Us', he: 'דרג אותנו' },
  contactUs: { en: 'Contact Us', he: 'צור קשר' },
  changePassword: { en: 'Change Password', he: 'שנה סיסמה' },
  logOut: { en: 'Log Out', he: 'התנתק' },
  deleteAccount: { en: 'Delete Account', he: 'מחק חשבון' },
  userName: { en: 'User Name', he: 'שם משתמש' },
  languageLabel: { en: 'Language', he: 'שפה' },
  // Character
  character: { en: 'Character', he: 'דמות' },
  dressUp: { en: 'Dress Up', he: 'להלביש' },
  hats: { en: 'Hats', he: 'כובעים' },
  shirts: { en: 'Shirts', he: 'חולצות' },
  pants: { en: 'Pants', he: 'מכנסיים' },
  shoes: { en: 'Shoes', he: 'נעליים' },
  accessory: { en: 'Accessories', he: 'אביזרים' },
  skins: { en: 'Skins', he: 'צבעים' },
  equip: { en: 'Equip', he: 'הלבש' },
  remove: { en: 'Remove', he: 'הסר' },

  // Tutorial
  tutorialTitle1: { en: 'Welcome! 👋', he: 'ברוכים הבאים! 👋' },
  tutorialDesc1: { en: "Let's learn how to use the app in 30 seconds.", he: 'בוא נלמד איך להשתמש באפליקציה ב-30 שניות.' },
  tutorialTitle2: { en: 'Your Character 👤', he: 'הדמות שלך 👤' },
  tutorialDesc2: { en: 'Click on the character to design it, change colors and add accessories!', he: 'לחץ על הדמות כדי לעצב אותה, לשנות צבעים ולהוסיף אביזרים!' },
  tutorialTitle3: { en: 'Your Tools 🛠️', he: 'הכלים שלך 🛠️' },
  tutorialDesc3: { en: 'Here at the bottom are all your tools: Social, Workouts and Nutrition.', he: 'כאן למטה נמצאים כל הכלים שלך: חברתי, אימונים ותזונה.' },
  tutorialGotIt: { en: "Got it! Let's start 🚀", he: 'הבנתי! בוא נתחיל 🚀' },
  dragToPlace: { en: 'You can drag accessories to place them! ✨', he: 'ניתן לגרור את האביזרים כדי למקם אותם! ✨' },
  // Live screen
  liveModeTitle: { en: 'Live mode in real time ⚡', he: 'מצב לייב בזמן אמת ⚡' },
  liveCompetitions: { en: 'Live competitions', he: 'תחרויות לייב' },
  liveWarningTitle: { en: 'Note before entering - your location will be shown:', he: 'שים לב לפני הכניסה למסך - המיקום שלך יוצג:' },
  liveWarningPoints: { en: '• Map with all participants on the same route in real time\n• Location of each participant on the map\n• Average speed of each participant\n• Who is leading the race', he: '• מפה עם כל המשתתפים באותו מסלול בזמן אמת\n• מיקום של כל משתתף על המפה\n• מהירות ממוצעת של כל משתתף\n• מי מוביל בתחרות' },
  livePrivacyNote: { en: 'Note: Your location will be shown during the competition. A privacy notice will appear and we will ask for your consent.', he: '⚠️ שים לב: המיקום שלך יוצג בזמן התחרות. במהלך השימוש תופיע אזהרת פרטיות ונבקש את הסכמתך' },
  enterLive: { en: 'Enter! ⚡', he: 'כנס! ⚡' },
  viewTutorial: { en: 'View App Tutorial', he: 'צפה במדריך האפליקציה' },
  tutorialRestarted: { en: 'Tutorial will be restarted on home screen! ✨', he: 'המדריך יופעל מחדש במסך הבית! ✨' },
  logoutConfirm: { en: 'Are you sure you want to log out?', he: 'האם אתה בטוח שברצונך להתנתק?' },
  cancel: { en: 'Cancel', he: 'ביטול' },
  // Returning user
  welcomeBackUser: { en: 'Welcome back, {name}!', he: 'שלום {name}!' },
  useSavedData: { en: 'Would you like to use your saved data?', he: 'האם ברצונך להשתמש בנתונים השמורים?' },
  yesUseSaved: { en: 'Yes, load my data', he: 'כן, טען את הנתונים' },
  noStartFresh: { en: 'No, start fresh', he: 'לא, התחל מחדש' },
  signInWithGoogle: { en: 'Continue with Google', he: 'התחבר עם גוגל' },
  signInWithFacebook: { en: 'Continue with Facebook', he: 'התחבר עם פייסבוק' },
  error: { en: 'An error occurred', he: 'אירעה שגיאה' },
  noNutritionHistory: { en: 'No nutrition history yet', he: 'אין עדיין היסטוריית תזונה' },

  // Username step
  whatsYourName: { en: "What's your name? 👋", he: 'איך קוראים לך? 👋' },
  nameWillAppear: { en: 'Your name will appear on your profile and leaderboard', he: 'השם שלך יוצג בפרופיל ובלוח המנצחים' },
  enterYourName: { en: 'Enter your name...', he: 'הכנס את שמך...' },
  nameMinLength: { en: 'Name must be at least 2 characters', he: 'השם חייב להכיל לפחות 2 תווים' },
  displayName: { en: 'Display Name', he: 'שם תצוגה' },
  username: { en: 'Username', he: 'שם משתמש' },
  enterUsername: { en: 'Enter username...', he: 'הכנס שם משתמש...' },
  usernameMinLength: { en: 'Username must be at least 3 characters', he: 'שם משתמש חייב להכיל לפחות 3 תווים' },

  // Authentication errors
  noRegisteredUser: { en: 'No registered users found. Please sign up first.', he: 'לא נמצאו משתמשים רשומים. אנא הירשם תחילה.' },
  userNotFound: { en: 'User not found or incorrect login details.', he: 'משתמש לא קיים או פרטי התחברות שגויים.' },
  accountBlocked: { en: 'Account blocked due to too many failed attempts. Try again later.', he: 'חשבון נחסם בגלל יותר מדי ניסיונות כושלים. נסה שוב מאוחר יותר.' },
  invalidUsername: { en: 'Invalid username', he: 'שם משתמש שגוי' },
  invalidPassword: { en: 'Invalid password', he: 'סיסמה שגויה' },
  securityAlert: { en: 'Security Alert', he: 'התראת אבטחה' },
  attemptsRemaining: { en: '{count} attempts remaining', he: '{count} ניסיונות נותרו' },

  // Password step
  createPassword: { en: 'Create a password 🔒', he: 'צור סיסמה 🔒' },
  passwordWillBeRemembered: { en: 'Your password will be remembered for future logins', he: 'הסיסמה שלך תיזכר להתחברויות עתידיות' },
  enterPassword: { en: 'Password', he: 'סיסמה' },
  confirmPassword: { en: 'Confirm Password', he: 'אימות סיסמה' },
  passwordPlaceholder: { en: 'Enter your password...', he: 'הכנס את הסיסמה שלך...' },
  confirmPasswordPlaceholder: { en: 'Confirm your password...', he: 'אשר את הסיסמה שלך...' },
  passwordMinLength: { en: 'Password must be at least 6 characters', he: 'הסיסמה חייבת להכיל לפחות 6 תווים' },
  passwordsDoNotMatch: { en: 'Passwords do not match', he: 'הסיסמאות אינן תואמות' },

  // Change Password
  currentPassword: { en: 'Current Password', he: 'סיסמה נוכחית' },
  newPassword: { en: 'New Password', he: 'סיסמה חדשה' },
  confirmNewPassword: { en: 'Confirm New Password', he: 'אימות סיסמה חדשה' },
  currentPasswordPlaceholder: { en: 'Enter your current password...', he: 'הכנס את הסיסמה הנוכחית שלך...' },
  newPasswordPlaceholder: { en: 'Enter your new password...', he: 'הכנס את הסיסמה החדשה שלך...' },
  confirmNewPasswordPlaceholder: { en: 'Confirm your new password...', he: 'אשר את הסיסמה החדשה שלך...' },
  passwordChangedSuccessfully: { en: 'Password changed successfully!', he: 'הסיסמה שונתה בהצלחה!' },
  changePasswordError: { en: 'Error changing password', he: 'שגיאה בשינוי סיסמה' },
  currentPasswordIncorrect: { en: 'Current password is incorrect', he: 'הסיסמה הנוכחית שגויה' },
  newPasswordTooWeak: { en: 'New password must be at least 6 characters', he: 'הסיסמה החדשה חייבת להכיל לפחות 6 תווים' },
  updatePassword: { en: 'Update Password', he: 'עדכן סיסמה' },

  // Nutrition AI chat
  chooseQuestionToStart: { en: 'Choose a question to start:', he: 'בחר שאלה כדי להתחיל:' },
  whatCanMakeWithEggs: { en: 'What can I make with eggs?', he: 'מה אפשר להכין עם ביצים?' },
  wantSomethingLight: { en: 'I want something light and healthy', he: 'בא לי משהו קליל ובריא' },
  haveChickenAndVeg: { en: 'I have chicken breast and vegetables', he: 'יש לי חזה עוף וירקות' },
  typeFreely: { en: 'Type freely... (e.g.: I have leftover rice from yesterday)', he: 'הקלד באופן חופשי... (למשל: נשאר לי אורז מאתמול)' },
  sendMessage: { en: 'Send message ✨', he: 'שלח הודעה ✨' },

  // Parental controls
  parentalControls: { en: 'Parental Controls', he: 'בקרת הורים' },
  parentalControlsTitle: { en: 'Parental Controls 🛡️', he: 'בקרת הורים 🛡️' },
  parentalControlsDesc: { en: 'Set additional protections, block in-app purchases, and set a maximum screen time limit.', he: 'כאן תוכלו להגדיר הגנות נוספות, חסימת רכישות בתוך האפליקציה, והגבלת זמן מסך מירבי.' },
  screenTimeLimit: { en: 'Screen time limit (hours per day)', he: 'הגבלת זמן (שעות ביום)' },
  blockPurchases: { en: 'Block purchases and points', he: 'חסימת רכישות ונקודות' },
  pinCode: { en: 'PIN code', he: 'קוד גישה (PIN)' },
  setPin: { en: 'Set code', he: 'הגדר קוד' },
  saveParentalSettings: { en: 'Save parental control settings', he: 'שמור הגדרות בקרת הורים' },
  parentAppOption: { en: 'Parents can install the parent app to monitor their child\'s activity', he: 'הורים יכולים להתקין את אפליקציית ההורים על מנת לעקוב אחר פעילות הילד' },
};