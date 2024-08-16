export interface DeliveryArea {
  id: number;
  area: {
    en: string;
    ar: string;
  };
  time: {
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
  data: DeliveryArea;
}
