import { IProduct } from './products';

export interface IDashboardSlider {
  items: IProduct[];
  spinner: boolean;
  goToProductPage?: boolean;
}

export interface ICartAlertProps {
  count: number;
  closeAlert: VoidFunction;
}
