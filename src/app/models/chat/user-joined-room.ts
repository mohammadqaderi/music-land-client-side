export class UserJoinedRoom  {
  id: number;

  joinedIn: Date;

  joinedUsername: string;

  // foreign keys
  userId: number;

  roomId: number;
}
