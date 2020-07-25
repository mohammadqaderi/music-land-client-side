import { NotificationData } from '../classes/notification-data';
export class SubscribersNotifications  {
  id: number;

  title: string;

  body: string;

  data: NotificationData;

  actions: Array<{ title: string, action: string }>;

  vibrate: Array<number>;




  subscriberId: number;

  notificationId: number;
}
