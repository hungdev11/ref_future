import { TarotArcana, TarotSuit, TarotCardDef } from '@mystic/core';

export const MAJOR_ARCANA_NAMES: Array<{ number: number; code: string; name: string; keywords: string[] }> = [
  { number: 0, code: 'MAJOR_00_FOOL', name: 'The Fool', keywords: ['khởi đầu', 'tự do', 'ngây thơ', 'tiềm năng'] },
  { number: 1, code: 'MAJOR_01_MAGICIAN', name: 'The Magician', keywords: ['ý chí', 'kỹ năng', 'hành động', 'kiến tạo'] },
  { number: 2, code: 'MAJOR_02_HIGH_PRIESTESS', name: 'The High Priestess', keywords: ['trực giác', 'bí ẩn', 'tiềm thức', 'nội tâm'] },
  { number: 3, code: 'MAJOR_03_EMPRESS', name: 'The Empress', keywords: ['nuôi dưỡng', 'trù phú', 'sáng tạo', 'tình mẫu tử'] },
  { number: 4, code: 'MAJOR_04_EMPEROR', name: 'The Emperor', keywords: ['kỷ luật', 'quyền uy', 'cấu trúc', 'ổn định'] },
  { number: 5, code: 'MAJOR_05_HIEROPHANT', name: 'The Hierophant', keywords: ['truyền thống', 'tri thức', 'đạo đức', 'hướng dẫn'] },
  { number: 6, code: 'MAJOR_06_LOVERS', name: 'The Lovers', keywords: ['sự lựa chọn', 'gắn kết', 'hòa hợp', 'giá trị'] },
  { number: 7, code: 'MAJOR_07_CHARIOT', name: 'The Chariot', keywords: ['chiến thắng', 'kiểm soát', 'quyết đoán', 'tiến lên'] },
  { number: 8, code: 'MAJOR_08_STRENGTH', name: 'Strength', keywords: ['dũng cảm', 'kiên nhẫn', 'lòng trắc ẩn', 'sức mạnh nội tại'] },
  { number: 9, code: 'MAJOR_09_HERMIT', name: 'The Hermit', keywords: ['chiêm nghiệm', 'soi sáng', 'tĩnh lặng', 'tìm kiếm chân lý'] },
  { number: 10, code: 'MAJOR_10_WHEEL_OF_FORTUNE', name: 'Wheel of Fortune', keywords: ['chu kỳ', 'vận mệnh', 'thay đổi', 'bước ngoặt'] },
  { number: 11, code: 'MAJOR_11_JUSTICE', name: 'Justice', keywords: ['công lý', 'nhân quả', 'sự thật', 'cân bằng'] },
  { number: 12, code: 'MAJOR_12_HANGED_MAN', name: 'The Hanged Man', keywords: ['buông bỏ', 'góc nhìn mới', 'hy sinh', 'chờ đợi'] },
  { number: 13, code: 'MAJOR_13_DEATH', name: 'Death', keywords: ['chuyển hóa', 'kết thúc', 'tái sinh', 'đổi mới'] },
  { number: 14, code: 'MAJOR_14_TEMPERANCE', name: 'Temperance', keywords: ['hài hòa', 'tiết chế', 'dung hợp', 'chữa lành'] },
  { number: 15, code: 'MAJOR_15_DEVIL', name: 'The Devil', keywords: ['ràng buộc', 'cám dỗ', 'vật chất', 'ảo tưởng'] },
  { number: 16, code: 'MAJOR_16_TOWER', name: 'The Tower', keywords: ['sụp đổ', 'thức tỉnh', 'biến động đột ngột', 'giải phóng'] },
  { number: 17, code: 'MAJOR_17_STAR', name: 'The Star', keywords: ['hy vọng', 'niềm tin', 'thanh thản', 'nguồn cảm hứng'] },
  { number: 18, code: 'MAJOR_18_MOON', name: 'The Moon', keywords: ['ảo ảnh', 'nỗi sợ', 'bất an', 'trực giác sâu'] },
  { number: 19, code: 'MAJOR_19_SUN', name: 'The Sun', keywords: ['niềm vui', 'thành công', 'rực rỡ', 'sức sống'] },
  { number: 20, code: 'MAJOR_20_JUDGEMENT', name: 'Judgement', keywords: ['tiếng gọi', 'sự thức tỉnh', 'phán xét', 'tái sinh'] },
  { number: 21, code: 'MAJOR_21_WORLD', name: 'The World', keywords: ['hoàn thành', 'trọn vẹn', 'thành tựu', 'hội nhập'] },
];

const SUITS: Array<{ suit: TarotSuit; namePrefix: string }> = [
  { suit: TarotSuit.WANDS, namePrefix: 'Wands' },
  { suit: TarotSuit.CUPS, namePrefix: 'Cups' },
  { suit: TarotSuit.SWORDS, namePrefix: 'Swords' },
  { suit: TarotSuit.PENTACLES, namePrefix: 'Pentacles' },
];

const COURT_NAMES: Record<number, string> = {
  1: 'Ace',
  11: 'Page',
  12: 'Knight',
  13: 'Queen',
  14: 'King',
};

export function buildRWSStandardDeck(): TarotCardDef[] {
  const deck: TarotCardDef[] = [];

  // 1. Add 22 Major Arcana
  for (const m of MAJOR_ARCANA_NAMES) {
    deck.push({
      cardCode: m.code,
      name: m.name,
      arcana: TarotArcana.MAJOR,
      number: m.number,
      keywords: m.keywords,
    });
  }

  // 2. Add 56 Minor Arcana (4 suits x 14 cards)
  for (const { suit, namePrefix } of SUITS) {
    for (let num = 1; num <= 14; num++) {
      const rankName = COURT_NAMES[num] ?? String(num);
      const cardName = `${rankName} of ${namePrefix}`;
      const code = `${suit}_${String(num).padStart(2, '0')}_${rankName.toUpperCase()}`;

      deck.push({
        cardCode: code,
        name: cardName,
        arcana: TarotArcana.MINOR,
        suit,
        number: num,
        keywords: [namePrefix.toLowerCase(), rankName.toLowerCase()],
      });
    }
  }

  return deck;
}

