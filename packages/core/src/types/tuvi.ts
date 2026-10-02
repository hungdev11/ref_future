export enum HeavenlyStem {
  GIAP = 'GIAP',
  AT = 'AT',
  BINH = 'BINH',
  DINH = 'DINH',
  MAU = 'MAU',
  KY = 'KY',
  CANH = 'CANH',
  TAN = 'TAN',
  NHAM = 'NHAM',
  QUY = 'QUY',
}

export enum EarthlyBranch {
  TY_RAT = 'TY_RAT',
  SUU_OX = 'SUU_OX',
  DAN_TIGER = 'DAN_TIGER',
  MAO_CAT = 'MAO_CAT',
  THIN_DRAGON = 'THIN_DRAGON',
  TY_SNAKE = 'TY_SNAKE',
  NGO_HORSE = 'NGO_HORSE',
  MUI_GOAT = 'MUI_GOAT',
  THAN_MONKEY = 'THAN_MONKEY',
  DAU_ROOSTER = 'DAU_ROOSTER',
  TUAT_DOG = 'TUAT_DOG',
  HOI_PIG = 'HOI_PIG',
}

export enum FiveElements {
  KIM = 'KIM',
  MOC = 'MOC',
  THUY = 'THUY',
  HOA = 'HOA',
  THO = 'THO',
}

export enum CucType {
  THUY_NHI_CUC = 'THUY_NHI_CUC',
  MOC_TAM_CUC = 'MOC_TAM_CUC',
  KIM_TU_CUC = 'KIM_TU_CUC',
  THO_NGU_CUC = 'THO_NGU_CUC',
  HOA_LUC_CUC = 'HOA_LUC_CUC',
}

export enum PalaceName {
  MENH = 'MENH',
  PHU_MAU = 'PHU_MAU',
  PHUC_DUC = 'PHUC_DUC',
  DIEN_TRACH = 'DIEN_TRACH',
  QUAN_LOC = 'QUAN_LOC',
  NO_BOC = 'NO_BOC',
  THIEN_DI = 'THIEN_DI',
  TAT_ACH = 'TAT_ACH',
  TAI_BACH = 'TAI_BACH',
  TU_TUC = 'TU_TUC',
  PHU_THE = 'PHU_THE',
  HUYNH_DE = 'HUYNH_DE',
}

export enum StarBrightness {
  MIEU_DIA = 'MIEU_DIA',
  VUONG_DIA = 'VUONG_DIA',
  DAC_DIA = 'DAC_DIA',
  BINH_HOA = 'BINH_HOA',
  HAM_DIA = 'HAM_DIA',
}

export interface TuViStar {
  code: string;
  name: string;
  element: FiveElements;
  brightness?: StarBrightness;
  isMain: boolean;
}

export interface TuViPalaceData {
  palaceName: PalaceName;
  branch: EarthlyBranch;
  stem: HeavenlyStem;
  isThan: boolean;
  isTuan: boolean;
  isTriet: boolean;
  daiHanStartAge: number;
  daiHanEndAge: number;
  stars: TuViStar[];
}

export interface TuViFacts {
  yearStem: HeavenlyStem;
  yearBranch: EarthlyBranch;
  monthStem: HeavenlyStem;
  monthBranch: EarthlyBranch;
  dayStem: HeavenlyStem;
  dayBranch: EarthlyBranch;
  hourStem: HeavenlyStem;
  hourBranch: EarthlyBranch;
  menhNguHanh: FiveElements;
  menhDetail: string;
  cuc: CucType;
  cucNumber: number;
  menhBranch: EarthlyBranch;
  thanBranch: EarthlyBranch;
  amDuongNamNu: string;
  palaces: Record<PalaceName, TuViPalaceData>;
}
