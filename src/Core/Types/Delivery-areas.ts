export interface DeliveryArea {
  id: number;
  area: string;
  time: string;
}

export interface DeliveryOneArea {
    id: number;
    time: {
      en: string;
      ar: string;
    };
    area: {
      en: string;
      ar: string;
    };
}

export interface DeliveryAreasRequest {
  time: {
    en: string;
    ar: string;
  };
  area: {
    en: string;
    ar: string;
  };
}

export interface DeliveryAreasResponse {
  data: DeliveryArea[];
  path: string;
  duration: string;
  method: string;
}

export interface SingleDeliveryAreaResponse {
  data: DeliveryOneArea;
}
