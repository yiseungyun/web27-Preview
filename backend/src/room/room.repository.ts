import { Injectable } from "@nestjs/common";
import { InjectRepository } from "nestjs-redis-om";
import { Repository } from "redis-om";
import { RoomEntity } from "@/room/room.entity";
import { RoomDto } from "@/room/dto/room.dto";

@Injectable()
export class RoomRepository {
    public constructor(
        @InjectRepository(RoomEntity)
        private readonly roomRepository: Repository<RoomEntity>
    ) {}

    // TODO : .from 메서드 구현 필요?
    public async getAllRoom(): Promise<RoomDto[]> {
        const allRooms = await this.roomRepository.search().return.all();
        return allRooms.map((room: RoomEntity) => {
            const connectionMap = JSON.parse(room.connectionMap || "{}");
            return {
                connectionMap: JSON.parse(room.connectionMap || "{}"),
                createdAt: room.createdAt,
                host: JSON.parse(room.host),
                maxParticipants: room.maxParticipants,
                status: room.status,
                title: room.title,
                id: room.id,
                category: room.category,
                inProgress: room.inProgress,
                participants: Object.keys(connectionMap).length,
            };
        });
    }

    public async getRoom(id: string): Promise<RoomDto> {
        const room = await this.roomRepository.search().where("id").eq(id).return.first();

        if (!room) return null;

        const connectionMap = JSON.parse(room.connectionMap || "{}");

        return {
            category: room.category,
            inProgress: room.inProgress,
            connectionMap,
            createdAt: room.createdAt,
            host: JSON.parse(room.host),
            participants: Object.keys(connectionMap).length,
            maxParticipants: room.maxParticipants,
            status: room.status,
            title: room.title,
            id: room.id,
        };
    }

    public async setRoom(dto: RoomDto): Promise<void> {
        const room = new RoomEntity();
        room.id = dto.id;
        room.category = dto.category;
        room.inProgress = dto.inProgress;
        room.title = dto.title;
        room.status = dto.status;
        room.connectionMap = JSON.stringify(dto.connectionMap);
        room.maxParticipants = dto.maxParticipants;
        room.createdAt = Date.now();
        room.host = JSON.stringify(dto.host);

        await this.roomRepository.save(room.id, room);
    }

    public async removeRoom(id: string): Promise<void> {
        const entities = await this.roomRepository.search().where("id").equals(id).return.all();

        for await (const entity of entities) {
            await this.roomRepository.remove(entity.id);
        }
    }
}
