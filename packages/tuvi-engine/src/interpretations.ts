/**
 * Tu Vi Interpretations & Calculations Library
 * Full comprehensive, deterministic interpretations based on classical Nam Phai traditions.
 * 100% Free, Public, Unlocked.
 */

// 1. LỤC THẬP HOA GIÁP NẠP ÂM (60 CAN CHI)
export interface NapAmInfo {
  menh: string; // Tên nạp âm (ví dụ: Lộ Bàng Thổ)
  element: 'KIM' | 'MOC' | 'THUY' | 'HOA' | 'THO';
  elementVn: string;
  description: string;
}

export const NAP_AM_TABLE: Record<string, NapAmInfo> = {
  'GIAP_TY_RAT': { menh: 'Hải Trung Kim', element: 'KIM', elementVn: 'Kim (Vàng trong biển)', description: 'Khí chất tiềm ẩn, tấm lòng bao dung, cần được rèn luyện để tỏa sáng.' },
  'AT_SUU_OX': { menh: 'Hải Trung Kim', element: 'KIM', elementVn: 'Kim (Vàng trong biển)', description: 'Điềm đạm, nội tâm sâu sắc, tích lũy nội lực bền bỉ.' },
  'BINH_DAN_TIGER': { menh: 'Lư Trung Hỏa', element: 'HOA', elementVn: 'Hỏa (Lửa trong lò)', description: 'Nhiệt huyết bừng cháy, chí khí ngút ngàn, quang minh chính đại.' },
  'DINH_MAO_CAT': { menh: 'Lư Trung Hỏa', element: 'HOA', elementVn: 'Hỏa (Lửa trong lò)', description: 'Trọng tình nghĩa, giàu lý tưởng, kiên định theo đuổi đam mê.' },
  'MAU_THIN_DRAGON': { menh: 'Đại Lâm Mộc', element: 'MOC', elementVn: 'Mộc (Cây rừng lớn)', description: 'Bao dung che chở, chí lớn vươn xa, có phẩm chất dẫn dắt quần chúng.' },
  'KY_TY_SNAKE': { menh: 'Đại Lâm Mộc', element: 'MOC', elementVn: 'Mộc (Cây rừng lớn)', description: 'Mưu lược, kiên trì, có khả năng thích ứng và nương tựa thời cuộc xuất sắc.' },
  'CANH_NGO_HORSE': { menh: 'Lộ Bàng Thổ', element: 'THO', elementVn: 'Thổ (Đất ven đường)', description: 'Chân thành, rộng rãi, lập nghiệp tự thân, uy tín với mọi người.' },
  'TAN_MUI_GOAT': { menh: 'Lộ Bàng Thổ', element: 'THO', elementVn: 'Thổ (Đất ven đường)', description: 'Nhẫn nại, nhân hậu, tích lũy từng bước để dựng nên cơ đồ.' },
  'NHAM_THAN_MONKEY': { menh: 'Kiếm Phong Kim', element: 'KIM', elementVn: 'Kim (Vàng mũi kiếm)', description: 'Sắc sảo, quyết đoán, bản lĩnh dám đương đầu nghịch cảnh.' },
  'QUY_DAU_ROOSTER': { menh: 'Kiếm Phong Kim', element: 'KIM', elementVn: 'Kim (Vàng mũi kiếm)', description: 'Thông minh, cương trực, làm việc dứt khoát và có năng khiếu quản trị.' },
  'GIAP_TUAT_DOG': { menh: 'Sơn Đầu Hỏa', element: 'HOA', elementVn: 'Hỏa (Lửa trên núi)', description: 'Tỏa sáng từ xa, cơ trí nhạy bén, giàu năng lượng sáng tạo.' },
  'AT_HOI_PIG': { menh: 'Sơn Đầu Hỏa', element: 'HOA', elementVn: 'Hỏa (Lửa trên núi)', description: 'Ôn hòa, lương thiện, có duyên gặp quý nhân nâng đỡ.' },
  'BINH_TY_RAT': { menh: 'Giản Hạ Thủy', element: 'THUY', elementVn: 'Thủy (Nước dưới khe)', description: 'Linh hoạt, khó lường, trực giác sâu sắc, thích ứng mọi hoàn cảnh.' },
  'DINH_SUU_OX': { menh: 'Giản Hạ Thủy', element: 'THUY', elementVn: 'Thủy (Nước dưới khe)', description: 'Cẩn trọng, kiên nhẫn, thâm trầm, tích tiểu thành đại.' },
  'MAU_DAN_TIGER': { menh: 'Thành Đầu Thổ', element: 'THO', elementVn: 'Thổ (Đất trên thành)', description: 'Vững như bàn thạch, trọng nghĩa khí, là chỗ dựa tin cậy.' },
  'KY_MAO_CAT': { menh: 'Thành Đầu Thổ', element: 'THO', elementVn: 'Thổ (Đất trên thành)', description: 'Tự lập, nguyên tắc, làm việc bài bản và chắc chắn.' },
  'CANH_THIN_DRAGON': { menh: 'Bạch Lạp Kim', element: 'KIM', elementVn: 'Kim (Vàng sáp ong)', description: 'Thanh bạch, tinh khiết, tấm lòng trong sáng, tinh thần cầu tiến.' },
  'TAN_TY_SNAKE': { menh: 'Bạch Lạp Kim', element: 'KIM', elementVn: 'Kim (Vàng sáp ong)', description: 'Khéo léo, tư duy mỹ thuật, tỉ mỉ và nhạy bén thương trường.' },
  'NHAM_NGO_HORSE': { menh: 'Dương Liễu Mộc', element: 'MOC', elementVn: 'Mộc (Cây dương liễu)', description: 'Mềm mại ngoài mặt nhưng dẻo dai bên trong, giỏi giao tế.' },
  'QUY_MUI_GOAT': { menh: 'Dương Liễu Mộc', element: 'MOC', elementVn: 'Mộc (Cây dương liễu)', description: 'Nhã nhặn, nhân ái, hiểu lòng người và giàu lòng vị tha.' },
  'GIAP_THAN_MONKEY': { menh: 'Tuyền Trung Thủy', element: 'THUY', elementVn: 'Thủy (Nước trong suối)', description: 'Trong lành, liên tục chảy, tư duy mạch lạc và trí tuệ uyên thâm.' },
  'AT_DAU_ROOSTER': { menh: 'Tuyền Trung Thủy', element: 'THUY', elementVn: 'Thủy (Nước trong suối)', description: 'Tĩnh lặng nhưng sâu sắc, biết nhìn xa trông rộng.' },
  'BINH_TUAT_DOG': { menh: 'Ốc Thượng Thổ', element: 'THO', elementVn: 'Thổ (Đất trên nóc nhà)', description: 'Bảo bọc, che chắn gió mưa, tinh thần trách nhiệm gia đình cao.' },
  'DINH_HOI_PIG': { menh: 'Ốc Thượng Thổ', element: 'THO', elementVn: 'Thổ (Đất trên nóc nhà)', description: 'Phúc hậu, an phận thủ thường, cuộc sống ấm êm bình dị.' },
  'MAU_TY_RAT': { menh: 'Tích Lịch Hỏa', element: 'HOA', elementVn: 'Hỏa (Lửa sấm sét)', description: 'Khí phách kinh người, hành động thần tốc, bứt phá phi thường.' },
  'KY_SUU_OX': { menh: 'Tích Lịch Hỏa', element: 'HOA', elementVn: 'Hỏa (Lửa sấm sét)', description: 'Bộc trực, dũng cảm, dám đương đầu với thử thách lớn.' },
  'CANH_DAN_TIGER': { menh: 'Tùng Bách Mộc', element: 'MOC', elementVn: 'Mộc (Cây tùng bách)', description: 'Kiên cường trước bão táp, chính nhân quân tử, cốt cách thanh cao.' },
  'TAN_MAO_CAT': { menh: 'Tùng Bách Mộc', element: 'MOC', elementVn: 'Mộc (Cây tùng bách)', description: 'Bền bỉ, tự trọng cao, không bao giờ khuất phục trước gian khó.' },
  'NHAM_THIN_DRAGON': { menh: 'Trường Lưu Thủy', element: 'THUY', elementVn: 'Thủy (Nước sông dài)', description: 'Dòng chảy bất tận, hoài bão lớn lao, ý chí bền bỉ vượt trùng khơi.' },
  'QUY_TY_SNAKE': { menh: 'Trường Lưu Thủy', element: 'THUY', elementVn: 'Thủy (Nước sông dài)', description: 'Tâm trí sâu rộng, mưu trí linh hoạt, biết tiến biết thoái.' },
  'GIAP_NGO_HORSE': { menh: 'Sa Trung Kim', element: 'KIM', elementVn: 'Kim (Vàng trong cát)', description: 'Khoáng đạt, cần mẫn lọc cát tìm vàng, hậu vận sung túc.' },
  'AT_MUI_GOAT': { menh: 'Sa Trung Kim', element: 'KIM', elementVn: 'Kim (Vàng trong cát)', description: 'Khiêm tốn, giàu tiềm năng, càng trải nghiệm càng tỏa sáng.' },
  'BINH_THAN_MONKEY': { menh: 'Sơn Hạ Hỏa', element: 'HOA', elementVn: 'Hỏa (Lửa dưới núi)', description: 'Ấm áp, rực rỡ kín đáo, có duyên nghệ thuật và văn chương.' },
  'DINH_DAU_ROOSTER': { menh: 'Sơn Hạ Hỏa', element: 'HOA', elementVn: 'Hỏa (Lửa dưới núi)', description: 'Nhiệt thành, chu đáo, làm việc có tâm và trọng chữ tín.' },
  'MAU_TUAT_DOG': { menh: 'Bình Địa Mộc', element: 'MOC', elementVn: 'Mộc (Cây đồng bằng)', description: 'Gần gũi, hòa đồng, sức sống mãnh liệt, dễ gây dựng cơ nghiệp.' },
  'KY_HOI_PIG': { menh: 'Bình Địa Mộc', element: 'MOC', elementVn: 'Mộc (Cây đồng bằng)', description: 'Chất phác, chân thành, cuộc đời nhiều may mắn và an lành.' },
  'CANH_TY_RAT': { menh: 'Bích Thượng Thổ', element: 'THO', elementVn: 'Thổ (Đất trên vách)', description: 'Kiên cố, ngăn gió che sương, tính tình cẩn mật và đáng tin.' },
  'TAN_SUU_OX': { menh: 'Bích Thượng Thổ', element: 'THO', elementVn: 'Thổ (Đất trên vách)', description: 'Trách nhiệm, trung thành, luôn hết lòng vì gia đình và tổ chức.' },
  'NHAM_DAN_TIGER': { menh: 'Kim Bạc Kim', element: 'KIM', elementVn: 'Kim (Vàng dát mỏng)', description: 'Mỹ lệ, trang nhã, có khiếu thẩm mỹ và phong thái quý phái.' },
  'QUY_MAO_CAT': { menh: 'Kim Bạc Kim', element: 'KIM', elementVn: 'Kim (Vàng dát mỏng)', description: 'Lịch thiệp, tinh tế, ứng xử mềm mỏng thu phục lòng người.' },
  'GIAP_THIN_DRAGON': { menh: 'Phúc Đăng Hỏa', element: 'HOA', elementVn: 'Hỏa (Lửa đèn dầu)', description: 'Soi sáng đêm tối, mang lại sự ấm áp và định hướng cho người khác.' },
  'AT_TY_SNAKE': { menh: 'Phúc Đăng Hỏa', element: 'HOA', elementVn: 'Hỏa (Lửa đèn dầu)', description: 'Sáng suốt, nhân hậu, thích giúp đỡ và soi đường cho người yếu thế.' },
  'BINH_NGO_HORSE': { menh: 'Thiên Hà Thủy', element: 'THUY', elementVn: 'Thủy (Nước trên trời / Mưa)', description: 'Tưới mát vạn vật, hào sảng phóng khoáng, tâm hồn rộng mở.' },
  'DINH_MUI_GOAT': { menh: 'Thiên Hà Thủy', element: 'THUY', elementVn: 'Thủy (Nước trên trời / Mưa)', description: 'Nhân ái bao la, sẵn sàng chia sẻ, có phúc khí trường cửu.' },
  'MAU_THAN_MONKEY': { menh: 'Đại Trạch Thổ', element: 'THO', elementVn: 'Thổ (Đất đầm lầy)', description: 'Màu mỡ phì nhiêu, bao dung tiếp nhận mọi dòng chảy biến thiên.' },
  'KY_DAU_ROOSTER': { menh: 'Đại Trạch Thổ', element: 'THO', elementVn: 'Thổ (Đất đầm lầy)', description: 'Thực tế, vững vàng, có năng lực chuyển hóa khó khăn thành cơ hội.' },
  'CANH_TUAT_DOG': { menh: 'Thoa Xuyến Kim', element: 'KIM', elementVn: 'Kim (Vàng trang sức)', description: 'Quý giá, cao quý, tỏa sáng trong đám đông, trọng danh dự.' },
  'TAN_HOI_PIG': { menh: 'Thoa Xuyến Kim', element: 'KIM', elementVn: 'Kim (Vàng trang sức)', description: 'Duyên dáng, có tài năng nổi bật, cuộc sống phong lưu nhã nhặn.' },
  'NHAM_TY_RAT': { menh: 'Tang Đố Mộc', element: 'MOC', elementVn: 'Mộc (Cây dâu tằm)', description: 'Cống hiến tận tụy, đem lại giá trị cho đời (nhả tơ dệt lụa).' },
  'QUY_SUU_OX': { menh: 'Tang Đố Mộc', element: 'MOC', elementVn: 'Mộc (Cây dâu tằm)', description: 'Chăm chỉ, cần mẫn, chịu thương chịu khó vì tương lai con cái.' },
  'GIAP_DAN_TIGER': { menh: 'Đại Khê Thủy', element: 'THUY', elementVn: 'Thủy (Nước khe lớn)', description: 'Dòng nước ào ạt, khí thế dồi dào, tư duy sáng tạo không giới hạn.' },
  'AT_MAO_CAT': { menh: 'Đại Khê Thủy', element: 'THUY', elementVn: 'Thủy (Nước khe lớn)', description: 'Hoạt bát, thông tuệ, thích khám phá và mở rộng giao lưu học hỏi.' },
  'BINH_THIN_DRAGON': { menh: 'Sa Trung Thổ', element: 'THO', elementVn: 'Thổ (Đất pha cát)', description: 'Biến hóa linh hoạt, kết hợp thực tế và sáng tạo, hậu vận phát đạt.' },
  'DINH_TY_SNAKE': { menh: 'Sa Trung Thổ', element: 'THO', elementVn: 'Thổ (Đất pha cát)', description: 'Nhạy bén, điềm đạm, có chí tiến thủ cao và tính tự lập mạnh.' },
  'MAU_NGO_HORSE': { menh: 'Thiên Thượng Hỏa', element: 'HOA', elementVn: 'Hỏa (Lửa trên trời / Thái Dương)', description: 'Quang minh chính đại, uy quyền tỏa sáng, tính tình khảng khái.' },
  'KY_MUI_GOAT': { menh: 'Thiên Thượng Hỏa', element: 'HOA', elementVn: 'Hỏa (Lửa trên trời / Thái Dương)', description: 'Nhiệt tâm, hào phóng, có năng lực truyền cảm hứng mạnh mẽ.' },
  'CANH_THAN_MONKEY': { menh: 'Thạch Lựu Mộc', element: 'MOC', elementVn: 'Mộc (Cây thạch lựu)', description: 'Cứng cỏi, kiên cường, sinh sôi trên sỏi đá, ý chí phi thường.' },
  'TAN_DAU_ROOSTER': { menh: 'Thạch Lựu Mộc', element: 'MOC', elementVn: 'Mộc (Cây thạch lựu)', description: 'Bản lĩnh, tự cường, vượt qua mọi nghịch cảnh để đơm hoa kết trái.' },
  'NHAM_TUAT_DOG': { menh: 'Đại Hải Thủy', element: 'THUY', elementVn: 'Thủy (Nước biển lớn)', description: 'Bao la vô tận, chí khí ngút ngàn, có tầm nhìn vĩ mô.' },
  'QUY_HOI_PIG': { menh: 'Đại Hải Thủy', element: 'THUY', elementVn: 'Thủy (Nước biển lớn)', description: 'Hào sảng, quảng đại, thu nạp muôn sông, tương lai rực rỡ.' },
};

// 2. CHỦ MỆNH & CHỦ THÂN THEO CHI NĂM SINH
export const CHU_MENH_MAP: Record<string, string> = {
  TY_RAT: 'Tham Lang',
  SUU_OX: 'Cự Môn',
  DAN_TIGER: 'Lộc Tồn',
  MAO_CAT: 'Văn Khúc',
  THIN_DRAGON: 'Liêm Trinh',
  TY_SNAKE: 'Vũ Khúc',
  NGO_HORSE: 'Phá Quân',
  MUI_GOAT: 'Vũ Khúc',
  THAN_MONKEY: 'Liêm Trinh',
  DAU_ROOSTER: 'Văn Khúc',
  TUAT_DOG: 'Lộc Tồn',
  HOI_PIG: 'Cự Môn',
};

export const CHU_THAN_MAP: Record<string, string> = {
  TY_RAT: 'Hỏa Tinh',
  SUU_OX: 'Thiên Tướng',
  DAN_TIGER: 'Thiên Lương',
  MAO_CAT: 'Thiên Đồng',
  THIN_DRAGON: 'Văn Xương',
  TY_SNAKE: 'Thiên Cơ',
  NGO_HORSE: 'Hỏa Tinh',
  MUI_GOAT: 'Thiên Tướng',
  THAN_MONKEY: 'Thiên Lương',
  DAU_ROOSTER: 'Thiên Đồng',
  TUAT_DOG: 'Văn Xương',
  HOI_PIG: 'Thiên Cơ',
};

// 3. THÂN CƯ THEO GIỜ SINH
export const THAN_CU_DETAILS: Record<
  string,
  {
    cung: string;
    title: string;
    layman: string;
    advice: string;
  }
> = {
  TY_RAT: {
    cung: 'Thân cư Mệnh',
    title: 'Người Tự Lực Cánh Sinh & Nhất Quán Vận Mệnh',
    layman: 'Sinh giờ Tý (hoặc Ngọ), bạn có cung Thân đồng cung với Mệnh. Điều này thể hiện tính cách nhất quán từ trẻ đến già: độc lập, tự chủ, tự mình định đoạt đường đời mà không ỷ lại vào hoàn cảnh hay người khác.',
    advice: 'Phát huy tính tự lập; học cách linh hoạt lắng nghe thêm ý kiến xung quanh để tránh trở nên cô độc.',
  },
  NGO_HORSE: {
    cung: 'Thân cư Mệnh',
    title: 'Người Tự Lực Cánh Sinh & Nhất Quán Vận Mệnh',
    layman: 'Sinh giờ Ngọ (hoặc Tý), bạn có cung Thân ngụ tại cung Mệnh. Bạn có bản lĩnh tự quyết cao, tự mình gánh vác trách nhiệm cuộc đời, hậu vận là sự tiếp nối trực tiếp từ những gì bạn gây dựng thời thanh xuân.',
    advice: 'Giữ vững ý chí kiên định; xây dựng nội lực và kiến thức vững bền để làm chủ mọi bước ngoặt.',
  },
  SUU_OX: {
    cung: 'Thân cư Phúc Đức',
    title: 'Người Coi Trọng Đời Sống Tâm Linh & Phúc Ấm Gia Tộc',
    layman: 'Sinh giờ Sửu (hoặc Mùi), hậu vận của bạn gắn liền với cung Phúc Đức. Bạn rất coi trọng dòng họ, tổ tiên, đời sống tinh thần và luôn hướng về sự bình an nội tâm. Phúc đức tốt sẽ giúp bạn dễ vượt qua mọi tai ương lúc về già.',
    advice: 'Tích đức hành thiện, chăm lo phần mộ tổ tiên và đối đãi bao dung với người thân trong dòng tộc.',
  },
  MUI_GOAT: {
    cung: 'Thân cư Phúc Đức',
    title: 'Người Coi Trọng Đời Sống Tâm Linh & Phúc Ấm Gia Tộc',
    layman: 'Sinh giờ Mùi, Thân cư Phúc Đức cho thấy tâm tư hậu vận hướng về sự thanh thản, tìm kiếm niềm vui tinh thần và sự chở che của tổ tiên. Bạn có duyên với các hoạt động thiện nguyện, tâm linh.',
    advice: 'Nuôi dưỡng tâm từ bi; tránh suy nghĩ lo âu viển vông để tâm trí luôn được thanh tịnh.',
  },
  DAN_TIGER: {
    cung: 'Thân cư Quan Lộc',
    title: 'Người Say Mê Sự Nghiệp & Danh Vọng Xã Hội',
    layman: 'Sinh giờ Dần (hoặc Thân), bạn xem công việc và sự nghiệp là lẽ sống lớn nhất. Càng nhiều tuổi, bạn càng dốc tâm sức cho công danh, thích đóng góp cho tổ chức và khẳng định vị thế chuyên môn.',
    advice: 'Cân bằng giữa công việc và gia đình; tránh để áp lực danh vọng làm xáo trộn sức khỏe và đời sống tình cảm.',
  },
  THAN_MONKEY: {
    cung: 'Thân cư Quan Lộc',
    title: 'Người Say Mê Sự Nghiệp & Danh Vọng Xã Hội',
    layman: 'Sinh giờ Thân, Thân cư Quan Lộc cho thấy cuộc đời bạn gắn chặt với trách nhiệm nghề nghiệp. Bạn luôn muốn thăng tiến, tự tay tạo dựng thành tựu vững chắc trong sự nghiệp.',
    advice: 'Kiên trì theo đuổi chuyên môn mũi nhọn; xây dựng uy tín bằng thực lực và đạo đức nghề nghiệp.',
  },
  MAO_CAT: {
    cung: 'Thân cư Thiên Di',
    title: 'Người Hướng Ngoại, Hợp Lập Nghiệp Phương Xa & Xuất Ngoại',
    layman: 'Sinh giờ Mão (hoặc Dậu), cung Thân ngụ tại Thiên Di. Bạn có xu hướng thích di chuyển, đi lại nhiều, có duyên lập nghiệp xa quê hương hoặc thường xuyên công tác, xuất ngoại. Môi trường xã hội bên ngoài mang lại nhiều cơ hội lớn cho bạn.',
    advice: 'Mạnh dạn bước ra biển lớn; mở rộng quan hệ đối ngoại và luôn giữ sự cẩn trọng khi đi đường dài.',
  },
  DAU_ROOSTER: {
    cung: 'Thân cư Thiên Di',
    title: 'Người Hướng Ngoại, Hợp Lập Nghiệp Phương Xa & Xuất Ngoại',
    layman: 'Sinh giờ Dậu, bạn phát triển mạnh mẽ nhất khi hòa mình vào đời sống xã hội bên ngoài. Ở quê nhà dễ bị gò bó, đi xa lại gặp nhiều cơ hội và quý nhân nâng đỡ.',
    advice: 'Thích ứng linh hoạt với văn hóa mới; chọn đối tác uy tín khi hợp tác kinh doanh ở phương xa.',
  },
  THIN_DRAGON: {
    cung: 'Thân cư Tài Bạch',
    title: 'Người Thực Tế, Nhạy Bén Tài Chính & Tích Lũy Của Cải',
    layman: 'Sinh giờ Thìn (hoặc Tuất), hậu vận bạn rất quan tâm đến dòng tiền, quản trị tài sản và sự an toàn kinh tế. Bạn có tư duy đầu tư thực tế, luôn trăn trở làm sao để cuộc sống vật chất của gia đình được đủ đầy.',
    advice: 'Đầu tư an toàn dài hạn; không nên quá đặt nặng tiền bạc mà quên đi những giá trị tình cảm vô giá.',
  },
  TUAT_DOG: {
    cung: 'Thân cư Tài Bạch',
    title: 'Người Thực Tế, Nhạy Bén Tài Chính & Tích Lũy Của Cải',
    layman: 'Sinh giờ Tuất, Thân cư Tài Bạch giúp bạn có năng khiếu tích lũy và quản lý tài chính. Hậu vận sung túc hay không phụ thuộc trực tiếp vào cách bạn gieo trồng nguồn lực kinh tế từ thời trung niên.',
    advice: 'Chi tiêu bài bản, tránh đầu cơ mạo hiểm; dùng tài chính làm phương tiện tạo ra hạnh phúc gia đình.',
  },
  TY_SNAKE: {
    cung: 'Thân cư Phu Thê',
    title: 'Người Nặng Tình Cảm & Hôn Nhân Chi Phối Vận Mệnh',
    layman: 'Sinh giờ Tỵ (hoặc Hợi), người bạn đời đóng vai trò then chốt trong sự nghiệp và tâm lý của bạn. Sau khi kết hôn, vận trình của bạn có bước ngoặt lớn; người bạn đời hỗ trợ rất nhiều cho bước tiến của bạn.',
    advice: 'Thấu hiểu, tôn trọng và đồng hành cùng bạn đời; sự hòa thuận trong gia đình là cội nguồn của mọi tài lộc.',
  },
  HOI_PIG: {
    cung: 'Thân cư Phu Thê',
    title: 'Người Nặng Tình Cảm & Hôn Nhân Chi Phối Vận Mệnh',
    layman: 'Sinh giờ Hợi, cung Thân ngụ tại Phu Thê cho thấy bạn là người rất trân trọng mái ấm gia đình. Hạnh phúc hôn nhân chính là thước đo thành công lớn nhất trong nửa sau cuộc đời bạn.',
    advice: 'Học cách nhường nhịn và lắng nghe bạn đời; biến tổ ấm thành hậu phương vững chắc nhất.',
  },
};

// 4. CÂN LƯỢNG CHỈ VIÊN THIÊN CƯƠNG (CÂN XƯƠNG TÍNH SỐ)
export interface CanLuongResult {
  luong: number;
  chi: number;
  totalText: string;
  poem: string;
  meaning: string;
}

const CAN_LUONG_YEAR: Record<string, number> = {
  'GIAP_TY_RAT': 12, 'AT_SUU_OX': 9, 'BINH_DAN_TIGER': 6, 'DINH_MAO_CAT': 7,
  'MAU_THIN_DRAGON': 12, 'KY_TY_SNAKE': 5, 'CANH_NGO_HORSE': 9, 'TAN_MUI_GOAT': 8,
  'NHAM_THAN_MONKEY': 7, 'QUY_DAU_ROOSTER': 8, 'GIAP_TUAT_DOG': 15, 'AT_HOI_PIG': 9,
  'BINH_TY_RAT': 16, 'DINH_SUU_OX': 8, 'MAU_DAN_TIGER': 8, 'KY_MAO_CAT': 19,
  'CANH_THIN_DRAGON': 12, 'TAN_TY_SNAKE': 6, 'NHAM_NGO_HORSE': 8, 'QUY_MUI_GOAT': 7,
  'GIAP_THAN_MONKEY': 5, 'AT_DAU_ROOSTER': 15, 'BINH_TUAT_DOG': 6, 'DINH_HOI_PIG': 16,
  'MAU_TY_RAT': 15, 'KY_SUU_OX': 7, 'CANH_DAN_TIGER': 9, 'TAN_MAO_CAT': 12,
  'NHAM_THIN_DRAGON': 10, 'QUY_TY_SNAKE': 7, 'GIAP_NGO_HORSE': 15, 'AT_MUI_GOAT': 6,
  'BINH_THAN_MONKEY': 5, 'DINH_DAU_ROOSTER': 14, 'MAU_TUAT_DOG': 14, 'KY_HOI_PIG': 9,
  'CANH_TY_RAT': 7, 'TAN_SUU_OX': 7, 'NHAM_DAN_TIGER': 9, 'QUY_MAO_CAT': 12,
  'GIAP_THIN_DRAGON': 8, 'AT_TY_SNAKE': 7, 'BINH_NGO_HORSE': 8, 'DINH_MUI_GOAT': 5,
  'MAU_THAN_MONKEY': 14, 'KY_DAU_ROOSTER': 5, 'CANH_TUAT_DOG': 9, 'TAN_HOI_PIG': 17,
  'NHAM_TY_RAT': 5, 'QUY_SUU_OX': 7, 'GIAP_DAN_TIGER': 12, 'AT_MAO_CAT': 8,
  'BINH_THIN_DRAGON': 6, 'DINH_TY_SNAKE': 8, 'MAU_NGO_HORSE': 19, 'KY_MUI_GOAT': 6,
  'CANH_THAN_MONKEY': 8, 'TAN_DAU_ROOSTER': 16, 'NHAM_TUAT_DOG': 10, 'QUY_HOI_PIG': 7,
};

const CAN_LUONG_MONTH: Record<number, number> = {
  1: 6, 2: 7, 3: 18, 4: 9, 5: 5, 6: 16, 7: 9, 8: 15, 9: 18, 10: 8, 11: 9, 12: 5,
};

const CAN_LUONG_DAY: Record<number, number> = {
  1: 5, 2: 10, 3: 8, 4: 15, 5: 16, 6: 15, 7: 8, 8: 16, 9: 8, 10: 16,
  11: 9, 12: 17, 13: 8, 14: 17, 15: 10, 16: 8, 17: 9, 18: 18, 19: 5, 20: 15,
  21: 10, 22: 9, 23: 8, 24: 9, 25: 15, 26: 18, 27: 7, 28: 8, 29: 16, 30: 6,
};

const CAN_LUONG_HOUR: Record<string, number> = {
  TY_RAT: 16, SUU_OX: 6, DAN_TIGER: 7, MAO_CAT: 10,
  THIN_DRAGON: 9, TY_SNAKE: 16, NGO_HORSE: 10, MUI_GOAT: 8,
  THAN_MONKEY: 8, DAU_ROOSTER: 9, TUAT_DOG: 6, HOI_PIG: 6,
};

export function calculateCanLuong(
  yearStem: string,
  yearBranch: string,
  lunarMonth: number,
  lunarDay: number,
  hourBranch: string
): CanLuongResult {
  const key = `${yearStem}_${yearBranch}`;
  const yVal = CAN_LUONG_YEAR[key] ?? 10;
  const mVal = CAN_LUONG_MONTH[lunarMonth] ?? 8;
  const dVal = CAN_LUONG_DAY[lunarDay] ?? 10;
  const hVal = CAN_LUONG_HOUR[hourBranch] ?? 8;

  const totalPoints = yVal + mVal + dVal + hVal;
  const luong = Math.floor(totalPoints / 10);
  const chi = totalPoints % 10;

  const totalText = `${luong} Lượng ${chi} Chỉ`;

  let poem = 'Số này tiền vận lao đao, hậu vận phát đạt giàu sang ấm êm.';
  let meaning = 'Vận số trung bình khá, tự lực cánh sinh, tích đức thiện tâm hậu vận sẽ phú túc, con cháu hiển vinh.';

  if (luong >= 5) {
    poem = 'Phúc lộc trời ban rạng rỡ nhà, tiền tài danh vọng tiếng gần xa.';
    meaning = 'Mệnh số quý cách, thông minh mưu lược, dễ thành công lớn trên thương trường hoặc chính giới, cả đời hưởng vinh hoa phú quý.';
  } else if (luong === 4) {
    poem = 'Trước khó sau thông định lẽ trời, siêng năng tích lũy rạng tương lai.';
    meaning = 'Tiền vận trải qua rèn luyện thử thách, trung niên vững vàng cơ nghiệp, hậu vận an nhàn hưởng phúc lộc bền lâu.';
  } else {
    poem = 'Tự lập thân mình chớ thở than, cần cù vượt khó ắt bình an.';
    meaning = 'Cần cù bù thông minh, nên tích đức làm việc thiện, tránh đầu tư mạo hiểm, hậu vận con cháu hiếu thảo an hòa.';
  }

  return { luong, chi, totalText, poem, meaning };
}

// 5. TƯƠNG QUAN MỆNH VÀ CỤC
export function evaluateMenhCucRelation(
  menhElement: 'KIM' | 'MOC' | 'THUY' | 'HOA' | 'THO',
  cucElement: string
): {
  type: 'CUC_SINH_MENH' | 'MENH_SINH_CUC' | 'MENH_CUC_TY_HOA' | 'MENH_KHAC_CUC' | 'CUC_KHAC_MENH';
  title: string;
  relationVn: string;
  description: string;
  advice: string;
} {
  // Cục ngũ hành
  let cEl = 'THO';
  if (cucElement.includes('Kim')) cEl = 'KIM';
  else if (cucElement.includes('Thủy')) cEl = 'THUY';
  else if (cucElement.includes('Hỏa')) cEl = 'HOA';
  else if (cucElement.includes('Mộc')) cEl = 'MOC';
  else if (cucElement.includes('Thổ')) cEl = 'THO';

  if (
    (cEl === 'THUY' && menhElement === 'MOC') ||
    (cEl === 'MOC' && menhElement === 'HOA') ||
    (cEl === 'HOA' && menhElement === 'THO') ||
    (cEl === 'THO' && menhElement === 'KIM') ||
    (cEl === 'KIM' && menhElement === 'THUY')
  ) {
    return {
      type: 'CUC_SINH_MENH',
      title: 'Cục Sinh Mệnh — Thuận Thiên Ứng Thời (Đại Cát)',
      relationVn: `${cucElement} sinh ${menhElement} Mệnh`,
      description: 'Hoàn cảnh xã hội và môi trường sống nuôi dưỡng, dung nạp bản mệnh của bạn. Bạn sinh ra gặp nhiều may mắn, dễ được quý nhân nâng đỡ, hoàn cảnh khách quan thường tạo điều kiện thuận lợi để bạn phát huy tài năng.',
      advice: 'Biết nắm bắt thời cơ vàng khi hoàn cảnh ưu đãi; giữ sự khiêm tốn và tích cực giúp đỡ người khác để phước báu trường tồn.',
    };
  }

  if (
    (menhElement === 'THUY' && cEl === 'MOC') ||
    (menhElement === 'MOC' && cEl === 'HOA') ||
    (menhElement === 'HOA' && cEl === 'THO') ||
    (menhElement === 'THO' && cEl === 'KIM') ||
    (menhElement === 'KIM' && cEl === 'THUY')
  ) {
    return {
      type: 'MENH_SINH_CUC',
      title: 'Mệnh Sinh Cục — Cống Hiến & Tận Tụy Khởi Nghiệp',
      relationVn: `${menhElement} Mệnh sinh ${cucElement}`,
      description: 'Bản thân bạn phải hao tâm tổn tứ cống hiến cho công việc và môi trường xung quanh trước khi được đền đáp. Bạn là mẫu người giàu tinh thần trách nhiệm, sẵn sàng hy sinh vì tập thể.',
      advice: 'Chú trọng chăm sóc sức khỏe và phân bổ năng lượng hợp lý; không nên ôm đồm gánh vác thay việc của người khác quá mức.',
    };
  }

  if (menhElement === cEl) {
    return {
      type: 'MENH_CUC_TY_HOA',
      title: 'Mệnh Cục Tỷ Hòa — Bình Ổn & Tự Lực Vững Vàng',
      relationVn: `${menhElement} Mệnh đồng hành ${cucElement}`,
      description: 'Môi trường sống và bản ngã của bạn tương thích hài hòa. Bạn dễ hòa nhập với tập thể, cuộc sống tương đối bình ổn, làm bao nhiêu hưởng bấy nhiêu, không bị chèn ép nhưng cũng cần tự lực phấn đấu.',
      advice: 'Chủ động trau dồi chuyên môn và mở rộng các mối quan hệ chất lượng để bứt phá lên tầm cao mới.',
    };
  }

  if (
    (menhElement === 'KIM' && cEl === 'MOC') ||
    (menhElement === 'MOC' && cEl === 'THO') ||
    (menhElement === 'THO' && cEl === 'THUY') ||
    (menhElement === 'THUY' && cEl === 'HOA') ||
    (menhElement === 'HOA' && cEl === 'KIM')
  ) {
    return {
      type: 'MENH_KHAC_CUC',
      title: 'Mệnh Khắc Cục — Bản Lĩnh Vượt Khó & Chinh Phục Nghịch Cảnh',
      relationVn: `${menhElement} Mệnh khắc ${cucElement}`,
      description: 'Bạn là người có cá tính mạnh mẽ, không cam chịu số phận và luôn tìm cách xoay chuyển hoàn cảnh theo ý mình. Mọi thành quả của bạn đều phải trải qua đấu tranh và nỗ lực phi thường mới đạt được.',
      advice: 'Học cách mềm mỏng trong đối nhân xử thế; kết hợp ngọn lửa nhiệt huyết với sự kiên nhẫn để tránh hao tổn sinh lực.',
    };
  }

  // Cục khắc Mệnh
  return {
    type: 'CUC_KHAC_MENH',
    title: 'Cục Khắc Mệnh — Tôi Luyện Ý Chí Qua Thăng Trầm',
    relationVn: `${cucElement} khắc ${menhElement} Mệnh`,
    description: 'Hoàn cảnh sống thường đặt ra nhiều thử thách và biến cố đối với bạn. Tuy nhiên, nếu biết nhẫn nại tôi luyện, những nghịch cảnh này sẽ tôi luyện bạn thành người có bản lĩnh phi thường.',
    advice: 'Kiên trì tu tâm tích đức, giữ tâm thái bình thản trước mọi phong ba bão táp; tích lũy thực lực chờ đợi thời cơ thuận lợi.',
  };
}

// 6. PHẨM CẤP & KHÍ THẾ 12 CUNG THEO CÁT TINH / SÁT TINH
export interface PalaceScoreResult {
  score: number;
  rank: 'CỰC TỐT' | 'TỐT' | 'BÌNH HÒA' | 'CẦN LƯU TÂM';
  rankBadge: 'Đắc Cách' | 'Cát Hội' | 'Bình Hòa' | 'Thử Thách';
  rankColor: string;
  summary: string;
  auspiciousFactors: string[];
  challengingFactors: string[];
  evidence: string;
}

export function calculatePalaceScore(_palaceKey: string, palaceData: any): PalaceScoreResult {
  let score = 65; // Điểm quy chuẩn cơ sở
  const auspiciousFactors: string[] = [];
  const challengingFactors: string[] = [];

  const stars = palaceData.stars || [];
  const mainStars = stars.filter((s: any) => s.isMain);

  // Main stars bonus/penalty
  for (const ms of mainStars) {
    const code = ms.code.toUpperCase();
    const starName = ms.name || code;
    if (['TU_VI', 'THIEN_PHU', 'THAI_DUONG', 'THAI_AM', 'VU_KHUC'].includes(code)) {
      score += 15;
      auspiciousFactors.push(`Chính tinh đế vương/tài tinh: ${starName}`);
    } else if (['THIEN_TUONG', 'THIEN_LUONG', 'THIEN_DONG', 'THIEN_CO'].includes(code)) {
      score += 10;
      auspiciousFactors.push(`Chính tinh trợ tinh thiện lương: ${starName}`);
    } else if (['THAT_SAT', 'PHA_QUAN', 'THAM_LANG', 'LIEM_TRINH'].includes(code)) {
      score += 8;
      auspiciousFactors.push(`Chính tinh võ nghiệp/biến động can trường: ${starName}`);
    } else {
      score += 6;
      auspiciousFactors.push(`Chính tinh: ${starName}`);
    }
  }

  if (mainStars.length === 0) {
    challengingFactors.push('Cung Vô Chính Diệu (cần xét cung xung chiếu & tam hợp)');
  }

  // Lucky stars (Khoa Quyền Lộc, Khôi Việt, Xương Khúc, Tả Hữu, Đào Hồng)
  for (const s of stars) {
    const c = s.code.toUpperCase();
    const name = s.name || c;
    if (['HOA_LOC', 'HOA_QUYEN', 'HOA_KHOA', 'LOC_TON'].includes(c)) {
      score += 8;
      auspiciousFactors.push(`Hóa tinh/Lộc tinh cát tường: ${name}`);
    }
    if (['THIEN_KHOI', 'THIEN_VIET', 'TA_PHU', 'HUU_BAT'].includes(c)) {
      score += 6;
      auspiciousFactors.push(`Quý tinh phò tá: ${name}`);
    }
    if (['VAN_XUONG', 'VAN_KHUC', 'LONG_TRI', 'PHUONG_CAC'].includes(c)) {
      score += 4;
      auspiciousFactors.push(`Văn tinh thông tuệ: ${name}`);
    }
    if (['THIEN_HY', 'DAO_HOA', 'HONG_LOAN'].includes(c)) {
      score += 4;
      auspiciousFactors.push(`Hỷ tinh/Đào hoa duyên phận: ${name}`);
    }

    // Sát tinh (Kình Đà Không Kiếp Hỏa Linh, Hóa Kỵ)
    if (['DIA_KHONG', 'DIA_KIEP'].includes(c)) {
      score -= 12;
      challengingFactors.push(`Đại sát tinh: ${name} (thăng trầm, biến động đột ngột)`);
    }
    if (['KINH_DUONG', 'DA_LA'].includes(c)) {
      score -= 8;
      challengingFactors.push(`Kình Đà sát diệu: ${name} (trở ngại, thử thách tính kiên nhẫn)`);
    }
    if (['HOA_TINH', 'LINH_TINH'].includes(c)) {
      score -= 6;
      challengingFactors.push(`Hỏa Linh sát diệu: ${name} (bốc đồng, hao tổn tâm lực)`);
    }
    if (c === 'HOA_KY') {
      score -= 8;
      challengingFactors.push(`Hóa Kỵ ám tinh (thị phi, hiểu lầm cần giữ mình)`);
    }
  }

  // Tuần Triệt effect
  if (palaceData.isTriet) {
    score = Math.max(45, score - 6);
    challengingFactors.push('Triệt Không án ngữ (chặn bớt lực sao, thử thách tiền vận)');
  }
  if (palaceData.isTuan) {
    score = Math.max(50, score - 4);
    challengingFactors.push('Tuần Trung Không Vong (bao bọc, làm chậm nhịp độ)');
  }

  score = Math.max(35, Math.min(98, score));

  let rank: 'CỰC TỐT' | 'TỐT' | 'BÌNH HÒA' | 'CẦN LƯU TÂM' = 'BÌNH HÒA';
  let rankBadge: 'Đắc Cách' | 'Cát Hội' | 'Bình Hòa' | 'Thử Thách' = 'Bình Hòa';
  let rankColor = 'text-accentGold';
  let summary = 'Cung vị ở thế quân bình cát hung, có trợ lực của quý tinh nhưng cũng có chướng ngại thử thách, cần nỗ lực bền bỉ.';

  if (score >= 82) {
    rank = 'CỰC TỐT';
    rankBadge = 'Đắc Cách';
    rankColor = 'text-accentGold';
    summary = 'Cung vị đắc cách hội tụ tinh diệu tôn quý, khí thế hưng vượng, nền tảng phát triển vô cùng vững chắc.';
  } else if (score >= 68) {
    rank = 'TỐT';
    rankBadge = 'Cát Hội';
    rankColor = 'text-parchment';
    summary = 'Cung vị có nền móng cát lành, các yếu tố hỗ trợ vượt trội hơn chướng ngại, mưu sự thuận lợi.';
  } else if (score < 55) {
    rank = 'CẦN LƯU TÂM';
    rankBadge = 'Thử Thách';
    rankColor = 'text-cinnabar';
    summary = 'Cung vị chịu áp lực từ sát tinh hoặc không vong án ngữ, cần lấy sự cẩn trọng và tu dưỡng bản lĩnh làm trọng.';
  }

  const evidence = `Chính tinh: ${mainStars.length > 0 ? mainStars.map((s: any) => s.name).join(', ') : 'Vô Chính Diệu'} | Cát tinh: ${auspiciousFactors.length} yếu tố | Sát tinh/chướng ngại: ${challengingFactors.length} yếu tố`;

  return { score, rank, rankBadge, rankColor, summary, auspiciousFactors, challengingFactors, evidence };
}

// 7. LUẬN GIẢI CHI TIẾT TỪNG SAO CHỦ ĐẠO
export const STAR_DETAILED_READINGS: Record<
  string,
  {
    title: string;
    nature: string;
    layman: string;
    strengths: string;
    cautions: string;
  }
> = {
  TU_VI: {
    title: 'Sao Tử Vi — Đế Tinh Tối Cao',
    nature: 'Âm Thổ, Nam Bắc Đẩu Tinh, Vua của các vì sao, chủ tước lộc và phúc thọ.',
    layman: 'Tử Vi là ngôi sao quyền uy và cao quý nhất trong Tử Vi Đẩu Số. Người có Tử Vi hội tụ thường có phong thái đàng hoàng, đĩnh đạc, được mọi người kính trọng và có tài năng lãnh đạo bẩm sinh.',
    strengths: 'Chính trực, bao dung, có tầm nhìn chiến lược, khả năng hóa giải tai ương vượt trội.',
    cautions: 'Cần tránh tự phụ, chuyên quyền hoặc xa cách quần chúng; nên lắng nghe ý kiến cộng sự.',
  },
  THIEN_PHU: {
    title: 'Sao Thiên Phủ — Kho Vàng Trời & Lệnh Tinh',
    nature: 'Dương Thổ, Nam Đẩu Tinh, Chưởng quản cung Tài Bạch & Điền Trạch, giữ kho của báu.',
    layman: 'Thiên Phủ tượng trưng cho kho tài sản kiên cố, tính tình điềm đạm, trọng danh dự và rất có tài quản trị tiền bạc. Cuộc sống của người có Thiên Phủ thường sung túc, hậu vận no đủ.',
    strengths: 'Quản lý tài chính cẩn trọng, uy tín vững vàng, sống chừng mực, gia đạo ấm êm.',
    cautions: 'Đôi khi quá bảo thủ, ngại mạo hiểm đổi mới dẫn đến bỏ lỡ những vận hội lớn.',
  },
  THAI_DUONG: {
    title: 'Sao Thái Dương — Mặt Trời Soi Sáng Nhân Gian',
    nature: 'Dương Hỏa, Nam Đẩu Tinh, Chủ về Quang Minh, Quan Lộc và người cha / người chồng.',
    layman: 'Thái Dương mang năng lượng của ánh sáng mặt trời: hào sảng, chính trực, nhiệt tình và thích giúp đỡ người khác mà không tính toán thiệt hơn. Thích hợp làm việc trong môi trường công chúng hoặc quản lý.',
    strengths: 'Quang minh lỗi lạc, giàu lòng nhân ái, nhiệt huyết lan tỏa, có uy tín xã hội cao.',
    cautions: 'Dễ nóng vội, làm việc theo cảm hứng nhất thời hoặc quá bộc trực gây mất lòng người khác.',
  },
  THAI_AM: {
    title: 'Sao Thái Âm — Mặt Trăng Dịu Dàng & Trực Giác Tinh Tế',
    nature: 'Âm Thủy, Bắc Đẩu Tinh, Chủ về Điền Sản, Tài Bạch và người mẹ / người vợ.',
    layman: 'Thái Âm đại diện cho vầng trăng rằm: dịu dàng, lãng mạn, thông minh và có trực giác thấu hiểu tâm lý cực nhạy. Người có Thái Âm thường yêu cái đẹp, khéo léo trong giao tiếp và tích lũy điền sản rất giỏi.',
    strengths: 'Trực giác bén nhạy, giàu tình cảm, có mắt thẩm mỹ, khả năng tích lũy tài sản bền vững.',
    cautions: 'Tâm trạng dễ dao động theo cảm xúc, hay suy nghĩ nhiều về đêm hoặc thiếu quyết đoán.',
  },
  VU_KHUC: {
    title: 'Sao Vũ Khúc — Tài Tinh Cương Trực & Năng Lực Hành Động',
    nature: 'Âm Kim, Bắc Đẩu Tinh, Chủ về Tài Bạch, tiền bạc và sự quả cảm.',
    layman: 'Vũ Khúc là thần tài thực tế và quả cảm. Người có sao này rất chăm chỉ, coi trọng chữ tín, làm việc dứt khoát và có đầu óc tính toán tài chính kinh doanh sắc bén.',
    strengths: 'Quyết đoán, kiên định, có năng khiếu kinh doanh và tài chính, nói ít làm nhiều.',
    cautions: 'Tính cách hơi khô khan, ít bộc lộ cảm xúc yêu thương, dễ bị hiểu lầm là lạnh lùng.',
  },
  THIEN_DONG: {
    title: 'Sao Thiên Đồng — Phúc Tinh Hỷ Lạc & Tâm Hồn Trong Sáng',
    nature: 'Dương Thủy, Nam Đẩu Tinh, Chủ về Phúc Đức, hòa nhã và niềm vui sống.',
    layman: 'Thiên Đồng là ngôi sao của sự trẻ trung, lạc quan và giàu lòng nhân ái. Người có Thiên Đồng dễ gần, biết tận hưởng cuộc sống, hay gặp may mắn và luôn tìm thấy niềm vui trong những điều giản dị.',
    strengths: 'Hòa nhã, thích nghi nhanh, tấm lòng thiện lương, hậu vận hưởng an nhàn phúc thọ.',
    cautions: 'Dễ cả thèm chóng chán, thiếu tính kỷ luật sắt đá khi gặp công việc khô khan, lặp lại.',
  },
  THIEN_TUONG: {
    title: 'Sao Thiên Tướng — Vị Tướng Quân Nhân Ái & Trượng Nghĩa',
    nature: 'Dương Thủy, Nam Đẩu Tinh, Chủ về Ấn Tín, công danh và lòng trung thành.',
    layman: 'Thiên Tướng là vị tể tướng trượng nghĩa, có phong thái đường hoàng, thích bênh vực kẻ yếu và có tinh thần trách nhiệm rất cao. Bạn là cánh tay đắc lực trong mọi tổ chức lớn.',
    strengths: 'Trung thực, lịch thiệp, có tài tổ chức và điều phối, uy tín cao trong tập thể.',
    cautions: 'Dễ nể nang người khác, khó từ chối những lời thỉnh cầu dẫn đến rước họa vào thân.',
  },
  THIEN_LUONG: {
    title: 'Sao Thiên Lương — Ấm Tinh Trưởng Bối & Lòng Từ Bi Bác Ái',
    nature: 'Dương Thổ, Nam Đẩu Tinh, Chủ về Thọ Mệnh, phúc thọ và sự che chở.',
    layman: 'Thiên Lương là bậc trưởng lão đức độ, có tâm hồn lương thiện, thích nghiên cứu triết lý, y học, giáo dục và giúp đỡ cộng đồng. Gặp nguy hiểm thường được quý nhân phù trợ tai qua nạn khỏi.',
    strengths: 'Nhân từ, thấu cảm sâu sắc, có tư chất người thầy, khả năng hóa giải nguy nan.',
    cautions: 'Đôi lúc có phần bảo thủ, hay giáo huấn người khác hoặc suy nghĩ quá nhiều về đạo lý.',
  },
  THAM_LANG: {
    title: 'Sao Tham Lang — Đào Hoa Tinh Đa Tài & Khao Khát Trải Nghiệm',
    nature: 'Dương Mộc / Âm Thủy, Bắc Đẩu Tinh, Chủ về Họa Phúc, dục vọng và nghệ thuật.',
    layman: 'Tham Lang là ngôi sao đa tài, đa nghệ, năng động và có sức hút quyến rũ đặc biệt. Bạn có nhiều tham vọng, thích trải nghiệm những điều mới lạ và rất giỏi nắm bắt tâm lý người khác.',
    strengths: 'Năng động, tài hoa, giao thiệp rộng rãi, khả năng thích ứng tuyệt vời.',
    cautions: 'Cần kiểm soát lòng tham và các thú vui nhất thời để không làm phân tán nguồn lực cốt lõi.',
  },
  CU_MON: {
    title: 'Sao Cự Môn — Ám Tinh Trí Tuệ, Hùng Biện & Tư Duy Phản Biện',
    nature: 'Âm Thủy, Bắc Đẩu Tinh, Chủ về Ngôn Ngữ, khẩu tài và sự phân tích sâu.',
    layman: 'Cự Môn là cánh cổng lớn của tri thức và ngôn từ. Người có Cự Môn có năng khiếu hùng biện, tư duy phản biện sắc sảo, thích tìm hiểu đến tận cội nguồn sự việc và có khả năng nghiên cứu sâu.',
    strengths: 'Ăn nói lưu loát, tư duy logic phản biện bén nhạy, quan sát tinh tế.',
    cautions: 'Dễ vướng vào thị phi khẩu thiệt do lời nói thẳng thắn; cần học cách uốn lưỡi trước khi nói.',
  },
  THAT_SAT: {
    title: 'Sao Thất Sát — Dũng Tướng Tiên Phong & Ý Chí Thép',
    nature: 'Dương Kim / Hỏa, Nam Đẩu Tinh, Chủ về Uy Quyền, sát phạt và đột phá.',
    layman: 'Thất Sát là thanh gươm báu xông pha trận mạc. Bạn có ý chí sắt đá, quyết đoán, dám nghĩ dám làm và không bao giờ chùn bước trước bất kỳ khó khăn thử thách nào.',
    strengths: 'Dũng cảm, quyết đoán, dám chịu trách nhiệm, khả năng đột phá xoay chuyển cục diện.',
    cautions: 'Tính cách có phần nóng nảy, độc đoán; cần rèn thêm sự điềm tĩnh và lắng nghe.',
  },
  PHA_QUAN: {
    title: 'Sao Phá Quân — Ngôi Sao Cách Mạng & Đổi Mới Toàn Diện',
    nature: 'Âm Thủy, Bắc Đẩu Tinh, Chủ về Hao Tán, phá cũ dựng mới và sáng tạo.',
    layman: 'Phá Quân là nhà cách mạng táo bạo, dám đập tan những lối mòn cũ kỹ để xây dựng lại từ đầu. Cuộc đời bạn thường trải qua những bước ngoặt lớn đầy kịch tính nhưng mang lại thành tựu rực rỡ.',
    strengths: 'Sáng tạo đột phá, không ngại thay đổi, ý chí quật cường, bản lĩnh tiên phong.',
    cautions: 'Tránh tính khí thất thường hoặc mạo hiểm thái quá; cần có kế hoạch dự phòng an toàn.',
  },
  LIEM_TRINH: {
    title: 'Sao Liêm Trinh — Tù Tinh Cương Nghị & Nguyên Tắc Sắt Đá',
    nature: 'Âm Hỏa, Bắc Đẩu Tinh, Chủ về Quan Lộc, pháp luật và sự liêm khiết.',
    layman: 'Liêm Trinh đại diện cho sự liêm chính, kỷ luật thép và tinh thần trách nhiệm cao. Người có Liêm Trinh rất trọng chữ tín, làm việc nghiêm túc, có phong thái tự tin và năng lực quản lý xuất sắc.',
    strengths: 'Chính trực, nguyên tắc, mẫn cán, có óc quan sát và kỷ luật tự giác cao.',
    cautions: 'Đôi lúc quá khắt khe với bản thân và người xung quanh; cần mở lòng bao dung hơn.',
  },
  THIEN_CO: {
    title: 'Sao Thiên Cơ — Thiện Tinh Mưu Lược & Trí Tuệ Siêu Việt',
    nature: 'Âm Mộc, Nam Đẩu Tinh, Chủ về Trí Tuệ, mưu lược và sự linh hoạt.',
    layman: 'Thiên Cơ là quân sư thông thái, có bộ óc tính toán siêu việt, tiếp thu thông tin nhanh chóng và luôn có giải pháp cho mọi tình huống khó khăn. Thích hợp với công việc cố vấn, nghiên cứu, công nghệ.',
    strengths: 'Thông minh, quyền biến, sáng tạo, mưu lược sắc sảo, học một biết mười.',
    cautions: 'Dễ suy nghĩ quá nhiều dẫn đến căng thẳng thần kinh; cần tập trung hành động dứt khoát.',
  },
};

export const BRANCH_VN: Record<string, string> = {
  TY_RAT: 'Tý',
  SUU_OX: 'Sửu',
  DAN_TIGER: 'Dần',
  MAO_CAT: 'Mão',
  THIN_DRAGON: 'Thìn',
  TY_SNAKE: 'Tỵ',
  NGO_HORSE: 'Ngọ',
  MUI_GOAT: 'Mùi',
  THAN_MONKEY: 'Thân',
  DAU_ROOSTER: 'Dậu',
  TUAT_DOG: 'Tuất',
  HOI_PIG: 'Hợi',
  TY: 'Tý',
  SUU: 'Sửu',
  DAN: 'Dần',
  MAO: 'Mão',
  THIN: 'Thìn',
  NGO: 'Ngọ',
  MUI: 'Mùi',
  THAN: 'Thân',
  DAU: 'Dậu',
  TUAT: 'Tuất',
  HOI: 'Hợi',
};

export const STEM_VN: Record<string, string> = {
  GIAP: 'Giáp',
  AT: 'Ất',
  BINH: 'Bính',
  DINH: 'Đinh',
  MAU: 'Mậu',
  KY: 'Kỷ',
  CANH: 'Canh',
  TAN: 'Tân',
  NHAM: 'Nhâm',
  QUY: 'Quý',
};

export const PALACE_VN: Record<string, string> = {
  MENH: 'MỆNH',
  PHU_MAU: 'PHỤ MẪU',
  PHUC_DUC: 'PHÚC ĐỨC',
  DIEN_TRACH: 'ĐIỀN TRẠCH',
  QUAN_LOC: 'QUAN LỘC',
  NO_BOC: 'NÔ BỘC',
  THIEN_DI: 'THIÊN DI',
  TAT_ACH: 'TẬT ÁCH',
  TAI_BACH: 'TÀI BẠCH',
  TU_TUC: 'TỬ TỨC',
  PHU_THE: 'PHU THÊ',
  HUYNH_DE: 'HUYNH ĐỆ',
};

export const PALACE_INFO: Record<
  string,
  {
    meaning: string;
    beginnerGuide: string;
    coreAdvice: string;
    challenges: string;
  }
> = {
  MENH: {
    meaning: 'Cốt cách, bản tính, tư chất và vận mệnh tổng quan cả đời',
    beginnerGuide:
      'Cung Mệnh là cung quan trọng nhất trong lá số Tử Vi, ví như gốc rễ của một cái cây. Nó quyết định diện mạo, tính khí bẩm sinh, tài năng và khả năng vượt qua nghịch cảnh của bạn.',
    coreAdvice:
      'Bạn sở hữu nội lực thâm hậu, chữ tín cao và khả năng dẫn dắt tốt. Hãy kiên định với mục tiêu dài hạn và luôn trau dồi tri thức.',
    challenges: 'Đôi khi quá nguyên tắc hoặc tự tạo áp lực lớn cho bản thân.',
  },
  PHU_MAU: {
    meaning: 'Tình cảm với cha mẹ, phúc ấm gia đình và sự nâng đỡ của bậc tiền bối',
    beginnerGuide:
      'Cung Phụ Mẫu phản ánh sự gắn kết giữa bạn và đấng sinh thành, mức độ thừa hưởng phúc đức, giáo dục gia đình và sự trợ giúp của cấp trên.',
    coreAdvice:
      'Hiếu kính với cha mẹ và luôn lắng nghe lời chỉ dạy từ những người đi trước giàu kinh nghiệm để tránh vấp ngã.',
    challenges: 'Khoảng cách thế hệ đôi lúc gây bất đồng quan điểm, cần kiên nhẫn đối thoại.',
  },
  PHUC_DUC: {
    meaning: 'Phúc phận tổ tiên, đời sống tinh thần và sự an lạc tâm hồn',
    beginnerGuide:
      'Cung Phúc Đức là linh hồn của lá số, quyết định bạn có được an vui, may mắn lúc hoạn nạn hay không. Phúc Đức tốt có thể hóa giải nhiều tai ương.',
    coreAdvice:
      'Tích đức hành thiện, giữ tâm hồn thanh thản, chăm sóc gia tiên và nuôi dưỡng đời sống nội tâm phong phú.',
    challenges: 'Dễ suy nghĩ nhiều hoặc lo âu viển vông khi gặp nghịch cảnh.',
  },
  DIEN_TRACH: {
    meaning: 'Nhà cửa, đất đai, bất động sản và môi trường an cư',
    beginnerGuide:
      'Cung Điền Trạch cho biết khả năng tự mua nhà, tích lũy đất đai, nơi ăn chốn ở và phong thủy không gian sống của bạn.',
    coreAdvice:
      'Tích lũy tài sản an toàn, hướng đến việc sở hữu bất động sản dài hạn thay vì lướt sóng mạo hiểm.',
    challenges: 'Tránh tranh chấp giấy tờ pháp lý liên quan đến đất đai và tài sản gia đình.',
  },
  QUAN_LOC: {
    meaning: 'Công danh, sự nghiệp, học vấn và vị thế công việc',
    beginnerGuide:
      'Cung Quan Lộc xem đường học tập, thi cử, việc làm, cơ hội thăng tiến và phong cách làm việc chuyên môn của bạn.',
    coreAdvice:
      'Phát huy thế mạnh chuyên môn, kiên trì theo đuổi 1-2 lĩnh vực mũi nhọn để đạt vị trí vững chắc trong xã hội.',
    challenges: 'Tránh nôn nóng muốn thành công nhanh hoặc đứng núi này trông núi nọ.',
  },
  NO_BOC: {
    meaning: 'Bạn bè, đồng nghiệp, cấp dưới và các mối quan hệ xã giao',
    beginnerGuide:
      'Cung Nô Bộc (còn gọi là Cung Giao Hữu) phản ánh bạn bè xung quanh, thuộc cấp dưới quyền và những người bạn tiếp xúc thường nhật.',
    coreAdvice:
      'Chọn bạn mà chơi, đối đãi với cấp dưới và đồng nghiệp bằng sự công tâm, chân thành và tôn trọng.',
    challenges: 'Cẩn trọng với những lời tâng bốc và tránh cho vay mượn tiền bạc không minh bạch.',
  },
  THIEN_DI: {
    meaning: 'Giao tiếp xã hội bên ngoài, đi lại, xuất ngoại và cơ hội phương xa',
    beginnerGuide:
      'Cung Thiên Di đối chiếu trực tiếp với Cung Mệnh, phản ánh bạn khi bước chân ra xã hội: có được quý nhân giúp đỡ, có hợp xuất ngoại hay lập nghiệp phương xa.',
    coreAdvice:
      'Mạnh dạn bước ra thế giới, thích nghi linh hoạt với môi trường mới và mở rộng quan hệ đối ngoại.',
    challenges: 'Chú ý an toàn khi đi xa và cẩn thận trong việc ký kết các thỏa thuận bên ngoài.',
  },
  TAT_ACH: {
    meaning: 'Sức khỏe, thể trạng thể chất và các bệnh lý cần phòng ngừa',
    beginnerGuide:
      'Cung Tật Ách cho biết những cơ quan nội tạng dễ yếu ớt trong cơ thể và các rủi ro sức khỏe bạn cần chủ động phòng tránh.',
    coreAdvice:
      'Duy trì lối sống điều độ, khám sức khỏe định kỳ và rèn luyện thể dục thể thao mỗi ngày.',
    challenges: 'Tránh làm việc kiệt sức hoặc bỏ qua những dấu hiệu cảnh báo sớm của cơ thể.',
  },
  TAI_BACH: {
    meaning: 'Tiền tài, dòng tiền, cách kiếm tiền và khả năng tích lũy của cải',
    beginnerGuide:
      'Cung Tài Bạch xem nguồn tài lộc đến từ đâu, cách bạn chi tiêu và khả năng giữ tiền. Tiền bạc ở đây là tiền thực tế bạn làm ra.',
    coreAdvice:
      'Chi tiêu có kế hoạch, đa dạng hóa các nguồn thu nhập chính đáng và đầu tư dài hạn an toàn.',
    challenges: 'Tránh tâm lý ham giàu nhanh vào các canh bạc đầu cơ rủi ro cao.',
  },
  TU_TUC: {
    meaning: 'Con cái, đường sinh nở và sự thành đạt của thế hệ sau',
    beginnerGuide:
      'Cung Tử Tức phản ánh đường con cái, mức độ hiếu thảo, tính cách con trẻ và niềm vui bạn nhận được từ thế hệ tương lai.',
    coreAdvice:
      'Lắng nghe và làm bạn cùng con, đầu tư vào giáo dục nhân cách thay vì chỉ nuông chiều vật chất.',
    challenges: 'Không nên áp đặt kỳ vọng của cha mẹ lên ước mơ của con cái.',
  },
  PHU_THE: {
    meaning: 'Hôn nhân, tình cảm vợ chồng và phẩm hạnh người bạn đời',
    beginnerGuide:
      'Cung Phu Thê xem duyên nợ lứa đôi, tính cách và hoàn cảnh của người bạn đời, mức độ hòa thuận trong đời sống gia đình.',
    coreAdvice:
      'Tôn trọng sự khác biệt, bao dung với khuyết điểm của đối phương và duy trì sự đối thoại chân thành mỗi ngày.',
    challenges: 'Cái tôi quá lớn dễ dẫn đến tranh cãi vặt, cần người này nóng thì người kia nên nhịn.',
  },
  HUYNH_DE: {
    meaning: 'Anh chị em ruột thịt và tình cảm ruột thịt trong gia đình',
    beginnerGuide:
      'Cung Huynh Đệ phản ánh mối quan hệ giữa bạn và anh chị em ruột, mức độ nương tựa hỗ trợ lẫn nhau trong lúc khó khăn.',
    coreAdvice:
      'Gìn giữ tình cảm anh em hòa thuận, hỗ trợ lẫn nhau với tinh thần "lá lành đùm lá rách".',
    challenges: 'Phân định rạch ròi giữa tình cảm gia đình và lợi ích tiền bạc để tránh bất hòa.',
  },
};

// 8. TỨ HÓA THEO THIÊN CAN NĂM SINH
export const TU_HOA_TABLE: Record<
  string,
  { loc: string; quyen: string; khoa: string; ky: string }
> = {
  GIAP: { loc: 'LIEM_TRINH', quyen: 'PHA_QUAN', khoa: 'VU_KHUC', ky: 'THAI_DUONG' },
  AT: { loc: 'THIEN_CO', quyen: 'THIEN_LUONG', khoa: 'TU_VI', ky: 'THAI_AM' },
  BINH: { loc: 'THIEN_DONG', quyen: 'THIEN_CO', khoa: 'VAN_XUONG', ky: 'LIEM_TRINH' },
  DINH: { loc: 'THAI_AM', quyen: 'THIEN_DONG', khoa: 'THIEN_CO', ky: 'CU_MON' },
  MAU: { loc: 'THAM_LANG', quyen: 'THAI_AM', khoa: 'HUU_BAT', ky: 'THIEN_CO' },
  KY: { loc: 'VU_KHUC', quyen: 'THAM_LANG', khoa: 'THIEN_LUONG', ky: 'VAN_KHUC' },
  CANH: { loc: 'THAI_DUONG', quyen: 'VU_KHUC', khoa: 'THAI_AM', ky: 'THIEN_DONG' },
  TAN: { loc: 'CU_MON', quyen: 'THAI_DUONG', khoa: 'VAN_KHUC', ky: 'VAN_XUONG' },
  NHAM: { loc: 'THIEN_LUONG', quyen: 'TU_VI', khoa: 'THIEN_PHU', ky: 'VU_KHUC' },
  QUY: { loc: 'PHA_QUAN', quyen: 'CU_MON', khoa: 'THAI_AM', ky: 'THAM_LANG' },
};

export const STAR_NAME_VN: Record<string, string> = {
  TU_VI: 'Tử Vi',
  THIEN_PHU: 'Thiên Phủ',
  THAI_DUONG: 'Thái Dương',
  THAI_AM: 'Thái Âm',
  VU_KHUC: 'Vũ Khúc',
  THIEN_DONG: 'Thiên Đồng',
  THIEN_TUONG: 'Thiên Tướng',
  THIEN_LUONG: 'Thiên Lương',
  THAM_LANG: 'Tham Lang',
  CU_MON: 'Cự Môn',
  THAT_SAT: 'Thất Sát',
  PHA_QUAN: 'Phá Quân',
  LIEM_TRINH: 'Liêm Trinh',
  THIEN_CO: 'Thiên Cơ',
  VAN_XUONG: 'Văn Xương',
  VAN_KHUC: 'Văn Khúc',
  HUU_BAT: 'Hữu Bật',
  TA_PHU: 'Tả Phù',
};

export interface TuViHolisticSynthesis {
  cachCuc: {
    code: string;
    name: string;
    nature: string;
    description: string;
    coreRole: string;
  };
  menhThanTimeline: {
    menhPhase: string;
    thanPhase: string;
    transitionAge: number;
    thanPalaceName: string;
    timelineAdvice: string;
  };
  menhCucInteraction: {
    relationTitle: string;
    mechanism: string;
    strategicPost: string;
  };
  tuHoaAxes: {
    loc: { star: string; palaceKey: string; palaceName: string; meaning: string };
    quyen: { star: string; palaceKey: string; palaceName: string; meaning: string };
    khoa: { star: string; palaceKey: string; palaceName: string; meaning: string };
    ky: { star: string; palaceKey: string; palaceName: string; meaning: string };
  };
  tuanTrietGates: {
    trietPalaces: string[];
    tuanPalaces: string[];
    analysis: string;
  };
  finalActionBlueprint: {
    primaryLeverage: string;
    criticalBlindspot: string;
    masterPrinciple: string;
  };
}

export function generateTuViHolisticSynthesis(result: any): TuViHolisticSynthesis {
  const facts = result?.facts || {};
  const palaces = facts.palaces || {};
  const yearStem = (facts.yearStem || 'GIAP').toUpperCase();
  const yearBranch = (facts.yearBranch || 'TY_RAT').toUpperCase();

  // 1. Nhận diện Cách Cục (Dựa vào Mệnh - Tài - Quan)
  const menhStars = (palaces.MENH?.stars || []).map((s: any) => s.code?.toUpperCase());
  const quanStars = (palaces.QUAN_LOC?.stars || []).map((s: any) => s.code?.toUpperCase());
  const taiStars = (palaces.TAI_BACH?.stars || []).map((s: any) => s.code?.toUpperCase());
  const allCoreStars = [...menhStars, ...quanStars, ...taiStars];

  const tuPhuGroup = ['TU_VI', 'THIEN_PHU', 'VU_KHUC', 'THIEN_TUONG'];
  const satPhaGroup = ['THAT_SAT', 'PHA_QUAN', 'THAM_LANG'];
  const coNguyetGroup = ['THIEN_CO', 'THAI_AM', 'THIEN_DONG', 'THIEN_LUONG'];
  const cuNhatGroup = ['CU_MON', 'THAI_DUONG'];

  const countTuPhu = allCoreStars.filter((s) => tuPhuGroup.includes(s)).length;
  const countSatPha = allCoreStars.filter((s) => satPhaGroup.includes(s)).length;
  const countCoNguyet = allCoreStars.filter((s) => coNguyetGroup.includes(s)).length;
  const countCuNhat = allCoreStars.filter((s) => cuNhatGroup.includes(s)).length;

  let cachCuc = {
    code: 'DA_NANG',
    name: 'Cách Cục Hỗ Hợp Đa Năng — Uyển Chuyển & Đa Tài',
    nature: 'Hội tụ đa dạng phẩm chất, thích ứng linh hoạt trong nhiều môi trường.',
    description: 'Lá số không bị bó hẹp trong khuôn mẫu cứng nhắc. Bạn có thể kiêm nhiệm nhiều vai trò từ chuyên môn, quản lý đến phát triển đối ngoại.',
    coreRole: 'Người kiến tạo cầu nối, thích hợp với các mô hình tổ chức năng động đòi hỏi tư duy đa chiều.',
  };

  const hasMainMenhStar = (palaces.MENH?.stars || []).some((x: any) => x.isMain);

  if (!hasMainMenhStar) {
    cachCuc = {
      code: 'VO_CHINH_DIEU',
      name: 'Mệnh Vô Chính Diệu — Linh Hoạt Như Nước & Dễ Nương Thời Cuộc',
      nature: 'Khả năng tiếp thu, hấp thụ và phản chiếu hoàn cảnh tuyệt vời.',
      description: 'Cung Mệnh không có chính tinh tọa thủ ví như một tờ giấy trắng thông tuệ. Bạn có trực giác nhạy bén, khả năng mượn lực từ xung quanh để hoàn thành đại sự, tiến thoái nhịp nhàng.',
      coreRole: 'Nhà chiến lược ẩn mình, chuyên gia đắc lực hoặc doanh nhân linh hoạt nắm bắt thị hiếu.',
    };
  } else if (countTuPhu >= 2 && countTuPhu >= countSatPha && countTuPhu >= countCoNguyet) {
    cachCuc = {
      code: 'TU_PHU_VU_TUONG',
      name: 'Cách Cục Tử Phủ Vũ Tướng — Bậc Lãnh Đạo & Quản Trị Hệ Thống',
      nature: 'Đĩnh đạc, quang minh, uy tín vững chắc và tầm nhìn chiến lược dài hạn.',
      description: 'Đây là bộ sao đế vương và tể tướng kinh điển. Bạn có thiên hướng xây dựng nền móng kiên cố, tổ chức quy củ, trọng chữ tín và có sức quy tụ lòng người mạnh mẽ.',
      coreRole: 'Nhà lãnh đạo doanh nghiệp, giám đốc điều hành, quản trị tài chính - ngân hàng hoặc hoạch định vĩ mô.',
    };
  } else if (countSatPha >= 2 && countSatPha >= countTuPhu && countSatPha >= countCoNguyet) {
    cachCuc = {
      code: 'SAT_PHA_THAM',
      name: 'Cách Cục Sát Phá Tham — Chiến Tướng Tiên Phong & Đột Phá Can Trường',
      nature: 'Quyết liệt, quả cảm, dám nghĩ dám làm và không ngại đập cũ dựng mới.',
      description: 'Bộ sao của những người mở đường. Cuộc đời bạn gắn liền với những cuộc bứt phá ngoạn mục, sẵn sàng đương đầu với sóng gió để giành lấy chiến công hiển hách.',
      coreRole: 'Nhà sáng lập khởi nghiệp, dẫn dắt đổi mới sáng tạo, mở mang thị trường mới hoặc chỉ huy tác chiến.',
    };
  } else if (countCoNguyet >= 2 && countCoNguyet >= countTuPhu && countCoNguyet >= countSatPha) {
    cachCuc = {
      code: 'CO_NGUYET_DONG_LUONG',
      name: 'Cách Cục Cơ Nguyệt Đồng Lương — Trí Tuệ Mưu Lược & Chuyên Gia Cố Vấn',
      nature: 'Thâm trầm, chu đáo, nhân từ thiện lương và tư duy logic bài bản.',
      description: 'Bộ sao của giới sĩ tử, chuyên gia và quân sư thông tuệ. Bạn phát huy sức mạnh tối đa khi làm công việc tham mưu, nghiên cứu chuyên sâu, kế hoạch hoặc phụng sự xã hội.',
      coreRole: 'Cố vấn chiến lược, chuyên gia phân tích, nhà giáo, nhà nghiên cứu khoa học hoặc quản lý công vụ.',
    };
  } else if (countCuNhat >= 2) {
    cachCuc = {
      code: 'CU_NHAT',
      name: 'Cách Cục Cự Nhật — Quang Minh Hùng Biện & Đối Ngoại Quốc Tế',
      nature: 'Ăn nói sắc bén, tư duy phản biện vượt trội và tầm nhìn rộng mở.',
      description: 'Bộ sao hội tụ ánh sáng và khẩu tài. Bạn có khả năng lan tỏa tư tưởng, thuyết phục quần chúng và dễ tạo dựng tên tuổi ở môi trường giao thương bên ngoài hoặc phương xa.',
      coreRole: 'Luật sư, nhà ngoại giao, chuyên gia truyền thông, học giả nghiên cứu hoặc nhà thương thuyết quốc tế.',
    };
  }

  // 2. Mệnh - Thân Timeline
  const cucNumber = facts.cucNumber || 2;
  const transitionAge = cucNumber === 2 ? 32 : cucNumber === 3 ? 33 : cucNumber === 4 ? 34 : cucNumber === 5 ? 35 : 36;
  
  let thanPalaceKey = 'MENH';
  let thanPalaceName = 'Mệnh';
  for (const [pKey, pData] of Object.entries(palaces) as [string, any][]) {
    if (pData.isThan) {
      thanPalaceKey = pKey;
      thanPalaceName = PALACE_VN[pKey] || pKey;
      break;
    }
  }

  const menhPhase = `Tiền Vận (từ nhỏ đến ${transitionAge} tuổi): Được định hình bởi Cung Mệnh (${PALACE_VN.MENH}). Đây là giai đoạn tích lũy nội lực bẩm sinh, rèn giũa bản lĩnh và hình thành nhân sinh quan.`;
  const thanPhase = `Hậu Vận (từ sau ${transitionAge} tuổi trở đi): Trọng tâm cuộc đời chuyển dịch mạnh mẽ về Cung Thân ngụ tại ${thanPalaceName}. Mọi quả ngọt và sự nghiệp trưởng thành sẽ hội tụ tại trục cung này.`;

  const timelineAdvice = thanPalaceKey === 'QUAN_LOC'
    ? 'Hậu vận bạn khẳng định giá trị bản thân bằng địa vị sự nghiệp. Càng về sau danh tiếng và chuyên môn càng rực rỡ nếu tiền vận chịu khó tôi rèn.'
    : thanPalaceKey === 'TAI_BACH'
    ? 'Hậu vận tập trung vào sự tích lũy vật chất vững chắc. Bạn biết cách chuyển hóa kinh nghiệm thành dòng tiền an toàn và thịnh vượng bền lâu.'
    : thanPalaceKey === 'PHUC_DUC'
    ? 'Hậu vận hướng về chiều sâu tâm thức, sự an yên tinh thần và gánh vác việc dòng họ. Cuộc sống viên mãn đo bằng sự thanh thản nội tâm.'
    : thanPalaceKey === 'THIEN_DI'
    ? 'Hậu vận càng xuất ngoại, đi xa lập nghiệp hoặc làm việc đối ngoại thì vận hội càng thênh thang. Đừng để mình bị giam chân ở một chỗ.'
    : thanPalaceKey === 'PHU_THE'
    ? 'Người bạn đời và sự êm ấm gia đạo là chìa khóa mở ra tài vận nửa đời sau. Đồng vợ đồng chồng thì cơ đồ mới hưng thịnh.'
    : 'Thân cư Mệnh: Bạn là người tự tay nắm giữ vận mệnh mình từ đầu đến cuối, kiên định với chí hướng đã chọn và tự lực cánh sinh.';

  // 3. Tương tác Mệnh - Cục
  const napAmKey = `${yearStem}_${yearBranch}`;
  const napAmInfo = NAP_AM_TABLE[napAmKey] || { elementVn: 'Kim' };
  const menhCucData = evaluateMenhCucRelation(facts.cuc || 'Thổ ngũ cục', napAmInfo.elementVn);

  // 4. Tìm vị trí Tứ Hóa
  const defaultCanRules = { loc: 'LIEM_TRINH', quyen: 'PHA_QUAN', khoa: 'VU_KHUC', ky: 'THAI_DUONG' };
  const canRules = TU_HOA_TABLE[yearStem] ?? defaultCanRules;
  const findPalaceWithStar = (starCode: string): { key: string; name: string } => {
    for (const [pKey, pData] of Object.entries(palaces) as [string, any][]) {
      const hasStar = (pData.stars || []).some((s: any) => s.code?.toUpperCase() === starCode);
      if (hasStar) {
        return { key: pKey, name: PALACE_VN[pKey] || pKey };
      }
    }
    return { key: 'MENH', name: 'Mệnh' };
  };

  const locPalace = findPalaceWithStar(canRules.loc);
  const quyenPalace = findPalaceWithStar(canRules.quyen);
  const khoaPalace = findPalaceWithStar(canRules.khoa);
  const kyPalace = findPalaceWithStar(canRules.ky);

  const tuHoaAxes = {
    loc: {
      star: STAR_NAME_VN[canRules.loc] || canRules.loc,
      palaceKey: locPalace.key,
      palaceName: locPalace.name,
      meaning: `Hóa Lộc tại Cung ${locPalace.name}: Nguồn lộc tự nhiên, sự hanh thông tài vận và cơ duyên may mắn khởi phát mạnh mẽ nhất từ lĩnh vực này.`,
    },
    quyen: {
      star: STAR_NAME_VN[canRules.quyen] || canRules.quyen,
      palaceKey: quyenPalace.key,
      palaceName: quyenPalace.name,
      meaning: `Hóa Quyền tại Cung ${quyenPalace.name}: Nơi bạn nắm quyền chủ động, ý chí kiểm soát và khát vọng chinh phục quyết liệt nhất.`,
    },
    khoa: {
      star: STAR_NAME_VN[canRules.khoa] || canRules.khoa,
      palaceKey: khoaPalace.key,
      palaceName: khoaPalace.name,
      meaning: `Hóa Khoa tại Cung ${khoaPalace.name}: Đệ nhất cát thần cứu giải, vòng bảo hiểm danh dự, học vấn và sự phù trợ lúc hoạn nạn ngặt nghèo.`,
    },
    ky: {
      star: STAR_NAME_VN[canRules.ky] || canRules.ky,
      palaceKey: kyPalace.key,
      palaceName: kyPalace.name,
      meaning: `Hóa Kỵ tại Cung ${kyPalace.name}: Điểm nghẽn tâm lý, nơi dễ phát sinh trăn trở, thị phi hoặc đòi hỏi bạn phải trả lời bài học nghiệp lực sâu sắc nhất cuộc đời.`,
    },
  };

  // 5. Cửa Ải Tuần Triệt
  const trietPalaces: string[] = [];
  const tuanPalaces: string[] = [];
  for (const [pKey, pData] of Object.entries(palaces) as [string, any][]) {
    if (pData.isTriet) trietPalaces.push(PALACE_VN[pKey] || pKey);
    if (pData.isTuan) tuanPalaces.push(PALACE_VN[pKey] || pKey);
  }

  let tuanTrietAnalysis = '';
  if (trietPalaces.length > 0) {
    tuanTrietAnalysis += `Triệt Không đóng tại ${trietPalaces.join(', ')}: Thử thách lớn trong tiền vận (trước 34 tuổi). Những lĩnh vực này đòi hỏi bạn phải nếm trải va vấp sớm để tôi rèn nội lực, không nên vội vã gặt hái ngay lúc trẻ. `;
  }
  if (tuanPalaces.length > 0) {
    tuanTrietAnalysis += `Tuần Không đóng tại ${tuanPalaces.join(', ')}: Giữ nhịp độ điềm đạm, tiến thoái có trật tự, bảo toàn nguồn lực bền vững về hậu vận.`;
  }
  if (!tuanTrietAnalysis) {
    tuanTrietAnalysis = 'Các trục cung không chịu ảnh hưởng trực diện của Tuần/Triệt, các tinh diệu phát huy trọn vẹn đặc tính tự nhiên.';
  }

  // 6. Action Blueprint
  const primaryLeverage = `Tận dụng đòn bẩy Cách Cục ${(cachCuc.name.split('—')[0] ?? cachCuc.name).trim()} kết hợp Hóa Lộc tại Cung ${locPalace.name}. Hãy tập trung 80% thời gian và nguồn lực vào việc phát huy chuyên môn mũi nhọn này thay vì dàn trải sức lực.`;
  const criticalBlindspot = `Hóa Kỵ đóng tại Cung ${kyPalace.name} là bài học then chốt. Cần tuyệt đối minh bạch, tránh suy diễn tiêu cực hoặc nóng vội ở lĩnh vực này. Khi gặp khúc mắc, hãy dùng sự điềm đạm và chữ tín để hóa giải.`;
  const masterPrinciple = `Thời gian từ nay đến mốc ${transitionAge} tuổi là chặng đường bản lề chuyển dịch từ Mệnh sang Thân (${thanPalaceName}). Tuân thủ đạo trung dung, lấy đức độ làm gốc thì tiền vận dù có sóng gió, hậu vận tất hưởng quả ngọt bền lâu.`;

  return {
    cachCuc,
    menhThanTimeline: {
      menhPhase,
      thanPhase,
      transitionAge,
      thanPalaceName,
      timelineAdvice,
    },
    menhCucInteraction: {
      relationTitle: menhCucData.title,
      mechanism: menhCucData.description,
      strategicPost: menhCucData.advice,
    },
    tuHoaAxes,
    tuanTrietGates: {
      trietPalaces,
      tuanPalaces,
      analysis: tuanTrietAnalysis,
    },
    finalActionBlueprint: {
      primaryLeverage,
      criticalBlindspot,
      masterPrinciple,
    },
  };
}
