import Category from './Category';

interface User {
  name: string;
  cardinal_number: number;
  birth_year: number;
  birth_month: number;
  birth_date: number;

  category: Category;
}

export default User;
