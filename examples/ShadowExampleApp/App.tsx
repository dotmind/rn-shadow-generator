/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {useCallback, useEffect} from 'react';
import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Image,
  LogBox,
} from 'react-native';
import {DirectionType, ShadowView} from '@dotmind/rn-shadow-generator';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import AndroidCustomShadowView from './AndroidCustomShadowView';

const WhiteLogoDotmind = require('./assets/dotmind-logo-white.png');

type ItemType = {
  level: number;
  shadowColor?: string;
  direction?: DirectionType;
};

const BASIC_ITEMS: ItemType[] = [
  {level: 4},
  {level: 8},
  {level: 12},
  {level: 16},
  {level: 18},
  {level: 22},
];

const DIFFERENT_SHADOW_COLOR_ITEMS: ItemType[] = BASIC_ITEMS.map(item => ({
  ...item,
  shadowColor: 'red',
}));

const TOP_DIRECTION_ITEMS: ItemType[] = BASIC_ITEMS.map(item => ({
  ...item,
  direction: 'top',
}));

const TOP_LEFT_DIRECTION_ITEMS: ItemType[] = BASIC_ITEMS.map(item => ({
  ...item,
  direction: 'topLeft',
}));

const Section: React.FC<{
  title: string;
}> = ({children, title}) => {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      {children}
    </View>
  );
};

const CodeSection = ({code}: {code: string}) => {
  return (
    <View style={styles.codeSectionContainer}>
      <Text style={styles.codeSectionLabel}>{code}</Text>
    </View>
  );
};

const Header = () => {
  return (
    <View style={styles.headerContainer}>
      <Text style={styles.headerLabel}>{'RN Shadow\nGenerator'}</Text>
      <Image
        source={WhiteLogoDotmind}
        style={styles.dotmindLogo}
        resizeMode={'contain'}
      />
    </View>
  );
};

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  useEffect(() => {
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
  }, []);

  const backgroundStyle = {
    flex: 1,
    backgroundColor: isDarkMode ? Colors.black : Colors.white,
  };

  const _renderItem = useCallback(
    ({
      item: {level, shadowColor, direction},
    }: {
      item: ItemType;
      index: number;
    }) => {
      return (
        <ShadowView
          level={level}
          shadowColor={shadowColor}
          direction={direction}
          style={styles.shadowContainer}>
          <Text style={styles.propsTypeLabel}>
            Level <Text style={styles.valueLabel}>{level}</Text>
          </Text>
        </ShadowView>
      );
    },
    [],
  );

  return (
    <ScrollView style={backgroundStyle}>
      <Header />
      <Section title={'Basic usage'}>
        <FlatList
          data={BASIC_ITEMS}
          renderItem={_renderItem}
          numColumns={3}
          contentContainerStyle={styles.flatListContentContainer}
          keyExtractor={(_, index) => index.toString()}
          scrollEnabled={false}
        />
      </Section>
      <Section title={'Other Shadow Color'}>
        <CodeSection code={"{ shadowColor: 'red' }"} />
        <FlatList
          data={DIFFERENT_SHADOW_COLOR_ITEMS}
          renderItem={_renderItem}
          numColumns={3}
          contentContainerStyle={styles.flatListContentContainer}
          keyExtractor={(_, index) => index.toString()}
          scrollEnabled={false}
        />
      </Section>
      <Section title={'Basic Direction (iOS only)'}>
        <CodeSection code={"{ direction: 'top' }"} />
        <FlatList
          data={TOP_DIRECTION_ITEMS}
          renderItem={_renderItem}
          numColumns={3}
          contentContainerStyle={styles.flatListContentContainer}
          keyExtractor={(_, index) => index.toString()}
          scrollEnabled={false}
        />
      </Section>
      <Section title={'Other Direction (iOS only)'}>
        <CodeSection code={"{ direction: 'topLeft' }"} />
        <FlatList
          data={TOP_LEFT_DIRECTION_ITEMS}
          renderItem={_renderItem}
          numColumns={3}
          contentContainerStyle={styles.flatListContentContainer}
          keyExtractor={(_, index) => index.toString()}
          scrollEnabled={false}
        />
      </Section>
      <Section title={'Android Shadow'}>
        <AndroidCustomShadowView elevation={5} style={{ width: 50, height: 50, backgroundColor: 'red', margin: 20 }}>
          <Text>Test</Text>
        </AndroidCustomShadowView>
      </Section>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    paddingTop: 100,
    backgroundColor: '#26a69a',
  },
  headerLabel: {
    fontSize: 40,
    fontWeight: '700',
    textAlign: 'center',
    color: 'white',
    fontFamily: 'Avenir Next',
  },
  dotmindLogo: {
    width: 50,
    alignSelf: 'flex-end',
    margin: 20,
  },
  sectionContainer: {
    flex: 1,
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontFamily: 'Avenir Next',
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    fontFamily: 'Avenir Next',
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  flatListContentContainer: {
    paddingVertical: 20,
  },
  highlight: {
    fontWeight: '700',
  },
  propsTypeLabel: {
    fontFamily: 'Avenir Next',
    textAlign: 'center',
    fontSize: 12,
  },
  valueLabel: {
    fontFamily: 'Avenir Next',
    textAlign: 'center',
    fontWeight: '600',
  },
  codeSectionContainer: {
    backgroundColor: '#E8E3E3',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 10,
    marginVertical: 10,
  },
  codeSectionLabel: {
    fontFamily: 'Avenir Next',
    color: 'black',
  },
  shadowContainer: {
    margin: 20,
    marginBottom: 30,
    marginTop: 0,
    height: 50,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
  },
});

export default App;
