export type Dtc = {
  id: string;
  code: Code;
  system: System;
};

export type Code = {
  title: string;
  description: string;
  location: string | null;
};

export type System = {
  subCode: string;
  title: 'Powertrain' | 'Network' | 'Body' | 'Chassis';
  subName: string;
};
