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

interface Topic {
  id: string;
  title: string;
  icon: IconifyIcon | string;
}

export const newsTopic: Topic[] = [
  {
    id: 'news',
    title: '종합뉴스',
    icon: NewsIcon,
  },
  {
    id: 'politics',
    title: '정치',
    icon: PoliticsIcon,
  },
  {
    id: 'world',
    title: '국제',
    icon: WorldIcon,
  },
  {
    id: 'entertain',
    title: '연예',
    icon: EntertainIcon,
  },
];

export const sportsTopic: Topic[] = [
  {
    id: 'k-soccer',
    title: '국내축구',
    icon: KSoccerIcon,
  },
  {
    id: 'w-soccer',
    title: '해외축구',
    icon: WSoccerIcon,
  },
  {
    id: 'k-baseball',
    title: '국내야구',
    icon: KBaseballIcon,
  },
  {
    id: 'w-baseball',
    title: '해외야구',
    icon: WBaseballIcon,
  },
];

export const otherTopic: Topic[] = [
  {
    id: 'stock',
    title: '주식',
    icon: StockIcon,
  },
  {
    id: 'bitcoin',
    title: '암호화폐',
    icon: BitcoinIcon,
  },
  {
    id: 'esports',
    title: 'e-스포츠',
    icon: ESportsIcon,
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
