import { IconifyIcon } from '@iconify/react';

import NewsIcon from '@iconify/icons-mdi/newspaper';
import CoronaIcon from '@iconify/icons-mdi/virus';
import BitcoinIcon from '@iconify/icons-mdi/bitcoin';
import StockIcon from '@iconify/icons-mdi/chart-finance';
import PoliticsIcon from '@iconify/icons-mdi/vote';
import WeatherIcon from '@iconify/icons-mdi/weather-history';
import EntertainIcon from '@iconify/icons-mdi/face';

import KBOIcon from '@iconify/icons-mdi/baseball-bat';
import MLBIcon from '@iconify/icons-mdi/baseball-diamond-outline';

import OtherIcon from '@iconify/icons-mdi/more';

interface Topic {
  id: string;
  title: string;
  icon: IconifyIcon | string;
}

export const newsTopic: Topic[] = [
  {
    id: 'news',
    title: '뉴스',
    icon: NewsIcon,
  },
  {
    id: 'covid-19',
    title: '코로나 19',
    icon: CoronaIcon,
  },
  {
    id: 'bitcoin',
    title: '암호화폐',
    icon: BitcoinIcon,
  },
  {
    id: 'stock',
    title: '주식',
    icon: StockIcon,
  },
  {
    id: 'politics',
    title: '정치',
    icon: PoliticsIcon,
  },
  {
    id: 'weather',
    title: '날씨',
    icon: WeatherIcon,
  },
  {
    id: 'entertain',
    title: '연예',
    icon: EntertainIcon,
  },
];

export const sportsTopic: Topic[] = [
  {
    id: 'kbo',
    title: 'KBO',
    icon: KBOIcon,
  },
  {
    id: 'mlb',
    title: 'MLB',
    icon: MLBIcon,
  },
];

export const gameTopic: Topic[] = [
  {
    id: 'lol',
    title: '리그 오브 레전드',
    icon: 'https://img.icons8.com/ios-glyphs/30/000000/league-of-legends.png',
  }
];

export const otherTopic: Topic[] = [
  {
    id: 'other',
    title: '뭐하지',
    icon: OtherIcon,
  }
];

const allTopic = [
  ...newsTopic,
  ...sportsTopic,
  ...gameTopic,
  ...otherTopic,
];

class TopicUtil {
  static get(id: string): Topic | undefined {
    return allTopic.find((it) => it.id === id);
  }
}

export default TopicUtil;
