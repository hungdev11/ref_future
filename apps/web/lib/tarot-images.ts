export function getTarotCardImageUrl(cardCode: string): string {
  const CDN_BASE = 'https://cdn.jsdelivr.net/gh/mixvlad/TarotCards@main/tarot/rider-waite/720px';

  const majorMap: Record<string, string> = {
    MAJOR_00_FOOL: '00_Fool.jpg',
    MAJOR_01_MAGICIAN: '01_Magician.jpg',
    MAJOR_02_HIGH_PRIESTESS: '02_High_Priestess.jpg',
    MAJOR_03_EMPRESS: '03_Empress.jpg',
    MAJOR_04_EMPEROR: '04_Emperor.jpg',
    MAJOR_05_HIEROPHANT: '05_Hierophant.jpg',
    MAJOR_06_LOVERS: '06_Lovers.jpg',
    MAJOR_07_CHARIOT: '07_Chariot.jpg',
    MAJOR_08_STRENGTH: '08_Strength.jpg',
    MAJOR_09_HERMIT: '09_Hermit.jpg',
    MAJOR_10_WHEEL_OF_FORTUNE: '10_Wheel_of_Fortune.jpg',
    MAJOR_11_JUSTICE: '11_Justice.jpg',
    MAJOR_12_HANGED_MAN: '12_Hanged_Man.jpg',
    MAJOR_13_DEATH: '13_Death.jpg',
    MAJOR_14_TEMPERANCE: '14_Temperance.jpg',
    MAJOR_15_DEVIL: '15_Devil.jpg',
    MAJOR_16_TOWER: '16_Tower.jpg',
    MAJOR_17_STAR: '17_Star.jpg',
    MAJOR_18_MOON: '18_Moon.jpg',
    MAJOR_19_SUN: '19_Sun.jpg',
    MAJOR_20_JUDGEMENT: '20_Judgement.jpg',
    MAJOR_21_WORLD: '21_World.jpg',
  };

  if (majorMap[cardCode]) {
    return `${CDN_BASE}/${majorMap[cardCode]}`;
  }

  const parts = cardCode.split('_');
  if (parts.length >= 2) {
    const rawSuit = parts[0]; // WANDS, CUPS, SWORDS, PENTACLES
    const num = parts[1]; // 01 .. 14
    let suitPrefix = 'Wands';
    if (rawSuit === 'CUPS') suitPrefix = 'Cups';
    else if (rawSuit === 'SWORDS') suitPrefix = 'Swords';
    else if (rawSuit === 'PENTACLES') suitPrefix = 'Pents';

    return `${CDN_BASE}/${suitPrefix}${num}.jpg`;
  }

  return `${CDN_BASE}/Cover.jpg`;
}

export const getTarotCardImage = getTarotCardImageUrl;
