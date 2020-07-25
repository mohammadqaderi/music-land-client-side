import { SubscribersNotifications } from './subscribers-notifications.entity';

export class NotificationEntity  {
  id: number;

  title: string;

  body: string;


  subscribersNotifications: SubscribersNotifications[];
}
