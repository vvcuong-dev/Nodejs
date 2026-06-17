import { prisma } from '../libs/prisma';


export abstract class BaseRepository<T> {
    protected model;

    constructor(model: string) {
        this.model = (prisma as any)[model];
    }

    async findAll(): Promise<T[]> {
        return await this.model.findAll();
    }

    async findById(id: number | string): Promise<T | null> {
        return await this.model.findUnique({ where: { id } });
    }

    async create(data: any): Promise<T> {
        return await this.model.create(data);
    }

    async delete(id: number | string): Promise<void> {
        await this.model.delete({ where: { id } });
    }
}

// <T> nghĩa là một generic type, cho phép chúng ta định nghĩa một class hoặc function mà có thể làm việc với nhiều loại dữ liệu khác nhau. 
// Trong trường hợp này, BaseRepository<T> có thể được sử dụng để tạo ra các repository cho các model khác nhau bằng cách truyền vào type tương ứng khi kế thừa.