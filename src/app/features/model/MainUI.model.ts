export interface MainUIModel {
  id: string;
  companyID: string;
  date: string;
  pid: string;
  name: string;
  age: string;
  sex: string;
  refCode: string;
  refCodeName: string;
  comCode: string;
  comments: string;
  advCode: string;
  advices: string;
  printStatus: boolean;
  hb: string;
  hbA: string;
  hbF: string;
  hbE: string;
  hbA2: string;
  hbD: string;
  hbJ: string;
  hbL: string;
  hbQ: string;
  hbS: string;
  hbC: string;
  hbBarts: string;
  isMachineData: boolean;
}

export interface AddMainUIRequest {
  companyID: string;
  date: string;
  pid: string;
  name: string;
  age: string;
  sex: string;
  refCode: string;
  comCode: string;
  advCode: string;
  printStatus: boolean;
  hb: string;
  hbA: string;
  hbF: string;
  hbE: string;
  hbA2: string;
  hbD: string;
  hbJ: string;
  hbL: string;
  hbQ: string;
  hbS: string;
  hbC: string;
  hbBarts: string;
  isMachineData: boolean;
}

export interface UpdateMainUIRequest {
  companyID: string;
  date: string;
  pid: string;
  name: string;
  age: string;
  sex: string;
  refCode: string;
  comCode: string;
  advCode: string;
  printStatus: boolean;
  hb: string;
  hbA: string;
  hbF: string;
  hbE: string;
  hbA2: string;
  hbD: string;
  hbJ: string;
  hbL: string;
  hbQ: string;
  hbS: string;
  hbC: string;
  hbBarts: string;
  isMachineData: boolean;
}