import { TarotArcana, TarotSuit, TarotCardDef } from '@mystic/core';
import { MINOR_ARCANA_DETAILED } from './minor-arcana-data.js';

export const MAJOR_ARCANA_NAMES: Array<{ number: number; code: string; name: string; keywords: string[] }> = [
  { number: 0, code: 'MAJOR_00_FOOL', name: 'The Fool', keywords: ['Khởi đầu mới', 'Tự do', 'Ngây thơ', 'Tiềm năng'] },
  { number: 1, code: 'MAJOR_01_MAGICIAN', name: 'The Magician', keywords: ['Ý chí', 'Kỹ năng', 'Hành động', 'Kiến tạo'] },
  { number: 2, code: 'MAJOR_02_HIGH_PRIESTESS', name: 'The High Priestess', keywords: ['Trực giác', 'Bí ẩn', 'Tiềm thức', 'Nội tâm'] },
  { number: 3, code: 'MAJOR_03_EMPRESS', name: 'The Empress', keywords: ['Nuôi dưỡng', 'Trù phú', 'Sáng tạo', 'Tình mẫu tử'] },
  { number: 4, code: 'MAJOR_04_EMPEROR', name: 'The Emperor', keywords: ['Kỷ luật', 'Quyền uy', 'Cấu trúc', 'Ổn định'] },
  { number: 5, code: 'MAJOR_05_HIEROPHANT', name: 'The Hierophant', keywords: ['Truyền thống', 'Tri thức', 'Đạo đức', 'Hướng dẫn'] },
  { number: 6, code: 'MAJOR_06_LOVERS', name: 'The Lovers', keywords: ['Sự lựa chọn', 'Gắn kết', 'Hòa hợp', 'Giá trị'] },
  { number: 7, code: 'MAJOR_07_CHARIOT', name: 'The Chariot', keywords: ['Chiến thắng', 'Kiểm soát', 'Quyết đoán', 'Tiến lên'] },
  { number: 8, code: 'MAJOR_08_STRENGTH', name: 'Strength', keywords: ['Dũng cảm', 'Kiên nhẫn', 'Lòng trắc ẩn', 'Sức mạnh nội tại'] },
  { number: 9, code: 'MAJOR_09_HERMIT', name: 'The Hermit', keywords: ['Chiêm nghiệm', 'Soi sáng', 'Tĩnh lặng', 'Tìm kiếm chân lý'] },
  { number: 10, code: 'MAJOR_10_WHEEL_OF_FORTUNE', name: 'Wheel of Fortune', keywords: ['Chu kỳ', 'Vận mệnh', 'Thay đổi', 'Bước ngoặt'] },
  { number: 11, code: 'MAJOR_11_JUSTICE', name: 'Justice', keywords: ['Công lý', 'Nhân quả', 'Sự thật', 'Cân bằng'] },
  { number: 12, code: 'MAJOR_12_HANGED_MAN', name: 'The Hanged Man', keywords: ['Buông bỏ', 'Góc nhìn mới', 'Hy sinh', 'Chờ đợi'] },
  { number: 13, code: 'MAJOR_13_DEATH', name: 'Death', keywords: ['Chuyển hóa', 'Kết thúc', 'Tái sinh', 'Đổi mới'] },
  { number: 14, code: 'MAJOR_14_TEMPERANCE', name: 'Temperance', keywords: ['Hài hòa', 'Tiết chế', 'Dung hợp', 'Chữa lành'] },
  { number: 15, code: 'MAJOR_15_DEVIL', name: 'The Devil', keywords: ['Ràng buộc', 'Cám dỗ', 'Vật chất', 'Ảo tưởng'] },
  { number: 16, code: 'MAJOR_16_TOWER', name: 'The Tower', keywords: ['Sụp đổ', 'Thức tỉnh', 'Biến động đột ngột', 'Giải phóng'] },
  { number: 17, code: 'MAJOR_17_STAR', name: 'The Star', keywords: ['Hy vọng', 'Niềm tin', 'Thanh thản', 'Nguồn cảm hứng'] },
  { number: 18, code: 'MAJOR_18_MOON', name: 'The Moon', keywords: ['Ảo ảnh', 'Nỗi sợ', 'Bất an', 'Trực giác sâu'] },
  { number: 19, code: 'MAJOR_19_SUN', name: 'The Sun', keywords: ['Niềm vui', 'Thành công', 'Rực rỡ', 'Sức sống'] },
  { number: 20, code: 'MAJOR_20_JUDGEMENT', name: 'Judgement', keywords: ['Tiếng gọi', 'Sự thức tỉnh', 'Phán xét', 'Tái sinh'] },
  { number: 21, code: 'MAJOR_21_WORLD', name: 'The World', keywords: ['Hoàn thành', 'Trọn vẹn', 'Thành tựu', 'Hội nhập'] },
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
      const detailed = MINOR_ARCANA_DETAILED[code];
      const keywords = detailed ? detailed.keywords : [namePrefix, rankName];

      deck.push({
        cardCode: code,
        name: cardName,
        arcana: TarotArcana.MINOR,
        suit,
        number: num,
        keywords,
      });
    }
  }

  return deck;
}
