import { Document, model, Schema } from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new Schema<IUser>({
    name: {
        type: String,
        required: [ true, 'El nombre es necesario' ]
    },
    avatar: {
        type: String,
        default: 'av-1.png'
    },
    username: {
        type: String,
        unique: true,
        required: [ true, 'El nombre de usuario es necesario' ]
    },
    password: {
        type: String,
        required: [ true, 'La contraseña es obligatoria' ]
    }
});

userSchema.method('comparePass', function(pass: string = ''): boolean {
    if (bcrypt.compareSync(pass, this.password)) {
        return true;
    } else {
        return false;
    }
});

interface IUser extends Document {
    name: string;
    username: string;
    password: string;
    avatar: string;

    comparePass(pass: string): boolean;
}

export const User = model('User', userSchema);
