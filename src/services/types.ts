import type {SwiperOptions} from "swiper/types";
export type CategoriesQueryOptionsType = {
  text?: string;
  category?: string;
  status?: string;
  limit?: number;
};

export type QueryOptionsType = {
  text?: string;
  category?: string;
  status?: string;
  id?: string;
  limit?: number;
  sort_by?: string; // Added for newQuery
};

export interface PaginatedProduct {
  data: Product[];
  paginatorInfo: {
    nextPage: number | null;
    total: number;
  };
}

export type Attachment = {
  id: string | number;
  thumbnail: string;
  original: string;
  original2: string;
};
export type Category = {
  id: number;
  name: string;
  slug: string;
  image?: Attachment;
  children?: [Category];
  products?: Product[];
  productCount?: number;
  [key: string]: unknown;
};


export type Tag = {
  id: string | number;
  name: string;
  slug: string;
};
export type Product = {
  id: number | string;
  name: string;
  slug: string;
  price: number;
  quantity: number;
  sold: number;
  videoUrl: string;
  sale_price?: number;
  min_price?: number;
  max_price?: number;
  variation_options: VariationOption[];
  variations?: Variation[];
  image: Attachment;
  sku?: string;
  gallery?: Attachment[];
  category: Category[];
  tag?: Tag[];
  meta?: never[];
  brand: string;
  unit?: string;
  model?: string;
  operating?: string;
  screen?: string;
  description?: string;
  rating:number;
  discountPercentage:number;
  weight:number;
  [key: string]: unknown;
};

interface VariationValue {
  id: number;
  attribute_id: number;
  value: string;
  image?: string;
}

interface Attribute {
  id: number;
  slug: string;
  name: string;
  type: 'swatch' | 'radio' | 'rectangle' | 'rectangleColor' | 'swatchImage' | 'dropdown';
  values: VariationValue[];
}

export interface Variation {
  id: number;
  attribute_id: number;
  value: string;
  attribute: Attribute;
}
export interface VariationItem {
  id: number;
  attribute_id: number;
  value: string;
  image: string;
}

export interface VariationsType {
  [key: string]: {
    type: 'swatch' | 'radio' | 'rectangle' | 'rectangleColor' | 'swatchImage' | 'dropdown';
    options: VariationItem[];
  };
}

// Define types based on the new data structure
export interface Option {
  name: string;
  value: string;
}

export interface VariationOption {
  id: number;
  title: string;
  price: number;
  sale_price: number;
  quantity: number;
  is_disable: number;
  image: Attachment;
  sku: string;
  options: Option[];
}

export type OrderItem = {
  id: number | string;
  name: string;
  image: Attachment;
  price: number;
  quantity: number;
};

export type Order = {
  id: string | number;
  name: string;
  slug: string;
  products: OrderItem[];
  total: number;
  tracking_number: string;
  customer: {
    id: number;
    email: string;
  };
  shipping_fee: number;
  payment_gateway: string;
};

export type HeroItem = {
  id: number;
  title: string;
  description: string;
  btnText: string;
  btnUrl: string;
  videoUrl?:string;
  image: HeroItemImage;
}
export type HeroItemImage = {
  mobile: { url: string };
  desktop: { url: string };
}
export type Blog = {
  id: number;
  slug: string;
  title: string;
  subTitle: string;
  shortDescription: string;
  authorName: string;
  date: string;
  totalWatchCount?: number;
  totalCommentCount?: number;
  titleTwo: string;
  category: string;
  image: string;
  sku?: string;
  content?: string;
  contentTwo?: string;
  contentThree?: string;
  quote: {
    content: string;
  };
  postList?: object;
  discount?: object;
  tags?: Tag;
  comments?: object;
  [key: string]: unknown;
};

export type MenutopType = {
  id: number;
  path: string;
  label: string;
};

export type MainMenuType = {
  id: number;
  path: string;
  label: string;
  type: string;
  mega_categoryCol: number;
  mega_bannerMode: string;
  mega_bannerImg: string;
  mega_bannerUrl:string;
  mega_contentBottom:string;
  subMenu:SubMenuType[];
};

export type SubMenuType = {
  id: number;
  path: string;
  label: string;
  image?: Attachment,
  badge?:string;
  subMenu?:SubMenuType[];
};

export type BreakpointsType = {
  [width: number]: SwiperOptions;
  [ratio: string]: SwiperOptions;
};

export type StoreType = {
  id: number ;
  name: string;
  image?: string;
  address?: string;
  email?: string;
  phoneNumber?:number
  openTime?: string;
  location?: string;
};

export type AccordionItem = {
  id: number;
  title: string;
  content: string | AccordionItem[];
};

export type IconType = {
  color?:string;
  className?: string;
  width?: number;
  height?: number;
}
export type AccordionGroupProps = {
  items: AccordionItem[];
  variant?: 'underline' | 'transparent';
};

export type CollapseProps = {
  item: AccordionItem;
  variant?: 'underline' | 'transparent';
  isOpen: boolean;
  onToggle: () => void;
};

export type ThemeMode = "light" | "dark"
export type ThemeDirection = "ltr" | "rtl"
export type TabType = "COLOR" | "LAYOUT" | "THEME"
