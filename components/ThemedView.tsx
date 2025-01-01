import { View } from 'react-native';
import { Colors } from '@/hooks/useThemeColor';

export function ThemedView(props: View['props']) {
  return (
    <View 
      {...props} 
      style={[
        { backgroundColor: Colors.background },
        props.style
      ]} 
    />
  );
}
