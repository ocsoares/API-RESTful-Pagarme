import 'dotenv/config';
import mongoose from 'mongoose';
import Logger from './logs';

export const atlasDBConnection = async () => {
    try {
        await mongoose.connect(process.env.ATLAS_URL as string);
        Logger.info('Conectado com sucesso ao Atlas !');
    }
    catch (error: any) {
        Logger.error(error);
        Logger.error('Não foi possível conectar ao Atlas !');
        process.exit(1);
    }
};

export const atlasTestDBConnection = async () => {
    try {
        await mongoose.connect(process.env.TEST_ATLAS_URL as string);
        Logger.info('Conectado com sucesso ao Atlas de TESTE !!');
    }
    catch (error: any) {
        Logger.error(error);
        Logger.error('Não foi possível conectar ao Atlas de TESTE !!');
        process.exit(1);
    }
};