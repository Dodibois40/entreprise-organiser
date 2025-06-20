import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateUserDto, UpdateUserDto, UserFilterDto } from './dto/user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findAll(filters: UserFilterDto) {
    const { page = 1, limit = 20, search, role, actif } = filters;
    const skip = (page - 1) * limit;

    const where: any = {
      supprime: false,
    };

    if (search) {
      where.OR = [
        { nom: { contains: search, mode: 'insensitive' } },
        { prenom: { contains: search, mode: 'insensitive' } },
        { email: { contains: search, mode: 'insensitive' } },
      ];
    }

    if (role) {
      where.role = role;
    }

    if (actif !== undefined && actif !== 'all') {
      where.actif = actif === 'true';
    }

    const [users, total] = await Promise.all([
      this.prisma.user.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.user.count({ where }),
    ]);

    return {
      users: users.map((user: any) => {
        const { passwordHash, ...userWithoutPassword } = user;
        return userWithoutPassword;
      }),
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async findOne(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new Error('Utilisateur non trouvé');
    }

    const { passwordHash, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  async create(createUserDto: CreateUserDto) {
    const { password, ...userData } = createUserDto;
    
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await this.prisma.user.create({
      data: {
        ...userData,
        passwordHash: hashedPassword,
      } as any,
    });

    const { passwordHash, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const { password, ...userData } = updateUserDto;
    
    const data: any = userData;
    if (password) {
      data.passwordHash = await bcrypt.hash(password, 10);
    }

    const user = await this.prisma.user.update({
      where: { id },
      data: data as any,
    });

    const { passwordHash, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  async remove(id: string) {
    await this.prisma.user.update({
      where: { id },
      data: {
        supprime: true,
        supprimeLe: new Date(),
        actif: false,
      },
    });

    return { message: 'Utilisateur supprimé avec succès' };
  }

  async reactivate(id: string) {
    const user = await this.prisma.user.update({
      where: { id },
      data: {
        actif: true,
        supprime: false,
        supprimeLe: null,
      },
    });

    const { passwordHash, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  async changePassword(id: string, passwordData: { currentPassword: string; newPassword: string }) {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new Error('Utilisateur non trouvé');
    }

    const isCurrentPasswordValid = await bcrypt.compare(passwordData.currentPassword, user.passwordHash);
    if (!isCurrentPasswordValid) {
      throw new Error('Mot de passe actuel incorrect');
    }

    const hashedNewPassword = await bcrypt.hash(passwordData.newPassword, 10);

    await this.prisma.user.update({
      where: { id },
      data: {
        passwordHash: hashedNewPassword,
      },
    });

    return { message: 'Mot de passe modifié avec succès' };
  }

  async getStats() {
    const [total, actifs, inactifs] = await Promise.all([
      this.prisma.user.count({ where: { supprime: false } }),
      this.prisma.user.count({ where: { supprime: false, actif: true } }),
      this.prisma.user.count({ where: { supprime: false, actif: false } }),
    ]);

    // Compter les ouvriers (chantier + atelier)
    const ouvriersCount = await this.prisma.user.count({
      where: {
        supprime: false,
        actif: true,
        OR: [
          { role: 'OUVRIER_CHANTIER' },
          { role: 'OUVRIER_ATELIER' },
        ],
      },
    });

    // Calcul simple du tarif moyen
    const avgResult = await this.prisma.user.aggregate({
      where: {
        supprime: false,
        actif: true,
        tarifHoraireBase: { gt: 0 }
      },
      _avg: {
        tarifHoraireBase: true,
      },
    });

    return {
      total,
      actifs,
      inactifs,
      ouvriersChantierAtelier: ouvriersCount,
      tarifMoyen: avgResult._avg?.tarifHoraireBase || 0,
    };
  }

  async findByRole(role: string) {
    const users = await this.prisma.user.findMany({
      where: {
        role: role as any,
        supprime: false,
        actif: true,
      },
      orderBy: { nom: 'asc' },
    });

    return users.map((user: any) => {
      const { passwordHash, ...userWithoutPassword } = user;
      return userWithoutPassword;
    });
  }
} 