export interface IProductImagesItemProps {
  src: string;
  callback: (arg0: string) => void;
  alt: string;
}

export interface IProductAccordionProps {
  title: string;
  children: React.ReactNode;
}
