export declare global {
  namespace ReactNavigation {
    interface RootParamList {
      "orphanages-map": undefined;
      "orphanage-details": undefined;
      "select-map-position": undefined;
      "orphanage-data": {
        position: {
          latitude: number;
          longitude: number;
        };
      };
    }
  }
}