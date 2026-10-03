/**
 * MYSTICOS — Authentic Deterministic Tarot Interpretation Library
 * Based on Rider-Waite-Smith 1909 classical iconography & psychological archetype traditions.
 * 100% Deterministic: Same card + orientation + position = Same rigorous interpretation.
 * No AI/LLM, no random fortune-telling.
 */

export interface TarotCardInsight {
  cardCode: string;
  nameVn: string;
  keywords: string[];
  symbolism: string;
  uprightMeaning: string;
  reversedMeaning: string;
  careerFinance: {
    upright: string;
    reversed: string;
  };
  loveRelationship: {
    upright: string;
    reversed: string;
  };
  dos: {
    upright: string;
    reversed: string;
  };
  donts: {
    upright: string;
    reversed: string;
  };
}

export const MAJOR_ARCANA_DETAILED: Record<string, TarotCardInsight> = {
  MAJOR_00_FOOL: {
    cardCode: 'MAJOR_00_FOOL',
    nameVn: '0 — Chàng Khờ (The Fool)',
    keywords: ['Khởi đầu mới', 'Tự do', 'Ngây thơ', 'Tiềm năng vô hạn'],
    symbolism:
      'Chàng thanh niên đứng bên bờ vực thẳm với đóa hoa hồng trắng (sự thuần khiết) và bọc hành lý nhỏ (kinh nghiệm tích lũy chưa mở). Chú chó trắng trung thành nhắc nhở sự tỉnh táo trước ranh giới hiểm nguy.',
    uprightMeaning:
      'The Fool ở chiều xuôi đánh dấu một khởi đầu hoàn toàn mới, bước nhảy vọt của niềm tin vào cuộc sống. Bạn đang đứng trước cơ hội mở ra trang mới không vướng bận định kiến cũ.',
    reversedMeaning:
      'The Fool ngược cảnh báo sự bốc đồng, liều lĩnh mù quáng hoặc ngây thơ quá mức trước rủi ro thực tế. Có thể bạn đang do dự không dám bước tiếp vì sợ thất bại.',
    careerFinance: {
      upright: 'Thời điểm lý tưởng để khởi nghiệp, nhận dự án mới hoặc chuyển hướng nghề nghiệp theo đam mê thực sự. Tài chính mở ra cơ hội mới nhưng cần học hỏi.',
      reversed: 'Tránh đầu tư tài chính mạo hiểm theo tin đồn thất thiệt. Trong công việc, đừng bỏ dở quy trình kiểm soát rủi ro chỉ vì háo hức ban đầu.',
    },
    loveRelationship: {
      upright: 'Một mối quan hệ tự nhiên, hồn nhiên và đầy ắp sự bất ngờ tươi mới. Hai bạn cùng nhau trải nghiệm những góc nhìn phóng khoáng.',
      reversed: 'Sự thiếu cam kết hoặc tính khí bốc đồng làm đối phương cảm thấy bất an. Cần nghiêm túc nhìn nhận trách nhiệm của bản thân.',
    },
    dos: {
      upright: 'Dũng cảm bước ra khỏi vùng an toàn; tin tưởng vào trực giác; giữ tâm thế cởi mở học hỏi.',
      reversed: 'Dừng lại rà soát kỹ các điều khoản thực tế; tham khảo ý kiến người có kinh nghiệm trước khi ký kết hay cam kết.',
    },
    donts: {
      upright: 'Không để nỗi sợ thất bại kìm hãm bước chân bạn.',
      reversed: 'Không nhắm mắt làm ngơ trước những dấu hiệu cảnh báo nguy hiểm rõ ràng.',
    },
  },

  MAJOR_01_MAGICIAN: {
    cardCode: 'MAJOR_01_MAGICIAN',
    nameVn: 'I — Pháp Sư (The Magician)',
    keywords: ['Ý chí kiến tạo', 'Tập trung', 'Kỹ năng', 'Hành động cụ thể'],
    symbolism:
      'Một tay chỉ lên trời, một tay trỏ xuống đất ("Như trên trời, dưới đất cũng vậy"). Trên bàn có đủ 4 biểu tượng đại diện 4 nguyên tố: Gậy (Lửa/Ý chí), Chén (Nước/Cảm xúc), Kiếm (Khí/Trí tuệ), Tiền (Đất/Vật chất).',
    uprightMeaning:
      'The Magician khẳng định bạn đã hội tụ đầy đủ mọi nguồn lực, trí tuệ và công cụ cần thiết để biến ý tưởng thành hiện thực cụ thể. Đây là thời điểm làm chủ và triển khai.',
    reversedMeaning:
      'The Magician ngược biểu thị sự thao túng, tài năng bị lãng phí hoặc cảm giác bất an không tin vào năng lực bản thân. Có thể bạn đang thiếu tập trung hoặc dùng kỹ năng sai mục đích.',
    careerFinance: {
      upright: 'Hiệu suất công việc ở đỉnh cao. Khả năng đàm phán, trình bày dự án xuất sắc. Nguồn thu tài chính tăng trưởng nhờ năng lực chuyên môn sắc bén.',
      reversed: 'Cảnh giác với những lời hứa hẹn quá lời hoặc sự thiếu minh bạch trong hợp đồng. Đừng cố chấp lừa dối chính mình về năng lực thực tế.',
    },
    loveRelationship: {
      upright: 'Sức hút cá nhân mạnh mẽ, giao tiếp lôi cuốn và chủ động tạo nên những bước tiến tích cực trong tình cảm.',
      reversed: 'Nguy cơ xuất hiện sự thiếu trung thực, lời nói không đi đôi với việc làm hoặc toan tính ích kỷ.',
    },
    dos: {
      upright: 'Hành động ngay lập tức; tối ưu hóa các công cụ sẵn có; nói đi đôi với làm.',
      reversed: 'Thành thật với bản thân; rèn luyện thêm kỹ năng nền tảng thay vì dùng chiêu trò khỏa lấp.',
    },
    donts: {
      upright: 'Không chần chừ do dự khi thời cơ đã chín muồi.',
      reversed: 'Không lợi dụng sự tin tưởng của người khác để trục lợi ngắn hạn.',
    },
  },

  MAJOR_02_HIGH_PRIESTESS: {
    cardCode: 'MAJOR_02_HIGH_PRIESTESS',
    nameVn: 'II — Nữ Tư Tế (The High Priestess)',
    keywords: ['Trực giác sâu sắc', 'Bí ẩn nội tâm', 'Tĩnh lặng', 'Tri thức tiềm thức'],
    symbolism:
      'Ngồi giữa hai cột trụ B (Boaz - Bóng tối) và J (Jachin - Ánh sáng), phía sau là tấm màn thêu lựu và cọ. Cuộn giấy kinh Torah cầm trên tay chỉ hé mở một phần, biểu thị chân lý tĩnh lặng.',
    uprightMeaning:
      'The High Priestess nhắc bạn hãy lắng nghe tiếng nói trực giác bên trong. Câu trả lời không nằm ở sự tranh cãi ồn ào bên ngoài mà nằm ở sự chiêm nghiệm tĩnh lặng của tâm thức.',
    reversedMeaning:
      'The High Priestess ngược cho thấy bạn đang phớt lờ trực giác, bị cuốn vào những tin đồn nông cạn, hoặc giấu giếm cảm xúc tiêu cực khiến nội tâm bức bối.',
    careerFinance: {
      upright: 'Thích hợp cho nghiên cứu, phân tích chiến lược, bảo mật thông tin. Trong tài chính, hãy quan sát kỹ dòng tiền trước khi quyết định.',
      reversed: 'Thông tin nội bộ bị che giấu hoặc hiểu lầm do thiếu đối thoại minh bạch. Tránh đưa ra quyết định dựa trên phán đoán cảm tính mù mờ.',
    },
    loveRelationship: {
      upright: 'Sự thấu hiểu tâm hồn sâu lắng không cần nhiều lời. Mối quan hệ mang tính tinh thần cao.',
      reversed: 'Sự xa cách lạnh lùng, im lặng độc hại hoặc những bí mật chưa được giải tỏa gây rạn nứt.',
    },
    dos: {
      upright: 'Dành thời gian tĩnh tâm chiêm nghiệm; tin vào linh cảm đầu tiên; bảo mật các kế hoạch trọng yếu.',
      reversed: 'Chia sẻ cởi mở hơn; không để sự đa nghi làm lu mờ khả năng phán đoán logic.',
    },
    donts: {
      upright: 'Không để ý kiến số đông làm xao động niềm tin nội tại của bạn.',
      reversed: 'Không tự cô lập mình trong những suy diễn bi quan không có chứng cứ.',
    },
  },

  MAJOR_03_EMPRESS: {
    cardCode: 'MAJOR_03_EMPRESS',
    nameVn: 'III — Hoàng Hậu (The Empress)',
    keywords: ['Sinh sôi', 'Nuôi dưỡng', 'Trù phú', 'Thấu cảm'],
    symbolism:
      'Người phụ nữ đội vương miện 12 ngôi sao, ngồi giữa cánh đồng lúa mì trĩu hạt và dòng thác chảy tràn. Biểu tượng sao Kim (Venus) dưới chân ghế khẳng định tình yêu thiên nhiên và sự màu mỡ.',
    uprightMeaning:
      'The Empress mang lại nguồn năng lượng sinh sôi nảy nở, sự thịnh vượng và sung túc. Mọi hạt giống nỗ lực bạn gieo trồng đang bắt đầu đơm hoa kết trái.',
    reversedMeaning:
      'The Empress ngược chỉ ra sự cạn kiệt năng lượng do chăm sóc người khác quá mức mà quên mất chính mình, hoặc sự kiểm soát áp đặt dưới danh nghĩa yêu thương.',
    careerFinance: {
      upright: 'Dự án bước vào giai đoạn gặt hái thành tựu. Môi trường làm việc hòa nhã, sáng tạo. Tài chính bội thu và ổn định.',
      reversed: 'Sự trì trệ do thiếu kỷ luật hoặc lãng phí tiền bạc vào những thú vui bốc đồng. Cần cân đối lại thu chi.',
    },
    loveRelationship: {
      upright: 'Tình cảm nồng thắm, chở che và quan tâm chu đáo. Khả năng đón nhận tin vui về gia đạo hoặc bước tiến hôn nhân.',
      reversed: 'Cảm giác ngột ngạt do sự quan tâm thái quá hoặc phụ thuộc tình cảm một chiều.',
    },
    dos: {
      upright: 'Tận hưởng thành quả xứng đáng; chăm sóc không gian sống; nuôi dưỡng các mối liên kết gia đình.',
      reversed: 'Tập trung bồi bổ sức khỏe cho bản thân; học cách để người thân tự lập giải quyết vấn đề của họ.',
    },
    donts: {
      upright: 'Không tiếc nuối khi đầu tư cho việc học tập và nâng cao chất lượng cuộc sống.',
      reversed: 'Không dùng sự hy sinh làm công cụ để đòi hỏi người khác phải biết ơn.',
    },
  },

  MAJOR_04_EMPEROR: {
    cardCode: 'MAJOR_04_EMPEROR',
    nameVn: 'IV — Hoàng Đế (The Emperor)',
    keywords: ['Kỷ luật', 'Cấu trúc', 'Thẩm quyền', 'Ổn định vững bền'],
    symbolism:
      'Bậc quân vương ngồi trên ngai vàng khắc đầu cừu (Bạch Dương - Sao Hỏa), tay cầm quyền trượng Ankh (sự sống) và quả cầu (thế giới). Phía sau là những rặng núi đá khô cằn biểu thị kỷ luật thép.',
    uprightMeaning:
      'The Emperor đại diện cho trật tự, tính kỷ luật, nguyên tắc rõ ràng và năng lực lãnh đạo quyết đoán. Đây là lúc xây dựng quy chuẩn vững chắc để bảo vệ thành quả.',
    reversedMeaning:
      'The Emperor ngược cảnh báo tính độc đoán, bảo thủ, lạm quyền hoặc ngược lại là sự bất lực, thiếu kiểm soát trước hỗn loạn.',
    careerFinance: {
      upright: 'Thời điểm vàng để thiết lập quy trình, lãnh đạo đội ngũ hoặc thăng tiến vào vị trí quản lý. Tài chính vững chãi nhờ kế hoạch bài bản.',
      reversed: 'Xung đột với cấp trên hoặc đối tác do bất đồng quan điểm cứng nhắc. Cần mềm dẻo hơn trong cách điều hành.',
    },
    loveRelationship: {
      upright: 'Mối quan hệ an toàn, đáng tin cậy tuyệt đối, hai bên cùng hướng tới xây dựng nền móng gia đình vững bền.',
      reversed: 'Thiếu sự lãng mạn, kiểm soát đối phương quá chặt khiến không khí gia đình trở nên ngột ngạt.',
    },
    dos: {
      upright: 'Tuân thủ kỷ luật nghiêm ngặt; bảo vệ ranh giới cá nhân; ra quyết định dựa trên số liệu thực tế.',
      reversed: 'Hạ bớt cái tôi; lắng nghe phản hồi từ cấp dưới hoặc người thân; linh hoạt điều chỉnh quy chế.',
    },
    donts: {
      upright: 'Không thỏa hiệp với sự cẩu thả và thiếu trung thực.',
      reversed: 'Không áp đặt tiêu chuẩn chủ quan của mình lên mọi người xung quanh.',
    },
  },

  MAJOR_05_HIEROPHANT: {
    cardCode: 'MAJOR_05_HIEROPHANT',
    nameVn: 'V — Giáo Hoàng (The Hierophant)',
    keywords: ['Truyền thống', 'Tri thức quy chuẩn', 'Đạo đức', 'Cố vấn tinh thần'],
    symbolism:
      'Ngồi giữa hai tín đồ, tay cầm cây thánh giá ba tầng, chìa khóa vàng và bạc bắt chéo dưới chân biểu thị sự mở khóa của tâm linh và lý trí thông qua đạo đức chính thống.',
    uprightMeaning:
      'The Hierophant hướng dẫn bạn tìm về những giá trị truyền thống đã được thời gian kiểm chứng. Tìm kiếm lời khuyên từ người có chuyên môn uy tín sẽ giúp bạn tránh sai lầm.',
    reversedMeaning:
      'The Hierophant ngược phản ánh sự gò bó của giáo điều hẹp hòi, hoặc cảnh báo bạn đang tin theo những lời khuyên lỗi thời, thiếu thực tế.',
    careerFinance: {
      upright: 'Làm việc thuận lợi trong các tổ chức lớn, giáo dục, pháp lý hoặc môi trường có quy chuẩn rõ ràng. Tuân thủ pháp luật.',
      reversed: 'Cảm giác tù túng với quy chế công ty cũ kỹ. Đây có thể là lúc bạn cần phá vỡ thông lệ để tìm lối đi riêng.',
    },
    loveRelationship: {
      upright: 'Tình cảm hướng đến sự cam kết lâu dài, hôn nhân danh chính ngôn thuận và được hai bên gia đình ủng hộ.',
      reversed: 'Sự bất đồng về quan điểm sống giữa hai thế hệ, hoặc áp lực từ định kiến xã hội đối với tình yêu của bạn.',
    },
    dos: {
      upright: 'Học hỏi từ các bậc tiền bối uyên bác; tôn trọng các chuẩn mực đạo đức và pháp lý.',
      reversed: 'Tự tư duy phản biện; xem xét lại những niềm tin không còn phù hợp với hoàn cảnh hiện tại.',
    },
    donts: {
      upright: 'Không đi đường tắt hoặc vi phạm nguyên tắc chỉ vì lợi ích trước mắt.',
      reversed: 'Không mù quáng tin theo những giáo điều áp đặt vô lý.',
    },
  },

  MAJOR_06_LOVERS: {
    cardCode: 'MAJOR_06_LOVERS',
    nameVn: 'VI — Đôi Uyên Ương (The Lovers)',
    keywords: ['Lựa chọn giá trị', 'Hòa hợp sâu sắc', 'Sự gắn kết', 'Đồng điệu'],
    symbolism:
      'Tổng lãnh thiên thần Raphael chúc phúc cho Adam và Eve. Phía sau Eve là Cây Tri Thức có con rắn cuốn quanh; sau Adam là Cây Sự Sống với 12 ngọn lửa biểu thị đam mê.',
    uprightMeaning:
      'The Lovers đại diện cho sự hòa hợp tuyệt vời giữa hai tâm hồn, nhưng sâu xa hơn là một sự lựa chọn lớn về mặt đạo đức và hệ giá trị sống của bạn.',
    reversedMeaning:
      'The Lovers ngược phản ánh sự xung đột nội tâm, mâu thuẫn giữa lý trí và cảm xúc, hoặc sự thiếu hòa hợp trong giao tiếp đôi lứa.',
    careerFinance: {
      upright: 'Hợp tác kinh doanh thành công dựa trên sự tin cậy tuyệt đối và chia sẻ mục tiêu chung. Quyết định nghề nghiệp đúng đắn.',
      reversed: 'Xung đột lợi ích giữa các đối tác. Tránh để cảm xúc cá nhân xen vào các quyết định công việc trọng yếu.',
    },
    loveRelationship: {
      upright: 'Tình yêu say đắm, đồng điệu về cả thể xác lẫn tâm hồn. Mối quan hệ thăng hoa với sự tôn trọng lẫn nhau.',
      reversed: 'Hiểu lầm, bất đồng quan điểm hoặc nghi ngờ lẫn nhau. Cần đối thoại chân thành để tháo gỡ nút thắt.',
    },
    dos: {
      upright: 'Lựa chọn theo đúng giá trị đạo đức cốt lõi của bạn; bày tỏ tình cảm chân thành và thẳng thắn.',
      reversed: 'Nhận trách nhiệm về phần lỗi của mình; kiên nhẫn lắng nghe nỗi lòng của đối phương.',
    },
    donts: {
      upright: 'Không thỏa hiệp với những điều đi ngược lại lương tâm của chính mình.',
      reversed: 'Không trốn tránh việc đưa ra quyết định rõ ràng khi tình thế yêu cầu.',
    },
  },

  MAJOR_07_CHARIOT: {
    cardCode: 'MAJOR_07_CHARIOT',
    nameVn: 'VII — Cỗ Xe Chiến Thắng (The Chariot)',
    keywords: ['Ý chí kiên cường', 'Quyết đoán', 'Chiến thắng', 'Kiểm soát bản thân'],
    symbolism:
      'Chiến binh giáp trụ đứng trên cỗ xe được kéo bởi hai nhân sư đen và trắng (đại diện cho hai thái cực đối lập). Anh không dùng dây cương mà điều khiển bằng ý chí sắt đá.',
    uprightMeaning:
      'The Chariot báo hiệu chiến thắng vang dội nhờ lòng quyết tâm, ý chí kiên định và khả năng dung hòa các mặt đối lập để tiến về mục tiêu duy nhất.',
    reversedMeaning:
      'The Chariot ngược cảnh báo việc mất kiểm soát cảm xúc, tính hiếu thắng cực đoan dẫn đến đổ vỡ, hoặc cảm giác bất lực bị hoàn cảnh cuốn đi.',
    careerFinance: {
      upright: 'Vượt qua mọi rào cản cạnh tranh để về đích thành công. Sự quyết đoán mang lại bước tiến nhảy vọt trong sự nghiệp và thu nhập.',
      reversed: 'Tiến độ dự án bị chệch hướng do sự nóng vội. Cần hạ nhiệt cơn giận và rà soát lại phương án tác chiến.',
    },
    loveRelationship: {
      upright: 'Chủ động chinh phục khó khăn để bảo vệ tình yêu; cả hai cùng chung tay vượt qua nghịch cảnh bên ngoài.',
      reversed: 'Cái tôi quá lớn gây xung đột nảy lửa; áp đặt quan điểm khiến đối phương cảm thấy bị đàn áp.',
    },
    dos: {
      upright: 'Giữ vững mục tiêu; tập trung toàn lực; biến áp lực thành động lực hành động thực tế.',
      reversed: 'Kiểm soát cơn nóng giận; tạm dừng bước để chỉnh đốn lại phương tiện và kế hoạch.',
    },
    donts: {
      upright: 'Không để những ý kiến gây xao nhãng làm bạn nản chí.',
      reversed: 'Không lao đầu vào cuộc chiến vô nghĩa khi chưa chuẩn bị chu đáo.',
    },
  },

  MAJOR_08_STRENGTH: {
    cardCode: 'MAJOR_08_STRENGTH',
    nameVn: 'VIII — Sức Mạnh Nội Tâm (Strength)',
    keywords: ['Lòng trắc ẩn', 'Kiên nhẫn', 'Thu phục', 'Sức mạnh mềm'],
    symbolism:
      'Người phụ nữ thanh thoát dịu dàng vuốt ve miệng một con sư tử hung dữ. Trên đầu nàng là biểu tượng vô cực (Lemniscate). Sức mạnh của tình thương và sự kiên nhẫn đã thuần hóa bản năng hoang dã.',
    uprightMeaning:
      'Strength khẳng định sức mạnh thực sự không đến từ bạo lực hay sự đàn áp thô bạo, mà đến từ lòng can đảm tĩnh lặng, sự bao dung và khả năng làm chủ cảm xúc của bản thân.',
    reversedMeaning:
      'Strength ngược phản ánh sự tự ti, nghi ngờ năng lực bản thân, hoặc việc để cho những cơn giận dữ bản năng kiểm soát hành vi.',
    careerFinance: {
      upright: 'Giải quyết các mâu thuẫn phức tạp tại nơi làm việc bằng sự khéo léo và thấu hiểu. Tài chính duy trì ổn định nhờ kỷ luật tự giác.',
      reversed: 'Cảm giác đuối sức hoặc mất kiên nhẫn trước tiến độ công việc chậm chạp. Cần thời gian tái tạo năng lượng.',
    },
    loveRelationship: {
      upright: 'Tình cảm ấm áp, bền bỉ; sự dịu dàng và lòng vị tha giúp hóa giải mọi góc cạnh sắc nhọn của đối phương.',
      reversed: 'Dễ nảy sinh bực bội vô cớ do áp lực dồn nén lâu ngày. Cần tìm cách giải tỏa cảm xúc lành mạnh.',
    },
    dos: {
      upright: 'Dùng sự kiên nhẫn và lòng nhân ái để thu phục nhân tâm; giữ bình tĩnh trong mọi tình huống.',
      reversed: 'Khích lệ bản thân; nhìn nhận sự tổn thương như một bài học để rèn luyện ý chí.',
    },
    donts: {
      upright: 'Không dùng quyền lực hay sự đe dọa để ép buộc người khác.',
      reversed: 'Không bỏ cuộc chỉ vì kết quả chưa đến ngay lập tức.',
    },
  },

  MAJOR_09_HERMIT: {
    cardCode: 'MAJOR_09_HERMIT',
    nameVn: 'IX — Ẩn Sĩ (The Hermit)',
    keywords: ['Chiêm nghiệm', 'Tìm kiếm chân lý', 'Tĩnh lặng', 'Soi đường dẫn lối'],
    symbolism:
      'Ông lão đứng trên đỉnh núi tuyết, tay cầm cây gậy hành hương và chiếc đèn lồng chứa ngôi sao 6 cánh tỏa sáng. Ngài rọi đường cho những người tìm kiếm sự thông tuệ theo sau.',
    uprightMeaning:
      'The Hermit khuyên bạn nên tạm rời xa những ồn ào náo nhiệt để quay về với thế giới nội tâm. Đây là giai đoạn tự soi sáng, đúc kết kinh nghiệm và tìm kiếm câu trả lời đích thực cho cuộc đời.',
    reversedMeaning:
      'The Hermit ngược cảnh báo tình trạng cô lập cực đoan, biến sự chiêm nghiệm thành nỗi cô đơn cay đắng hoặc cố chấp từ chối sự trợ giúp từ bên ngoài.',
    careerFinance: {
      upright: 'Thích hợp cho việc tự học, chuyên môn sâu, viết lách hoặc hoạch định chiến lược dài hạn. Cân nhắc kỹ lưỡng mọi chi tiêu.',
      reversed: 'Lạc lõng trong tập thể hoặc quá bảo thủ không chịu cập nhật xu thế mới. Cần mở rộng giao lưu học hỏi.',
    },
    loveRelationship: {
      upright: 'Cần một khoảng lặng ngắn để hiểu rõ nhu cầu của bản thân trong mối quan hệ. Độc thân tự tại và an yên.',
      reversed: 'Cảm giác cô đơn ngay cả khi đang ở cạnh người yêu do đôi bên không chịu mở lòng trò chuyện.',
    },
    dos: {
      upright: 'Dành thời gian đọc sách, suy ngẫm; tự làm sáng tỏ những khúc mắc bên trong trước khi hỏi người khác.',
      reversed: 'Chủ động bước ra ngoài kết nối với xã hội; chia sẻ tâm sự với người bạn tri kỷ.',
    },
    donts: {
      upright: 'Không vội vàng đưa ra quyết định lớn khi lòng còn rối bời.',
      reversed: 'Không tự nhốt mình trong sự ủ dột và phán xét thế gian.',
    },
  },

  MAJOR_10_WHEEL_OF_FORTUNE: {
    cardCode: 'MAJOR_10_WHEEL_OF_FORTUNE',
    nameVn: 'X — Bánh Xe Số Phận (Wheel of Fortune)',
    keywords: ['Chu kỳ vận mệnh', 'Bước ngoặt', 'Cơ hội bất ngờ', 'Quy luật nhân quả'],
    symbolism:
      'Bánh xe lớn khắc các chữ TARO / ROTA cùng ký hiệu hóa học và thần học. Bốn sinh vật ở 4 góc (Người, Đại bàng, Sư tử, Bò) đang đọc sách, tượng trưng cho sự vận hành vĩnh cửu của 4 nguyên tố.',
    uprightMeaning:
      'Wheel of Fortune báo hiệu một bước ngoặt tích cực đang xoay chuyển về phía bạn. Vận khí hanh thông, cơ hội bất ngờ xuất hiện giúp bạn thoát khỏi giai đoạn bế tắc trước đó.',
    reversedMeaning:
      'Wheel of Fortune ngược chỉ ra một giai đoạn trắc trở tạm thời do hoàn cảnh khách quan. Hãy nhớ rằng bánh xe luôn quay — khó khăn này cũng sẽ qua đi nhanh chóng.',
    careerFinance: {
      upright: 'Gặp thời vận tốt, có quý nhân phù trợ hoặc cơ may kinh doanh bất ngờ. Hãy nắm bắt thời cơ ngay khi nó tới.',
      reversed: 'Kế hoạch bị hoãn lại do yếu tố ngoại cảnh ngoài tầm kiểm soát. Giữ chặt ngân sách dự phòng và kiên nhẫn chờ thời.',
    },
    loveRelationship: {
      upright: 'Cuộc gặp gỡ định mệnh mang lại sự gắn kết tự nhiên kỳ diệu. Mối quan hệ bước sang trang mới tươi sáng.',
      reversed: 'Những biến động nhỏ trong cuộc sống khiến đôi bên có phần xáo trộn. Cần cùng nhau vững tâm vượt qua.',
    },
    dos: {
      upright: 'Sẵn sàng đón nhận thay đổi; thích ứng linh hoạt với vận hội mới; tích đức hành thiện.',
      reversed: 'Chấp nhận thực tế khách quan; tập trung kiểm soát những gì trong tầm tay thay vì than vãn.',
    },
    donts: {
      upright: 'Không chủ quan ỷ lại vào may mắn mà bỏ bê công việc nền tảng.',
      reversed: 'Không cố chống đối lại những thay đổi tất yếu của quy luật thời gian.',
    },
  },

  MAJOR_11_JUSTICE: {
    cardCode: 'MAJOR_11_JUSTICE',
    nameVn: 'XI — Công Lý (Justice)',
    keywords: ['Sự thật', 'Công bằng', 'Nhân quả', 'Quyết định sáng suốt'],
    symbolism:
      'Nữ thần ngồi ngay ngắn giữa hai cột trụ, tay phải nâng thanh kiếm hai lưỡi (sự thật rạch ròi), tay trái giữ cán cân thăng bằng tuyệt đối. Tấm rèm đỏ biểu thị sự nhiệt huyết với lẽ phải.',
    uprightMeaning:
      'Justice đòi hỏi sự trung thực, khách quan và minh bạch tuyệt đối. Mọi hành động của bạn trong quá khứ sẽ nhận lại kết quả tương xứng theo luật nhân quả.',
    reversedMeaning:
      'Justice ngược cảnh báo sự bất công, thiên vị, trốn tránh trách nhiệm cá nhân hoặc các rắc rối liên quan đến thủ tục pháp lý, tranh chấp.',
    careerFinance: {
      upright: 'Ký kết hợp đồng minh bạch, giải quyết tranh chấp thỏa đáng. Quyết định đầu tư dựa trên tính toán chuẩn xác.',
      reversed: 'Cẩn trọng với những điều khoản bất lợi trong giấy tờ. Đừng cố tình lách luật hay làm việc khuất tất.',
    },
    loveRelationship: {
      upright: 'Sự bình đẳng, tôn trọng và cam kết trung thực giữa hai người. Cân bằng hài hòa giữa cho và nhận.',
      reversed: 'Cảm giác bị đối xử bất công hoặc sự chỉ trích, phán xét quá khắt khe làm tổn thương nhau.',
    },
    dos: {
      upright: 'Nhìn nhận vấn đề bằng con mắt khách quan; đối xử công bằng với mọi người; tuân thủ cam kết.',
      reversed: 'Thẳng thắn nhận lỗi nếu mình sai; tìm kiếm sự hòa giải công bằng và minh bạch.',
    },
    donts: {
      upright: 'Không để cảm xúc cá nhân làm thiên lệch nhận định về đúng - sai.',
      reversed: 'Không đổ lỗi cho hoàn cảnh khi nguyên nhân xuất phát từ sự thiếu cẩn trọng của mình.',
    },
  },

  MAJOR_12_HANGED_MAN: {
    cardCode: 'MAJOR_12_HANGED_MAN',
    nameVn: 'XII — Kẻ Treo Ngược (The Hanged Man)',
    keywords: ['Góc nhìn mới', 'Buông bỏ', 'Tạm dừng', 'Giác ngộ từ hy sinh'],
    symbolism:
      'Chàng trai bị treo ngược một chân trên cành cây hình chữ T đang đâm chồi, chân kia bắt chéo hình số 4. Gương mặt ngài hoàn toàn thanh thản với vầng hào quang rực rỡ quanh đầu.',
    uprightMeaning:
      'The Hanged Man cho thấy bạn cần học cách buông bỏ sự kiểm soát và nhìn nhận tình huống dưới một góc độ hoàn toàn khác. Đôi khi tạm dừng lại chính là cách tiến bước nhanh nhất.',
    reversedMeaning:
      'The Hanged Man ngược phản ánh sự hy sinh vô nghĩa, thói quen trì hoãn tiêu cực hoặc sự cố chấp bám víu vào một hy vọng hão huyền không có kết quả.',
    careerFinance: {
      upright: 'Dự án đang trong giai đoạn chờ đợi kiểm duyệt. Hãy tận dụng thời gian này để tái cấu trúc và đổi mới tư duy.',
      reversed: 'Bạn đang lãng phí thời gian và tiền bạc vào những việc không sinh lời chỉ vì ngại thay đổi.',
    },
    loveRelationship: {
      upright: 'Học cách nhường nhịn và đặt mình vào vị trí của đối phương để thấu hiểu sâu sắc hơn.',
      reversed: 'Cảm giác mình luôn là người phải chịu thiệt thòi trong mối quan hệ. Đã đến lúc lên tiếng bảo vệ mình.',
    },
    dos: {
      upright: 'Thả lỏng tâm trí; chấp nhận sự chậm trễ tạm thời; tìm kiếm góc nhìn mới mẻ.',
      reversed: 'Chấm dứt việc chịu đựng vô ích; hành động dứt khoát để thoát khỏi thế bế tắc.',
    },
    donts: {
      upright: 'Không nóng vội thúc ép kết quả khi điều kiện chưa hội đủ.',
      reversed: 'Không tự biến mình thành nạn nhân trong các câu chuyện hàng ngày.',
    },
  },

  MAJOR_13_DEATH: {
    cardCode: 'MAJOR_13_DEATH',
    nameVn: 'XIII — Chuyển Hóa (Death)',
    keywords: ['Kết thúc chu kỳ cũ', 'Lột xác', 'Tái sinh', 'Buông bỏ triệt để'],
    symbolism:
      'Kỵ sĩ xương mặc áo giáp cưỡi ngựa trắng giẫm qua vương giả, phụ nữ và trẻ em. Lá cờ mang bông hoa hồng thần bí (sự sống mới). Phía chân trời, mặt trời đang mọc giữa hai tòa tháp.',
    uprightMeaning:
      'Death KHÔNG PHẢI là cái chết thể xác, mà là biểu tượng kinh điển của sự kết thúc một giai đoạn cũ để mở đường cho một chương mới tái sinh rực rỡ hơn.',
    reversedMeaning:
      'Death ngược cảnh báo việc cố chấp bám víu vào quá khứ đã qua, sợ hãi đổi mới và kéo dài sự đau đớn không cần thiết.',
    careerFinance: {
      upright: 'Đóng lại một công việc hoặc dự án không còn giá trị để bắt đầu một con đường mới đầy hứa hẹn.',
      reversed: 'Ngại thay đổi công việc dù môi trường hiện tại đã cạn kiệt tiềm năng phát triển. Cần dũng cảm bước qua.',
    },
    loveRelationship: {
      upright: 'Buông bỏ những thói quen cũ độc hại để mối quan hệ được làm mới, hoặc dứt khoát chia tay trong hòa bình.',
      reversed: 'Kéo dài mối quan hệ không còn hạnh phúc chỉ vì sợ sự cô đơn. Hãy cho mình cơ hội được sống thật.',
    },
    dos: {
      upright: 'Chấp nhận quy luật đào thải tự nhiên; dọn dẹp sạch sẽ những tàn dư cũ; đón nhận sinh khí mới.',
      reversed: 'Dũng cảm đối diện với sự thay đổi tất yếu; buông tay để tâm hồn được nhẹ nhõm.',
    },
    donts: {
      upright: 'Không hoảng sợ trước sự kết thúc; đó là tiền đề của sự tái sinh.',
      reversed: 'Không cố níu kéo những điều đã không còn thuộc về hiện tại của bạn.',
    },
  },

  MAJOR_14_TEMPERANCE: {
    cardCode: 'MAJOR_14_TEMPERANCE',
    nameVn: 'XIV — Tiết Chế (Temperance)',
    keywords: ['Cân bằng', 'Dung hòa', 'Chữa lành', 'Điều độ'],
    symbolism:
      'Thiên thần một chân đặt trên mặt đất, một chân chạm dưới làn nước, tay rót nước qua lại nhịp nhàng giữa hai chiếc cốc vàng mà không làm rơi một giọt nào.',
    uprightMeaning:
      'Temperance mang đến thông điệp về sự dung hòa, điều độ và kiên nhẫn. Sự kết hợp hài hòa giữa các yếu tố đối lập sẽ mang lại trạng thái bình an và sức mạnh chữa lành bền vững.',
    reversedMeaning:
      'Temperance ngược chỉ ra sự mất thăng bằng, thái quá trong hành vi hoặc sự xung đột gay gắt do thiếu lắng nghe và thỏa hiệp.',
    careerFinance: {
      upright: 'Duy trì tiến độ ổn định, quản lý dòng tiền hợp lý và khéo léo phối hợp giữa các phòng ban.',
      reversed: 'Chi tiêu mất kiểm soát hoặc làm việc quá sức dẫn đến kiệt quệ. Cần điều chỉnh lại lối sống ngay.',
    },
    loveRelationship: {
      upright: 'Mối quan hệ êm đềm, hòa hợp sâu sắc và luôn biết cách nhường nhịn, dung nạp sự khác biệt của nhau.',
      reversed: 'Sự thiếu kiên nhẫn gây ra những tranh cãi vụn vặt nhưng liên tục. Cần học cách tiết chế lời nói.',
    },
    dos: {
      upright: 'Hành động chừng mực; tìm kiếm tiếng nói chung; chăm sóc sự cân bằng giữa làm việc và nghỉ ngơi.',
      reversed: 'Rà soát lại thời gian biểu; từ bỏ những thói quen sinh hoạt cực đoan.',
    },
    donts: {
      upright: 'Không đi đến các thái cực cực đoan trong suy nghĩ lẫn hành động.',
      reversed: 'Không đưa ra quyết định hệ trọng khi tâm trạng đang kích động.',
    },
  },

  MAJOR_15_DEVIL: {
    cardCode: 'MAJOR_15_DEVIL',
    nameVn: 'XV — Quỷ Dữ (The Devil)',
    keywords: ['Ràng buộc ảo tưởng', 'Cám dỗ vật chất', 'Nghiện ngập', 'Thức tỉnh xiềng xích'],
    symbolism:
      'Ác thần Baphomet ngự trên bệ đá, phía dưới là hai con người bị xích lỏng quanh cổ. Chiếc xích rất rộng — họ hoàn toàn có thể tự tháo ra nếu họ thực sự muốn.',
    uprightMeaning:
      'The Devil vạch trần những thói quen xấu, sự lệ thuộc vào vật chất hoặc nỗi sợ hãi vô căn cứ đang trói buộc bạn. Chiếc xiềng xích thực chất chỉ là ảo tưởng do chính bạn tự tạo ra.',
    reversedMeaning:
      'The Devil ngược báo hiệu sự thức tỉnh mạnh mẽ! Bạn nhận ra bản chất của sự ràng buộc và đang tích cực tìm cách giải phóng bản thân để giành lại tự do đích thực.',
    careerFinance: {
      upright: 'Cảnh giác với những cạm bẫy tài chính, lời dụ dỗ kiếm tiền nhanh hoặc môi trường làm việc độc hại.',
      reversed: 'Thoát khỏi hợp đồng bất lợi hoặc từ bỏ công việc gò bó để tìm lại sự tự chủ nghề nghiệp.',
    },
    loveRelationship: {
      upright: 'Sức hút tình dục mãnh liệt nhưng dễ rơi vào sự kiểm soát ghen tuông độc hại và thao túng tâm lý.',
      reversed: 'Thức tỉnh sau giai đoạn mù quáng; dứt khoát rời bỏ mối quan hệ tiêu cực để bảo vệ lòng tự trọng.',
    },
    dos: {
      upright: 'Nhìn thẳng vào những góc khuất tiêu cực của bản thân; tỉnh táo trước những lời dụ dỗ ngon ngọt.',
      reversed: 'Chủ động tháo bỏ xiềng xích thói quen xấu; kiên quyết thiết lập lại ranh giới lành mạnh.',
    },
    donts: {
      upright: 'Không tự lừa dối mình rằng mình không có quyền lựa chọn.',
      reversed: 'Không quay đầu lại với những cám dỗ cũ mà bạn đã vượt qua.',
    },
  },

  MAJOR_16_TOWER: {
    cardCode: 'MAJOR_16_TOWER',
    nameVn: 'XVI — Tòa Tháp Sụp Đổ (The Tower)',
    keywords: ['Biến động bất ngờ', 'Sụp đổ ảo tưởng', 'Thức tỉnh', 'Giải phóng'],
    symbolism:
      'Tia sét từ trời đánh văng chiếc vương miện trên đỉnh tòa tháp đá kiên cố dựng trên vách núi. Ngọn lửa bùng cháy dữ dội và những con người rơi xuống. Nền móng giả tạo bị phá hủy.',
    uprightMeaning:
      'The Tower mang lại một cú sốc hoặc sự biến động đột ngột phá tan những ảo tưởng cũ kỹ. Dù ban đầu gây choáng váng, sự sụp đổ này là cần thiết để bạn xây dựng lại trên một nền móng chân thật.',
    reversedMeaning:
      'The Tower ngược cho thấy bạn đang cố gắng níu kéo một công trình đang rạn nứt vì sợ đối diện với sự thật, hoặc bạn vừa thoát hiểm trong gang tấc khỏi một cuộc khủng hoảng lớn.',
    careerFinance: {
      upright: 'Sự thay đổi bất ngờ trong tổ chức hoặc kế hoạch đổ vỡ. Hãy xem đây là cơ hội tái cơ cấu toàn diện.',
      reversed: 'Trì hoãn điều tất yếu chỉ làm tăng thêm tổn thất. Hãy chủ động giải quyết triệt để vấn đề tiềm ẩn.',
    },
    loveRelationship: {
      upright: 'Bí mật bị phơi bày hoặc tranh cãi gay gắt phá vỡ sự bằng mặt không bằng lòng bấy lâu nay.',
      reversed: 'Né tránh xung đột nhưng không giải quyết được căn nguyên; nguy cơ rạn nứt âm ỉ kéo dài.',
    },
    dos: {
      upright: 'Chấp nhận thực tế với tâm thế can trường; giữ vững sự an tĩnh cốt lõi bên trong; dọn sạch tàn tích.',
      reversed: 'Dám nhìn thẳng vào sự thật; thà đau một lần để dứt điểm còn hơn chịu đựng dai dẳng.',
    },
    donts: {
      upright: 'Không cố gắng chắp vá những thứ đã mục ruỗng từ bản chất.',
      reversed: 'Không hoảng loạn tự trách móc bản thân trước những biến cố khách quan.',
    },
  },

  MAJOR_17_STAR: {
    cardCode: 'MAJOR_17_STAR',
    nameVn: 'XVII — Ngôi Sao Hy Vọng (The Star)',
    keywords: ['Hy vọng hồi sinh', 'Niềm tin', 'Thanh thản', 'Nguồn cảm hứng vô tận'],
    symbolism:
      'Người phụ nữ khỏa thân quỳ bên dòng suối, tay rót nước làm tươi tốt đất liền và hòa vào dòng nước. Trên bầu trời là ngôi sao lớn 8 cánh cùng 7 ngôi sao nhỏ tỏa ánh sáng dịu mát.',
    uprightMeaning:
      'The Star là dòng suối mát lành sau cơn bão giông của The Tower. Lá bài mang lại niềm tin, hy vọng hồi sinh, sự bình an thanh thản trong tâm hồn và nguồn cảm hứng sáng tạo dồi dào.',
    reversedMeaning:
      'The Star ngược phản ánh sự bi quan, mất niềm tin vào tương lai hoặc cảm giác tuyệt vọng nhất thời do tập trung quá nhiều vào những điều chưa trọn vẹn.',
    careerFinance: {
      upright: 'Tương lai nghề nghiệp rạng rỡ, cơ hội phát triển thương hiệu cá nhân và thu hút sự hỗ trợ quý giá.',
      reversed: 'Thiếu động lực làm việc do mất định hướng. Hãy tìm lại niềm đam mê ban đầu để nạp lại năng lượng.',
    },
    loveRelationship: {
      upright: 'Tình cảm trong sáng, chân thành và tràn đầy niềm tin yêu. Sự chữa lành kỳ diệu sau những tổn thương cũ.',
      reversed: 'Nghi ngờ lòng chân thành của đối phương do còn mang mặc cảm quá khứ. Cần mở lòng đón nhận yêu thương.',
    },
    dos: {
      upright: 'Nuôi dưỡng niềm tin lạc quan; chia sẻ tài năng và lòng nhân ái với cộng đồng; sống thật với chính mình.',
      reversed: 'Đếm những phước lành mình đang có; tìm kiếm sự giúp đỡ từ bạn bè chân thành.',
    },
    donts: {
      upright: 'Không để sự hoài nghi dập tắt ngọn lửa hy vọng vừa nhen nhóm.',
      reversed: 'Không chìm đắm trong suy nghĩ tiêu cực rằng mọi cánh cửa đã khép lại.',
    },
  },

  MAJOR_18_MOON: {
    cardCode: 'MAJOR_18_MOON',
    nameVn: 'XVIII — Mặt Trăng Huyền Bí (The Moon)',
    keywords: ['Ảo ảnh', 'Nỗi sợ tiềm thức', 'Trực giác sâu', 'Bất an mơ hồ'],
    symbolism:
      'Mặt Trăng nhỏ giọt sương xuống trần gian. Chó nhà và chó sói cùng ngước lên sủa giữa hai tòa tháp. Con tôm bò lên từ đầm lầy tăm tối biểu thị những nỗi sợ sâu kín nhất từ tiềm thức trỗi dậy.',
    uprightMeaning:
      'The Moon cảnh báo giai đoạn sương mù che phủ, mọi sự việc chưa rõ ràng và trực giác của bạn đang giao tranh với những nỗi sợ hãi mơ hồ. Hãy cẩn trọng trước những ảo ảnh.',
    reversedMeaning:
      'The Moon ngược báo hiệu sương mù bắt đầu tan biến! Những bí mật hoặc điều khuất tất dần được phơi bày dưới ánh sáng, giúp bạn lấy lại sự sáng suốt.',
    careerFinance: {
      upright: 'Tránh ký kết giao dịch mập mờ hoặc đầu tư khi chưa có đầy đủ bằng chứng xác thực. Cảnh giác với sự lừa dối.',
      reversed: 'Nhận diện được ý đồ xấu của đối thủ hoặc phát hiện sai sót trong sổ sách trước khi quá muộn.',
    },
    loveRelationship: {
      upright: 'Cảm giác bất an, hoang mang về tương lai mối quan hệ; những điều chưa nói tạo nên bức tường vô hình.',
      reversed: 'Hiểu lầm được làm sáng tỏ; đôi bên cùng nhau giải tỏa những nghi ngờ để hàn gắn niềm tin.',
    },
    dos: {
      upright: 'Tin vào linh cảm nhưng phải kiểm chứng kỹ sự thật khách quan; đi chậm lại trong bóng tối.',
      reversed: 'Đối diện trực tiếp với nỗi sợ hãi; yêu cầu sự giải thích minh bạch trong mọi việc.',
    },
    donts: {
      upright: 'Không hành động vội vã khi tầm nhìn còn bị che khuất.',
      reversed: 'Không để trí tưởng tượng thêu dệt nên những kịch bản bi thảm không có thật.',
    },
  },

  MAJOR_19_SUN: {
    cardCode: 'MAJOR_19_SUN',
    nameVn: 'XIX — Mặt Trời Rực Rỡ (The Sun)',
    keywords: ['Thành công vang dội', 'Niềm vui thuần khiết', 'Sức sống', 'Sự thật sáng tỏ'],
    symbolism:
      'Mặt trời khổng lồ tỏa 16 tia sáng ấm áp. Đứa trẻ đội vòng hoa hướng dương tươi cười cưỡi ngựa trắng không yên cương phía trước bức tường đá. Sự tự do, tươi sáng và thịnh vượng tuyệt đối.',
    uprightMeaning:
      'The Sun là lá bài tích cực nhất trong 78 lá bài Tarot! Mọi bóng tối đều bị xua tan, mang lại thành công vang dội, sự hân hoan rực rỡ, sức khỏe dồi dào và niềm vui sống tràn trề.',
    reversedMeaning:
      'The Sun ngược chỉ là ánh mặt trời bị mây che khuất tạm thời. Thành công vẫn thuộc về bạn nhưng bạn có thể đang bi quan hóa vấn đề hoặc kiêu ngạo tự mãn quá mức.',
    careerFinance: {
      upright: 'Thành tựu xuất sắc được ghi nhận rộng rãi; thi cử đỗ đạt, kinh doanh phát đạt. Tài chính sung túc dồi dào.',
      reversed: 'Kết quả khả quan nhưng chưa đạt kỳ vọng tối đa do thiếu chút kiên nhẫn. Tránh tự mãn sớm.',
    },
    loveRelationship: {
      upright: 'Tình yêu tràn ngập tiếng cười, sự thấu hiểu ấm áp và hạnh phúc ngập tràn. Gia đạo an vui viên mãn.',
      reversed: 'Có những trục trặc nhỏ do tính khí trẻ con hoặc quá vô tư. Cần chú ý quan tâm đến cảm xúc của nhau.',
    },
    dos: {
      upright: 'Tỏa sáng hết mình; lan tỏa năng lượng tích cực; tận hưởng trọn vẹn niềm hạnh phúc xứng đáng.',
      reversed: 'Mở rộng góc nhìn để thấy được những điều tốt đẹp đang hiện hữu; duy trì sự khiêm nhường.',
    },
    donts: {
      upright: 'Không nghi ngờ hạnh phúc đang đến với mình.',
      reversed: 'Không để tính tự cao làm hỏng các mối quan hệ quý giá.',
    },
  },

  MAJOR_20_JUDGEMENT: {
    cardCode: 'MAJOR_20_JUDGEMENT',
    nameVn: 'XX — Phán Xét Tối Cao (Judgement)',
    keywords: ['Tiếng gọi thức tỉnh', 'Tái sinh', 'Phán xét công minh', 'Bước ngoặt cuộc đời'],
    symbolism:
      'Tổng lãnh thiên thần Gabriel thổi chiếc kèn lệnh từ mây trời. Những con người từ dưới huyệt mộ đứng dậy dang tay đón nhận tiếng gọi, sẵn sàng cho một cuộc đời mới thanh cao hơn.',
    uprightMeaning:
      'Judgement báo hiệu thời khắc phán xét công minh và sự thức tỉnh tâm thức sâu sắc. Bạn được trao cơ hội tha thứ cho quá khứ và bước vào một chương đời mới với sứ mệnh cao cả hơn.',
    reversedMeaning:
      'Judgement ngược phản ánh sự dằn vặt bản thân vì những lỗi lầm cũ, do dự không dám đáp lại tiếng gọi của lương tri hoặc phán xét người khác quá cay nghiệt.',
    careerFinance: {
      upright: 'Nhận thức rõ sứ mệnh nghề nghiệp đích thực; đưa ra quyết định chuyển hướng mang tính lịch sử cho bản thân.',
      reversed: 'Bỏ lỡ cơ hội thăng tiến do thiếu tự tin; trì hoãn việc giải quyết dứt điểm các vướng mắc cũ.',
    },
    loveRelationship: {
      upright: 'Sự tha thứ và chữa lành sâu sắc giúp hồi sinh tình cảm; hoặc bước sang một quyết định hệ trọng cho tương lai.',
      reversed: 'Cố chấp bới móc lỗi lầm cũ của đối phương khiến mối quan hệ luôn căng thẳng và ngột ngạt.',
    },
    dos: {
      upright: 'Lắng nghe tiếng gọi của lương tri; tha thứ cho chính mình và người khác; sẵn sàng tái sinh.',
      reversed: 'Dừng việc tự phán xét bản thân; học cách chấp nhận quá khứ như một bài học cần thiết.',
    },
    donts: {
      upright: 'Không trốn tránh trách nhiệm khi thời khắc định mệnh đã điểm.',
      reversed: 'Không để cảm giác tội lỗi kìm hãm bước tiến của bạn về phía trước.',
    },
  },

  MAJOR_21_WORLD: {
    cardCode: 'MAJOR_21_WORLD',
    nameVn: 'XXI — Thế Giới Viên Mãn (The World)',
    keywords: ['Hoàn thành trọn vẹn', 'Thành tựu tối thượng', 'Viên mãn', 'Khởi đầu chu kỳ mới'],
    symbolism:
      'Người phụ nữ uyển chuyển nhảy múa trong vòng nguyệt quế chiến thắng, hai tay cầm hai cây gậy quyền năng. Bốn sinh vật ở 4 góc đã thành tựu viên mãn. Hành trình của The Fool đã đạt tới đích.',
    uprightMeaning:
      'The World là đích đến viên mãn của toàn bộ hành trình 22 lá Ẩn Chính! Mọi mảnh ghép đều hòa làm một khối thống nhất, mang lại cảm giác thỏa mãn, thành công toàn diện và sự tự do đích thực.',
    reversedMeaning:
      'The World ngược cho thấy bạn đã đi gần tới đích nhưng còn một mắt xích cuối cùng chưa hoàn tất, hoặc cảm giác trống rỗng dù đã đạt được mục tiêu bên ngoài.',
    careerFinance: {
      upright: 'Dự án lớn hoàn thành xuất sắc; được xã hội công nhận; mở rộng tầm ảnh hưởng ra quốc tế hoặc quy mô lớn.',
      reversed: 'Kiên trì hoàn tất nốt các thủ tục cuối cùng; đừng bỏ cuộc khi chỉ còn cách vạch đích vài bước chân.',
    },
    loveRelationship: {
      upright: 'Hạnh phúc trọn vẹn, sự thấu hiểu tuyệt đối và gắn kết bền chặt như một thể thống nhất.',
      reversed: 'Cảm giác thiếu sự trọn vẹn do còn một khúc mắc chưa được giải tỏa dứt điểm. Hãy trò chuyện thẳng thắn.',
    },
    dos: {
      upright: 'Ăn mừng chiến thắng; tự hào về chặng đường đã đi qua; chuẩn bị tâm thế cho chu kỳ phát triển mới.',
      reversed: 'Tập trung hoàn thành nốt công đoạn cuối; không để sự lười biếng ở chặng cuối làm hỏng thành quả.',
    },
    donts: {
      upright: 'Không ngủ quên trên chiến thắng quá lâu.',
      reversed: 'Không bỏ dở giữa chừng khi đích đến đã ở ngay trước mắt.',
    },
  },
};

/**
 * Generate detailed insights for Minor Arcana cards deterministically
 */
export function getMinorArcanaInsight(
  suit: string,
  rankNum: number,
  cardName: string
): TarotCardInsight {
  const suitConfig = {
    WANDS: { element: 'Hỏa (Fire)', domain: 'Đam mê, hành động, sự nghiệp & sáng tạo', theme: 'nhiệt huyết' },
    CUPS: { element: 'Thủy (Water)', domain: 'Cảm xúc, tình yêu, trực giác & mối quan hệ', theme: 'tâm hồn' },
    SWORDS: { element: 'Khí (Air)', domain: 'Tư duy, logic, sự thật & thử thách quyết định', theme: 'trí tuệ' },
    PENTACLES: { element: 'Đất (Earth)', domain: 'Tài chính, vật chất, sức khỏe & sự bền vững', theme: 'thực tiễn' },
  } as const;

  const currentSuit = suitConfig[suit as keyof typeof suitConfig] ?? suitConfig.WANDS;
  const rankNames: Record<number, string> = {
    1: 'Ace (Ách)',
    2: 'Hai (Two)',
    3: 'Ba (Three)',
    4: 'Bốn (Four)',
    5: 'Năm (Five)',
    6: 'Sáu (Six)',
    7: 'Bảy (Seven)',
    8: 'Tám (Eight)',
    9: 'Chín (Nine)',
    10: 'Mười (Ten)',
    11: 'Page (Thị Tùng)',
    12: 'Knight (Hiệp Sĩ)',
    13: 'Queen (Hoàng Hậu)',
    14: 'King (Quốc Vương)',
  };

  const rankStr = rankNames[rankNum] || `Số ${rankNum}`;

  return {
    cardCode: `${suit}_${String(rankNum).padStart(2, '0')}`,
    nameVn: `${cardName} (${rankStr})`,
    keywords: [(currentSuit.domain.split(',')[0] ?? currentSuit.domain).trim(), rankStr, currentSuit.element],
    symbolism: `Thuộc Bộ ${suit} — Nguyên tố ${currentSuit.element}. Biểu thị các động lực liên quan mật thiết đến ${currentSuit.domain}.`,
    uprightMeaning: `Lá ${cardName} ở chiều xuôi mở ra nguồn năng lượng ${currentSuit.theme} thuận dòng. Đây là thời điểm phát huy thế mạnh của nguyên tố ${currentSuit.element} để giải quyết công việc và đời sống thực tế.`,
    reversedMeaning: `Lá ${cardName} ở chiều ngược cảnh báo sự tắc nghẽn hoặc sử dụng thái quá năng lượng ${currentSuit.theme}. Cần điều chỉnh lại nhịp điệu và kiềm chế những phản ứng bốc đồng.`,
    careerFinance: {
      upright: `Trong công việc, các yếu tố ${currentSuit.domain} đang tạo đà phát triển tốt. Chủ động nắm bắt cơ hội và duy trì tính chuyên nghiệp cao.`,
      reversed: `Tiến độ có thể chậm lại do thiếu thông tin hoặc xung đột quan điểm. Hãy rà soát kỹ quy trình và quản lý ngân sách cẩn mật.`,
    },
    loveRelationship: {
      upright: `Mối quan hệ có sự đồng điệu về ${currentSuit.domain}. Giao tiếp thẳng thắn và sự tôn trọng giúp đôi bên thêm gắn kết bền vững.`,
      reversed: `Tránh hiểu lầm do suy diễn chủ quan. Dành thời gian lắng nghe tâm tư của đối phương với tinh thần xây dựng.`,
    },
    dos: {
      upright: `Tận dụng cơ hội; hành động nhất quán với giá trị của mình; duy trì kỷ luật và sự chính trực.`,
      reversed: `Bình tĩnh rà soát lại phương án; lắng nghe lời khuyên khách quan; không nóng vội ép buộc kết quả.`,
    },
    donts: {
      upright: `Không chủ quan tự mãn khi mọi việc đang thuận lợi.`,
      reversed: `Không đưa ra quyết định quan trọng khi tâm lý đang bị xáo trộn.`,
    },
  };
}

/**
 * Universal lookup providing 100% deterministic, rich interpretations
 */
export function getAuthenticTarotCardInsights(
  cardCode: string,
  cardName: string,
  arcana: string,
  positionName: string,
  isReversed: boolean
) {
  let baseInsight: TarotCardInsight;

  if (MAJOR_ARCANA_DETAILED[cardCode]) {
    baseInsight = MAJOR_ARCANA_DETAILED[cardCode];
  } else {
    const parts = cardCode.split('_');
    const suit = parts[0] || 'WANDS';
    const num = parseInt(parts[1] || '1', 10);
    baseInsight = getMinorArcanaInsight(suit, num, cardName);
  }

  const isMajor = arcana === 'MAJOR';
  const arcanaMeaning = isMajor
    ? 'Bộ Ẩn Chính (Major Arcana): Biểu thị các bài học định mệnh lớn, bước ngoặt tâm lý nền tảng và quy luật phổ quát chi phối đường đời.'
    : 'Bộ Ẩn Phụ (Minor Arcana): Biểu thị các sự kiện cụ thể đời thường, công việc chi tiết, cảm xúc tức thời và tương tác ứng xử hàng ngày.';

  const orientationGuide = isReversed
    ? 'Chiều NGƯỢC (Reversed): Trong Tarot cổ điển, lá ngược không phải là điềm gở. Nó phản ánh năng lượng của lá bài đang bị kìm nén, trì hoãn, diễn ra âm thầm trong nội tâm hoặc nhắc nhở bạn cần chuyển hướng tiếp cận mềm dẻo hơn.'
    : 'Chiều XUÔI (Upright): Năng lượng của lá bài biểu đạt tự nhiên, trực diện và thông suốt nhất với hoàn cảnh khách quan bên ngoài.';

  const beginnerGuide = `Tại vị trí "${positionName}": Vị trí này đóng vai trò như một thấu kính soi chiếu chính xác khía cạnh hoàn cảnh và tâm lý của bạn tại thời điểm này.`;

  return {
    nameVn: baseInsight.nameVn,
    keywords: baseInsight.keywords,
    symbolism: baseInsight.symbolism,
    beginnerGuide,
    arcanaMeaning,
    orientationGuide,
    coreSummary: isReversed ? baseInsight.reversedMeaning : baseInsight.uprightMeaning,
    careerFinance: isReversed ? baseInsight.careerFinance.reversed : baseInsight.careerFinance.upright,
    loveRelationship: isReversed ? baseInsight.loveRelationship.reversed : baseInsight.loveRelationship.upright,
    dos: isReversed ? baseInsight.dos.reversed : baseInsight.dos.upright,
    donts: isReversed ? baseInsight.donts.reversed : baseInsight.donts.upright,
  };
}

/**
 * Deterministic synthesis analyzing narrative arc, elemental tension, progression and actionable guidance
 */
export function synthesizeSpreadNarrative(
  draws: Array<{
    positionIndex: number;
    positionName: string;
    card: { name: string; arcana: string; suit?: string; number: number };
    isReversed: boolean;
  }>,
  _spreadCode: string
) {
  const suitCount: Record<string, number> = { MAJOR: 0, WANDS: 0, CUPS: 0, SWORDS: 0, PENTACLES: 0 };
  draws.forEach((d) => {
    const suit = d.card.arcana === 'MAJOR' ? 'MAJOR' : (d.card.suit ?? 'WANDS');
    suitCount[suit] = (suitCount[suit] ?? 0) + 1;
  });

  const total = draws.length || 1;
  const reversedCount = draws.filter((d) => d.isReversed).length;
  const reversedRatio = reversedCount / total;

  const sortedSuits = Object.entries(suitCount)
    .filter(([, v]) => v > 0)
    .sort(([, a], [, b]) => b - a);
  const dominantSuit = sortedSuits[0]?.[0] ?? 'MAJOR';

  const suitLabels: Record<string, string> = {
    MAJOR: 'Bộ Ẩn Chính (Trọng Tâm Bài Học Trưởng Thành & Bước Ngoặt)',
    WANDS: 'Bộ Gậy (Hành Động, Ý Chí Khởi Xướng & Đam Mê Sáng Tạo)',
    CUPS: 'Bộ Chén (Cảm Xúc, Trực Giác & Các Mối Quan Hệ Gắn Kết)',
    SWORDS: 'Bộ Kiếm (Tư Duy Lý Tính, Sự Thật Khách Quan & Thử Thách Trí Tuệ)',
    PENTACLES: 'Bộ Đồng Tiền (Hiện Thực Hóa Vật Chất, Tài Chính & Kỷ Luật Vững Vàng)',
  };
  const dominantSuitLabel = suitLabels[dominantSuit] ?? dominantSuit;

  // 1. Narrative Arc Construction
  const firstCard = draws[0];
  const lastCard = draws[draws.length - 1];
  const midCard = draws.length > 2 ? draws[Math.floor(draws.length / 2)] : null;

  let narrativeArc = `Trải bài mở đầu bằng năng lượng của ${firstCard?.card.name} (${firstCard?.isReversed ? 'chiều ngược' : 'chiều xuôi'}) tại ${firstCard?.positionName}. `;
  if (midCard) {
    narrativeArc += `Điểm giao thoa cốt lõi dịch chuyển qua ${midCard.card.name} (${midCard.isReversed ? 'chiều ngược' : 'chiều xuôi'}), biểu thị sự chuyển dịch trạng thái tâm lý trước khi hướng về kết quả. `;
  }
  narrativeArc += `Đích đến của dòng chảy kết tinh tại ${lastCard?.card.name} (${lastCard?.isReversed ? 'chiều ngược' : 'chiều xuôi'}), đòi hỏi sự chủ động làm chủ hoàn cảnh.`;

  // 2. Tension & Contrast Analysis
  const hasFire = (suitCount.WANDS ?? 0) > 0;
  const hasWater = (suitCount.CUPS ?? 0) > 0;
  const hasAir = (suitCount.SWORDS ?? 0) > 0;
  const hasEarth = (suitCount.PENTACLES ?? 0) > 0;

  let tensionAnalysis = '';
  if (hasFire && hasWater) {
    tensionAnalysis = 'Xuất hiện sự giằng co giữa ngọn lửa hành động quyết liệt (Lửa/Gậy) và nhu cầu cân bằng cảm xúc an toàn (Nước/Chén). Cần tránh để cảm xúc nhất thời dập tắt chí hướng ban đầu.';
  } else if (hasAir && hasWater) {
    tensionAnalysis = 'Có sự xung đột giữa lý trí phán xét sắc bén (Khí/Kiếm) và trực giác nội tâm (Nước/Chén). Không nên phân tích quá mức những cảm xúc tự nhiên của bạn.';
  } else if (hasFire && hasEarth) {
    tensionAnalysis = 'Sự kết hợp giữa khát vọng mở rộng nhanh chóng (Lửa) và đòi hỏi kỷ luật xây móng thực tế (Đất). Cần kiên nhẫn để biến đam mê thành cấu trúc bền vững.';
  } else {
    tensionAnalysis = 'Các nguồn năng lượng trong trải bài có tính tương đồng cao, dòng chảy diễn ra trực tiếp và ít gặp sự cản trở chéo giữa các nguyên tố.';
  }

  // 3. Core Progression
  let coreProgression = '';
  if (reversedRatio >= 0.6) {
    coreProgression = 'Tiến trình đang ở giai đoạn nội quán sâu sắc. Phần lớn năng lượng hướng vào bên trong để tháo gỡ những khúc mắc vô thức trước khi bộc lộ ra thế giới bên ngoài.';
  } else if (reversedRatio <= 0.2) {
    coreProgression = 'Tiến trình đang diễn ra thông suốt và trực diện. Ngoại cảnh tạo điều kiện thuận lợi để bạn biến các hiểu biết thành hành động cụ thể.';
  } else {
    coreProgression = 'Tiến trình chuyển giao song song: một mặt bạn phải giải phóng các rào cản cũ, mặt khác sẵn sàng nắm bắt các cơ hội mới đang hiển lộ.';
  }

  // 4. Actionable Guidance (Concrete experiment)
  let actionableGuidance = '';
  if (dominantSuit === 'SWORDS') {
    actionableGuidance = 'Thực nghiệm hành động trong 7 ngày: Viết rõ 3 giả định bạn đang lo lắng nhất ra giấy, kiểm chứng sự thật khách quan của từng điểm và dừng các cuộc tranh luận không dẫn tới giải pháp xây dựng.';
  } else if (dominantSuit === 'CUPS') {
    actionableGuidance = 'Thực nghiệm hành động trong 7 ngày: Dành 15 phút mỗi tối lắng nghe trung thực nhu cầu tình cảm của mình; chia sẻ chân thành với một người bạn tin cậy thay vì kìm nén trong lòng.';
  } else if (dominantSuit === 'WANDS') {
    actionableGuidance = 'Thực nghiệm hành động trong 7 ngày: Chọn 1 mục tiêu ưu tiên cao nhất đang bị trì hoãn và bắt tay thực hiện bước đầu tiên trong vòng 24 giờ tới.';
  } else if (dominantSuit === 'PENTACLES') {
    actionableGuidance = 'Thực nghiệm hành động trong 7 ngày: Rà soát lại ngân sách chi tiêu thực tế và lập danh sách chi tiết các công việc cần hoàn thiện dứt điểm trong tuần.';
  } else {
    actionableGuidance = 'Thực nghiệm hành động trong 7 ngày: Nhìn nhận hoàn cảnh hiện tại như một bài học lớn về nhân cách; giữ tâm thế điềm tĩnh, không phản ứng vội vã trước các biến động tức thời.';
  }

  return {
    dominantSuit,
    dominantSuitLabel,
    elementBalance: suitCount,
    reversedRatio,
    narrativeArc,
    tensionAnalysis,
    coreProgression,
    actionableGuidance,
  };
}

