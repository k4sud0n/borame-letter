type NewsCategory = 'every_news' | 'political_news' | 'world_news' | 'entertain_news' | 'esports_news';
type SportsCategory = 'korea_football' | 'world_football' | 'korea_baseball' | 'world_baseball';
type OtherCategory = {
    stock: `${number}` | '0';
    cryptocurrency: string | '0';
}

export type Category = {
    [key in NewsCategory | SportsCategory]: 1 | 0;
} & OtherCategory;

interface LetterRequest {
    name: string;
    cardinal_number: number;
    birth_year: number;
    birth_month: number;
    birth_date: number;

    category: Category;
}

export default LetterRequest;
