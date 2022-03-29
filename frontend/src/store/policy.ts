import { atomWithStorage } from 'jotai/utils';

export const privatePolicyAtom = atomWithStorage<boolean>('private-policy', false);
