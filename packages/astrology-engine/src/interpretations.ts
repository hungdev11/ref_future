export const ZODIAC_VN: Record<string, string> = {
  ARIES: 'Bạch Dương (Aries)',
  TAURUS: 'Kim Ngưu (Taurus)',
  GEMINI: 'Song Tử (Gemini)',
  CANCER: 'Cự Giải (Cancer)',
  LEO: 'Sư Tử (Leo)',
  VIRGO: 'Xử Nữ (Virgo)',
  LIBRA: 'Thiên Bình (Libra)',
  SCORPIO: 'Bọ Cạp (Scorpio)',
  SAGITTARIUS: 'Nhân Mã (Sagittarius)',
  CAPRICORN: 'Ma Kết (Capricorn)',
  AQUARIUS: 'Bảo Bình (Aquarius)',
  PISCES: 'Song Ngư (Pisces)',
};

export const ZODIAC_ELEMENT: Record<string, 'FIRE' | 'EARTH' | 'AIR' | 'WATER'> = {
  ARIES: 'FIRE',
  TAURUS: 'EARTH',
  GEMINI: 'AIR',
  CANCER: 'WATER',
  LEO: 'FIRE',
  VIRGO: 'EARTH',
  LIBRA: 'AIR',
  SCORPIO: 'WATER',
  SAGITTARIUS: 'FIRE',
  CAPRICORN: 'EARTH',
  AQUARIUS: 'AIR',
  PISCES: 'WATER',
};

export const PLANET_NAMES_VN: Record<string, string> = {
  sun: 'Mặt Trời (Sun)',
  moon: 'Mặt Trăng (Moon)',
  mercury: 'Thủy Tinh (Mercury)',
  venus: 'Kim Tinh (Venus)',
  mars: 'Hỏa Tinh (Mars)',
  jupiter: 'Mộc Tinh (Jupiter)',
  saturn: 'Thổ Tinh (Saturn)',
  uranus: 'Thiên Vương Tinh (Uranus)',
  neptune: 'Hải Vương Tinh (Neptune)',
  pluto: 'Diêm Vương Tinh (Pluto)',
  chiron: 'Chiron (Tiểu Hành Tinh)',
  northNode: 'La Hầu (North Node)',
  southNode: 'Kế Đô (South Node)',
};

export const PLANET_BEGINNER_GUIDES: Record<string, string> = {
  sun: 'Mặt Trời là linh hồn của bản đồ sao, đại diện cho bản ngã cốt lõi, cá tính chủ đạo và cách bạn thể hiện ý chí sống ra thế giới.',
  moon: 'Mặt Trăng đại diện cho thế giới cảm xúc nội tâm sâu kín, cách bạn phản ứng khi ở một mình hoặc khi bị tổn thương, và điều gì mang lại cảm giác an toàn thực sự.',
  ascendant: 'Cung Mọc (Ascendant / Rising Sign) là chiếc mặt nạ bạn đeo khi tiếp xúc với thế giới bên ngoài. Nó quyết định thần thái, ngoại hình và ấn tượng đầu tiên bạn để lại cho người khác.',
  mercury: 'Thủy Tinh chi phối trí tuệ, cách bạn suy nghĩ, tiếp thu thông tin, diễn đạt ngôn từ và xử lý các vấn đề logic hàng ngày.',
  venus: 'Kim Tinh cai quản tình yêu, gu thẩm mỹ, cách bạn thể hiện sự gắn bó lãng mạn và quan niệm về tiền bạc, sự hòa hợp.',
  mars: 'Hỏa Tinh là động lực hành động, năng lượng tranh đấu, sự quyết đoán, đam mê và cách bạn bảo vệ ranh giới cá nhân.',
  jupiter: 'Mộc Tinh là hành tinh của vận may, sự mở rộng cơ hội, niềm tin lạc quan và sự phát triển tri thức, triết lý sống.',
  saturn: 'Thổ Tinh đại diện cho bài học trách nhiệm, kỷ luật thép, sự kiên nhẫn vượt qua thử thách để xây dựng sự nghiệp bền vững.',
  uranus: 'Thiên Vương Tinh biểu thị tư duy đột phá, trực giác nhạy bén, tinh thần độc lập và khả năng tạo ra những bước ngoặt bất ngờ.',
  neptune: 'Hải Vương Tinh chi phối trí tưởng tượng, năng khiếu nghệ thuật, tâm linh và lòng trắc ẩn bao la.',
  pluto: 'Diêm Vương Tinh là sức mạnh tái sinh từ nghịch cảnh, khả năng tự lột xác và chiều sâu tâm lý thâm trầm.',
};

export const SUN_SIGN_INTERPRETATIONS: Record<
  string,
  { meaning: string; layman: string; mechanism: string; advice: string }
> = {
  ARIES: {
    meaning: 'Mặt Trời tại Bạch Dương biểu trưng cho ngọn lửa tiên phong, tinh thần dấn thân quả cảm và ý chí hành động trực diện.',
    layman: 'Bạn là người có cá tính mạnh, quyết đoán và thích bắt tay vào việc ngay. Bạn ghét sự vòng vo, luôn muốn tự mình mở lối và dẫn đầu.',
    mechanism: 'Hỏa Tiên Phong (Cardinal Fire) do Hỏa Tinh cai quản. Nguồn sinh lực dồi dào thúc đẩy bản ngã luôn tìm kiếm những thử thách mới.',
    advice: 'Rèn luyện thêm tính kiên nhẫn; kết hợp ngọn lửa nhiệt huyết với kế hoạch cụ thể để duy trì thành quả dài lâu.',
  },
  TAURUS: {
    meaning: 'Mặt Trời tại Kim Ngưu biểu thị sức mạnh của sự bền bỉ, tính thực tiễn vững vàng và khát vọng xây dựng những giá trị lâu bền.',
    layman: 'Bạn điềm đạm, đáng tin cậy và có tư duy tài chính rất thực tế. Khi đã xác định mục tiêu, bạn kiên trì theo đuổi tới cùng.',
    mechanism: 'Thổ Kiên Định (Fixed Earth) do Kim Tinh cai quản. Tập trung vào sự bảo tồn năng lượng, tích lũy giá trị vật chất và thẩm mỹ.',
    advice: 'Mở rộng sự linh hoạt trước những thay đổi khách quan; đừng để sự thận trọng biến thành nỗi ngại đổi mới.',
  },
  GEMINI: {
    meaning: 'Mặt Trời tại Song Tử mang năng lượng trí tuệ nhạy bén, khả năng thích ứng linh hoạt và nhu cầu giao lưu, kết nối thông tin không ngừng.',
    layman: 'Bạn thông minh, hoạt ngôn, tiếp thu điều mới rất nhanh và có khả năng đa nhiệm. Bạn luôn tạo bầu không khí sinh động xung quanh.',
    mechanism: 'Khí Biến Đổi (Mutable Air) do Thủy Tinh cai quản. Tư duy đa luồng, xử lý dữ liệu và truyền tải ý niệm với tốc độ cao.',
    advice: 'Tập trung năng lượng vào một vài dự án trọng điểm thay vì phân tán quá nhiều việc cùng lúc để đạt hiệu quả tối ưu.',
  },
  CANCER: {
    meaning: 'Mặt Trời tại Cự Giải phản ánh chiều sâu cảm xúc, trực giác nhạy cảm và thiên hướng nuôi dưỡng, bảo bọc những người thân yêu.',
    layman: 'Bạn sống tình cảm, chu đáo, có trực giác rất nhạy và trân trọng gia đình. Bạn là chỗ dựa tinh thần ấm áp cho những người xung quanh.',
    mechanism: 'Thủy Tiên Phong (Cardinal Water) do Mặt Trăng cai quản. Bản ngã gắn liền với nhu cầu an toàn nội tâm và khả năng thấu cảm sâu sắc.',
    advice: 'Thiết lập ranh giới cảm xúc lành mạnh; học cách buông bỏ những âu lo quá mức về những điều chưa xảy ra.',
  },
  LEO: {
    meaning: 'Mặt Trời tại Sư Tử biểu trưng cho lòng tự tôn cao quý, tâm hồn hào sảng và khát vọng tỏa sáng, truyền cảm hứng cho cộng đồng.',
    layman: 'Bạn có phong thái tự tin, hào sảng, làm việc gì cũng muốn đạt đỉnh cao và luôn mong muốn được mọi người công nhận bằng thực lực.',
    mechanism: 'Hỏa Kiên Định (Fixed Fire) thuộc cung nhà của chính Mặt Trời. Năng lượng tỏa sáng tự nhiên, ấm áp và thu hút.',
    advice: 'Lắng nghe ý kiến đóng góp với tâm thế bao dung; sự khiêm nhường sẽ biến bạn thành người dẫn đường được muôn người kính trọng.',
  },
  VIRGO: {
    meaning: 'Mặt Trời tại Xử Nữ đại diện cho tư duy phân tích sắc bén, tinh thần phụng sự và chuẩn mực hoàn thiện đến từng chi tiết nhỏ.',
    layman: 'Bạn ngăn nắp, làm việc có phương pháp, chú trọng tính hiệu quả và luôn sẵn lòng giúp đỡ người khác giải quyết vấn đề thực tế.',
    mechanism: 'Thổ Biến Đổi (Mutable Earth) do Thủy Tinh cai quản. Tinh chỉnh, tối ưu hóa quy trình và quản trị trật tự vật chất.',
    advice: 'Đừng quá khắt khe với bản thân và người khác; hãy chấp nhận rằng sự hoàn hảo là một hành trình liên tục tiến bộ.',
  },
  LIBRA: {
    meaning: 'Mặt Trời tại Thiên Bình hướng đến sự công bằng, hài hòa, gu thẩm mỹ tinh tế và năng lực xây dựng các mối quan hệ đối tác bền vững.',
    layman: 'Bạn nhã nhặn, có tài ngoại giao, biết cách dung hòa các quan điểm đối lập và luôn tìm kiếm sự cân bằng trong cuộc sống.',
    mechanism: 'Khí Tiên Phong (Cardinal Air) do Kim Tinh cai quản. Ý thức bản ngã được hoàn thiện thông qua sự tương tác và phản chiếu từ người khác.',
    advice: 'Quyết đoán hơn trong các tình huống then chốt; tin tưởng vào trực giác và chính kiến của bản thân thay vì quá e ngại bất hòa.',
  },
  SCORPIO: {
    meaning: 'Mặt Trời tại Bọ Cạp phản ánh nội lực thâm trầm, trực giác nhìn thấu bản chất và năng lực chuyển hóa tâm lý, tái sinh mạnh mẽ.',
    layman: 'Bạn sâu sắc, bản lĩnh kiên cường, giữ bí mật rất tốt và luôn nhìn ra động cơ đằng sau hành vi của người khác. Bạn trung thành tuyệt đối.',
    mechanism: 'Thủy Kiên Định (Fixed Water) do Diêm Vương Tinh và Hỏa Tinh cai quản. Sức mạnh thấu thị, khả năng vượt qua nghịch cảnh vượt trội.',
    advice: 'Học cách tha thứ và buông bỏ sự đa nghi; mở lòng đón nhận tình cảm chân thành sẽ mang lại sự bình an nội tâm.',
  },
  SAGITTARIUS: {
    meaning: 'Mặt Trời tại Nhân Mã đại diện cho tinh thần tự do, niềm lạc quan vô tận và khát vọng khám phá các chân trời tri thức, triết học mới.',
    layman: 'Bạn phóng khoáng, chân thành, yêu tự do và thích khám phá thế giới. Bạn truyền năng lượng tích cực và niềm tin đến mọi người.',
    mechanism: 'Hỏa Biến Đổi (Mutable Fire) do Mộc Tinh cai quản. Khát khao mở rộng giới hạn không gian, tư tưởng và ý nghĩa nhân sinh.',
    advice: 'Chú ý đến các chi tiết thực tế trong kế hoạch; biến những ý tưởng vĩ đại thành các bước hành động cụ thể, có kỷ luật.',
  },
  CAPRICORN: {
    meaning: 'Mặt Trời tại Ma Kết biểu thị tính kỷ luật thép, tinh thần trách nhiệm kiên định và khát vọng xây dựng sự nghiệp bền vững đỉnh cao.',
    layman: 'Bạn nghiêm túc, có tầm nhìn dài hạn, làm việc có lộ trình và có bản lĩnh đối mặt với áp lực lớn để gặt hái thành công vững chắc.',
    mechanism: 'Thổ Tiên Phong (Cardinal Earth) do Thổ Tinh cai quản. Khả năng hoạch định cơ cấu tổ chức, hiện thực hóa mục tiêu tham vọng.',
    advice: 'Dành thêm thời gian nghỉ ngơi và chia sẻ cảm xúc với gia đình; đừng để công việc lấn át toàn bộ niềm vui cuộc sống thường nhật.',
  },
  AQUARIUS: {
    meaning: 'Mặt Trời tại Bảo Bình biểu trưng cho tư duy đổi mới, tính độc lập cao độ và lý tưởng nhân đạo hướng đến tiến bộ của xã hội.',
    layman: 'Bạn có tư duy độc đáo, không thích đi theo lối mòn, tôn trọng sự bình đẳng và luôn có những góc nhìn đột phá đi trước thời đại.',
    mechanism: 'Khí Kiên Định (Fixed Air) do Thiên Vương Tinh cai quản. Khả năng trừu tượng hóa, kết nối cộng đồng và đổi mới tư duy.',
    advice: 'Kết nối lý tưởng lớn với sự đồng cảm cá nhân; bày tỏ tình cảm gần gũi với những người thân thiết bên cạnh mình.',
  },
  PISCES: {
    meaning: 'Mặt Trời tại Song Ngư đại diện cho lòng trắc ẩn bao la, tâm hồn nghệ thuật phong phú và trực giác kết nối tinh thần nhạy cảm.',
    layman: 'Bạn thấu cảm, giàu trí tưởng tượng, tốt bụng và dễ rung động trước cái đẹp. Bạn lắng nghe chân thành và luôn sẻ chia với người khác.',
    mechanism: 'Thủy Biến Đổi (Mutable Water) do Hải Vương Tinh cai quản. Dòng chảy cảm xúc hòa nhập không biên giới, khả năng cảm thụ nghệ thuật.',
    advice: 'Giữ vững sự thực tế và bảo vệ nguồn năng lượng của bản thân; không nên gánh vác thay nỗi khổ của người khác đến mức kiệt sức.',
  },
};

export const MOON_SIGN_INTERPRETATIONS: Record<
  string,
  { meaning: string; layman: string; advice: string }
> = {
  ARIES: {
    meaning: 'Mặt Trăng Bạch Dương: Cảm xúc bộc phát nhanh, chân thực, nhu cầu khẳng định cái tôi bản năng mạnh mẽ.',
    layman: 'Khi gặp căng thẳng, bạn cần giải tỏa ngay bằng hành động hoặc nói thẳng suy nghĩ của mình chứ không thể giữ trong lòng.',
    advice: 'Hít thở sâu trước khi phản ứng cảm xúc; tìm các hoạt động thể thao lành mạnh để giải phóng năng lượng dư thừa.',
  },
  TAURUS: {
    meaning: 'Mặt Trăng Kim Ngưu: Trạng thái tôn quý (Exaltation), cảm xúc ổn định, cần sự an toàn vật chất và không gian bình yên.',
    layman: 'Bạn có nội tâm vững vàng, ít bị dao động. Sự êm ấm, món ăn ngon và không gian thoải mái là liều thuốc chữa lành tốt nhất cho bạn.',
    advice: 'Chia sẻ nỗi lòng khi gặp bế tắc thay vì khép kín chịu đựng một mình; tin tưởng vào sự giúp đỡ của bạn bè thân thiết.',
  },
  GEMINI: {
    meaning: 'Mặt Trăng Song Tử: Cảm xúc được xử lý qua lăng kính tư duy; cần trò chuyện, đọc sách và trao đổi để tìm sự an tâm.',
    layman: 'Mỗi khi lo lắng, bạn cảm thấy nhẹ nhõm nhất khi được nói chuyện với một người biết lắng nghe hoặc tìm hiểu rõ ngọn ngành vấn đề.',
    advice: 'Cho phép bản thân cảm nhận cảm xúc thuần túy mà không nhất thiết phải phân tích lý lẽ cho mọi thứ.',
  },
  CANCER: {
    meaning: 'Mặt Trăng Cự Giải: Cung vị thống lĩnh (Domicile), trực giác cực nhạy, thế giới nội tâm sâu sắc gắn liền với tổ ấm.',
    layman: 'Bạn có giác quan thứ sáu rất nhạy, dễ cảm nhận tâm trạng của người khác. Bạn cần một không gian ấm cúng để tái nạp năng lượng.',
    advice: 'Tạo cho mình một không gian tĩnh lặng định kỳ; chăm sóc bản thân chu đáo trước khi lo lắng cho người khác.',
  },
  LEO: {
    meaning: 'Mặt Trăng Sư Tử: Trái tim ấm áp, khao khát được công nhận, trân trọng và thể hiện tình cảm một cách nồng nhiệt.',
    layman: 'Bạn hào hiệp, thích mang lại niềm vui cho mọi người và cảm thấy được nạp năng lượng khi nhận được lời khen ngợi chân thành.',
    advice: 'Học cách tự công nhận giá trị bản thân từ bên trong mà không phụ thuộc quá mức vào sự tán dương bên ngoài.',
  },
  VIRGO: {
    meaning: 'Mặt Trăng Xử Nữ: Nhu cầu an tâm thông qua sự ngăn nắp, quy củ và cảm giác bản thân có ích cho cộng đồng.',
    layman: 'Khi căng thẳng, bạn thường dọn dẹp hoặc sắp xếp lại công việc. Bạn thể hiện sự quan tâm bằng những hành động chăm sóc cụ thể.',
    advice: 'Học cách thư giãn và chấp nhận rằng mọi thứ không cần phải hoàn hảo tuyệt đối mới mang lại hạnh phúc.',
  },
  LIBRA: {
    meaning: 'Mặt Trăng Thiên Bình: Tìm kiếm sự hòa hợp, bình yên trong các mối quan hệ và cảm giác được đồng hành sẻ chia.',
    layman: 'Bạn ghét sự xung đột gay gắt, luôn muốn dĩ hòa vi quý và cảm thấy an lòng nhất khi ở bên người bạn đời thấu hiểu.',
    advice: 'Học cách đối diện thẳng thắn với bất đồng cần thiết; sự rõ ràng chính là khởi đầu của sự hòa hợp thực chất.',
  },
  SCORPIO: {
    meaning: 'Mặt Trăng Bọ Cạp: Cung vị đọa lạc (Fall), cảm xúc mãnh liệt, sâu sắc, khao khát kết nối tâm hồn chân thực tuyệt đối.',
    layman: 'Bạn cảm nhận mọi thứ rất sâu sắc, có giác quan nhìn thấu người khác và chỉ mở lòng với người bạn hoàn toàn tin tưởng.',
    advice: 'Học cách bao dung và buông xả những tổn thương cũ; giải phóng cảm xúc thay vì dồn nén trong lòng.',
  },
  SAGITTARIUS: {
    meaning: 'Mặt Trăng Nhân Mã: Nhu cầu tự do cảm xúc, lạc quan, hướng đến triết lý sống tích cực và sự giải phóng tinh thần.',
    layman: 'Mỗi khi mệt mỏi, một chuyến đi xa, một cuốn sách hay hoặc buổi trò chuyện triết lý sẽ giúp bạn lấy lại nguồn năng lượng dồi dào.',
    advice: 'Đối diện với những cảm xúc khó khăn thay vì tìm cách trốn chạy vào những trải nghiệm mới.',
  },
  CAPRICORN: {
    meaning: 'Mặt Trăng Ma Kết: Cung vị lưu đày (Detriment), kiểm soát cảm xúc chặt chẽ, nhu cầu tự chủ và trách nhiệm cao.',
    layman: 'Bạn ít khi bộc lộ sự yếu đuối ra ngoài, luôn tỏ ra kiên cường gánh vác mọi việc. Bạn thể hiện tình cảm bằng trách nhiệm thực tế.',
    advice: 'Cho phép mình được nghỉ ngơi và chia sẻ gánh nặng với người thân; việc bộc lộ cảm xúc không phải là sự yếu đuối.',
  },
  AQUARIUS: {
    meaning: 'Mặt Trăng Bảo Bình: Cảm xúc khách quan, độc lập, cần không gian tự do riêng và khao khát bình đẳng trong mối quan hệ.',
    layman: 'Bạn không thích sự sướt mướt hay bị kiểm soát. Bạn coi trọng tình bạn, sự tôn trọng lẫn nhau và không gian phát triển riêng.',
    advice: 'Học cách kết nối ấm áp bằng trái tim thay vì chỉ đứng ở góc độ người quan sát lý trí.',
  },
  PISCES: {
    meaning: 'Mặt Trăng Song Ngư: Trực giác tâm linh thấu suốt, lòng trắc ẩn bao la và sự hòa tan không biên giới với vạn vật.',
    layman: 'Bạn rất dễ xúc động, giàu lòng nhân ái, hiểu được nỗi đau của người khác và có năng khiếu nghệ thuật, cảm thụ tinh tế.',
    advice: 'Bảo vệ nguồn năng lượng của bản thân; thiết lập ranh giới rõ ràng để không bị năng lượng tiêu cực xung quanh làm xáo trộn.',
  },
};

export const HOUSE_INTERPRETATIONS: Record<
  number,
  {
    nameVn: string;
    latinName: string;
    domain: string;
    beginnerGuide: string;
    layman: string;
    keyThemes: string;
    advice: string;
  }
> = {
  1: {
    nameVn: 'Cung Mệnh / Bản Ngã (House 1 - ASC)',
    latinName: 'Vita (Sự Sống & Bản Ngã)',
    domain: 'Bản thân, ngoại hình, phong thái, cá tính tiên phong & ấn tượng ban đầu',
    beginnerGuide: 'Nhà 1 bắt đầu tại Cung Mọc (Ascendant), là cung nhà quan trọng bậc nhất đại diện cho chính con người bạn — ngoại hình, thần thái, phong cách sống và lăng kính bạn dùng để nhìn nhận thế giới.',
    layman: 'Đây là "cánh cổng" bạn bước ra đời. Dấu hiệu hoàng đạo ngự tại Nhà 1 cho biết người khác cảm nhận gì về bạn ngay từ cái nhìn đầu tiên: sự nhiệt huyết, tự tin, trầm tĩnh hay cuốn hút bí ẩn.',
    keyThemes: 'Bản ngã cá nhân, sức sống thể chất, phong thái đối ngoại, khả năng khởi xướng.',
    advice: 'Tự tin sống thật với phong cách riêng; xây dựng hình ảnh cá nhân nhất quán với giá trị bên trong của bạn.',
  },
  2: {
    nameVn: 'Tài Chính & Giá Trị Bản Thân (House 2)',
    latinName: 'Lucrum (Tài Sản & Thu Nhập)',
    domain: 'Tiền bạc tự kiếm, của cải vật chất, tài nguyên & lòng tự trọng',
    beginnerGuide: 'Nhà 2 quản lý nguồn thu nhập do chính bạn làm ra, cách bạn quản lý tiền của, thái độ đối với vật chất và đặc biệt là ý thức về giá trị tự thân (Self-worth).',
    layman: 'Nhà này trả lời câu hỏi: Bạn kiếm tiền bằng cách nào? Bạn chi tiêu ra sao và bạn đánh giá bản thân xứng đáng với điều gì? Một Nhà 2 vững vàng giúp bạn luôn an tâm về mặt kinh tế.',
    keyThemes: 'Thu nhập cá nhân, thói quen chi tiêu, đầu tư an toàn, ý thức về sự xứng đáng.',
    advice: 'Học cách quản lý tài chính thông minh; nâng cao kỹ năng chuyên môn để gia tăng giá trị bản thân trên thị trường.',
  },
  3: {
    nameVn: 'Giao Tiếp, Tư Duy & Môi Trường Gần (House 3)',
    latinName: 'Fratres (Anh Chị Em & Giao Tiếp)',
    domain: 'Tư duy logic, cách nói năng, viết lách, anh chị em & di chuyển gần',
    beginnerGuide: 'Nhà 3 chi phối trí tuệ hàng ngày, kỹ năng giao tiếp, viết lách, học tập ngắn hạn, quan hệ với anh chị em ruột, hàng xóm và những chuyến đi cự ly gần.',
    layman: 'Cung nhà này phản ánh bạn là người nói nhiều hay ít, tư duy nhanh hay sâu, và cách bạn kết nối với những người xung quanh hàng ngày. Nó cũng cho thấy năng khiếu ngôn ngữ và truyền thông của bạn.',
    keyThemes: 'Kỹ năng ăn nói, thu thập thông tin, quan hệ anh chị em, học hỏi kỹ năng mới.',
    advice: 'Lắng nghe chân thành trước khi phản hồi; trau dồi kỹ năng viết và diễn đạt để mở rộng cơ hội nghề nghiệp.',
  },
  4: {
    nameVn: 'Gia Đình, Cội Nguồn & Bất Động Sản (House 4 - IC)',
    latinName: 'Genitor (Cội Nguồn & Tổ Ấm)',
    domain: 'Gia đình, tổ ấm, cha mẹ, gốc rễ tâm lý & bất động sản',
    beginnerGuide: 'Nhà 4 bắt đầu tại Thiên Để (IC), tượng trưng cho phần rễ của một cái cây — cội nguồn gia đình, ký ức tuổi thơ, sự an toàn tâm lý thầm kín và nhà cửa đất đai.',
    layman: 'Đây là chốn bình yên bạn quay về khi mỏi mệt ngoài xã hội. Nó cho biết môi trường gia đình bạn lớn lên và mẫu tổ ấm lý tưởng mà bạn muốn xây dựng trong tương lai.',
    keyThemes: 'Tình cảm gia đình, chỗ ở, cảm giác an toàn nội tâm, di sản của dòng họ.',
    advice: 'Vun đắp mối quan hệ ấm áp với gia đình; tạo dựng một không gian sống sạch sẽ, ấm cúng để tái nạp năng lượng sau ngày dài.',
  },
  5: {
    nameVn: 'Sáng Tạo, Lãng Mạn & Niềm Vui Sống (House 5)',
    latinName: 'Nati (Con Cái & Sự Sáng Tạo)',
    domain: 'Tình yêu đôi lứa, thú vui giải trí, con cái, nghệ thuật & đầu tư mạo hiểm',
    beginnerGuide: 'Nhà 5 là sân khấu của niềm vui, sự lãng mạn rung động trái tim, đam mê nghệ thuật, sở thích cá nhân, việc nuôi dạy con cái và các trò chơi thử vận may.',
    layman: 'Đây là cung nhà của đứa trẻ bên trong bạn: Bạn thích làm gì để thấy hạnh phúc? Cách bạn tán tỉnh, hẹn hò và thể hiện sự lãng mạn như thế nào? Nó mang lại niềm say mê sống mỗi ngày.',
    keyThemes: 'Rung động lãng mạn, sự sáng tạo nghệ thuật, nuôi dưỡng con cái, tinh thần cởi mở.',
    advice: 'Dành thời gian cho đam mê và sở thích lành mạnh; thể hiện tình cảm chân thành và ngọt ngào với người bạn yêu thương.',
  },
  6: {
    nameVn: 'Công Việc Thường Nhật & Sức Khỏe (House 6)',
    latinName: 'Valetudo (Sức Khỏe & Tận Tụy)',
    domain: 'Thói quen hàng ngày, công việc chi tiết, sức khỏe thể chất & phụng sự',
    beginnerGuide: 'Nhà 6 chi phối nếp sống kỷ luật hàng ngày, mối quan hệ với đồng nghiệp, sự tận tâm trong công việc chuyên môn và chế độ ăn uống, chăm sóc sức khỏe thể chất.',
    layman: 'Nếu Nhà 10 là danh vọng to lớn thì Nhà 6 là những việc tỉ mỉ bạn làm mỗi ngày từ sáng tới tối để hoàn thành nhiệm vụ. Nó nhắc nhở bạn duy trì lối sống lành mạnh.',
    keyThemes: 'Hiệu suất làm việc, thói quen sinh hoạt, quan hệ đồng nghiệp, phòng ngừa bệnh tật.',
    advice: 'Xây dựng thời gian biểu khoa học; chú trọng tập luyện thể thao và dinh dưỡng cân bằng để có sức bền dài hạn.',
  },
  7: {
    nameVn: 'Đối Tác, Hôn Nhân & Hợp Tác Một-Một (House 7 - DSC)',
    latinName: 'Uxor (Hôn Nhân & Đối Tác)',
    domain: 'Hôn nhân, bạn đời, đối tác kinh doanh & quan hệ hợp tác đối xứng',
    beginnerGuide: 'Nhà 7 bắt đầu tại Cung Lặn (Descendant), đại diện cho tấm gương phản chiếu bản thân bạn qua các mối quan hệ một-một quan trọng nhất: bạn đời và đối tác làm ăn.',
    layman: 'Cung nhà này cho biết mẫu người bạn đời mà bạn có duyên gắn bó, cách bạn cư xử trong hôn nhân và khả năng đàm phán hợp tác kinh doanh để đôi bên cùng có lợi.',
    keyThemes: 'Cam kết hôn nhân, chọn bạn đời, thỏa thuận hợp tác, sự công bằng trong quan hệ.',
    advice: 'Học cách lắng nghe và thấu cảm góc nhìn của đối phương; minh bạch trong mọi thỏa thuận hợp tác.',
  },
  8: {
    nameVn: 'Biến Đổi Sâu Sắc, Tái Sinh & Tài Sản Chung (House 8)',
    latinName: 'Mors (Tái Sinh & Chuyển Hóa)',
    domain: 'Tài chính chung (thừa kế, vốn vay, tiền bạn đời), tâm lý học sâu & vượt qua nghịch cảnh',
    beginnerGuide: 'Nhà 8 là vùng nước sâu huyền bí liên quan đến tài nguyên của người khác (tiền của đối tác, bảo hiểm, đầu tư), sự chuyển hóa nội tâm sâu sắc và năng lực phục hồi sau khủng hoảng.',
    layman: 'Cung nhà này giúp bạn nhìn thấu những điều ẩn sâu bên dưới bề mặt. Nó cho thấy cách bạn quản lý tài sản chung và khả năng tự "lột xác" tái sinh mạnh mẽ sau những giai đoạn khó khăn.',
    keyThemes: 'Tài sản chung, quản lý nợ/vốn, trực giác tâm lý sâu, sự chuyển hóa nội lực.',
    advice: 'Minh bạch trong các vấn đề tiền bạc chung; rèn luyện bản lĩnh đón nhận thay đổi như một cơ hội để trưởng thành hơn.',
  },
  9: {
    nameVn: 'Triết Học, Du Ngoạn & Tầm Nhìn Xa (House 9)',
    latinName: 'Iter (Hành Trình & Khám Phá)',
    domain: 'Học vấn đại học, du lịch đường dài, triết lý sống, tôn giáo & xuất bản',
    beginnerGuide: 'Nhà 9 cai quản khát vọng vươn xa của tâm trí: học vấn bậc cao, các chuyến xuất ngoại, sự mở rộng thế giới quan văn hóa, luật pháp và niềm tin tâm linh.',
    layman: 'Đây là cung nhà của người lữ hành và học giả. Nó phản ánh niềm khao khát đi du lịch xa, khám phá các nền văn hóa mới và xây dựng một hệ thống triết lý sống nhân văn cho riêng mình.',
    keyThemes: 'Học vấn chuyên sâu, du lịch quốc tế, triết lý nhân sinh, xuất bản & truyền bá ý tưởng.',
    advice: 'Không ngừng mở rộng chân trời hiểu biết qua sách vở và trải nghiệm thực tế; sống bao dung với các nền văn hóa khác nhau.',
  },
  10: {
    nameVn: 'Sự Nghiệp, Danh Tiếng & Đỉnh Cao Xã Hội (House 10 - MC)',
    latinName: 'Regnum (Đỉnh Cao Vị Thế & Quyền Uy)',
    domain: 'Đỉnh cao sự nghiệp, địa vị xã hội, hoài bão lớn & di sản cống hiến',
    beginnerGuide: 'Nhà 10 bắt đầu tại Thiên Đỉnh (Medium Coeli / MC), là điểm cao nhất trên bầu trời lúc bạn chào đời. Nó đại diện cho sự nghiệp rực rỡ, danh tiếng công chúng và đỉnh cao thành tựu bạn đạt được trong xã hội.',
    layman: 'Đây là câu trả lời cho việc: Bạn muốn thế giới ghi nhớ mình vì điều gì? Bạn phù hợp làm lãnh đạo trong lĩnh vực nào? Nó là đích đến của mọi nỗ lực chuyên môn và uy tín xã hội của bạn.',
    keyThemes: 'Khát vọng sự nghiệp, danh tiếng công chúng, vai trò lãnh đạo, sự công nhận của xã hội.',
    advice: 'Đặt ra các mục tiêu nghề nghiệp dài hạn; giữ gìn chữ tín và đạo đức nghề nghiệp để xây dựng vị thế trường tồn.',
  },
  11: {
    nameVn: 'Cộng Đồng, Bạn Bè & Ước Mơ Tương Lai (House 11)',
    latinName: 'Benefacta (Bạn Bè & Lý Tưởng)',
    domain: 'Mạng lưới bạn bè, đội nhóm, tổ chức xã hội, nhà tài trợ & lý tưởng tương lai',
    beginnerGuide: 'Nhà 11 là nơi của tình bạn, hội nhóm, cộng đồng cùng chung chí hướng và những ước mơ cao đẹp hướng đến tương lai tốt đẹp hơn cho số đông.',
    layman: 'Cung nhà này cho biết bạn có quý nhân phù trợ hay không, cách bạn hòa nhập với đội ngũ đồng nghiệp và những người bạn tri kỷ sẽ đồng hành cùng bạn hiện thực hóa ước mơ lớn.',
    keyThemes: 'Tình bạn chân thành, mạng lưới quan hệ rộng, làm việc nhóm, ước mơ hoài bão lớn.',
    advice: 'Tích cực tham gia các cộng đồng lành mạnh; kết nối những người cùng lý tưởng để cùng nhau kiến tạo giá trị.',
  },
  12: {
    nameVn: 'Tiềm Thức, Bí Ẩn & Chữa Lành Tâm Linh (House 12)',
    latinName: 'Carcer (Tiềm Thức & Giải Thoát)',
    domain: 'Thế giới tiềm thức, trực giác tâm linh, sự chữa lành, giấc mơ & sự tĩnh lặng',
    beginnerGuide: 'Nhà 12 là cung nhà cuối cùng của vòng hoàng đạo, biểu thị đại dương tiềm thức vô tận, những khả năng tiềm ẩn mà bạn chưa khai phá, sự buông bỏ nghiệp quả và sự thăng hoa tâm linh.',
    layman: 'Đây là không gian tĩnh lặng nhất trong tâm hồn bạn: sự lắng đọng, trực giác thiêng liêng, khả năng thấu cảm nỗi đau người khác và nhu cầu được nghỉ ngơi chữa lành trong không gian riêng.',
    keyThemes: 'Giác ngộ tâm linh, thế giới giấc mơ, lòng vị tha vô điều kiện, chữa lành tổn thương.',
    advice: 'Thực hành thiền định hoặc các hoạt động nuôi dưỡng tinh thần; học cách tha thứ và buông bỏ những âu lo trong quá khứ.',
  },
};

export const ZODIAC_GLYPHS: Record<string, string> = {
  ARIES: '♈',
  TAURUS: '♉',
  GEMINI: '♊',
  CANCER: '♋',
  LEO: '♌',
  VIRGO: '♍',
  LIBRA: '♎',
  SCORPIO: '♏',
  SAGITTARIUS: '♐',
  CAPRICORN: '♑',
  AQUARIUS: '♒',
  PISCES: '♓',
};

export const PLANET_GLYPHS: Record<string, string> = {
  sun: '☉',
  moon: '☽',
  mercury: '☿',
  venus: '♀',
  mars: '♂',
  jupiter: '♃',
  saturn: '♄',
  uranus: '♅',
  neptune: '♆',
  pluto: '♇',
  northnode: '☊',
  southnode: '☋',
  chiron: '⚷',
};

export * from './planetary-interpretations.js';
