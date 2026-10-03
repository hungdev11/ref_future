export enum NumerologyNumberType {
  LIFE_PATH = 'LIFE_PATH',
  BIRTHDAY = 'BIRTHDAY',
  EXPRESSION = 'EXPRESSION',
  SOUL_URGE = 'SOUL_URGE',
  PERSONALITY = 'PERSONALITY',
  MATURITY = 'MATURITY',
  PERSONAL_YEAR = 'PERSONAL_YEAR',
  PERSONAL_MONTH = 'PERSONAL_MONTH',
  PERSONAL_DAY = 'PERSONAL_DAY',
}

export interface NumerologySingleResult {
  type: NumerologyNumberType;
  value: number;
  isMasterNumber: boolean;
  rawCalculation: string;
}

export interface PinnacleCycle {
  pinnacleNumber: number;
  startAge: number;
  endAge: number;
  value: number;
}

export interface ChallengeCycle {
  challengeNumber: number;
  value: number;
}

export interface NumerologyFacts {
  normalizedName: string;
  birthDateIso: string;
  core: Record<NumerologyNumberType, NumerologySingleResult>;
  pinnacles: PinnacleCycle[];
  challenges: ChallengeCycle[];
  cycles?: {
    bases: { month: number; day: number; year: number };
    PINNACLES?: {
      bases: { month: number; day: number; year: number };
      pinnacle1: PinnacleCycle;
      pinnacle2: PinnacleCycle;
      pinnacle3: PinnacleCycle;
      pinnacle4: PinnacleCycle;
    };
    personalYear?: NumerologySingleResult;
    personalMonth?: NumerologySingleResult;
    personalDay?: NumerologySingleResult;
  };
}
