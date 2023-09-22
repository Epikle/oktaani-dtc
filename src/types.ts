export type Dtc = {
  id: string;
  code: Code;
  system: System;
};

export type Code = {
  title: string;
  description: string;
  location: string;
};

export type System = {
  subCode: string;
  title: string;
  subName: string;
};
