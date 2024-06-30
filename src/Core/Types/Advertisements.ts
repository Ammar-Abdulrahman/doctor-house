export interface Advertisement {
  id: number;
  url: string;
  image: string;
  description?: {
    en: string;
    ar: string;
  };
}

export interface AdvertisementsRequest {
  url: string;
  image: string;
  description?: {
    en: string;
    ar: string;
  };
}

export interface AdvertisementsResponse {
  data: Advertisement[];
}

export interface SingleAdvertisementResponse {
  data: Advertisement;
}