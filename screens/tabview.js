import * as React from "react";
import { View, useWindowDimensions } from "react-native";
import { TabView, SceneMap } from "react-native-tab-view";

const FirstRoute = () => (
  <View style={{ flex: 1, backgroundColor: "#ff4081" }} />
);

const SecondRoute = () => (
  <View style={{ flex: 1, backgroundColor: "#673ab7" }} />
);
const ThirdRoute = () => (
  <View style={{ flex: 1, backgroundColor: "#673ab7" }} />
);
const FourthRoute = () => (
  <View style={{ flex: 1, backgroundColor: "#673ab7" }} />
);
const FifthRoute = () => (
  <View style={{ flex: 1, backgroundColor: "#673ab7" }} />
);
const SixthRoute = () => (
  <View style={{ flex: 1, backgroundColor: "#673ab7" }} />
);
const SeventhRoute = () => (
  <View style={{ flex: 1, backgroundColor: "#EA4578" }} />
);
const EigthRoute = () => (
  <View style={{ flex: 1, backgroundColor: "#673ab7" }} />
);
const NinthRoute = () => (
  <View style={{ flex: 1, backgroundColor: "#673ab7" }} />
);

const renderScene = SceneMap({
  first: FirstRoute,
  second: SecondRoute,
  third: ThirdRoute,
  fourth: FourthRoute,
  fifth: FifthRoute,
  sixth: SixthRoute,
  seventh: SeventhRoute,
  eigth: EigthRoute,
  ninth: NinthRoute,
});

export default function TabViewExp() {
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: "first", title: "First" },
    { key: "second", title: "Second" },
    { key: "third", title: "Third" },
    { key: "fourth", title: "Fourth" },
    { key: "fifth", title: "Fifth" },
    { key: "sixth", title: "Sixth" },
    { key: "seventh", title: "Seventh" },
    { key: "eigth", title: "Eigth" },
    { key: "ninth", title: "Ninth" },
  ]);
  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width }}
    />
  );
}
