import 'dotenv/config';

export default {
  expo: {
    name: "Wildwatch",
    slug: "Wildwatch",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/images/icon.png",
    scheme: "wildwatch",
    userInterfaceStyle: "automatic",
    newArchEnabled: true,
    extra: {
      mapboxPublicToken: process.env.EXPO_PUBLIC_MAPBOX_PUBLIC_TOKEN,
      mapboxDownloadToken: process.env.MAPBOX_DOWNLOAD_TOKEN,
    },
    ios: {
      supportsTablet: true,
      bundleIdentifier: "com.anonymous.Wildwatch",
      infoPlist: {
        NSLocationWhenInUseUsageDescription: "Wildwatch utilise votre position pour vous fournir des informations sur la faune locale.",
        NSLocationAlwaysAndWhenInUseUsageDescription: "Wildwatch utilise votre position pour vous fournir des informations sur la faune locale.",
        UIBackgroundModes: ["location"]
      }
    },
    android: {
      adaptiveIcon: {
        backgroundColor: "#E6F4FE",
        foregroundImage: "./assets/images/android-icon-foreground.png",
        backgroundImage: "./assets/images/android-icon-background.png",
        monochromeImage: "./assets/images/android-icon-monochrome.png"
      },
      edgeToEdgeEnabled: true,
      predictiveBackGestureEnabled: false,
      package: "com.anonymous.Wildwatch",
      permissions: [
        "ACCESS_FINE_LOCATION",
        "ACCESS_COARSE_LOCATION",
        "ACCESS_BACKGROUND_LOCATION"
      ]
    },
    web: {
      output: "static",
      favicon: "./assets/images/favicon.png"
    },
    plugins: [
      "expo-router",
      [
        "expo-splash-screen",
        {
          image: "./assets/images/splash-icon.png",
          imageWidth: 200,
          resizeMode: "contain",
          backgroundColor: "#ffffff",
          dark: {
            backgroundColor: "#000000"
          }
        }
      ],
      [
        "@rnmapbox/maps",
        {
          RNMapboxMapsImpl: "mapbox",
          RNMapboxMapsDownloadToken: process.env.MAPBOX_DOWNLOAD_TOKEN
        }
      ]
    ],
    experiments: {
      typedRoutes: true,
      reactCompiler: true
    }
  }
};
