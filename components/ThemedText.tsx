import { Text } from 'react-native';
import { Colors } from '@/hooks/useThemeColor';

export function ThemedText(props: Text['props']) {
  return (
    <Text 
      {...props} 
      style={[
        { color: Colors.text },
        props.style
      ]} 
    />
  );
}
