import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  // UR:- Using DataSource instead of @InjectRepository(User)
  // No need for TypeOrmModule.forFeature([User]) in module
  // private usersRepository: Repository<User>;
  // constructor(private dataSource: DataSource) {
  //   this.usersRepository = this.dataSource.getRepository(User);
  // }

  async createUser(user: Partial<User>): Promise<User> {
    // this returns insert result
    // return this.usersRepository.insert(user);

    // const newUser = this.usersRepository.create(user);
    // return this.usersRepository.save(newUser);

    return this.usersRepository.save(user);
  }

  async getAllUsers(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.usersRepository.findOne({ where: { email } });
  }

  async findByIdAndUpdate(id: string, updateData: Partial<User>) {
    return this.usersRepository.update(id, updateData);
  }

  async findById(id: string): Promise<User | null> {
    return this.usersRepository.findOne({ where: { id } });
  }
}
