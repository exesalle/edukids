import { createContext } from 'react';
import { ApplicationContext } from '../Types';

const AppContext = createContext<ApplicationContext>({} as ApplicationContext);

export default AppContext;
