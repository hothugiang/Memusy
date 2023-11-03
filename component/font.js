import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';

const [fontsLoaded] = useFonts({
    'BioRhyme_Expanded': require('./../../assets/fonts/BioRhyme_Expanded-Bold.ttf'),
  });

useEffect(() => {
    async function prepare() {
        await SplashScreen.preventAutoHideAsync();
    }
    prepare();
})
if (!fontsLoaded) {
return undefined;
} else {
    SplashScreen.hideAsync();
}

const customFonts = {
    'BioRhyme_Expanded': require('./../../assets/fonts/BioRhyme_Expanded-Bold.ttf'),
  };
  const type = {
    primary: 'Montserrat-Regular',
    secondary: 'OpenSans-Regular',
    black: 'Montserrat-Black',
    medium: 'Montserrat-Medium',
    bold: 'Montserrat-Bold',
    semi: 'Montserrat-SemiBold',
    extra: 'Montserrat-ExtraBold',
    stylish: 'GreatVibes-Regular',
    italic: 'Montserrat-Italic',
  };
  
  const Fonts = { customFonts};
  
  export default Fonts;
  