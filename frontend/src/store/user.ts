import { getGeneration, getMinBirthday } from '@/utils/basicInfo';
import { atomWithStorage, createJSONStorage } from 'jotai/utils';

const storage = createJSONStorage<any>(() => sessionStorage);

export const nameAtom = atomWithStorage<string>('name', '', storage);
export const genAtom = atomWithStorage<number>('gen', getGeneration(), storage);
export const birthdayAtom = atomWithStorage<string>('birthday', getMinBirthday(), storage);
