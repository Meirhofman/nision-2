import { createBrowserRouter, Navigate } from "react-router";
import { Root } from "./Root";
import {
  SplashScreen,
  LoginScreen,
  ForgotPasswordScreen,
  StepLanguage,
  StepUsername,
  StepPassword,
  StepGender,
  StepAge,
  StepWeightHeight,
  StepGoal,
  StepHealth,
  StepFitness,
  StepComplete,
  MainScreen,
  SettingsScreen,
  WorkoutsScreen,
  PointsScreen,
  SummaryScreen,
  HistoryScreen,
  SocialScreen,
  NutritionScreen,
  CharacterScreen
} from "./screens";

export const router = createBrowserRouter([
  {
    element: <Root />,
    children: [
      {
        path: "/",
        Component: LoginScreen,
      },
      {
        path: "/splash",
        Component: SplashScreen,
      },
      {
        path: "/forgot-password",
        Component: ForgotPasswordScreen,
      },
      {
        path: "/login",
        Component: LoginScreen,
      },
      {
        path: "/language",
        Component: StepLanguage,
      },
      {
        path: "/settings",
        Component: SettingsScreen,
      },
      {
        path: "/points",
        Component: PointsScreen,
      },
      {
        path: "/workouts",
        Component: WorkoutsScreen,
      },
      {
        path: "/social",
        Component: SocialScreen,
      },
      {
        path: "/nutrition",
        Component: NutritionScreen,
      },
      {
        path: "/history",
        Component: HistoryScreen,
      },
      {
        path: "/summary",
        Component: SummaryScreen,
      },
      {
        path: "/questionnaire",
        children: [
          {
            path: "language",
            Component: StepLanguage,
          },
          {
            path: "username",
            Component: StepUsername,
          },
          {
            path: "password",
            Component: StepPassword,
          },
          {
            path: "gender",
            Component: StepGender,
          },
          {
            path: "age",
            Component: StepAge,
          },
          {
            path: "weight-height",
            Component: StepWeightHeight,
          },
          {
            path: "health",
            Component: StepHealth,
          },
          {
            path: "goal",
            Component: StepGoal,
          },
          {
            path: "fitness",
            Component: StepFitness,
          },

          {
            path: "complete",
            Component: StepComplete,
          },
          {
            index: true,
            element: <Navigate to="/questionnaire/language" replace />,
          }
        ]
      },
      {
        path: "/character",
        Component: CharacterScreen,
      },
      {
        path: "/main",
        Component: MainScreen,
      },
    ]
  }
]);
