import { Entity, ManyToOne} from '@mikro-orm/core'
import { Tag } from "./tag.entity"
import { EventEntity } from "../event.entity"

@Entity()
export class EventTag {
  @ManyToOne()
  eventId!: EventEntity
    
  @ManyToOne()
  tag!: Tag
}