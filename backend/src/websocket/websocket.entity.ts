import { Entity, Field, Schema } from "nestjs-redis-om";

@Schema("socket")
export class WebsocketEntity extends Entity {
    @Field({ type: "string", indexed: true })
    id: string;

    @Field({ type: "string[]" })
    joinedRooms: string[];
}
