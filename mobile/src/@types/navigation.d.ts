export declare global {
  namespace ReactNavigation {
    interface RootParamList {
      "orphanages-map": undefined;
      "orphanage-details": {
        id: string;
      };
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