declare module "*.png";

type Orphanage = {
  id: string;
  name: string;
  about: string;
  whatsapp: string;
  instructions: string;
  openingHours: string;
  openOnWeekends: boolean;
  latitude: string;
  longitude: string;
  createdAt: Date;
  updatedAt: Date;
  images: Image[];
};

type Image = {
  id: string;
  path: string;
  url: string;
};