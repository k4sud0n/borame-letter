export type NewsCategory = 'every_news' | 'political_news' | 'world_news' | 'entertain_news' | 'esports_news';
export type SportsCategory = 'korea_football' | 'world_football' | 'korea_baseball' | 'world_baseball';
export type OtherCategory = {
    stock: `${number}` | '0';
    cryptocurrency: string | '0';
}

type Category = {
    [key in NewsCategory | SportsCategory]: 1 | 0;
} & OtherCategory;

export default Category;
