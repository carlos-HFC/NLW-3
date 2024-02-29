import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { OrphanageData } from "@/screens/CreateOrphanage/OrphanageData";
import { SelectMapPosition } from "@/screens/CreateOrphanage/SelectMapPosition";
import { OrphanageDetails } from "@/screens/OrphanageDetails";
import { OrphanagesMap } from "@/screens/OrphanagesMap";
import { Header } from "@/components/Header";

const { Navigator, Screen } = createStackNavigator();

export function AppRoutes() {
  return (
    <NavigationContainer>
      <Navigator
        screenOptions={{
          headerShown: true,
        }}
      >
        <Screen
          name="orphanages-map"
          component={OrphanagesMap}
          options={{
            headerShown: false
          }}
        />
        <Screen
          name="orphanage-details"
          component={OrphanageDetails}
          options={{
            header: () => (
              <Header
                title="Orfanato"
                showCancel={false}
              />
            )
          }}
        />
        <Screen
          name="select-map-position"
          component={SelectMapPosition}
          options={{
            header: () => <Header title="Seleciona no mapa" />
          }}
        />
        <Screen
          name="orphanage-data"
          component={OrphanageData}
          options={{
            header: () => <Header title="Informe os dados" />
          }}
        />
      </Navigator>
    </NavigationContainer>
  );
}