import Review from './Review';

interface ReviewResponse {
  items: Review[];
  total: number,
  page: number,
  size: number,
};

export default ReviewResponse;
