import { IconifyIcon } from '@iconify/react';

import NewsIcon from '@iconify/icons-mdi/newspaper';
import WorldIcon from '@iconify/icons-mdi/earth';
import PoliticsIcon from '@iconify/icons-mdi/vote';
import EntertainIcon from '@iconify/icons-mdi/face';

import KBaseballIcon from '@iconify/icons-mdi/baseball-bat';
import WBaseballIcon from '@iconify/icons-mdi/baseball-diamond-outline';
import KSoccerIcon from '@iconify/icons-mdi/soccer';
import WSoccerIcon from '@iconify/icons-mdi/soccer-field';

import ESportsIcon from '@iconify/icons-mdi/computer';
import BitcoinIcon from '@iconify/icons-mdi/bitcoin';
import StockIcon from '@iconify/icons-mdi/chart-finance';

export interface Topic {
  id: string;
  title: string;
  icon: IconifyIcon | string;
  extra?: string;
  extraPattern?: string;
  description?: string;
}

export const newsTopic: Topic[] = [
  {
    id: 'every_news',
    title: '종합',
    icon: NewsIcon,
  },
  {
    id: 'political_news',
    title: '정치',
    icon: PoliticsIcon,
  },
  {
    id: 'world_news',
    title: '국제',
    icon: WorldIcon,
  },
  {
    id: 'entertain_news',
    title: '연예',
    icon: EntertainIcon,
  },
  {
    id: 'esports_news',
    title: 'e-스포츠',
    icon: ESportsIcon,
  },
];

export const sportsTopic: Topic[] = [
  {
    id: 'korea_football',
    title: '국내축구',
    icon: KSoccerIcon,
  },
  {
    id: 'world_football',
    title: '해외축구',
    icon: WSoccerIcon,
  },
  {
    id: 'korea_baseball',
    title: '국내야구',
    icon: KBaseballIcon,
  },
  {
    id: 'world_baseball',
    title: '해외야구',
    icon: WBaseballIcon,
  },
];

export const otherTopic: Topic[] = [
  {
    id: 'stock',
    title: '주식',
    icon: StockIcon,
    extra: '종목코드 (ex: 005930)',
    extraPattern: '[0-9]{6}',
    description: '현재는 KOSPI만 지원합니다',
  },
  {
    id: 'cryptocurrency',
    title: '암호화폐',
    icon: BitcoinIcon,
    extra: '심볼 (ex: BTC)',
    extraPattern: '[A-Z]{3,}(?:-[A-Z]{3,})?',
  },
];

const allTopic = [
  ...newsTopic,
  ...sportsTopic,
  ...otherTopic,
];

class TopicUtil {
  static get(id: string): Topic | undefined {
    return allTopic.find((it) => it.id === id);
  }
}

export default TopicUtil;
