import { redirect } from 'next/navigation';

export default function ComprehensiveReadingPage() {
  // Bỏ báo cáo tổng hợp theo yêu cầu người dùng, điều hướng về cổng tra cứu chính
  redirect('/');
}
