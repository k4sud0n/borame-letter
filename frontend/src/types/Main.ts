type TopicList = (
  'covid_confirm_case' |
  'entertain_news' |
  'esports_news' |
  'every_news' |
  'korea_baseball' |
  'korea_football' |
  'political_news' |
  'today_weather' |
  'world_baseball' |
  'world_football' |
  'world_news'
);

interface Main {
  letters: {
    [key in TopicList]: string;
  };
  total_users: number;
}

export default Main;
