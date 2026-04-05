import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateContactDto } from './dto/create-contact.dto';

@Injectable()
export class ContactService {
    constructor(private readonly prisma: PrismaService) { }

    async create(dto: CreateContactDto) {
        const submission = await this.prisma.contactSubmission.create({
            data: {
                fullName: dto.fullName,
                email: dto.email,
                message: dto.message,
            },
        });

        return {
            message: 'Contact submission created successfully',
            submission: {
                id: submission.id,
                fullName: submission.fullName,
                email: submission.email,
                message: submission.message,
                createdAt: submission.createdAt,
            },
        };
    }
}