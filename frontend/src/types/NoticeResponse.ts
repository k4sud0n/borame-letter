import NoticePost from './NoticePost';

interface NoticeResponse {
  items: NoticePost[];
  total: number,
  page: number,
  size: number,
};

export default NoticeResponse;
