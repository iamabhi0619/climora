export interface CitySearch {
  id: number;
  name: string;
  country: string;
  latitude: number;
  longitude: number;
  admin1?: string;
  admin2?: string;
}
export interface CitySearchResult {
  continent: string;
  countryName: string;
  countryCode: string;
  principalSubdivision: string;
  locality: string;
  city: string;
  latitude: number;
  longitude: number;
}
export interface CitySearchResponse {
  results: CitySearchResult[];
}
