interface ReviewRequest {
  id?: string; // PATCH
  title: string;
  content: string;
  writer: string;
  password: string;
  rating: number;
}

export default ReviewRequest;
