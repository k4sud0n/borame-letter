interface NoticePost {
  id: string;
  title: string;
  content: string;
  writer: string;
  created_at: string;

  thumbnail?: string;
}

export default NoticePost;
