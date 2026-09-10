export interface BannerI {
  title: string;
  subtitle: string;
  image?: string;
  buttonText: string;
  buttonLink: string;
}

export interface InfoSectionItemI {
  id: number;
  slug: string;
  title: string;
  description: string;
  icon: string;
  buttonText: string;
  buttonLink: string;
}

export interface HowItWorksI {
  title: string;
  steps: HowItWorksStepItemI[];
}

export interface HowItWorksStepItemI {
  id: number;
  icon: string;
  text: string;
}

export interface ExampleI {
  title: string;
  description: string;
  stats: [
    {
      id: number;
      value: string;
      label: string;
    },
  ];
  images: {
    before: string;
    after: string;
  };
  priceLabel: string;
  price: string | number;
}

export interface AddressI {
  title: string;
  address: string;
  city: string;
}

export interface MapI {
  mapImage?: string;
  mapCoords?: {
    lat: number;
    lng: number;
  };
}

export interface HomePageI {
  banner: BannerI;
  infoSection: InfoSectionItemI[];
  howItWorks: HowItWorksI;
  example: ExampleI;
  contacts: AddressI & MapI;
}

export interface CardI {
  id: string;
  image: string;
  title: string;
  weight: string;
  calories: number;
  protein: number;
  fat: number;
  carbs: number;
  taste: string;
  price: number;
  buttonText: string;
  mod?: string;
  onOrderClick?: () => void | undefined;
}

export interface BreadcrumbItemI {
  label: string;
  path?: string; // последняя крошка обычно без ссылки — текущая страница
}

export interface FilterOptionI {
  label: string;
  type: string;
}

export interface FiltersItemI {
  subTitle: string;
  items: FilterOptionI[];
}

export interface ReviewI {
  id: number;
  productId: number;
  author: string;
  rating: number;
  date: string;
  text: string;
}

export interface PaginatedResponseI<T> {
  first: number;
  prev: number | null;
  next: number | null;
  last: number;
  pages: number;
  items: number;
  data: T[];
}

export interface CartItemI {
  id: string;
  title: string;
  image: string;
  price: number;
  weight: string;
  taste: string;
  quantity: number;
}

export interface UserI {
  id: number;
  email: string;
  name: string;
}

export interface UserWithPasswordI extends UserI {
  password: string;
}

export interface CatalogPageI {
  title: string;
  products: CardI[];
}

export interface ApiError {
  message: string;
  status?: number;
}
