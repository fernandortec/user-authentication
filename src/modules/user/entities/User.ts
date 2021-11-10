import { Document, Schema, model } from 'mongoose';

interface User extends Document {
  id: string;
  email: string;
  password: string;
}

const UserSchema = new Schema({
  id: String,
  email: String,
  password: String
});

const UserModel = model<User>('User', UserSchema);

export { User, UserSchema, UserModel };
