// import { StatusBar } from 'expo-status-bar';
import "@/global.css";
import { GluestackUIProvider } from "@/components/library/gluestack-ui-provider";
import { StyleSheet } from 'react-native';
import Greet from './components/ui/greet/Greet';
import Button from './components/ui/button/Button';
import Avatar from './components/ui/avatar/Avatar';

export default function App() {
  return (
      <GluestackUIProvider style={styles.container}>
        <Greet name="TEAM IO" />
        <Button size="xxl" btnType="rounded-full text-sm p-3.5 m-3.5" ctaName="Hello World" title="Press me" />
        <Avatar className="lb" fallback="LB" callback="" />
        </GluestackUIProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});


