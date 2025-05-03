import { useWindowDimensions } from 'react-native';

export const useIsLargeScreen = () => {
  const { width } = useWindowDimensions();
  return width > 768;
};
