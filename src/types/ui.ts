export type TConfigLayoutType = {
  disableMainPadding?: boolean;
  header?: {
    // variant?: VariantsEnum;
    disableCloseButton?: boolean;
    disableHeader?: boolean;
  };

  classNameMain?: string;
  bg?: 'white';
};

export enum LayoutsEnum {
  PrimaryLayout = 'PrimaryLayout',
  SecondaryLayout = 'SecondaryLayout',
}
