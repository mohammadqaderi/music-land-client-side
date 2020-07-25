import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Message } from './message.entity';
import { UserJoinedRoom } from './user-joined-room.entity';

export class Room  {
  id: number;

  name: string;

  createdAt: Date;

  createdBy: string;


  messages: Message[];


  userJoinedRooms: UserJoinedRoom[];
}
