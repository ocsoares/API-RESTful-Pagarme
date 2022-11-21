import 'dotenv/config';
import mongoose from 'mongoose';
import Logger from './logs';

const atlasDBConnection = async () => {
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

export default atlasDBConnection;