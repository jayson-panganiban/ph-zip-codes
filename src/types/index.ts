export interface ZipCode {
  region: string;
  province: string;
  municipality: string;
  zipCode: string;
}

export interface Region {
  name: string;
  provinces: string[];
}

export interface Province {
  name: string;
  region: string;
  municipalities: string[];
}

export interface Municipality {
  name: string;
  province: string;
  zipCode: string;
}