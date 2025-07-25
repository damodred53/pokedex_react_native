import { Colors } from "@/constants/Colors";
import { useColorScheme } from "react-native";

export const useThemeColors = () => {
  const theme = useColorScheme() ?? "light";

  return Colors[theme];
};
