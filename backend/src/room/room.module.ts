import { Module } from "@nestjs/common";
import { RoomService } from "./services/room.service";
import { RoomGateway } from "./room.gateway";
import { RoomRepository } from "./room.repository";
import { RoomController } from "./room.controller";
import { RedisOmModule } from "nestjs-redis-om";
import { RoomEntity } from "./room.entity";
import { RoomLeaveService } from "@/room/services/room-leave.service";
import { RoomHostService } from "@/room/services/room-host.service";
import { QuestionListRepository } from "@/question-list/question-list.repository";
import { WebsocketModule } from "@/websocket/websocket.module";
import { RoomCreateService } from "@/room/services/room-create.service";
import { RoomJoinService } from "@/room/services/room-join.service";

@Module({
    imports: [RedisOmModule.forFeature([RoomEntity]), WebsocketModule],
    providers: [
        RoomService,
        RoomGateway,
        RoomRepository,
        RoomCreateService,
        RoomJoinService,
        RoomLeaveService,
        RoomHostService,
        QuestionListRepository,
    ],
    controllers: [RoomController],
})
export class RoomModule {}
