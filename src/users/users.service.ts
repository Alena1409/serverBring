import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { supabase } from 'supabase';

@Injectable()
export class UsersService {
  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  // Найти пользователя по telegram_id
  async findByTelegramId(telegramId: number) {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('telegram_id', telegramId)
      .single();

    if (error) return null;
    return data;
  }

  // Создать или обновить пользователя (upsert)
  async upsert(user: {
    telegram_id: number;
    username?: string;
    first_name: string;
    last_name?: string;
  }) {
    const { data, error } = await supabase
      .from('users')
      .upsert(user, { onConflict: 'telegram_id' })
      .select()
      .single();

    if (error) throw error;
    return data;
  }
}
