import { withUserData } from '@core/Store/withStore.ts';
import { Profile } from '@/pages/Profile/Profile.ts';

export const ProfileWithStore = withUserData(Profile);