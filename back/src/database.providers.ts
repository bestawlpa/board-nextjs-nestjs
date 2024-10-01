import * as mongoose from 'mongoose';


export const databaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: async (): Promise<typeof mongoose> =>
    {
        try {
            const connection = await mongoose.connect('mongodb+srv://bunderscorest:1234&b@cluster09.f6np4.mongodb.net/?retryWrites=true&w=majority&appName=Cluster09')
            console.log('Database connected successfully');
            return connection;
        } catch (error) {
            console.error('Database connection error:', error); 
            throw error;
        }
    }
      
  },
];