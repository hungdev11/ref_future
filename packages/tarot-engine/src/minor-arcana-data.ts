import { TarotCardInsight } from './interpretations.js';

export const MINOR_ARCANA_DETAILED: Record<string, TarotCardInsight> = {
  // ══════════════════════════════════════════════════════════════════
  // BỘ GẬY (SUIT OF WANDS) — NGUYÊN TỐ LỬA (Ý CHÍ, HÀNH ĐỘNG, SỰ NGHIỆP)
  // ══════════════════════════════════════════════════════════════════
  WANDS_01_ACE: {
    cardCode: 'WANDS_01_ACE',
    nameVn: 'Ách Gậy (Ace of Wands)',
    keywords: ['Khởi đầu mới', 'Cảm hứng bùng nổ', 'Ý chí dấn thân', 'Tiềm năng sáng tạo'],
    symbolism: 'Bàn tay từ đám mây vươn ra nắm lấy cây gậy sống đâm chồi nảy lộc. Nguồn năng lượng nguyên bản của Lửa được trao tặng, hứa hẹn một chu kỳ hành động đầy đam mê.',
    uprightMeaning: 'Ace of Wands xuôi là tia lửa thắp sáng một kế hoạch mới hoặc đam mê tiềm ẩn. Bạn tràn đầy sinh lực và khao khát khởi xướng điều gì đó đột phá.',
    reversedMeaning: 'Ace of Wands ngược cảnh báo sự trì trệ, mất cảm hứng hoặc thiếu tự tin để bắt đầu. Có thể bạn đang thiếu một kế hoạch khả thi hoặc bị dập tắt nhiệt huyết ban đầu.',
    careerFinance: {
      upright: 'Thời cơ vàng để bắt đầu một dự án mới, nhận trọng trách hoặc triển khai ý tưởng kinh doanh độc lập. Tài chính mở ra cơ hội sinh lời từ năng lực cá nhân.',
      reversed: 'Dự án có nguy cơ bị đình trệ do thiếu chuẩn bị. Đừng đầu tư hấp tấp khi chưa nắm rõ quy trình vận hành.',
    },
    loveRelationship: {
      upright: 'Sức hút mãnh liệt, tình cảm nồng nàn và những bước tiến chủ động đầy quyến rũ.',
      reversed: 'Sự sốt ruột hoặc tính khí thất thường gây hiểu lầm. Cần kiểm soát cái tôi nóng nảy.',
    },
    dos: {
      upright: 'Nắm bắt nguồn cảm hứng; hành động ngay trong 24 giờ đầu tiên; dũng cảm dấn thân.',
      reversed: 'Kiên nhẫn tìm lại động lực cốt lõi; rà soát tính khả thi trước khi công bố kế hoạch.',
    },
    donts: {
      upright: 'Không để ngọn lửa đam mê tắt ngấm vì sự do dự không cần thiết.',
      reversed: 'Không đốt cháy giai đoạn hoặc ép buộc người khác theo ý mình.',
    },
  },

  WANDS_02_2: {
    cardCode: 'WANDS_02_2',
    nameVn: 'Hai Gậy (Two of Wands)',
    keywords: ['Tầm nhìn xa', 'Lập kế hoạch', 'Lựa chọn dấn thân', 'Mở rộng quy mô'],
    symbolism: 'Nhân vật đứng trên đỉnh thành lũy, tay cầm quả cầu địa cầu phóng tầm mắt ra biển xa. Cây gậy cắm vững sau lưng tượng trưng cho thành tựu đã có, chuẩn bị cho bước tiến tiếp theo.',
    uprightMeaning: 'Two of Wands biểu thị giai đoạn hoạch định chiến lược. Bạn đang có vị thế an toàn nhưng khao khát vươn ra khỏi vùng an toàn để chinh phục mục tiêu lớn hơn.',
    reversedMeaning: 'Two of Wands ngược phản ánh sự do dự, sợ hãi trước những điều chưa biết hoặc lập kế hoạch quá viển vông xa rời thực tế.',
    careerFinance: {
      upright: 'Thời điểm thích hợp để đàm phán hợp đồng đối tác, khảo sát thị trường mới hoặc chuẩn bị mở rộng quy mô kinh doanh.',
      reversed: 'Kế hoạch bị chậm lại do thiếu sự thống nhất hoặc do dự không dám chốt quyết định cuối cùng.',
    },
    loveRelationship: {
      upright: 'Cùng người ấy bàn bạc về những kế hoạch dài hạn: chuyển nhà, du lịch xa hoặc dự định tương lai chung.',
      reversed: 'Bất đồng về định hướng tương lai hoặc một bên cảm thấy bị giới hạn tự do cá nhân.',
    },
    dos: {
      upright: 'Nâng cao tầm nhìn; xây dựng lộ trình rõ ràng; chuẩn bị tâm thế bước ra biển lớn.',
      reversed: 'Tập trung củng cố những gì đang có trước khi mạo hiểm phiêu lưu.',
    },
    donts: {
      upright: 'Không giam mình mãi trong vùng an toàn chật hẹp.',
      reversed: 'Không đưa ra quyết định dựa trên sự hoang mang hoặc ảo tưởng.',
    },
  },

  WANDS_03_3: {
    cardCode: 'WANDS_03_3',
    nameVn: 'Ba Gậy (Three of Wands)',
    keywords: ['Tiến triển thuận lợi', 'Tàu về bến', 'Hợp tác mở rộng', 'Tự tin gặt hái'],
    symbolism: 'Nhân vật đứng nhìn những con thuyền của mình đang lướt sóng trở về. Ba cây gậy vững chãi cắm trên mặt đất biểu thị nền tảng đã vững và thành quả đang đến gần.',
    uprightMeaning: 'Three of Wands khẳng định các nỗ lực ban đầu của bạn đang đi đúng hướng. Cơ hội đang mở rộng ra tầm quốc tế hoặc quy mô lớn hơn dự kiến.',
    reversedMeaning: 'Three of Wands ngược cảnh báo sự chậm trễ ngoài ý muốn, kế hoạch bị đình trệ do yếu tố khách quan hoặc đối tác làm việc thiếu cam kết.',
    careerFinance: {
      upright: 'Các chuyến công tác, hợp tác ngoại thương hoặc dự án mới đều có dấu hiệu sinh lời và mở ra mạng lưới quan hệ giá trị.',
      reversed: 'Cần dự phòng phương án B cho các khâu vận chuyển, pháp lý hoặc chuỗi cung ứng.',
    },
    loveRelationship: {
      upright: 'Tình cảm có sự chia sẻ và đồng hành bền bỉ; tình yêu xa hoặc các kế hoạch tương lai chung tiến triển êm đẹp.',
      reversed: 'Cảm giác xa cách địa lý hoặc tâm lý chưa tìm được tiếng nói chung. Hãy chủ động gọi điện sẻ chia.',
    },
    dos: {
      upright: 'Mở rộng mạng lưới quan hệ; chuẩn bị tiếp nhận kết quả xứng đáng; tự tin vào định hướng đã chọn.',
      reversed: 'Kiểm tra lại từng mắt xích hợp tác; giữ bình tĩnh xử lý các sự cố chậm nhịp.',
    },
    donts: {
      upright: 'Không thu hẹp phạm vi mục tiêu khi gió đang thuận chiều.',
      reversed: 'Không nóng nảy đổ lỗi cho hoàn cảnh hay đối tác.',
    },
  },

  WANDS_04_4: {
    cardCode: 'WANDS_04_4',
    nameVn: 'Bốn Gậy (Four of Wands)',
    keywords: ['Ăn mừng chiến thắng', 'Cột mốc viên mãn', 'Hòa thuận gia đạo', 'Bình an tổ ấm'],
    symbolism: 'Bốn cây gậy kết hoa trái rực rỡ tạo thành cổng vòm lễ hội. Đôi bạn trẻ giơ cao bó hoa mừng thành quả, xa xa là lâu đài kiên cố bình yên.',
    uprightMeaning: 'Four of Wands là lá bài của niềm hân hoan, sự hòa hợp và thành quả bước đầu đáng tự hào. Đây là thời khắc kỷ niệm, đoàn tụ và tận hưởng sự an yên.',
    reversedMeaning: 'Four of Wands ngược chỉ ra một sự gián đoạn nhỏ trong ngày vui, bất đồng nội bộ gia đình hoặc cảm giác chưa thật sự sẵn sàng chia sẻ niềm vui.',
    careerFinance: {
      upright: 'Dự án đạt cột mốc quan trọng, nhóm làm việc gắn kết ăn ý; nhận được lời khen thưởng xứng đáng.',
      reversed: 'Môi trường làm việc có chút căng thẳng ngầm hoặc kế hoạch liên hoan bị hoãn lại.',
    },
    loveRelationship: {
      upright: 'Giai đoạn hạnh phúc ngập tràn: đính hôn, đám cưới, về chung một nhà hoặc tìm được sự thấu cảm sâu sắc.',
      reversed: 'Cần giải quyết những xích mích nhỏ trong họ hàng hoặc chuyện gia đình để tìm lại không khí ấm áp.',
    },
    dos: {
      upright: 'Tri ân những người đã đồng hành; mở lòng sẻ chia niềm vui; tận hưởng thành quả hiện tại.',
      reversed: 'Chủ động làm hòa; dẹp bỏ cái tôi để giữ gìn hòa khí chung trong tổ ấm.',
    },
    donts: {
      upright: 'Không tự cô lập mình khỏi tập thể và gia đình.',
      reversed: 'Không để những chuyện vặt vãnh làm hỏng bầu không khí sum vầy.',
    },
  },

  WANDS_05_5: {
    cardCode: 'WANDS_05_5',
    nameVn: 'Năm Gậy (Five of Wands)',
    keywords: ['Cạnh tranh gay gắt', 'Bất đồng quan điểm', 'Thử thách kỹ năng', 'Cọ xát phát triển'],
    symbolism: 'Năm chàng trai cầm gậy vung lên trong một cuộc giao đấu hỗn loạn nhưng không ai mang vũ khí sát thương thật sự. Đây là cuộc so tài rèn luyện bản lĩnh.',
    uprightMeaning: 'Five of Wands phản ánh sự cạnh tranh, tranh luận sôi nổi và va chạm ý kiến. Đây là bài kiểm tra khả năng giữ vững lập trường và lắng nghe đồng nghiệp.',
    reversedMeaning: 'Five of Wands ngược cảnh báo nguy cơ mâu thuẫn leo thang thành hiềm khích cá nhân, hoặc ngược lại là né tránh xung đột cần thiết dẫn đến bức bối ngầm.',
    careerFinance: {
      upright: 'Môi trường làm việc cạnh tranh cao đòi hỏi sự sắc bén và linh hoạt. Hãy chứng minh bằng năng lực thực tế.',
      reversed: 'Tránh xa các cuộc khẩu chiến nơi công sở hoặc tin đồn vô căn cứ gây mất đoàn kết.',
    },
    loveRelationship: {
      upright: 'Đôi bên tranh cãi vì những quan điểm khác biệt; cần thẳng thắn làm rõ thay vì dỗi hờn im lặng.',
      reversed: 'Học cách nhường nhịn và tìm ra giải pháp chung thay vì cố chấp giành phần thắng trong tranh luận.',
    },
    dos: {
      upright: 'Xem cạnh tranh là động lực mài giũa kỹ năng; diễn đạt ý kiến mạch lạc và tôn trọng đối phương.',
      reversed: 'Tìm kiếm điểm đồng thuận; dừng các cuộc tranh cãi không mang lại giá trị thực tế.',
    },
    donts: {
      upright: 'Không cá nhân hóa những bất đồng mang tính chuyên môn.',
      reversed: 'Không dùng lời lẽ cay độc hoặc cố tình hạ bệ người khác.',
    },
  },

  WANDS_06_6: {
    cardCode: 'WANDS_06_6',
    nameVn: 'Sáu Gậy (Six of Wands)',
    keywords: ['Chiến thắng rạng rỡ', 'Được công nhận', 'Tự tin dẫn đầu', 'Vinh danh xứng đáng'],
    symbolism: 'Vị kỵ sĩ đội vòng nguyệt quế cưỡi ngựa trắng diễu hành qua đám đông hoan hô. Cây gậy cắm vòng nguyệt quế giơ cao biểu thị thắng lợi công khai.',
    uprightMeaning: 'Six of Wands báo hiệu thành công vượt bậc, sự công nhận rộng rãi từ xã hội và sự tự tin đĩnh đạc sau những ngày tháng nỗ lực bền bỉ.',
    reversedMeaning: 'Six of Wands ngược cảnh báo thói tự phụ, ngủ quên trên chiến thắng hoặc nỗi thất vọng khi thành quả của mình chưa được ghi nhận tương xứng.',
    careerFinance: {
      upright: 'Thăng chức, trúng thầu dự án lớn hoặc nhận giải thưởng uy tín. Vị thế chuyên môn được khẳng định vững chắc.',
      reversed: 'Cẩn trọng với những lời tâng bốc; tập trung vào chất lượng công việc thay vì chạy theo hình thức hư danh.',
    },
    loveRelationship: {
      upright: 'Tự hào về người yêu; mối quan hệ nhận được sự ủng hộ và chúc phúc nồng nhiệt từ bạn bè, gia đình.',
      reversed: 'Tránh để thói trịch thượng hoặc coi mình là trung tâm làm tổn thương cảm xúc của đối phương.',
    },
    dos: {
      upright: 'Tự hào chính đáng về nỗ lực của mình; khiêm nhường ghi nhận công lao của đồng đội.',
      reversed: 'Rèn luyện nội lực thầm lặng; không cần phải luôn chứng tỏ mình với mọi người xung quanh.',
    },
    donts: {
      upright: 'Không kiêu căng tự mãn coi thường người đi sau.',
      reversed: 'Không để cảm giác ghen tị với thành công của người khác gặm nhấm tâm can.',
    },
  },

  WANDS_07_7: {
    cardCode: 'WANDS_07_7',
    nameVn: 'Bảy Gậy (Seven of Wands)',
    keywords: ['Giữ vững lập trường', 'Bản lĩnh kiên cường', 'Vượt qua sức ép', 'Phòng thủ kiên định'],
    symbolism: 'Người đàn ông đứng trên đỉnh đồi cao dũng cảm giơ gậy chống lại 6 cây gậy tấn công từ phía dưới. Ông đi hai chiếc giày khác nhau, biểu thị sự ứng biến nhanh nhạy trong tình huống hiểm nguy.',
    uprightMeaning: 'Seven of Wands xuất hiện khi bạn đang ở thế thượng phong nhưng phải đối mặt với nhiều áp lực cạnh tranh. Hãy giữ vững vị trí và niềm tin của mình.',
    reversedMeaning: 'Seven of Wands ngược phản ánh sự mệt mỏi, quá tải khi phải liên tục tự vệ, hoặc cảm giác muốn buông xuôi trước sức ép dồn dập.',
    careerFinance: {
      upright: 'Bảo vệ thành công ý tưởng độc quyền hoặc thị phần kinh doanh trước đối thủ cạnh tranh.',
      reversed: 'Cân nhắc đàm phán hoặc tìm đồng minh trợ lực; không nên đơn độc chiến đấu với tất cả mọi phía.',
    },
    loveRelationship: {
      upright: 'Kiên quyết bảo vệ tình yêu trước những lời can thiệp vô duyên từ bên ngoài.',
      reversed: 'Tránh thái độ phòng thủ thái quá khiến người thương không thể tiếp cận và chia sẻ tâm sự.',
    },
    dos: {
      upright: 'Tận dụng ưu thế địa hình cao; kiên định với ranh giới cá nhân; không lùi bước.',
      reversed: 'Nhận diện trận chiến nào đáng đánh; buông bỏ những mâu thuẫn vụn vặt để bảo toàn năng lượng.',
    },
    donts: {
      upright: 'Không dao động trước những lời chỉ trích mang tính phá hoại.',
      reversed: 'Không ngoan cố bảo vệ một sai lầm đã rõ ràng chỉ vì sĩ diện.',
    },
  },

  WANDS_08_8: {
    cardCode: 'WANDS_08_8',
    nameVn: 'Tám Gậy (Eight of Wands)',
    keywords: ['Tốc độ nhanh chóng', 'Tin tức quan trọng', 'Thông suốt thuận lợi', 'Hành động dứt khoát'],
    symbolism: 'Tám cây gậy bay vút qua bầu trời quang đãng hướng về phía mặt đất phì nhiêu. Không có chướng ngại vật nào cản lối, dòng năng lượng chuyển động với vận tốc cực lớn.',
    uprightMeaning: 'Eight of Wands báo hiệu mọi việc sẽ tăng tốc bất ngờ. Các khúc mắc được tháo gỡ nhanh chóng, tin tức mong đợi bấy lâu sắp sửa ùa về.',
    reversedMeaning: 'Eight of Wands ngược cảnh báo sự hỗn loạn do vội vã, thông tin bị nghẽn tắc hoặc hành động hấp tấp dẫn đến sai sót ngoài tầm kiểm soát.',
    careerFinance: {
      upright: 'Dự án tiến triển với tốc độ thần tốc; email phản hồi tích cực; các chuyến công tác suôn sẻ.',
      reversed: 'Chậm trễ trong giao tiếp hoặc hiểu lầm nội dung văn bản. Hãy đọc kỹ điều khoản trước khi bấm gửi.',
    },
    loveRelationship: {
      upright: 'Tình cảm phát triển nhanh chóng, những tin nhắn ngọt ngào liên tục và cảm xúc dâng trào mạnh mẽ.',
      reversed: 'Tránh hối thúc đối phương đưa ra cam kết vội vã khi hai người chưa đủ thời gian thấu hiểu sâu sắc.',
    },
    dos: {
      upright: 'Sẵn sàng hành động nhanh; tập trung cao độ; bắt kịp nhịp điệu phát triển của thời cuộc.',
      reversed: 'Chủ động giảm tốc độ; kiểm tra kỹ thông tin hai chiều trước khi kết luận.',
    },
    donts: {
      upright: 'Không chần chừ bỏ lỡ thời khắc vàng đang mở ra.',
      reversed: 'Không đưa ra quyết định hệ trọng trong lúc tâm trạng đang gấp gáp, hoảng hốt.',
    },
  },

  WANDS_09_9: {
    cardCode: 'WANDS_09_9',
    nameVn: 'Chín Gậy (Nine of Wands)',
    keywords: ['Bền bỉ đến cùng', 'Kiên trì phòng thủ', 'Cảnh giác thận trọng', 'Vượt qua chặng cuối'],
    symbolism: 'Người lính bị thương quấn băng trên đầu đứng tựa vào cây gậy, sau lưng là hàng rào 8 cây gậy dựng đứng vững chắc. Ánh mắt cảnh giác nhưng kiên định.',
    uprightMeaning: 'Nine of Wands là biểu tượng của sức chịu đựng phi thường. Bạn đã trải qua nhiều thăng trầm và mệt mỏi, nhưng chỉ còn một thử thách cuối cùng để chạm tới vạch đích.',
    reversedMeaning: 'Nine of Wands ngược cảnh báo sự kiệt sức vì luôn trong trạng thái phòng thủ đa nghi, hoặc nguy cơ từ bỏ ngay trước ngưỡng cửa thành công.',
    careerFinance: {
      upright: 'Bảo vệ an toàn thành quả đã xây dựng; kiên nhẫn xử lý nốt các tồn đọng cuối cùng của dự án.',
      reversed: 'Cần nghỉ ngơi để phục hồi thể lực và tinh thần; đừng cố gượng ép bản thân quá giới hạn chịu đựng.',
    },
    loveRelationship: {
      upright: 'Vết thương lòng cũ khiến bạn có phần e dè, nhưng sự kiên nhẫn sẽ giúp tình yêu vượt qua giai đoạn thử thách này.',
      reversed: 'Học cách buông bỏ nỗi sợ bị phản bội; không thể xây dựng niềm tin nếu bạn luôn dựng bức tường ngăn cách.',
    },
    dos: {
      upright: 'Giữ vững niềm tin; bảo vệ thành quả; kiên trì nốt chặng đường cuối.',
      reversed: 'Cho phép mình được thả lỏng; nhờ cậy sự hỗ trợ từ những người đáng tin cậy.',
    },
    donts: {
      upright: 'Không buông tay từ bỏ khi chỉ còn cách đích vài bước chân.',
      reversed: 'Không nhìn đời qua lăng kính nghi kỵ và phòng thủ thái quá.',
    },
  },

  WANDS_10_10: {
    cardCode: 'WANDS_10_10',
    nameVn: 'Mười Gậy (Ten of Wands)',
    keywords: ['Gánh nặng quá tải', 'Áp lực trách nhiệm', 'Cần san sẻ', 'Về đích nặng nhọc'],
    symbolism: 'Người đàn ông còng lưng ôm trọn 10 cây gậy nặng nề tiến về phía thành phố phía xa. Tầm nhìn bị che khuất bởi khối lượng công việc quá đồ sộ.',
    uprightMeaning: 'Ten of Wands chỉ ra rằng bạn đang ôm đồm quá nhiều trách nhiệm vượt quá khả năng chịu đựng của một cá nhân. Bạn cần học cách ủy quyền và buông bớt gánh nặng.',
    reversedMeaning: 'Ten of Wands ngược phản ánh sự kiệt quệ hoàn toàn (burnout), hoặc ngược lại là thời điểm bạn quyết định giải phóng bản thân khỏi những nghĩa vụ không thuộc về mình.',
    careerFinance: {
      upright: 'Khối lượng công việc khổng lồ khiến bạn quá tải. Cần phân bổ lại nhiệm vụ cho cấp dưới hoặc đồng nghiệp.',
      reversed: 'Dũng cảm từ chối các yêu cầu vô lý; tái cấu trúc lại danh mục đầu tư để giải tỏa áp lực nợ nần.',
    },
    loveRelationship: {
      upright: 'Một mình bạn đang gánh vác việc vun vén mối quan hệ khiến bạn kiệt sức. Cần trò chuyện thẳng thắn với bạn đời.',
      reversed: 'Cùng nhau chia sẻ việc nhà và trách nhiệm tài chính; trút bỏ những kỳ vọng viển vông áp đặt lên nhau.',
    },
    dos: {
      upright: 'Học cách nói "Không"; ủy quyền cho người khác; xác định việc nào thật sự quan trọng nhất.',
      reversed: 'Buông bỏ những cam kết không còn phục vụ cho sự phát triển của bạn.',
    },
    donts: {
      upright: 'Không cố gắng làm người hùng ôm đồm mọi việc một mình.',
      reversed: 'Không tiếp tục chịu đựng sự bóc lột sức lao động hoặc tình cảm.',
    },
  },

  WANDS_11_PAGE: {
    cardCode: 'WANDS_11_PAGE',
    nameVn: 'Thị Tùng Gậy (Page of Wands)',
    keywords: ['Tin tức hào hứng', 'Tinh thần khám phá', 'Nhiệt huyết ban sơ', 'Thông điệp sáng tạo'],
    symbolism: 'Chàng trai trẻ đứng giữa sa mạc ngước nhìn cây gậy đang nảy lộc với niềm say mê và tò mò. Chiếc lông vũ đỏ trên mũ biểu thị ngọn lửa khát khao trải nghiệm.',
    uprightMeaning: 'Page of Wands mang đến những tin tức đầy hứa hẹn, cơ hội học hỏi kỹ năng mới hoặc sự thôi thúc bắt tay vào một cuộc phiêu lưu sáng tạo mới.',
    reversedMeaning: 'Page of Wands ngược chỉ sự nông nổi, cả thèm chóng chán, hoặc nhận được tin tức không như mong đợi khiến bạn hụt hẫng.',
    careerFinance: {
      upright: 'Một cơ hội thực tập, khóa đào tạo mới hoặc tin tức tích cực về dự án đang chờ duyệt.',
      reversed: 'Thiếu kiên trì khi gặp khó khăn ban đầu; tránh các quyết định bốc đồng theo cảm hứng nhất thời.',
    },
    loveRelationship: {
      upright: 'Giai đoạn hẹn hò tươi vui, những tin nhắn tán tỉnh dí dỏm và tinh thần cởi mở tìm hiểu.',
      reversed: 'Thiếu sự chín chắn và cam kết nghiêm túc; cẩn thận với những lời tán dương sáo rỗng.',
    },
    dos: {
      upright: 'Giữ tâm hồn tò mò học hỏi; cởi mở đón nhận thông tin mới; dám thử sức ở lĩnh vực mới.',
      reversed: 'Học cách theo đuổi một việc đến cùng trước khi chuyển sang sở thích khác.',
    },
    donts: {
      upright: 'Không để sự nhút nhát cản trở bạn bày tỏ ý tưởng mới.',
      reversed: 'Không huênh hoang về những kế hoạch mà bạn chưa hề bắt tay vào thực hiện.',
    },
  },

  WANDS_12_KNIGHT: {
    cardCode: 'WANDS_12_KNIGHT',
    nameVn: 'Hiệp Sĩ Gậy (Knight of Wands)',
    keywords: ['Hành động quyết liệt', 'Tiên phong dũng cảm', 'Đam mê bùng nổ', 'Tốc độ tiến công'],
    symbolism: 'Hiệp sĩ mặc giáp cưỡi tuấn mã đỏ rực đang tung vó phi nước đại. Áo choàng in hình kỳ nhông lửa tung bay trong gió, tay cầm gậy sẵn sàng lâm trận.',
    uprightMeaning: 'Knight of Wands là hiện thân của hành động táo bạo, sự tự tin tràn trề và năng lượng bứt phá. Bạn không ngại bất kỳ thử thách nào trên đường đi.',
    reversedMeaning: 'Knight of Wands ngược cảnh báo thói nóng nảy, hung hăng, hành động trước khi suy nghĩ hoặc sự thiếu kiên nhẫn phá hỏng kế hoạch.',
    careerFinance: {
      upright: 'Triển khai dự án quyết liệt; xung phong nhận địa bàn mới hoặc nhiệm vụ khó khăn với khí thế ngút trời.',
      reversed: 'Tránh tranh cãi gay gắt với sếp hoặc đối tác; không nên đầu tư mạo hiểm khi chưa đánh giá rủi ro.',
    },
    loveRelationship: {
      upright: 'Tình yêu cuồng nhiệt, lãng mạn và đầy những bất ngờ thú vị khiến con tim xao xuyến.',
      reversed: 'Đến nhanh đi vội; tính khí thất thường hoặc lời nói thiếu suy nghĩ làm tổn thương người thương.',
    },
    dos: {
      upright: 'Tận dụng đà tiến công; dũng cảm tiên phong; biến ý tưởng thành hành động thực tế.',
      reversed: 'Hãm phanh lại nhịp độ; kiểm soát cơn giận; suy xét hậu quả trước khi phát ngôn.',
    },
    donts: {
      upright: 'Không chùn bước trước những rào cản thông thường.',
      reversed: 'Không để tính hiếu thắng biến mình thành kẻ liều lĩnh vô trách nhiệm.',
    },
  },

  WANDS_13_QUEEN: {
    cardCode: 'WANDS_13_QUEEN',
    nameVn: 'Hoàng Hậu Gậy (Queen of Wands)',
    keywords: ['Tự tin quyến rũ', 'Hào sảng ấm áp', 'Độc lập quyết đoán', 'Truyền cảm hứng'],
    symbolism: 'Hoàng hậu ngồi ung dung trên ngai vàng khắc hình sư tử và hướng dương, tay cầm hoa hướng dương và cây gậy quyền uy. Chú mèo đen dưới chân biểu thị trực giác sắc bén và bản lĩnh làm chủ bóng tối nội tâm.',
    uprightMeaning: 'Queen of Wands đại diện cho sự tự tin rạng rỡ, lòng hào sảng, khả năng truyền cảm hứng và sự độc lập mạnh mẽ. Bạn tỏa ra sức hút tự nhiên khiến người khác nể phục.',
    reversedMeaning: 'Queen of Wands ngược cảnh báo tính đố kỵ, thích kiểm soát, thao túng hoặc cảm giác tự ti sâu kín cần được khỏa lấp bằng sự hung hăng bề ngoài.',
    careerFinance: {
      upright: 'Lãnh đạo đội nhóm bằng sự thấu hiểu và truyền lửa; quản lý tài chính thông minh và tự chủ.',
      reversed: 'Tránh can thiệp thô bạo vào công việc của người khác; học cách ủy quyền và tin tưởng đồng nghiệp.',
    },
    loveRelationship: {
      upright: 'Một tình yêu nồng nhiệt, chung thủy, cả hai tôn trọng sự độc lập của nhau và cùng nhau phát triển rực rỡ.',
      reversed: 'Ghen tuông vô cớ hoặc áp đặt ý muốn cá nhân lên người yêu. Cần cân bằng lại cảm xúc.',
    },
    dos: {
      upright: 'Tự tin vào sức hút của bản thân; lan tỏa năng lượng tích cực; sống hết mình với đam mê.',
      reversed: 'Nhìn nhận lại giá trị cốt lõi; rèn luyện sự khiêm nhường và lắng nghe chân thành.',
    },
    donts: {
      upright: 'Không nghi ngờ năng lực và phẩm giá cao quý của chính mình.',
      reversed: 'Không biến sự tự tin thành thói hách dịch và ích kỷ.',
    },
  },

  WANDS_14_KING: {
    cardCode: 'WANDS_14_KING',
    nameVn: 'Quốc Vương Gậy (King of Wands)',
    keywords: ['Lãnh đạo tầm nhìn', 'Ý chí kiên định', 'Kiến tạo thành tựu', 'Bản lĩnh chỉ huy'],
    symbolism: 'Vị vua ngồi vững chãi trên ngai vàng trang nghiêm, áo choàng rực rỡ in hình kỳ nhông cắn đuôi (biểu tượng của sự hoàn thiện chu kỳ). Ánh mắt nhìn xa trông rộng, tay cầm gậy quyền uy.',
    uprightMeaning: 'King of Wands là đỉnh cao của nguyên tố Lửa: người thủ lĩnh có tầm nhìn xa, quyết đoán, truyền cảm hứng và biến những khát vọng vĩ đại thành hiện thực bền vững.',
    reversedMeaning: 'King of Wands ngược cảnh báo xu hướng độc đoán, áp đặt chuyên quyền, hoặc thiếu kiên nhẫn khi người khác không theo kịp tốc độ của mình.',
    careerFinance: {
      upright: 'Dẫn dắt doanh nghiệp vượt qua giai đoạn then chốt; quyết sách đầu tư chuẩn xác; uy tín lãnh đạo được tôn kính.',
      reversed: 'Cần lắng nghe phản hồi từ cấp dưới; tránh đưa ra các quyết định độc đoán thiếu cơ sở thực tế.',
    },
    loveRelationship: {
      upright: 'Chỗ dựa vững chãi, người bảo bọc ấm áp và luôn khích lệ bạn đời phát huy tối đa tiềm năng cá nhân.',
      reversed: 'Thiếu sự lắng nghe mềm mỏng; mang phong cách chỉ huy từ công việc về áp đặt trong gia đình.',
    },
    dos: {
      upright: 'Kiên định với tầm nhìn dài hạn; truyền cảm hứng cho cấp dưới; làm gương trong hành động.',
      reversed: 'Lắng nghe ý kiến trái chiều với tâm thế cầu thị; tôn trọng nhịp độ của người khác.',
    },
    donts: {
      upright: 'Không dao động khi đã nắm rõ chiến lược đúng đắn.',
      reversed: 'Không lạm dụng quyền lực để chèn ép hay hạ thấp người khác.',
    },
  },

  // ══════════════════════════════════════════════════════════════════
  // BỘ CHÉN (SUIT OF CUPS) — NGUYÊN TỐ NƯỚC (CẢM XÚC, TÌNH YÊU, TRỰC GIÁC)
  // ══════════════════════════════════════════════════════════════════
  CUPS_01_ACE: {
    cardCode: 'CUPS_01_ACE',
    nameVn: 'Ách Chén (Ace of Cups)',
    keywords: ['Tình yêu tràn ngập', 'Khởi đầu cảm xúc', 'Trực giác thăng hoa', 'Chữa lành tâm hồn'],
    symbolism: 'Bàn tay đỡ chiếc chén thánh với năm dòng nước tuôn trào đại diện cho năm giác quan. Chim bồ câu trắng ngậm bánh thánh hạ xuống chiếc chén, biểu thị ơn phước thiêng liêng.',
    uprightMeaning: 'Ace of Cups xuôi là suối nguồn yêu thương dồi dào, sự thức tỉnh của lòng trắc ẩn và cơ hội kết nối tâm hồn sâu sắc.',
    reversedMeaning: 'Ace of Cups ngược cảnh báo sự tắc nghẽn cảm xúc, cạn kiệt năng lượng yêu thương bản thân hoặc nỗi sợ mở lòng vì những tổn thương cũ.',
    careerFinance: {
      upright: 'Môi trường làm việc chan hòa, công việc gắn liền với đam mê nghệ thuật hoặc chăm sóc người khác; trực giác tài chính nhạy bén.',
      reversed: 'Cần nạp lại năng lượng tinh thần; tránh để cảm xúc chủ quan chi phối các quyết định tiền bạc.',
    },
    loveRelationship: {
      upright: 'Khởi đầu một mối tình tuyệt đẹp, rung động con tim sâu sắc hoặc làm mới lại tình cảm vợ chồng đằm thắm.',
      reversed: 'Học cách yêu thương và tha thứ cho chính mình trước khi mong cầu người khác bù đắp tình cảm.',
    },
    dos: {
      upright: 'Mở rộng trái tim đón nhận yêu thương; tin vào tiếng nói trực giác; lan tỏa lòng nhân ái.',
      reversed: 'Dành không gian chữa lành nội tâm; thiết lập ranh giới cảm xúc an toàn.',
    },
    donts: {
      upright: 'Không kìm nén những cảm xúc chân thành đẹp đẽ.',
      reversed: 'Không trút bỏ tổn thương cũ lên người vô tội ở hiện tại.',
    },
  },

  CUPS_02_2: {
    cardCode: 'CUPS_02_2',
    nameVn: 'Hai Chén (Two of Cups)',
    keywords: ['Hòa hợp tâm hồn', 'Gắn kết lứa đôi', 'Hợp tác tin cậy', 'Tôn trọng lẫn nhau'],
    symbolism: 'Đôi nam nữ cùng nâng chén rượu trao nhau lời thề ước, phía trên là chiếc gậy thần Caduceus của Hermes biểu thị sự dung hòa đối cực và đầu sư tử có cánh bảo hộ tình yêu.',
    uprightMeaning: 'Two of Cups là biểu tượng tuyệt đẹp của tình yêu đôi lứa, sự hòa hợp chân thành và mối liên kết bình đẳng, tôn trọng giữa hai cá nhân.',
    reversedMeaning: 'Two of Cups ngược chỉ ra sự lệch pha, bất đồng quan điểm hoặc hiểu lầm làm rạn nứt sự gắn kết tin cậy giữa hai người.',
    careerFinance: {
      upright: 'Ký kết hợp đồng hợp tác thuận lợi; tìm được cộng sự ăn ý và cùng chung giá trị đạo đức nghề nghiệp.',
      reversed: 'Rà soát lại sự minh bạch trong hợp tác; tránh để thiên vị cảm tính ảnh hưởng đến công việc chung.',
    },
    loveRelationship: {
      upright: 'Tình yêu đẹp như mơ, sự thấu cảm không cần nói thành lời và cam kết gắn bó dài lâu.',
      reversed: 'Cần ngồi lại đối thoại chân thành; làm rõ những kỳ vọng chưa được nói ra giữa hai bên.',
    },
    dos: {
      upright: 'Tôn trọng sự bình đẳng; lắng nghe đối phương; xây dựng cầu nối thấu cảm.',
      reversed: 'Chủ động hàn gắn vết nứt; lắng nghe không phán xét để hiểu nguồn cơn mâu thuẫn.',
    },
    donts: {
      upright: 'Không để cái tôi cá nhân lấn át sự hòa hợp chung.',
      reversed: 'Không im lặng chịu đựng hoặc chiến tranh lạnh kéo dài.',
    },
  },

  CUPS_03_3: {
    cardCode: 'CUPS_03_3',
    nameVn: 'Ba Chén (Three of Cups)',
    keywords: ['Tình bạn tri kỷ', 'Ăn mừng sum họp', 'Hỗ trợ cộng đồng', 'Niềm vui chia sẻ'],
    symbolism: 'Ba thiếu nữ cùng nâng cao chén rượu chúc mừng giữa vườn nho và hoa trái trù phú, biểu thị sự đoàn kết, sẻ chia và niềm hạnh phúc tập thể.',
    uprightMeaning: 'Three of Cups biểu thị sự gắn kết bạn bè, những buổi gặp gỡ ấm áp, ăn mừng thành công cùng mạng lưới những người thân yêu quý mến.',
    reversedMeaning: 'Three of Cups ngược cảnh báo thói tiệc tùng quá đà, tin đồn thị phi trong hội nhóm hoặc cảm giác bị gạt ra ngoài lề tập thể.',
    careerFinance: {
      upright: 'Dự án nhóm hoàn thành xuất sắc; nhận được sự hỗ trợ nhiệt tình từ mạng lưới đồng nghiệp cũ.',
      reversed: 'Cẩn trọng với những chuyện bàn tán ngoài lề nơi công sở; tập trung vào chuyên môn.',
    },
    loveRelationship: {
      upright: 'Tình yêu thăng hoa trong sự chúc phúc của bạn bè; các buổi hẹn hò nhóm tràn ngập tiếng cười.',
      reversed: 'Đề phòng sự can thiệp thái quá của người thứ ba hoặc ý kiến thiếu tính xây dựng từ bạn bè.',
    },
    dos: {
      upright: 'Tham gia các buổi hội ngộ ý nghĩa; chia sẻ niềm vui với mọi người; trân trọng tình bạn.',
      reversed: 'Thiết lập ranh giới với các mối quan hệ độc hại; tránh xa các cuộc nói xấu sau lưng.',
    },
    donts: {
      upright: 'Không quên những người bạn đã giúp đỡ mình trong lúc khó khăn.',
      reversed: 'Không để những buổi tụ tập vô bổ làm sao nhãng mục tiêu cuộc đời.',
    },
  },

  CUPS_04_4: {
    cardCode: 'CUPS_04_4',
    nameVn: 'Bốn Chén (Four of Cups)',
    keywords: ['Thờ ơ lãnh đạm', 'Bỏ lỡ cơ hội', 'Tự chiêm nghiệm', 'Nhàm chán tâm lý'],
    symbolism: 'Chàng trai khoanh tay ngồi tựa gốc cây, mắt nhìn ba chiếc chén dưới đất với vẻ chán chường, không hề để ý tới chiếc chén thứ tư do bàn tay mây trao tặng ngay trước mặt.',
    uprightMeaning: 'Four of Cups phản ánh trạng thái chán nản, thờ ơ và bão hòa cảm xúc. Bạn đang quá tập trung vào những điều bất như ý mà bỏ lỡ cơ hội quý giá ngay cạnh mình.',
    reversedMeaning: 'Four of Cups ngược báo hiệu sự thức tỉnh: bạn bắt đầu nhận ra những điều tốt đẹp xung quanh, chấm dứt giai đoạn ủ rũ và sẵn sàng đón nhận cơ hội mới.',
    careerFinance: {
      upright: 'Cảm giác công việc hiện tại đơn điệu, mất phương hướng; cần tự tạo động lực mới thay vì than vãn.',
      reversed: 'Tìm lại niềm đam mê; nhìn thấy một lối đi mới trong dự án tưởng chừng bế tắc.',
    },
    loveRelationship: {
      upright: 'Cảm thấy người yêu có phần nhạt nhẽo hoặc từ chối các cơ hội làm quen vì vết thương lòng cũ.',
      reversed: 'Mở lòng đón nhận sự quan tâm của người khác; chủ động hâm nóng lại tình cảm lứa đôi.',
    },
    dos: {
      upright: 'Thay đổi góc nhìn; ghi nhận những phước lành đang có; ngẩng đầu nhìn cơ hội trước mắt.',
      reversed: 'Bước ra ngoài hít thở không khí mới; sẵn sàng đón nhận những lời mời hợp tác.',
    },
    donts: {
      upright: 'Không tự giam mình trong sự bất mãn và tiếc nuối vô cớ.',
      reversed: 'Không để thói quen ủ rũ làm tiêu tan những vận may đang tới.',
    },
  },

  CUPS_05_5: {
    cardCode: 'CUPS_05_5',
    nameVn: 'Năm Chén (Five of Cups)',
    keywords: ['Hối tiếc muộn màng', 'Nỗi buồn mất mát', 'Vẫn còn hy vọng', 'Chấp nhận buông bỏ'],
    symbolism: 'Nhân vật khoác áo choàng đen cúi đầu nhìn ba chiếc chén rượu bị đổ lênh láng. Nhưng sau lưng người đó, hai chiếc chén nguyên vẹn vẫn đứng sừng sững cạnh cây cầu dẫn về lâu đài.',
    uprightMeaning: 'Five of Cups biểu thị sự tiếc nuối, nỗi đau mất mát hoặc thất vọng. Tuy nhiên, lá bài nhắc nhở rằng bạn chưa mất tất cả: hai chiếc chén phía sau vẫn đang chờ bạn quay đầu.',
    reversedMeaning: 'Five of Cups ngược báo hiệu quá trình hồi phục tâm lý: bạn bắt đầu chấp nhận thực tế, tha thứ cho quá khứ và quay lưng bước qua cây cầu để tái thiết cuộc sống.',
    careerFinance: {
      upright: 'Thất bại trong một hợp đồng hoặc khoản đầu tư thua lỗ; hãy nhìn nhận đó như học phí của sự trưởng thành.',
      reversed: 'Rút ra bài học kinh nghiệm sâu sắc; bắt đầu xây dựng lại kế hoạch tài chính với sự cẩn trọng hơn.',
    },
    loveRelationship: {
      upright: 'Đau buồn sau chia tay hoặc thất vọng vì sự kỳ vọng quá lớn; hãy cho phép mình buồn nhưng đừng đắm chìm mãi.',
      reversed: 'Chữa lành vết thương lòng; sẵn sàng mở lòng cho một chặng đường tình cảm mới.',
    },
    dos: {
      upright: 'Chấp nhận cảm xúc buồn bã như một phần cuộc sống; quay lưng nhìn vào hai chiếc chén còn nguyên.',
      reversed: 'Bước qua cây cầu quá khứ; trân trọng những gì còn lại và xây dựng lại từ nền móng này.',
    },
    donts: {
      upright: 'Không để sự nuối tiếc quá khứ che mờ toàn bộ tương lai phía trước.',
      reversed: 'Không dằn vặt bản thân bằng những câu hỏi "Giá như...".',
    },
  },

  CUPS_06_6: {
    cardCode: 'CUPS_06_6',
    nameVn: 'Sáu Chén (Six of Cups)',
    keywords: ['Ký ức tuổi thơ', 'Hoài niệm ấm áp', 'Tái ngộ cố nhân', 'Sự hồn nhiên trong sáng'],
    symbolism: 'Cậu bé trao chiếc chén cắm đầy hoa trắng cho cô bé trong khoảng sân lâu đài cổ kính. Khung cảnh ngập tràn sự trong trẻo, hoài niệm và bình yên.',
    uprightMeaning: 'Six of Cups gợi lại những ký ức tuổi thơ tươi đẹp, sự gặp lại người xưa hoặc cảm giác được trở về với sự hồn nhiên, thuần khiết trong tâm hồn.',
    reversedMeaning: 'Six of Cups ngược cảnh báo việc đắm chìm quá mức trong quá khứ, từ chối trưởng thành hoặc những vướng mắc thời ấu thơ chưa được giải tỏa.',
    careerFinance: {
      upright: 'Một cơ hội từ đối tác cũ hoặc đồng nghiệp quen biết từ trước; công việc liên quan đến trẻ em, giáo dục hoặc di sản.',
      reversed: 'Cần nhìn về tương lai thay vì bám víu vào hào quang quá khứ; cập nhật kỹ năng mới.',
    },
    loveRelationship: {
      upright: 'Người yêu cũ liên lạc lại hoặc tình cảm hiện tại ngập tràn sự ngây thơ, chăm sóc dịu dàng như thuở ban đầu.',
      reversed: 'So sánh người hiện tại với hình bóng người cũ; cần thực tế hóa mối quan hệ hiện tại.',
    },
    dos: {
      upright: 'Trân trọng kỷ niệm đẹp; giữ tâm hồn trong sáng; giúp đỡ người khác bằng lòng vị tha.',
      reversed: 'Sống trọn vẹn trong hiện tại; giải quyết dứt điểm các vướng mắc tâm lý tuổi thơ.',
    },
    donts: {
      upright: 'Không sống mãi trong hoài niệm quá khứ.',
      reversed: 'Không để những tổn thương cũ định hình cách ứng xử hôm nay.',
    },
  },

  CUPS_07_7: {
    cardCode: 'CUPS_07_7',
    nameVn: 'Bảy Chén (Seven of Cups)',
    keywords: ['Ảo tưởng mê muội', 'Quá nhiều lựa chọn', 'Mơ mộng viển vông', 'Cần tỉnh táo thực tế'],
    symbolism: 'Bóng dáng người đàn ông đứng sững trước 7 chiếc chén bồng bềnh trong mây: lâu đài, châu báu, rắn độc, vòng nguyệt quế, đầu lâu... Ranh giới giữa ước mơ và cạm bẫy mong manh.',
    uprightMeaning: 'Seven of Cups cảnh báo bạn đang đứng trước quá nhiều lựa chọn nhưng phần lớn là ảo ảnh. Cần kéo mình về với thực tế trước khi đưa ra quyết định.',
    reversedMeaning: 'Seven of Cups ngược mang lại sự tỉnh táo sáng suốt: làn sương mù tan biến, bạn nhìn rõ đâu là cơ hội thực sự và đâu là mồi câu cạm bẫy.',
    careerFinance: {
      upright: 'Cảnh giác với các mô hình làm giàu nhanh hoặc lời hứa hoa mỹ; cần kiểm tra dữ liệu thực tế.',
      reversed: 'Chọn lọc mục tiêu trọng tâm; bắt tay vào thực hiện thay vì ngồi vẽ kế hoạch trên giấy.',
    },
    loveRelationship: {
      upright: 'Lý tưởng hóa đối phương quá mức dẫn đến vỡ mộng; hoặc phân vân giữa nhiều mối quan hệ mập mờ.',
      reversed: 'Nhìn nhận người yêu đúng với con người thật của họ; lựa chọn sự chân thành thay vì ảo mộng.',
    },
    dos: {
      upright: 'Đặt chân chạm đất; sàng lọc kỹ lưỡng; chỉ chọn 1 mục tiêu khả thi nhất.',
      reversed: 'Dứt khoát cắt bỏ những ảo tưởng; hành động dựa trên số liệu và sự thật khách quan.',
    },
    donts: {
      upright: 'Không quyết định khi đang trong trạng thái mơ màng hoặc bị kích động lòng tham.',
      reversed: 'Không tiếc nuối những chiếc bánh vẽ không có thật.',
    },
  },

  CUPS_08_8: {
    cardCode: 'CUPS_08_8',
    nameVn: 'Tám Chén (Eight of Cups)',
    keywords: ['Dũng cảm ra đi', 'Buông bỏ cái cũ', 'Tìm kiếm chân lý', 'Hành trình tâm linh'],
    symbolism: 'Người lữ khách chống gậy quay lưng bước đi trong đêm tối, bỏ lại sau lưng 8 chiếc chén được xếp ngay ngắn. Phía trước là đồi núi trắc trở và vầng trăng khuyết soi đường.',
    uprightMeaning: 'Eight of Cups là lá bài của sự buông bỏ có ý thức. Bạn nhận ra những thành tựu vật chất hay mối quan hệ hiện tại không còn đáp ứng được chiều sâu tâm hồn, và dũng cảm cất bước ra đi.',
    reversedMeaning: 'Eight of Cups ngược phản ánh sự sợ hãi không dám dứt khoát ra đi, dùng dằng trong một mối quan hệ hay công việc đã cạn kiệt ý nghĩa vì sợ cô đơn.',
    careerFinance: {
      upright: 'Quyết định nghỉ việc để theo đuổi lý tưởng đích thực; buông bỏ một dự án không còn giá trị.',
      reversed: 'Cố bám víu lấy một vị trí không mang lại tương lai; cần dũng cảm thừa nhận sự thật.',
    },
    loveRelationship: {
      upright: 'Chia tay trong hòa bình và tôn trọng vì nhận ra hai người không cùng chí hướng tâm hồn.',
      reversed: 'Níu kéo trong vô vọng; sợ bắt đầu lại một mình nên chấp nhận sự ngột ngạt quen thuộc.',
    },
    dos: {
      upright: 'Lắng nghe tiếng gọi sâu kín của tâm hồn; dũng cảm buông bỏ; bước đi trong thanh thản.',
      reversed: 'Nhìn thẳng vào sự thật; thà đau một lần ngắn hạn còn hơn chịu đựng sự bế tắc cả đời.',
    },
    donts: {
      upright: 'Không ngoái nhìn lại với sự nuối tiếc yếu mềm.',
      reversed: 'Không tự dối lòng rằng mọi chuyện sẽ tự động tốt lên nếu bạn không hành động.',
    },
  },

  CUPS_09_9: {
    cardCode: 'CUPS_09_9',
    nameVn: 'Chín Chén (Nine of Cups)',
    keywords: ['Ước nguyện thành tựu', 'Mãn nguyện hài lòng', 'Tận hưởng cuộc sống', 'Hạnh phúc trọn vẹn'],
    symbolism: 'Người đàn ông bệ vệ ngồi khoanh tay mỉm cười mãn nguyện trước chiếc bàn phủ vải xanh bày 9 chiếc chén lấp lánh. Lá bài của sự toại nguyện điều ước.',
    uprightMeaning: 'Nine of Cups là "lá bài ước nguyện" (Wish Card)! Những mong muốn thầm kín của bạn đang trở thành hiện thực, mang lại cảm giác thỏa mãn, sung túc và hân hoan.',
    reversedMeaning: 'Nine of Cups ngược cảnh báo thói tự mãn, hưởng thụ quá đà, hoặc cảm giác trống rỗng dù đã có đầy đủ tiện nghi vật chất bên ngoài.',
    careerFinance: {
      upright: 'Mục tiêu tài chính đạt được ngoạn mục; công việc ổn định mang lại thu nhập đáng mơ ước.',
      reversed: 'Tránh thói tiêu xài hoang phí để khỏa lấp khoảng trống tâm lý; giữ gìn lối sống lành mạnh.',
    },
    loveRelationship: {
      upright: 'Hạnh phúc viên mãn, sự hòa hợp về cả thể xác lẫn tinh thần; tình cảm ngọt ngào đáng trân trọng.',
      reversed: 'Cảnh giác với sự ích kỷ chỉ biết đến cảm xúc bản thân mà quên chăm sóc nhu cầu của bạn đời.',
    },
    dos: {
      upright: 'Tận hưởng thành quả xứng đáng; chia sẻ sự sung túc với người khác; biết ơn cuộc sống.',
      reversed: 'Tìm kiếm ý nghĩa sâu sắc hơn ngoài những thú vui vật chất nhất thời.',
    },
    donts: {
      upright: 'Không tự phụ hay coi thường những người chưa đạt được thành tựu.',
      reversed: 'Không chìm đắm vào các thói quen nghiện ngập để trốn tránh thực tại.',
    },
  },

  CUPS_10_10: {
    cardCode: 'CUPS_10_10',
    nameVn: 'Mười Chén (Ten of Cups)',
    keywords: ['Mái ấm viên mãn', 'Hạnh phúc gia đình', 'Bình an trọn vẹn', 'Gắn kết bền lâu'],
    symbolism: 'Đôi vợ chồng ôm nhau nhìn cầu vồng 10 chiếc chén tỏa sáng trên bầu trời xanh, hai đứa trẻ vui vẻ nhảy múa bên cạnh ngôi nhà bình yên giữa đồng cỏ xanh tươi.',
    uprightMeaning: 'Ten of Cups là đỉnh cao của hạnh phúc cảm xúc! Đại diện cho sự hòa thuận gia đình, tình yêu bền vững và cảm giác bình yên sâu sắc trong tổ ấm.',
    reversedMeaning: 'Ten of Cups ngược chỉ ra những rạn nứt trong gia đình, bất đồng quan điểm giữa các thế hệ hoặc cảm giác cô đơn ngay chính trong ngôi nhà của mình.',
    careerFinance: {
      upright: 'Cân bằng hoàn hảo giữa công việc và gia đình; môi trường công ty thân thiện, coi nhau như người nhà.',
      reversed: 'Áp lực công việc làm ảnh hưởng đến thời gian dành cho con cái và bạn đời.',
    },
    loveRelationship: {
      upright: 'Cái kết viên mãn cho một mối tình đẹp: hôn nhân hạnh phúc, gia đình ấm êm thuận hòa.',
      reversed: 'Cần dành thời gian hàn gắn mối quan hệ với người thân; giải quyết các mâu thuẫn âm ỉ.',
    },
    dos: {
      upright: 'Vun đắp tình cảm gia đình; trân trọng từng khoảnh khắc sum vầy; sống bao dung.',
      reversed: 'Lắng nghe tâm tư của các thành viên trong nhà; đặt gia đình lên vị trí ưu tiên hàng đầu.',
    },
    donts: {
      upright: 'Không xem nhẹ sự bình yên gia đình như một điều hiển nhiên.',
      reversed: 'Không mang sự căng thẳng bực dọc bên ngoài về trút lên người thân yêu.',
    },
  },

  CUPS_11_PAGE: {
    cardCode: 'CUPS_11_PAGE',
    nameVn: 'Thị Tùng Chén (Page of Cups)',
    keywords: ['Thông điệp yêu thương', 'Trực giác nhạy bén', 'Tâm hồn nghệ sĩ', 'Lời mời ngọt ngào'],
    symbolism: 'Chàng trai trẻ trong trang phục hoa lệ đứng bên bờ biển, mỉm cười nhìn chú cá nhỏ thò đầu ra từ chiếc chén trên tay. Biểu tượng của sự bất ngờ thú vị và trực giác kỳ diệu.',
    uprightMeaning: 'Page of Cups mang đến những tin tức tình cảm ngọt ngào, lời tỏ tình bất ngờ hoặc sự thức tỉnh năng khiếu nghệ thuật, trực giác tinh tế.',
    reversedMeaning: 'Page of Cups ngược cảnh báo tính đa sầu đa cảm, dễ bị tổn thương vì những chuyện vụn vặt, hoặc sự ngây thơ quá mức bị kẻ xấu lợi dụng.',
    careerFinance: {
      upright: 'Lời mời tham gia dự án sáng tạo; trực giác mách bảo giải pháp khéo léo cho vấn đề hóc búa.',
      reversed: 'Tránh để cảm xúc cá nhân làm xáo trộn công việc chuyên môn; rèn luyện thêm sự chín chắn.',
    },
    loveRelationship: {
      upright: 'Nhận được tin nhắn tỏ tình dễ thương, cử chỉ quan tâm ngọt ngào khiến trái tim rung động.',
      reversed: 'Hờn dỗi trẻ con hoặc thất vọng vì kỳ vọng người yêu phải như nhân vật tiểu thuyết.',
    },
    dos: {
      upright: 'Lắng nghe trực giác; bộc lộ cảm xúc chân thật; nuôi dưỡng năng khiếu nghệ thuật.',
      reversed: 'Rèn luyện khả năng kiểm soát cảm xúc; học cách tiếp nhận lời phê bình có tính xây dựng.',
    },
    donts: {
      upright: 'Không xấu hổ vì tâm hồn nhạy cảm của mình.',
      reversed: 'Không để sự nhõng nhẽo làm đối phương cảm thấy mệt mỏi.',
    },
  },

  CUPS_12_KNIGHT: {
    cardCode: 'CUPS_12_KNIGHT',
    nameVn: 'Hiệp Sĩ Chén (Knight of Cups)',
    keywords: ['Người tình lãng mạn', 'Sứ giả hòa bình', 'Theo đuổi ước mơ', 'Trái tim chân thành'],
    symbolism: 'Hiệp sĩ mặc giáp bạc cưỡi chú ngựa trắng điềm tĩnh bước qua dòng suối, tay nâng cao chiếc chén như một sứ giả mang thông điệp yêu thương và hòa bình.',
    uprightMeaning: 'Knight of Cups là hình mẫu người lãng mạn, tinh tế, luôn sống vì lý tưởng và sẵn sàng vượt ngàn dặm xa để mang lại hạnh phúc cho người mình yêu.',
    reversedMeaning: 'Knight of Cups ngược cảnh báo kẻ lừa tình ngọt ngào, người hay hứa nhưng không làm, hoặc sự trốn tránh thực tại vào thế giới ảo tưởng.',
    careerFinance: {
      upright: 'Giải quyết xung đột bằng phương pháp ngoại giao khéo léo; nhận được sự hỗ trợ từ một quý nhân tốt bụng.',
      reversed: 'Cảnh giác với những lời đề nghị quá hấp dẫn nhưng thiếu bảo chứng pháp lý rõ ràng.',
    },
    loveRelationship: {
      upright: 'Một chuyện tình lãng mạn như phim ảnh; sự quan tâm chu đáo và những lời yêu thương chân thành.',
      reversed: 'Người yêu có xu hướng thất thường, cả thèm chóng chán hoặc không dám đứng ra cam kết.',
    },
    dos: {
      upright: 'Thể hiện tình cảm tinh tế; sống đúng với lý tưởng cao đẹp; dùng sự dịu dàng hóa giải thù hằn.',
      reversed: 'Đối chiếu lời nói với hành động thực tế; đừng để sự ngọt ngào bên ngoài che lấp sự thật.',
    },
    donts: {
      upright: 'Không ngại ngần theo đuổi những giấc mơ thánh thiện.',
      reversed: 'Không trao trọn niềm tin cho những lời hứa đầu môi chót lưỡi.',
    },
  },

  CUPS_13_QUEEN: {
    cardCode: 'CUPS_13_QUEEN',
    nameVn: 'Hoàng Hậu Chén (Queen of Cups)',
    keywords: ['Thấu cảm bao la', 'Trực giác thấu suốt', 'Chữa lành xoa dịu', 'Người mẹ tinh thần'],
    symbolism: 'Hoàng hậu ngồi bên bờ biển với chiếc chén nắp đậy tinh xảo nhất bộ bài. Chân bà chạm vào mép nước nhưng không ướt, biểu thị khả năng kết nối sâu sắc với tiềm thức mà không bị cảm xúc nuốt chửng.',
    uprightMeaning: 'Queen of Cups là biểu tượng của lòng trắc ẩn, sự thấu cảm sâu sắc, khả năng lắng nghe và chữa lành vết thương lòng cho mọi người xung quanh.',
    reversedMeaning: 'Queen of Cups ngược cảnh báo tình trạng kiệt quệ cảm xúc vì ôm đồm nỗi đau của người khác, hoặc tâm trạng bất an dẫn đến thói thao túng cảm xúc.',
    careerFinance: {
      upright: 'Làm việc xuất sắc trong các ngành tâm lý, y tế, chăm sóc khách hàng hoặc nghệ thuật trực giác.',
      reversed: 'Cần phân định ranh giới giữa việc công và việc tư; tránh để cảm xúc chi phối nguyên tắc.',
    },
    loveRelationship: {
      upright: 'Tình yêu sâu sắc như biển cả, sự chở che dịu dàng và lòng chung thủy tuyệt đối.',
      reversed: 'Học cách nói rõ nhu cầu bản thân thay vì ấm ức chờ đợi đối phương tự đoán.',
    },
    dos: {
      upright: 'Lắng nghe bằng cả trái tim; tin vào trực giác thiêng liêng; bảo vệ sự an yên nội tại.',
      reversed: 'Bảo vệ nguồn năng lượng của chính mình; từ chối làm thùng rác cảm xúc cho người khác.',
    },
    donts: {
      upright: 'Không nghi ngờ giác quan thứ sáu nhạy bén của bạn.',
      reversed: 'Không để lòng tốt bị lợi dụng làm tổn hại đến sức khỏe tinh thần.',
    },
  },

  CUPS_14_KING: {
    cardCode: 'CUPS_14_KING',
    nameVn: 'Quốc Vương Chén (King of Cups)',
    keywords: ['Làm chủ cảm xúc', 'Trí tuệ thấu cảm', 'Điềm tĩnh khôn ngoan', 'Chỗ dựa tinh thần'],
    symbolism: 'Vị vua ngồi trên ngai vàng trôi giữa biển khơi dậy sóng nhưng chiếc ngai vẫn vững như bàn thạch. Tay cầm quyền trượng và chén thánh, ngực đeo mặt dây chuyền cá thần.',
    uprightMeaning: 'King of Cups đại diện cho sự làm chủ cảm xúc ở mức độ cao nhất: điềm tĩnh giữa tâm bão, giàu lòng trắc ẩn nhưng luôn giữ được sự sáng suốt và công tâm.',
    reversedMeaning: 'King of Cups ngược cảnh báo thói thao túng tâm lý tinh vi, cảm xúc bị kìm nén quá mức biến thành lạnh lùng cay độc, hoặc thói nghiện ngập.',
    careerFinance: {
      upright: 'Nhà lãnh đạo có EQ cao, thấu hiểu nhân viên và xử lý khủng hoảng truyền thông cực kỳ điềm tĩnh.',
      reversed: 'Tránh xa các trò thao túng chính trị nội bộ; giữ vững tính chính trực và minh bạch.',
    },
    loveRelationship: {
      upright: 'Người bạn đời lý tưởng: ấm áp, bao dung, chung thủy và là bến đỗ bình yên cho cả gia đình.',
      reversed: 'Cảnh giác với sự lạnh nhạt, đóng chặt cửa lòng hoặc dùng sự im lặng để trừng phạt bạn đời.',
    },
    dos: {
      upright: 'Cân bằng giữa lý trí và trái tim; điềm đạm trước nghịch cảnh; bao dung độ lượng.',
      reversed: 'Thành thật đối diện với cảm xúc thật của mình thay vì chôn chặt dưới đáy lòng.',
    },
    donts: {
      upright: 'Không để cơn giận làm mất đi phong độ điềm đạm vốn có.',
      reversed: 'Không dùng sự thấu hiểu tâm lý để trục lợi hay thao túng người yếu thế hơn.',
    },
  },

  // ══════════════════════════════════════════════════════════════════
  // BỘ KIẾM (SUIT OF SWORDS) — NGUYÊN TỐ KHÍ (TRÍ TUỆ, LÝ TRÍ, THÁCH THỨC)
  // ══════════════════════════════════════════════════════════════════
  SWORDS_01_ACE: {
    cardCode: 'SWORDS_01_ACE',
    nameVn: 'Ách Kiếm (Ace of Swords)',
    keywords: ['Sự thật sáng tỏ', 'Đột phá tư duy', 'Phán đoán sắc bén', 'Công lý phân minh'],
    symbolism: 'Bàn tay mây nắm chặt thanh kiếm hai lưỡi cắm qua vương miện kết lá nguyệt quế và cành cọ. Thanh kiếm của sự thật cắt đứt mọi ảo tưởng và dối trá.',
    uprightMeaning: 'Ace of Swords là tia chớp của sự thức tỉnh lý trí! Bạn nhìn thấu bản chất vấn đề, đưa ra phán đoán dứt khoát và đạt được bước đột phá tư duy quan trọng.',
    reversedMeaning: 'Ace of Swords ngược cảnh báo tư duy độc đoán, lời lẽ cay độc làm tổn thương người khác, hoặc thông tin bị sai lệch dẫn đến phán đoán sai lầm.',
    careerFinance: {
      upright: 'Ý tưởng đột phá, ký kết hợp đồng pháp lý minh bạch; đàm phán thành công nhờ lập luận sắc bén.',
      reversed: 'Xem xét kỹ các điều khoản pháp lý nhỏ nhất; tránh tranh chấp kiện tụng không cần thiết.',
    },
    loveRelationship: {
      upright: 'Nói rõ sự thật; thẳng thắn đối thoại để giải tỏa mọi nghi ngờ và hiểu lầm bấy lâu.',
      reversed: 'Lời nói sắc như dao làm rạn nứt tình cảm; cần uốn lưỡi trước khi nói trong lúc giận dữ.',
    },
    dos: {
      upright: 'Tìm kiếm sự thật khách quan; dứt khoát đưa ra quyết định; giữ vững sự chính trực.',
      reversed: 'Kiểm chứng lại thông tin; hạ nhiệt cái đầu trước khi phát ngôn.',
    },
    donts: {
      upright: 'Không thỏa hiệp với sự dối trá hay mập mờ.',
      reversed: 'Không dùng trí tuệ sắc bén để châm chọc hay hạ nhục đối phương.',
    },
  },

  SWORDS_02_2: {
    cardCode: 'SWORDS_02_2',
    nameVn: 'Hai Kiếm (Two of Swords)',
    keywords: ['Tiến thoái lưỡng nan', 'Bịt mắt phân vân', 'Bế tắc quyết định', 'Cần đối diện sự thật'],
    symbolism: 'Người phụ nữ bịt mắt ngồi trước biển đêm sóng êm, bắt chéo hai thanh kiếm nặng nề trước ngực. Trạng thái đình chiến mong manh khi từ chối nhìn nhận thực tế.',
    uprightMeaning: 'Two of Swords chỉ ra thế giằng co bế tắc: bạn đang đứng giữa hai lựa chọn khó khăn và cố tình bịt mắt trì hoãn quyết định vì sợ đối diện hậu quả.',
    reversedMeaning: 'Two of Swords ngược báo hiệu tấm băng bịt mắt được tháo bỏ: bạn buộc phải đối diện với sự thật và đưa ra quyết định dù đau đớn nhưng cần thiết.',
    careerFinance: {
      upright: 'Tạm thời đình chiến trong tranh chấp; cần thu thập thêm dữ kiện trước khi chọn ngã rẽ.',
      reversed: 'Không thể trì hoãn thêm nữa; dũng cảm chốt phương án và chịu trách nhiệm với lựa chọn.',
    },
    loveRelationship: {
      upright: 'Chiến tranh lạnh hoặc cả hai né tránh nhắc đến vấn đề nhạy cảm để giữ hòa khí giả tạo.',
      reversed: 'Thẳng thắn nhìn thẳng vào sự thật của mối quan hệ để cùng sửa chữa hoặc dừng lại.',
    },
    dos: {
      upright: 'Tháo bỏ băng bịt mắt; lắng nghe cả lý trí lẫn trực giác; chấp nhận đánh đổi.',
      reversed: 'Hành động dứt khoát chấm dứt sự lấp lửng; tiến về phía trước.',
    },
    donts: {
      upright: 'Không trốn tránh trách nhiệm lựa chọn bằng cách giả vờ không thấy.',
      reversed: 'Không để nỗi sợ hãi kéo dài tình trạng lấp lửng làm hao tổn sinh lực.',
    },
  },

  SWORDS_03_3: {
    cardCode: 'SWORDS_03_3',
    nameVn: 'Ba Kiếm (Three of Swords)',
    keywords: ['Nỗi đau tan vỡ', 'Tổn thương sâu sắc', 'Sự thật đau lòng', 'Bước qua giông bão'],
    symbolism: 'Trái tim bị ba thanh kiếm đâm xuyên qua giữa bầu trời mây đen vần vũ và mưa rơi xối xả. Biểu tượng kinh điển của nỗi đau khổ và sự tan vỡ.',
    uprightMeaning: 'Three of Swords xuất hiện khi bạn phải đối diện với nỗi đau mất mát, sự phản bội hoặc sự thật cay đắng. Nỗi đau là có thật nhưng nó giúp bạn nhìn rõ thực tế.',
    reversedMeaning: 'Three of Swords ngược báo hiệu quá trình chữa lành bắt đầu: cơn giông bão qua đi, bạn học cách tha thứ và rút thanh kiếm ra khỏi trái tim mình.',
    careerFinance: {
      upright: 'Thất vọng vì đối tác bội tín hoặc dự án tâm huyết bị bác bỏ; chấp nhận thất bại để làm lại.',
      reversed: 'Bắt đầu phục hồi sau khủng hoảng tài chính; thanh lọc các mối quan hệ làm ăn độc hại.',
    },
    loveRelationship: {
      upright: 'Tan vỡ, chia tay hoặc phát hiện sự dối lừa đau đớn; hãy cho phép mình khóc để giải tỏa.',
      reversed: 'Chữa lành vết thương lòng; tha thứ cho người cũ để giải phóng cho chính mình.',
    },
    dos: {
      upright: 'Chấp nhận nỗi đau như bài học trưởng thành; dành thời gian chăm sóc trái tim tổn thương.',
      reversed: 'Tập trung vào quá trình chữa lành; mở lòng đón nhận ánh nắng sau cơn mưa.',
    },
    donts: {
      upright: 'Không kìm nén nỗi đau khiến nó mưng mủ bên trong.',
      reversed: 'Không nuôi dưỡng lòng hận thù hay ý định trả đũa.',
    },
  },

  SWORDS_04_4: {
    cardCode: 'SWORDS_04_4',
    nameVn: 'Bốn Kiếm (Four of Swords)',
    keywords: ['Nghỉ ngơi hồi phục', 'Tĩnh dưỡng tinh thần', 'Tạm dừng hành động', 'Nạp lại năng lượng'],
    symbolism: 'Bức tượng hiệp sĩ nằm chắp tay tĩnh lặng trên lăng mộ trong nhà thờ, ba thanh kiếm treo trên tường và một thanh kiếm đặt bên cạnh. Cửa sổ kính màu chiếu ánh sáng bình an.',
    uprightMeaning: 'Four of Swords khuyên bạn cần dừng lại ngay lập tức để nghỉ ngơi và hồi phục. Bạn đã kiệt sức sau những trận chiến tinh thần và cần không gian tĩnh lặng.',
    reversedMeaning: 'Four of Swords ngược báo hiệu thời gian nghỉ dưỡng đã kết thúc: bạn đã nạp đủ năng lượng và chuẩn bị tái xuất giang hồ với tinh thần minh mẫn.',
    careerFinance: {
      upright: 'Nên xin nghỉ phép vài ngày để xả stress; tạm hoãn các quyết định đầu tư quan trọng.',
      reversed: 'Sẵn sàng quay trở lại công việc; các ý tưởng mới đã sẵn sàng để triển khai.',
    },
    loveRelationship: {
      upright: 'Cả hai cần cho nhau không gian riêng vài ngày để bình tâm sau những tranh cãi gay gắt.',
      reversed: 'Chấm dứt giai đoạn im lặng; sẵn sàng gặp mặt trò chuyện trên tinh thần hòa giải.',
    },
    dos: {
      upright: 'Ngủ đủ giấc; thiền định hoặc đi dạo nơi thiên nhiên; tắt điện thoại và các thông báo.',
      reversed: 'Từng bước bắt nhịp lại với cuộc sống; áp dụng những chiêm nghiệm vào thực tế.',
    },
    donts: {
      upright: 'Không cố gắng làm việc khi bộ não đang trong tình trạng quá tải nghiêm trọng.',
      reversed: 'Không chây lười kéo dài kỳ nghỉ khi thời điểm hành động đã tới.',
    },
  },

  SWORDS_05_5: {
    cardCode: 'SWORDS_05_5',
    nameVn: 'Năm Kiếm (Five of Swords)',
    keywords: ['Thắng trận mất bạn', 'Chiến thắng cay đắng', 'Xung đột cái tôi', 'Rút lui bảo toàn'],
    symbolism: 'Chàng trai nhặt ba thanh kiếm với nụ cười tự mãn, nhìn hai đối thủ thất bại đang lầm lũi quay lưng bước đi trong gió lộng và mây xám xịt.',
    uprightMeaning: 'Five of Swords cảnh báo một "chiến thắng kiểu Pyrrhus": bạn có thể thắng trong cuộc tranh cãi nhưng đánh mất lòng tin và tình cảm của người khác. Cái tôi quá lớn đã gây tổn hại.',
    reversedMeaning: 'Five of Swords ngược phản ánh sự mệt mỏi với những cuộc chiến vô nghĩa: bạn sẵn sàng buông bỏ sự hiếu thắng để lập lại hòa bình, hoặc nhận ra bộ mặt thật của kẻ tiểu nhân.',
    careerFinance: {
      upright: 'Môi trường làm việc độc hại đầy mưu mô; thắng một vụ kiện nhưng chi phí bỏ ra quá lớn.',
      reversed: 'Rút lui khỏi các cuộc cạnh tranh không lành mạnh; hòa giải các tranh chấp nội bộ.',
    },
    loveRelationship: {
      upright: 'Cố chấp tranh cãi để giành phần thắng khiến người yêu tổn thương sâu sắc; thắng lý lẽ nhưng thua tình cảm.',
      reversed: 'Hạ cái tôi xuống; nói lời xin lỗi chân thành để cứu vãn mối quan hệ.',
    },
    dos: {
      upright: 'Chọn sự bình yên thay vì cố chứng minh mình đúng; biết điểm dừng trong tranh luận.',
      reversed: 'Chủ động làm hòa; rút ra bài học về cái giá của sự hiếu thắng.',
    },
    donts: {
      upright: 'Không chà đạp lên lòng tự trọng của người khác chỉ để thỏa mãn cái tôi.',
      reversed: 'Không tiếp tục dính líu vào các cuộc đấu đá nội bộ không hồi kết.',
    },
  },

  SWORDS_06_6: {
    cardCode: 'SWORDS_06_6',
    nameVn: 'Sáu Kiếm (Six of Swords)',
    keywords: ['Chuyển đến bến đỗ bình yên', 'Vượt qua sóng gió', 'Hành trình hồi phục', 'Buông bỏ gánh nặng'],
    symbolism: 'Người lái đò chở người phụ nữ và đứa trẻ qua vùng nước lặng hướng về bờ bên kia, trên thuyền cắm 6 thanh kiếm. Phía sau là vùng nước gợn sóng gió, phía trước là mặt nước phẳng lặng.',
    uprightMeaning: 'Six of Swords báo hiệu bạn đang rời xa vùng nước xoáy giông bão để tiến về bến bờ bình yên hơn. Giai đoạn khó khăn nhất đã ở lại sau lưng.',
    reversedMeaning: 'Six of Swords ngược cảnh báo sự chậm trễ trong việc chuyển dịch, cảm giác quá khứ vẫn níu chân bạn lại hoặc cố chấp mang theo những tổn thương cũ sang môi trường mới.',
    careerFinance: {
      upright: 'Chuyển công tác, đổi môi trường làm việc sang nơi chuyên nghiệp và ít áp lực hơn; tài chính dần ổn định.',
      reversed: 'Vướng mắc thủ tục chuyển nhượng hoặc khó thích nghi với môi trường mới do còn luyến tiếc nơi cũ.',
    },
    loveRelationship: {
      upright: 'Cùng nhau vượt qua sóng gió; tình cảm dần hồi phục và tìm lại sự êm đềm cần có.',
      reversed: 'Những khúc mắc cũ chưa được giải quyết triệt để vẫn âm thầm gây sóng gió.',
    },
    dos: {
      upright: 'Tiến về phía trước; tin tưởng vào tương lai tươi sáng; để quá khứ ngủ yên.',
      reversed: 'Giải quyết dứt điểm các vướng mắc tồn đọng trước khi bắt đầu hành trình mới.',
    },
    donts: {
      upright: 'Không quay đầu nhìn lại những điều tiêu cực đã qua.',
      reversed: 'Không mang theo những định kiến cũ vào hoàn cảnh mới.',
    },
  },

  SWORDS_07_7: {
    cardCode: 'SWORDS_07_7',
    nameVn: 'Bảy Kiếm (Seven of Swords)',
    keywords: ['Hành động lén lút', 'Chiến lược khôn khéo', 'Nguy cơ bị lừa dối', 'Cần thận trọng'],
    symbolism: 'Kẻ đột nhập rón rén ôm 5 thanh kiếm chuồn khỏi doanh trại đối phương, để lại 2 thanh kiếm cắm trên đất. Ánh mắt lấm lét nhìn lại phía sau.',
    uprightMeaning: 'Seven of Swords cảnh báo sự thiếu trung thực, hành vi lén lút hoặc nguy cơ bị phản bội. Ở khía cạnh tích cực, lá bài khuyên bạn nên dùng mưu lược khôn khéo thay vì đối đầu trực diện.',
    reversedMeaning: 'Seven of Swords ngược báo hiệu sự thật bị phơi bày: những bí mật giấu kín bị lộ ra ánh sáng, hoặc lương tâm thôi thúc bạn phải thành thật nhận lỗi.',
    careerFinance: {
      upright: 'Bảo mật thông tin dự án cẩn mật; cảnh giác với gián điệp thương mại hoặc vi phạm bản quyền.',
      reversed: 'Thành thật khai báo sai sót; minh bạch hóa toàn bộ sổ sách tài chính.',
    },
    loveRelationship: {
      upright: 'Nguy cơ có sự giấu giếm, nói dối hoặc mối quan hệ mập mờ sau lưng bạn đời.',
      reversed: 'Sự thật sáng tỏ; thời điểm đối chất thẳng thắn để làm sạch mối quan hệ.',
    },
    dos: {
      upright: 'Bảo vệ quyền sở hữu trí tuệ; giữ kín kế hoạch quan trọng; kiểm tra lại độ tin cậy của nhân sự.',
      reversed: 'Dũng cảm nhận lỗi nếu bạn đã lỡ làm điều sai trái; sống chính trực.',
    },
    donts: {
      upright: 'Không dùng chiêu trò mờ ám để đạt được mục đích.',
      reversed: 'Không tiếp tục dối trá để khỏa lấp một lời nói dối trước đó.',
    },
  },

  SWORDS_08_8: {
    cardCode: 'SWORDS_08_8',
    nameVn: 'Tám Kiếm (Eight of Swords)',
    keywords: ['Cạm bẫy tâm lý', 'Tự trói buộc', 'Cảm giác bất lực', 'Lối thoát trong tầm tay'],
    symbolism: 'Người phụ nữ bị trói lỏng và bịt mắt đứng giữa vòng vây 8 thanh kiếm cắm trên bùn lầy. Dây trói thực chất rất lỏng và các thanh kiếm không hề khép kín: lối thoát vẫn mở nếu cô dám mở mắt.',
    uprightMeaning: 'Eight of Swords phản ánh trạng thái "tù nhân của tâm trí": bạn cảm thấy bất lực và bế tắc, nhưng thực chất chính nỗi sợ và niềm tin giới hạn của bản thân đang tự trói buộc bạn.',
    reversedMeaning: 'Eight of Swords ngược báo hiệu sự thức tỉnh: bạn nhận ra mình có toàn quyền tháo bỏ dây trói, dũng cảm mở mắt và bước ra khỏi chiếc lồng tâm lý kìm kẹp bấy lâu.',
    careerFinance: {
      upright: 'Cảm giác mắc kẹt trong công việc chán ngắt nhưng sợ không dám nhảy việc vì sợ thất nghiệp.',
      reversed: 'Nhìn thấy cơ hội việc làm mới; tự tin bước ra khỏi giới hạn bản thân đặt ra.',
    },
    loveRelationship: {
      upright: 'Cảm giác bị phụ thuộc và ngột ngạt trong mối quan hệ độc hại nhưng không dám bước đi.',
      reversed: 'Tìm lại sự tự chủ; dứt khoát chấm dứt sự phụ thuộc cảm xúc không lành mạnh.',
    },
    dos: {
      upright: 'Nhận diện các niềm tin giới hạn; hiểu rằng bạn luôn có quyền lựa chọn; tháo bỏ sợi dây sợ hãi.',
      reversed: 'Từng bước bước ra ngoài; tìm kiếm sự giúp đỡ từ chuyên gia tâm lý hoặc bạn bè đáng tin cậy.',
    },
    donts: {
      upright: 'Không đóng vai nạn nhân bất lực trước hoàn cảnh.',
      reversed: 'Không tiếp tục tin vào những suy nghĩ tự hạ thấp năng lực của mình.',
    },
  },

  SWORDS_09_9: {
    cardCode: 'SWORDS_09_9',
    nameVn: 'Chín Kiếm (Nine of Swords)',
    keywords: ['Ác mộng đêm khuya', 'Âu lo tột cùng', 'Mặc cảm tội lỗi', 'Nỗi sợ phóng đại'],
    symbolism: 'Người phụ nữ ngồi bật dậy trên giường ôm mặt khóc trong đêm tối, phía trên là 9 thanh kiếm treo song song đen tối. Chiếc mền thêu hoa hồng và cung hoàng đạo biểu thị sự thật cuộc sống vẫn đẹp nếu gạt bỏ âu lo.',
    uprightMeaning: 'Nine of Swords là lá bài của sự lo âu, mất ngủ và dày vò tâm trí. Phần lớn những nỗi kinh hoàng bạn tưởng tượng ra đều tồi tệ hơn nhiều so với thực tế khách quan.',
    reversedMeaning: 'Nine of Swords ngược báo hiệu ánh bình minh xua tan bóng tối: bạn nhận ra nỗi lo lắng là vô căn cứ, tìm lại được giấc ngủ ngon và sự bình an trong tâm hồn.',
    careerFinance: {
      upright: 'Stress tột độ vì áp lực deadline hoặc nợ nần; cần chia nhỏ vấn đề để giải quyết thay vì ngồi hoảng loạn.',
      reversed: 'Tìm ra giải pháp thiết thực cho vấn đề tài chính; áp lực tâm lý được giải tỏa.',
    },
    loveRelationship: {
      upright: 'Nỗi sợ bị bỏ rơi hoặc cảm giác tội lỗi dày vò; hãy tâm sự với người yêu thay vì gặm nhấm nỗi sợ một mình.',
      reversed: 'Mở lòng chia sẻ nỗi niềm; đối phương thấu hiểu và cùng bạn tháo gỡ khúc mắc.',
    },
    dos: {
      upright: 'Thực hành các bài tập thở; phân biệt rõ giữa "sự thật khách quan" và "nỗi sợ tưởng tượng".',
      reversed: 'Tìm kiếm sự tư vấn chuyên môn; giải tỏa năng lượng tiêu cực qua vận động thể chất.',
    },
    donts: {
      upright: 'Không suy nghĩ tiêu cực một mình vào đêm muộn.',
      reversed: 'Không tự hành hạ bản thân vì những sai lầm đã qua trong quá khứ.',
    },
  },

  SWORDS_10_10: {
    cardCode: 'SWORDS_10_10',
    nameVn: 'Mười Kiếm (Ten of Swords)',
    keywords: ['Chạm đáy nỗi đau', 'Chấm dứt hoàn toàn', 'Bình minh đang lên', 'Không thể tệ hơn nữa'],
    symbolism: 'Người đàn ông nằm sấp trên mặt đất bị 10 thanh kiếm cắm vào lưng, tấm vải đỏ phủ kín phần thân. Nhưng ở đường chân trời xa xôi, bầu trời đêm đen đang nhường chỗ cho ánh bình minh vàng rực.',
    uprightMeaning: 'Ten of Swords báo hiệu cái kết dứt điểm cho một chu kỳ đau đớn. Bạn đã chạm đáy của khó khăn — và tin vui là: một khi đã ở đáy vực, hướng đi duy nhất còn lại là đi lên!',
    reversedMeaning: 'Ten of Swords ngược báo hiệu sự hồi sinh thần kỳ sau biến cố tưởng chừng quật ngã bạn: vết thương bắt đầu lành lại và bạn đứng dậy mạnh mẽ hơn bao giờ hết.',
    careerFinance: {
      upright: 'Dự án thất bại hoàn toàn hoặc bị sa thải đột ngột; chấp nhận cái kết này để mở ra chương mới hoàn toàn.',
      reversed: 'Thoát khỏi khủng hoảng phá sản trong gang tấc; tái cấu trúc lại toàn bộ từ đống tro tàn.',
    },
    loveRelationship: {
      upright: 'Mối quan hệ tan vỡ dứt điểm không thể cứu vãn; hãy chấp nhận sự thật để giải thoát cho nhau.',
      reversed: 'Bắt đầu hồi phục sau chấn thương tâm lý; ánh sáng tình yêu nhen nhóm trở lại.',
    },
    dos: {
      upright: 'Chấp nhận buông bỏ hoàn toàn; để chu kỳ cũ khép lại dứt điểm; ngẩng đầu nhìn ánh bình minh.',
      reversed: 'Từng bước gượng dậy; tin vào sức sống mãnh liệt của bản thân; học bài học tái sinh.',
    },
    donts: {
      upright: 'Không cố gắng níu kéo một cái xác chết không còn sinh khí.',
      reversed: 'Không sợ hãi tương lai; bạn đã vượt qua điều tồi tệ nhất rồi.',
    },
  },

  SWORDS_11_PAGE: {
    cardCode: 'SWORDS_11_PAGE',
    nameVn: 'Thị Tùng Kiếm (Page of Swords)',
    keywords: ['Tò mò sắc sảo', 'Thu thập thông tin', 'Cảnh giác nhạy bén', 'Phát ngôn thẳng thắn'],
    symbolism: 'Chàng trai trẻ đứng trên mỏm đất cao, hai tay cầm chắc thanh kiếm giơ cao trong tư thế phòng thủ cảnh giác. Gió mạnh thổi tung mái tóc và những đàn chim bay lượn trên bầu trời.',
    uprightMeaning: 'Page of Swords mang năng lượng trí tuệ nhanh nhạy, tính tò mò muốn tìm hiểu ngọn ngành sự thật và sự thẳng thắn không ngại va chạm.',
    reversedMeaning: 'Page of Swords ngược cảnh báo thói soi mói đời tư người khác, tin đồn thất thiệt, hoặc phát ngôn bốc đồng thiếu suy nghĩ gây tranh cãi.',
    careerFinance: {
      upright: 'Nghiên cứu thị trường sâu sát; học hỏi công nghệ mới rất nhanh; phát hiện ra lỗi sai trong hợp đồng.',
      reversed: 'Tránh bàn tán chuyện người khác nơi công sở; cẩn thận bảo mật tài khoản cá nhân.',
    },
    loveRelationship: {
      upright: 'Giao tiếp thông minh, các cuộc tranh luận trí tuệ hào hứng nhưng cần thêm sự dịu dàng.',
      reversed: 'Thói ghen tuông soi mói tin nhắn, điện thoại của đối phương làm xói mòn lòng tin.',
    },
    dos: {
      upright: 'Đặt câu hỏi phản biện sắc sảo; kiểm chứng thông tin đa chiều; bảo vệ chính kiến.',
      reversed: 'Học cách nói năng khéo léo; tôn trọng quyền riêng tư của người khác.',
    },
    donts: {
      upright: 'Không tin ngay những tin đồn chưa được kiểm chứng.',
      reversed: 'Không dùng lời lẽ châm chọc để thể hiện sự thông minh của mình.',
    },
  },

  SWORDS_12_KNIGHT: {
    cardCode: 'SWORDS_12_KNIGHT',
    nameVn: 'Hiệp Sĩ Kiếm (Knight of Swords)',
    keywords: ['Tiến công chớp nhoáng', 'Quyết đoán sắc lạnh', 'Trí tuệ hành động', 'Không ngại va chạm'],
    symbolism: 'Hiệp sĩ cưỡi ngựa chiến phi nước đại xé toang giông bão, tay cầm thanh kiếm vung thẳng về phía trước. Cơn cuồng phong và những đám mây rách nát biểu thị sự dữ dội của tư duy hành động.',
    uprightMeaning: 'Knight of Swords là hiện thân của sự quyết đoán, logic sắc bén và tốc độ xử lý vấn đề chớp nhoáng. Khi đã xác định mục tiêu, bạn lao thẳng tới không chần chừ.',
    reversedMeaning: 'Knight of Swords ngược cảnh báo sự hung hăng, lời nói cay độc tàn nhẫn, hành động thiếu cân nhắc hậu quả khiến người xung quanh khiếp sợ.',
    careerFinance: {
      upright: 'Giải quyết khủng hoảng cực kỳ dứt khoát; đàm phán sắc bén đánh bật đối thủ cạnh tranh.',
      reversed: 'Tránh các cuộc đối đầu nảy lửa nơi làm việc; kiểm soát thái độ kiêu ngạo coi thường người khác.',
    },
    loveRelationship: {
      upright: 'Thẳng thắn giải quyết dứt điểm các vướng mắc; không thích sự vòng vo mập mờ.',
      reversed: 'Lời nói cay nghiệt trong lúc nóng giận có thể để lại vết sẹo khó phai trong lòng người yêu.',
    },
    dos: {
      upright: 'Hành động nhanh chóng và chính xác; dùng lý trí phân tích tình hình; bảo vệ sự thật.',
      reversed: 'Hạ giọng khi giao tiếp; học cách đồng cảm với cảm xúc của người đối diện.',
    },
    donts: {
      upright: 'Không để sự do dự làm lỡ thời cơ vàng.',
      reversed: 'Không đao to búa lớn giẫm đạp lên cảm xúc của người khác.',
    },
  },

  SWORDS_13_QUEEN: {
    cardCode: 'SWORDS_13_QUEEN',
    nameVn: 'Hoàng Hậu Kiếm (Queen of Swords)',
    keywords: ['Trí tuệ minh triết', 'Ranh giới rõ ràng', 'Nhìn thấu bản chất', 'Độc lập kiên cường'],
    symbolism: 'Hoàng hậu ngồi nghiêng trên ngai vàng chạm khắc thiên thần, một tay giơ thẳng thanh kiếm sắc lẹm, tay kia vươn ra như sẵn sàng lắng nghe sự thật. Ánh mắt nghiêm nghị thấu thị.',
    uprightMeaning: 'Queen of Swords là biểu tượng của trí tuệ sắc bén, sự công bằng liêm chính và khả năng thiết lập ranh giới cá nhân chuẩn mực. Bà không dễ bị lừa bởi những lời đường mật.',
    reversedMeaning: 'Queen of Swords ngược cảnh báo sự cay độc, cay nghiệt, đóng chặt trái tim vì những tổn thương cũ biến thành người lạnh lùng tàn nhẫn.',
    careerFinance: {
      upright: 'Phán đoán kinh doanh chuẩn xác; quản lý công bằng và minh bạch; chuyên gia giải quyết vấn đề phức tạp.',
      reversed: 'Tránh phê bình cấp dưới quá khắt khe; cần kết hợp giữa kỷ luật và sự động viên ấm áp.',
    },
    loveRelationship: {
      upright: 'Mối quan hệ dựa trên sự tôn trọng trí tuệ lẫn nhau, thẳng thắn và không có chỗ cho sự dối trá.',
      reversed: 'Sự lạnh lùng và cảnh giác thái quá đẩy đối phương ra xa; cần cho phép mình được yếu mềm đôi lúc.',
    },
    dos: {
      upright: 'Thiết lập ranh giới rõ ràng; nói sự thật với lòng trắc ẩn; giữ vững sự độc lập tự chủ.',
      reversed: 'Mở lòng đón nhận sự ấm áp; buông bỏ lớp áo giáp gai góc phòng thủ.',
    },
    donts: {
      upright: 'Không để tình cảm mù quáng chi phối phán đoán đạo đức.',
      reversed: 'Không dùng sự sắc sảo của mình để làm tổn thương người khác.',
    },
  },

  SWORDS_14_KING: {
    cardCode: 'SWORDS_14_KING',
    nameVn: 'Quốc Vương Kiếm (King of Swords)',
    keywords: ['Quyền uy trí tuệ', 'Công lý tối thượng', 'Phán xét công minh', 'Lãnh đạo bằng chân lý'],
    symbolism: 'Vị vua ngồi chính diện trên ngai vàng cao ngất, tay phải cầm thẳng thanh kiếm công lý hướng lên trời. Phía sau là bầu trời quang đãng, biểu thị trí tuệ đã quét sạch mọi mây mù u tối.',
    uprightMeaning: 'King of Swords là đỉnh cao của tư duy duy lý: thẩm phán tối cao, nhà tư tưởng lỗi lạc và người lãnh đạo công minh, luôn hành động dựa trên nguyên tắc và pháp luật.',
    reversedMeaning: 'King of Swords ngược cảnh báo sự tàn bạo, độc tài lý trí, sử dụng luật lệ cứng nhắc để đàn áp người khác hoặc thao túng thông tin vì mục đích xấu.',
    careerFinance: {
      upright: 'Đưa ra phán quyết chuẩn xác trong tranh chấp pháp lý; tư vấn chiến lược cấp cao; uy tín chuyên môn tuyệt đối.',
      reversed: 'Tránh lạm dụng quyền lực hoặc cố chấp áp đặt quan điểm chủ quan lên tập thể.',
    },
    loveRelationship: {
      upright: 'Mối quan hệ chín chắn, tôn trọng cam kết và giải quyết mâu thuẫn bằng đối thoại văn minh.',
      reversed: 'Thiếu sự ấm áp và lãng mạn; biến gia đình thành phòng xử án với những quy định ngột ngạt.',
    },
    dos: {
      upright: 'Hành động theo đạo đức và pháp lý; giữ tâm thế khách quan vô tư; bảo vệ lẽ phải.',
      reversed: 'Bổ sung thêm lòng trắc ẩn vào các quyết định; lắng nghe tiếng nói trái tim.',
    },
    donts: {
      upright: 'Không để sự thiên vị làm lệch cán cân công lý.',
      reversed: 'Không biến trí tuệ thành công cụ bạo lực tinh thần đối với người thân.',
    },
  },

  // ══════════════════════════════════════════════════════════════════
  // BỘ TIỀN (SUIT OF PENTACLES) — NGUYÊN TỐ ĐẤT (VẬT CHẤT, TÀI CHÍNH, SỰ BỀN VỮNG)
  // ══════════════════════════════════════════════════════════════════
  PENTACLES_01_ACE: {
    cardCode: 'PENTACLES_01_ACE',
    nameVn: 'Ách Tiền (Ace of Pentacles)',
    keywords: ['Cơ hội tài chính', 'Nền tảng vững chắc', 'Thành tựu vật chất', 'Hạt mầm trù phú'],
    symbolism: 'Bàn tay mây nâng đỡ đồng tiền vàng rực rỡ lơ lửng trên khu vườn hoa hồng và bách hợp ngát hương, dẫn lối qua cổng vòm nhìn ra dãy núi vững chãi.',
    uprightMeaning: 'Ace of Pentacles là hạt mầm vàng của sự thịnh vượng! Một cơ hội kiếm tiền thực tế, lời mời đầu tư sinh lời hoặc nền tảng vững chắc để xây dựng tương lai an cư lạc nghiệp.',
    reversedMeaning: 'Ace of Pentacles ngược cảnh báo cơ hội tài chính bị bỏ lỡ, đầu tư thiếu cẩn trọng dẫn đến thua lỗ, hoặc thói tham lam bám víu vật chất quá mức.',
    careerFinance: {
      upright: 'Nhận được việc làm mới với đãi ngộ tốt; khởi đầu dự án kinh doanh có tiềm năng sinh lời thực tế cao.',
      reversed: 'Tránh các khoản đầu tư mạo hiểm; quản lý chi tiêu chặt chẽ phòng ngừa rủi ro thiếu hụt dòng tiền.',
    },
    loveRelationship: {
      upright: 'Mối quan hệ mang lại cảm giác an toàn, vững bền; cùng nhau xây dựng nền tảng kinh tế cho tương lai.',
      reversed: 'Tranh cãi về tiền bạc hoặc quá chú trọng vật chất làm nhạt nhòa tình cảm chân thành.',
    },
    dos: {
      upright: 'Nắm bắt cơ hội thực tế; gieo hạt mầm kiên nhẫn; xây dựng nền móng từng bước vững vàng.',
      reversed: 'Rà soát lại kế hoạch ngân sách; kiên nhẫn tích lũy thay vì tìm đường tắt làm giàu nhanh.',
    },
    donts: {
      upright: 'Không phung phí hạt giống vàng vào những dự án viển vông.',
      reversed: 'Không để nỗi sợ nghèo khó biến mình thành kẻ bủn xỉn, keo kiệt.',
    },
  },

  PENTACLES_02_2: {
    cardCode: 'PENTACLES_02_2',
    nameVn: 'Hai Tiền (Two of Pentacles)',
    keywords: ['Cân bằng linh hoạt', 'Đa nhiệm khéo léo', 'Thích ứng biến động', 'Quản lý dòng tiền'],
    symbolism: 'Chàng trai uyển chuyển tung hứng hai đồng tiền vàng nằm trong dải băng vô cực (Infinity), phía sau là những con tàu đang nhấp nhô lướt trên sóng biển trập trùng.',
    uprightMeaning: 'Two of Pentacles biểu thị sự linh hoạt trong quản lý tài chính và công việc: bạn đang xoay sở khéo léo giữa nhiều trách nhiệm và thích ứng tốt với sự biến động.',
    reversedMeaning: 'Two of Pentacles ngược cảnh báo sự mất cân bằng, quá tải tài chính hoặc xoay sở vụng về khiến một trong hai quả bóng rơi xuống đất vỡ tan.',
    careerFinance: {
      upright: 'Quản lý dòng tiền linh hoạt; làm tốt hai công việc cùng lúc; thích ứng nhanh với thị trường.',
      reversed: 'Nợ nần chồng chất vì vay mượn chỗ nọ đập chỗ kia; cần cắt giảm bớt các đầu việc phụ.',
    },
    loveRelationship: {
      upright: 'Cùng nhau san sẻ các khoản chi tiêu và thời gian; linh hoạt sắp xếp lịch hẹn hò dù bận rộn.',
      reversed: 'Quá bận rộn kiếm tiền khiến bạn lơ là việc chăm sóc tình cảm bạn đời.',
    },
    dos: {
      upright: 'Giữ thế cân bằng uyển chuyển; lập thứ tự ưu tiên; theo dõi sát sao thu chi hàng ngày.',
      reversed: 'Đơn giản hóa cuộc sống; tập trung vào một nguồn thu chính trước khi mở rộng.',
    },
    donts: {
      upright: 'Không ôm đồm quá nhiều dự án vượt quá năng lực xoay xở.',
      reversed: 'Không tiêu xài trước trả sau bằng thẻ tín dụng mất kiểm soát.',
    },
  },

  PENTACLES_03_3: {
    cardCode: 'PENTACLES_03_3',
    nameVn: 'Ba Tiền (Three of Pentacles)',
    keywords: ['Hợp tác chuyên nghiệp', 'Tay nghề bậc thầy', 'Được công nhận', 'Xây dựng bài bản'],
    symbolism: 'Người thợ điêu khắc trẻ tuổi đang làm việc chăm chỉ trong thánh đường, được vị tu sĩ và kiến trúc sư cầm bản vẽ chăm chú lắng nghe và tán thưởng. Ba đồng tiền vàng chạm khắc trên cổng vòm.',
    uprightMeaning: 'Three of Pentacles là biểu tượng của tinh thần làm việc nhóm chuyên nghiệp, kỹ năng tinh hoa được công nhận và sự hợp tác ăn ý để kiến tạo công trình để đời.',
    reversedMeaning: 'Three of Pentacles ngược cảnh báo sự bất hòa trong nhóm làm việc, thiếu sự tôn trọng chuyên môn lẫn nhau hoặc tay nghề non kém làm hỏng dự án.',
    careerFinance: {
      upright: 'Được đánh giá cao về năng lực chuyên môn; dự án phối hợp ăn ý giữa các phòng ban thành công rực rỡ.',
      reversed: 'Cần cải thiện kỹ năng giao tiếp nhóm; học hỏi nâng cao tay nghề thay vì giấu dốt.',
    },
    loveRelationship: {
      upright: 'Cả hai cùng chung tay xây dựng tổ ấm vững chắc; biết lắng nghe và tôn trọng ý kiến của nhau.',
      reversed: 'Thiếu sự hợp tác trong công việc gia đình; một bên cảm thấy ý kiến của mình bị gạt bỏ.',
    },
    dos: {
      upright: 'Làm việc theo nhóm bài bản; lắng nghe lời khuyên của chuyên gia; trau dồi tay nghề tinh xảo.',
      reversed: 'Giải quyết các bất đồng về quy trình làm việc; tôn trọng phân công nhiệm vụ rõ ràng.',
    },
    donts: {
      upright: 'Không tự mãn coi thường sự đóng góp của đồng đội.',
      reversed: 'Không làm việc cẩu thả, đốt cháy giai đoạn gây ảnh hưởng chất lượng công trình.',
    },
  },

  PENTACLES_04_4: {
    cardCode: 'PENTACLES_04_4',
    nameVn: 'Bốn Tiền (Four of Pentacles)',
    keywords: ['Giữ chặt tài sản', 'Kiểm soát an toàn', 'Bảo thủ sợ mất', 'Cần học cách sẻ chia'],
    symbolism: 'Người đàn ông ngồi ôm chặt một đồng tiền trước ngực, hai chân giẫm lên hai đồng tiền và một đồng tiền đội trên đầu. Phía sau là thành phố sầm uất nhưng ông hoàn toàn khép kín cô độc.',
    uprightMeaning: 'Four of Pentacles phản ánh tâm lý tích lũy, bảo vệ tài sản và khao khát an toàn tuyệt đối. Tuy nhiên, nếu nắm giữ quá chặt, bạn sẽ trở nên bảo thủ và ngăn cản dòng chảy phát triển mới.',
    reversedMeaning: 'Four of Pentacles ngược có hai chiều hướng: hoặc là bạn học cách mở lòng hào phóng sẻ chia, hoặc là nguy cơ mất kiểm soát tài chính dẫn đến hao tài tốn của.',
    careerFinance: {
      upright: 'Bảo toàn vốn an toàn; thắt chặt chi tiêu vượt qua giai đoạn kinh tế khó khăn.',
      reversed: 'Mở rộng đầu tư hợp lý; không nên vì quá sợ rủi ro mà để tiền nằm chết một chỗ.',
    },
    loveRelationship: {
      upright: 'Tính sở hữu và kiểm soát bạn đời quá mức làm nghẹt thở mối quan hệ.',
      reversed: 'Học cách tin tưởng và cho nhau không gian tự do; buông bỏ sự ghen tuông độc đoán.',
    },
    dos: {
      upright: 'Quản lý tài sản chặt chẽ; phân biệt rõ giữa "tiết kiệm khôn ngoan" và "bủn xỉn ích kỷ".',
      reversed: 'Mở lòng sẻ chia với người khó khăn hơn; tin rằng dòng tiền lưu thông sẽ quay trở lại.',
    },
    donts: {
      upright: 'Không để nỗi sợ nghèo khó biến bạn thành kẻ nô lệ của đồng tiền.',
      reversed: 'Không tiêu xài hoang phí chỉ để chứng tỏ mình hào phóng.',
    },
  },

  PENTACLES_05_5: {
    cardCode: 'PENTACLES_05_5',
    nameVn: 'Năm Tiền (Five of Pentacles)',
    keywords: ['Thiếu thốn khó khăn', 'Cảm giác bị bỏ rơi', 'Khủng hoảng tạm thời', 'Ánh sáng nơi giáo đường'],
    symbolism: 'Hai người hành khất tàn tật rách rưới lê bước trong bão tuyết lạnh giá, đi ngang qua cửa sổ kính màu ấm áp của một nhà thờ thắp sáng năm đồng tiền vàng mà không hề ngước nhìn lên tìm kiếm sự giúp đỡ.',
    uprightMeaning: 'Five of Pentacles phản ánh giai đoạn khó khăn về tài chính, bệnh tật hoặc cảm giác bị bỏ rơi trong cô độc. Điều quan trọng là sự trợ giúp luôn ở ngay cạnh (cửa sổ nhà thờ), chỉ cần bạn chịu mở lời.',
    reversedMeaning: 'Five of Pentacles ngược báo hiệu sự kết thúc của giai đoạn cơ cực: bạn tìm được việc làm, phục hồi sức khỏe và đón nhận sự hỗ trợ quý báu để vực dậy cuộc sống.',
    careerFinance: {
      upright: 'Khó khăn tài chính tạm thời, thất nghiệp hoặc mất mát tiền bạc; hãy dũng cảm nhờ cậy gia đình và bạn bè.',
      reversed: 'Dòng tiền bắt đầu quay trở lại; tìm được nguồn trợ cấp hoặc công việc mới ổn định.',
    },
    loveRelationship: {
      upright: 'Cả hai cùng nhau trải qua giai đoạn túng thiếu vật chất; hoặc cảm giác cô đơn ngay trong mối quan hệ.',
      reversed: 'Cùng nhau vượt qua sóng gió kinh tế, tình cảm thêm gắn bó bền chặt sau hoạn nạn.',
    },
    dos: {
      upright: 'Ngẩng đầu tìm kiếm sự trợ giúp; gạt bỏ sĩ diện thừa thãi; tin rằng đây chỉ là thử thách tạm thời.',
      reversed: 'Từng bước tái thiết lập quỹ dự phòng; biết ơn những bàn tay đã nâng đỡ mình lúc hoạn nạn.',
    },
    donts: {
      upright: 'Không tự cô lập mình trong nỗi tuyệt vọng và tủi thân.',
      reversed: 'Không quên bài học sâu sắc về sự tiết kiệm và tình người sau cơn bĩ cực.',
    },
  },

  PENTACLES_06_6: {
    cardCode: 'PENTACLES_06_6',
    nameVn: 'Sáu Tiền (Six of Pentacles)',
    keywords: ['Hào phóng sẻ chia', 'Cân bằng cho và nhận', 'Hỗ trợ công bằng', 'Lòng nhân ái thực tế'],
    symbolism: 'Thương nhân giàu có một tay cầm cán cân công lý, tay kia phân phát tiền vàng cho hai người nghèo khó đang quỳ dưới chân. Cán cân biểu thị sự phân bổ nguồn lực công bằng và có trách nhiệm.',
    uprightMeaning: 'Six of Pentacles là dòng chảy hài hòa giữa Cho và Nhận: bạn có thể là người hảo tâm nâng đỡ người khác, hoặc là người xứng đáng đón nhận sự hỗ trợ kịp thời.',
    reversedMeaning: 'Six of Pentacles ngược cảnh báo sự bố thí kèm theo điều kiện trói buộc, nợ nần khó đòi, hoặc thói lợi dụng lòng tốt của người khác.',
    careerFinance: {
      upright: 'Nhận được học bổng, vốn đầu tư hoặc tăng lương xứng đáng; biết làm từ thiện đúng nơi đúng lúc.',
      reversed: 'Cẩn trọng với những khoản vay mượn không giấy tờ; tránh để tiền bạc làm hỏng tình bạn.',
    },
    loveRelationship: {
      upright: 'Mối quan hệ có sự cho đi và nhận lại công bằng; cả hai cùng chăm sóc lẫn nhau chu đáo.',
      reversed: 'Một bên cho đi quá nhiều còn một bên chỉ biết hưởng thụ; mất cân bằng tình cảm.',
    },
    dos: {
      upright: 'Sẻ chia với tâm thế tôn trọng; đón nhận sự giúp đỡ với lòng biết ơn; giữ cán cân công bằng.',
      reversed: 'Thiết lập thỏa thuận rõ ràng trong tiền bạc; không ban ơn để tạo quyền kiểm soát.',
    },
    donts: {
      upright: 'Không ban phát với thái độ trịch thượng hạ mình.',
      reversed: 'Không để mình bị biến thành công cụ lợi dụng tài chính của kẻ khác.',
    },
  },

  PENTACLES_07_7: {
    cardCode: 'PENTACLES_07_7',
    nameVn: 'Bảy Tiền (Seven of Pentacles)',
    keywords: ['Kiên nhẫn chờ đợi', 'Đánh giá tiến trình', 'Thu hoạch dài hạn', 'Định hướng tiếp theo'],
    symbolism: 'Người nông dân chống cuốc đứng ngắm nhìn bụi cây trĩu quả với 7 đồng tiền vàng. Ông tạm dừng tay để quan sát thành quả sau chuỗi ngày lao động miệt mài.',
    uprightMeaning: 'Seven of Pentacles biểu thị khoảng dừng chiến lược để đánh giá kết quả đầu tư. Bạn đã bỏ ra nhiều công sức và giờ là lúc kiên nhẫn chờ quả ngọt chín muồi, không nên nóng vội.',
    reversedMeaning: 'Seven of Pentacles ngược cảnh báo sự sốt ruột bỏ cuộc giữa chừng, hoặc tiếp tục đổ tiền của vào một dự án không mang lại hiệu quả kinh tế (chi phí chìm).',
    careerFinance: {
      upright: 'Đầu tư dài hạn đang sinh trưởng tốt; thời điểm rà soát lại hiệu quả các kênh đầu tư.',
      reversed: 'Tránh nôn nóng muốn thấy kết quả ngay; dũng cảm cắt lỗ nếu nhận thấy phương án sai lầm.',
    },
    loveRelationship: {
      upright: 'Tình cảm cần thời gian để phát triển tự nhiên; kiên nhẫn vun đắp từng ngày.',
      reversed: 'Cảm thấy công sức vun vén không được đáp lại tương xứng; cần đánh giá lại tương lai chung.',
    },
    dos: {
      upright: 'Kiên nhẫn chờ đợi mùa thu hoạch; định kỳ rà soát tiến độ; giữ vững tầm nhìn dài hạn.',
      reversed: 'Đánh giá khách quan chi phí cơ hội; biết dừng lại đúng lúc nếu không khả thi.',
    },
    donts: {
      upright: 'Không nhổ cây lên xem rễ chỉ vì quá sốt ruột.',
      reversed: 'Không tiếp tục chôn vùi thời gian vào những mối quan hệ độc hại không có tương lai.',
    },
  },

  PENTACLES_08_8: {
    cardCode: 'PENTACLES_08_8',
    nameVn: 'Tám Tiền (Eight of Pentacles)',
    keywords: ['Chuyên tâm rèn luyện', 'Tay nghề bậc cao', 'Tỉ mỉ kỷ luật', 'Đam mê chuyên môn'],
    symbolism: 'Người thợ thủ công trẻ ngồi cặm cụi đục đẽo từng đồng tiền vàng với sự tập trung tuyệt đối. Bảy đồng tiền hoàn thiện đã được treo ngay ngắn trên cột gỗ, đồng thứ tám đang hoàn thành.',
    uprightMeaning: 'Eight of Pentacles là biểu tượng của tinh thần kỷ luật, sự kiên trì học hỏi và chuyên tâm trau dồi tay nghề bậc thầy. Bạn đang tích lũy giá trị vững chắc từng ngày.',
    reversedMeaning: 'Eight of Swords ngược cảnh báo sự cẩu thả, đốt cháy giai đoạn, làm việc rập khuôn mất cảm hứng hoặc lãng phí tài năng vào những việc vô bổ.',
    careerFinance: {
      upright: 'Nâng cao chuyên môn xuất sắc; làm việc chăm chỉ mang lại thu nhập gia tăng bền vững; sự nghiệp thăng tiến.',
      reversed: 'Tránh thói làm việc đối phó; đầu tư vào các khóa đào tạo nâng cao kỹ năng thực chiến.',
    },
    loveRelationship: {
      upright: 'Cả hai cùng nỗ lực vun đắp mối quan hệ mỗi ngày qua những hành động chăm sóc cụ thể.',
      reversed: 'Mối quan hệ trở nên nhàm chán theo thói quen; cần làm mới lại cách bày tỏ tình cảm.',
    },
    dos: {
      upright: 'Tập trung cao độ vào chuyên môn; rèn luyện tính tỉ mỉ; kiên trì từng bước một.',
      reversed: 'Tìm lại niềm say mê trong công việc; nâng cao tiêu chuẩn chất lượng sản phẩm.',
    },
    donts: {
      upright: 'Không vội vàng chạy theo số lượng mà hy sinh chất lượng.',
      reversed: 'Không tự mãn với chút tay nghề non nớt ban đầu.',
    },
  },

  PENTACLES_09_9: {
    cardCode: 'PENTACLES_09_9',
    nameVn: 'Chín Tiền (Nine of Pentacles)',
    keywords: ['Tự chủ độc lập', 'Thịnh vượng quý phái', 'Tận hưởng thành quả', 'Bình an tao nhã'],
    symbolism: 'Quý cô thanh lịch dạo bước trong vườn nho trĩu quả chín đồng tiền vàng, tay đeo găng đỡ chú chim ưng săn mồi được thuần dưỡng. Biểu tượng của sự độc lập tự chủ và sung túc đỉnh cao.',
    uprightMeaning: 'Nine of Pentacles là sự tự do tài chính và bản lĩnh tự chủ đáng ngưỡng mộ! Bạn tự tay kiến tạo nên sự thịnh vượng của mình và tận hưởng cuộc sống tao nhã, an yên.',
    reversedMeaning: 'Nine of Pentacles ngược cảnh báo sự lệ thuộc tài chính vào người khác, chi tiêu vượt quá thu nhập để giữ vỏ bọc hào nhoáng, hoặc cảm giác cô đơn giữa đống tài sản.',
    careerFinance: {
      upright: 'Tự do tài chính; đầu tư thành công rực rỡ; tận hưởng không gian sống đẳng cấp do chính mình làm ra.',
      reversed: 'Quản lý tài chính cẩn thận; đừng để những cám dỗ xa hoa làm thâm hụt tiền tiết kiệm.',
    },
    loveRelationship: {
      upright: 'Tự tin, độc lập và quyến rũ; không vội vã kết hôn chỉ vì áp lực xã hội, biết trân trọng giá trị bản thân.',
      reversed: 'Cảnh giác với những kẻ tiếp cận bạn chỉ vì động cơ vật chất hoặc danh vọng.',
    },
    dos: {
      upright: 'Tự hào về sự độc lập của mình; chăm sóc bản thân chu đáo; tận hưởng vẻ đẹp cuộc sống.',
      reversed: 'Học cách tự chủ kinh tế; xây dựng giá trị nội tại thay vì chạy theo hàng hiệu bề ngoài.',
    },
    donts: {
      upright: 'Không đánh đổi sự tự do tự chủ lấy bất kỳ sự phụ thuộc nào.',
      reversed: 'Không chi tiêu hoang phí chỉ để làm vừa lòng ánh mắt người đời.',
    },
  },

  PENTACLES_10_10: {
    cardCode: 'PENTACLES_10_10',
    nameVn: 'Mười Tiền (Ten of Pentacles)',
    keywords: ['Gia tộc thịnh vượng', 'Di sản truyền đời', 'An cư lạc nghiệp', 'Thành tựu trường tồn'],
    symbolism: 'Gia đình ba thế hệ sum vầy dưới cổng vòm dinh thự cổ kính: ông lão ngồi vuốt ve bầy chó săn, đôi vợ chồng trẻ trò chuyện và đứa bé vui đùa. Mười đồng tiền vàng kết thành Cây Sự Sống (Tree of Life).',
    uprightMeaning: 'Ten of Pentacles là đỉnh cao viên mãn của thế giới vật chất: sự giàu có bền vững qua nhiều thế hệ, gia đạo hưng thịnh và di sản trường tồn cho con cháu.',
    reversedMeaning: 'Ten of Pentacles ngược cảnh báo tranh chấp quyền thừa kế, bất đồng trong doanh nghiệp gia đình hoặc rủi ro pháp lý liên quan đến tài sản đất đai.',
    careerFinance: {
      upright: 'Doanh nghiệp phát triển vững mạnh; mua nhà đất, lập quỹ thừa kế an toàn; tài chính dồi dào vững như bàn thạch.',
      reversed: 'Giải quyết các vấn đề thừa kế minh bạch qua luật sư; tránh để tiền bạc làm rạn nứt tình ruột thịt.',
    },
    loveRelationship: {
      upright: 'Cuộc hôn nhân được gia đình hai bên ủng hộ tuyệt đối; nền tảng kinh tế vững vàng cho nhiều thế hệ.',
      reversed: 'Áp lực từ gia đình dòng họ can thiệp vào chuyện lứa đôi; cần có lập trường bảo vệ bạn đời.',
    },
    dos: {
      upright: 'Lập kế hoạch tài chính dài hạn cho gia tộc; gìn giữ nếp nhà và di sản đạo đức; tri ân tổ tiên.',
      reversed: 'Phân định rõ ràng giữa tình cảm gia đình và quan hệ làm ăn kinh tế.',
    },
    donts: {
      upright: 'Không quên cội nguồn và trách nhiệm phụng dưỡng gia đình.',
      reversed: 'Không để lòng tham tài sản thừa kế phá nát tình anh em ruột thịt.',
    },
  },

  PENTACLES_11_PAGE: {
    cardCode: 'PENTACLES_11_PAGE',
    nameVn: 'Thị Tùng Tiền (Page of Pentacles)',
    keywords: ['Chăm chỉ học hỏi', 'Cơ hội thực tế', 'Tiềm năng phát triển', 'Đặt nền móng'],
    symbolism: 'Chàng trai trẻ đứng giữa cánh đồng màu mỡ, hai tay nâng niu đồng tiền vàng với ánh mắt chăm chú học hỏi. Đằng sau là rặng cây và cánh đồng được cày cấy cẩn thận.',
    uprightMeaning: 'Page of Pentacles mang đến cơ hội học tập thực tế, một công việc mới hoặc dự án mới đòi hỏi sự chăm chỉ, kiên nhẫn và tinh thần cầu tiến.',
    reversedMeaning: 'Page of Pentacles ngược cảnh báo sự lười biếng, thiếu tập trung, lãng phí cơ hội học tập hoặc thói mơ mộng làm giàu mà không muốn lao động.',
    careerFinance: {
      upright: 'Nhận được cơ hội thực tập tốt; bắt đầu học một kỹ năng nghề nghiệp mới có tính ứng dụng cao.',
      reversed: 'Cần nghiêm túc kỷ luật bản thân; hoàn thành các bài tập và nhiệm vụ được giao đúng hạn.',
    },
    loveRelationship: {
      upright: 'Tình cảm chân thành, giản dị; cùng nhau lập kế hoạch tiết kiệm tiền cho tương lai chung.',
      reversed: 'Thiếu sự thực tế và trách nhiệm; chưa sẵn sàng gánh vác các nghĩa vụ tài chính chung.',
    },
    dos: {
      upright: 'Chăm chỉ học hỏi từng kỹ năng nhỏ; đặt mục tiêu thực tế; kiên nhẫn tích lũy kinh nghiệm.',
      reversed: 'Chấn chỉnh thái độ làm việc; lập thời gian biểu kỷ luật và bám sát thực hiện.',
    },
    donts: {
      upright: 'Không coi thường những công việc khởi đầu nhỏ bé.',
      reversed: 'Không lười biếng bỏ bê việc học hành nâng cao năng lực.',
    },
  },

  PENTACLES_12_KNIGHT: {
    cardCode: 'PENTACLES_12_KNIGHT',
    nameVn: 'Hiệp Sĩ Tiền (Knight of Pentacles)',
    keywords: ['Kiên định sắt đá', 'Đáng tin cậy tuyệt đối', 'Làm việc cần mẫn', 'Tiến bước vững vàng'],
    symbolism: 'Hiệp sĩ cưỡi chú ngựa đen lực lưỡng đứng yên trên cánh đồng cày xới thẳng tắp, tay nâng đồng tiền vàng chăm chú quan sát. Chậm mà chắc, không gì lay chuyển được.',
    uprightMeaning: 'Knight of Pentacles là hình mẫu của sự cần cù, đáng tin cậy và kiên định nhất bộ bài. Dù không quá ồn ào hay tốc độ, bạn luôn hoàn thành mọi việc với chất lượng hoàn hảo.',
    reversedMeaning: 'Knight of Pentacles ngược cảnh báo sự cứng nhắc, bảo thủ, làm việc rập khuôn máy móc hoặc rơi vào trạng thái trì trệ lười vận động.',
    careerFinance: {
      upright: 'Nhân viên mẫn cán được sếp hoàn toàn tin cậy; quản lý tài chính chuẩn mực; tiến độ công việc chuẩn xác.',
      reversed: 'Cần mở rộng sự linh hoạt; áp dụng công nghệ mới để tăng năng suất thay vì làm theo lối mòn cũ.',
    },
    loveRelationship: {
      upright: 'Bạn đời cực kỳ chung thủy, đáng tin cậy và có trách nhiệm chăm lo chu đáo cho gia đình.',
      reversed: 'Mối quan hệ có phần khô khan, thiếu lãng mạn; cần tạo thêm những bất ngờ tươi mới.',
    },
    dos: {
      upright: 'Giữ chữ tín hàng đầu; kiên nhẫn làm việc có phương pháp; đi từng bước chắc chắn.',
      reversed: 'Linh hoạt thay đổi phương pháp khi cần thiết; dành thời gian nghỉ ngơi thư giãn.',
    },
    donts: {
      upright: 'Không bỏ dở công việc giữa chừng.',
      reversed: 'Không cứng nhắc bảo thủ từ chối những góc nhìn đổi mới sáng tạo.',
    },
  },

  PENTACLES_13_QUEEN: {
    cardCode: 'PENTACLES_13_QUEEN',
    nameVn: 'Hoàng Hậu Tiền (Queen of Pentacles)',
    keywords: ['Nuôi dưỡng trù phú', 'Khéo léo đảm đang', 'Thực tế ấm áp', 'Tài chính vững vàng'],
    symbolism: 'Hoàng hậu ngồi trên ngai vàng chạm khắc hoa trái và thú vật giữa thiên nhiên trù phú, hai tay ôm trọn đồng tiền vàng với ánh mắt trìu mến. Dưới chân là chú thỏ nhảy nhót biểu thị sự sinh sôi nảy nở.',
    uprightMeaning: 'Queen of Pentacles là biểu tượng của người phụ nữ đảm đang, tháo vát, biết quản lý tài chính thông minh đồng thời nuôi dưỡng tổ ấm ngập tràn tình yêu thương và sự ấm no.',
    reversedMeaning: 'Queen of Pentacles ngược cảnh báo sự lo âu thái quá về tiền bạc, bỏ bê việc chăm sóc bản thân hoặc xu hướng muốn dùng vật chất để kiểm soát người thân.',
    careerFinance: {
      upright: 'Quản lý tài chính doanh nghiệp và gia đình xuất sắc; tạo dựng môi trường làm việc ấm cúng, hiệu quả.',
      reversed: 'Cân bằng lại giữa công việc và gia đình; đừng để sự tham công tiếc việc làm kiệt sức.',
    },
    loveRelationship: {
      upright: 'Chăm sóc người yêu bằng những bữa ăn ngon và sự chu đáo thực tế; chỗ dựa ấm áp vững chắc.',
      reversed: 'Tránh cằn nhằn về chuyện tiền bạc; học cách tin tưởng khả năng tự lập của bạn đời.',
    },
    dos: {
      upright: 'Quản lý tài chính thực tế; chăm sóc sức khỏe thể chất và gia đình; sống gần gũi thiên nhiên.',
      reversed: 'Dành thời gian chăm sóc chính mình; thư giãn và tận hưởng cuộc sống.',
    },
    donts: {
      upright: 'Không để tiền bạc làm vơi đi sự ấm áp chân thành.',
      reversed: 'Không đo lường tình cảm bằng giá trị vật chất quy đổi.',
    },
  },

  PENTACLES_14_KING: {
    cardCode: 'PENTACLES_14_KING',
    nameVn: 'Quốc Vương Tiền (King of Pentacles)',
    keywords: ['Đế chế tài chính', 'Thành tựu đỉnh cao', 'Vững như bàn thạch', 'Hào sảng che chở'],
    symbolism: 'Vị vua quyền uy ngồi trên ngai vàng khắc đầu bò đực dũng mãnh giữa lâu đài nguy nga và vườn nho trĩu quả. Áo choàng thêu chùm nho tím, chân giẫm lên giáp sắt, tay cầm quyền trượng và đồng tiền vàng.',
    uprightMeaning: 'King of Pentacles là đỉnh cao của sự thành đạt vật chất: doanh nhân tài ba, người kiến tạo đế chế vững mạnh, hào sảng che chở cho gia đình và cộng đồng.',
    reversedMeaning: 'King of Pentacles ngược cảnh báo thói hám lợi mù quáng, đánh đổi sức khỏe và đạo đức lấy tiền tài, hoặc đầu tư mạo hiểm dẫn đến nguy cơ phá sản.',
    careerFinance: {
      upright: 'Lãnh đạo doanh nghiệp thành công rực rỡ; tài sản tích lũy đồ sộ; các quyết định đầu tư an toàn sinh lời cao.',
      reversed: 'Tránh xa các phi vụ làm ăn mờ ám; xem xét lại đạo đức kinh doanh và quản trị rủi ro.',
    },
    loveRelationship: {
      upright: 'Người trụ cột gia đình hoàn hảo: chu cấp đầy đủ vật chất, chung thủy và bảo bọc gia đình trọn vẹn.',
      reversed: 'Coi trọng tiền bạc hơn tình cảm; dùng quyền lực kinh tế để áp đặt gia đình.',
    },
    dos: {
      upright: 'Xây dựng sự nghiệp trên nền tảng đạo đức; bảo vệ sự an toàn cho gia đình; làm từ thiện hào phóng.',
      reversed: 'Đặt giá trị con người lên trên lợi nhuận; giữ gìn sức khỏe quý hơn vàng bạc.',
    },
    donts: {
      upright: 'Không vì lợi nhuận ngắn hạn mà phá vỡ chữ tín lâu năm.',
      reversed: 'Không biến bản thân thành kẻ nô lệ phục vụ cho lòng tham vô đáy.',
    },
  },
};
