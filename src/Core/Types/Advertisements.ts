export interface Advertisement {
    id:number;
    url: string;
    image: string;
    description?: string;
  }

export interface AdvertisementsRequest {
  url: string;
  image: string;
  description?: string;
}

export interface AdvertisementsResponse {
  data: Advertisement[];
}

export interface SingleAdvertisementResponse {
  data: Advertisement;
}