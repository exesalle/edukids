import { SetStateAction, type Dispatch } from 'react';
import { User as FirebaseUser } from 'firebase/auth';

export interface IGroupData {
  id: number;
  name: string;
  students: [];
}
export interface IUserInfo {
  id:number;
  username:string,
  email:string;
  password:string;
  name:string;
  course: ICoursesData[];
  isTeacher:boolean
  marks: IMarksData[]
}

export interface IMarksData {
  marks: IMark[]
}
export interface IMark {
  id: number;
  date: string;
  mark: string;
}

export interface IMessage {
  id: string,
  content: string,
  author: string,
  username:string,
  createdOn: Date
}

export interface ICoursesData {
  id: number;
  name: string;
  teacher: string;
}

export interface iAppState {
  user: FirebaseUser | null,
  userData: IUserInfo | null,
}

export interface ApplicationContext {
  appState: iAppState,
  isDetailedChatClicked: boolean,
  isCreateChatClicked: boolean,
  isMeetingClicked: boolean,
  setIsCreateChatClicked: Dispatch<SetStateAction<boolean>>,
  setIsDetailedChatClicked: Dispatch<SetStateAction<boolean>>,
  setIsMeetingClicked: Dispatch<SetStateAction<boolean>>,
  setState: Dispatch<SetStateAction<iAppState>>,
}

export interface IChat {
  id: string,
  title: string,
  participants: string[],
  messages: IMessage[],
  isPublic: boolean,
  lastActivity: Date,
  groupID?: string,
  course: string
}

export interface IChatsListProps {
  props: {
    chats: IChat[],
    setCurrentChat: Dispatch<SetStateAction<IChat>>,
  },
}

export interface UserProps {
  props: {
    user: IUserInfo,
    buttonEl?: JSX.Element,
    setCurrentUser?: Dispatch<SetStateAction<IUserInfo>>
  },
}
export interface CreateMessageProps {
  handleSubmit: (_message: string) => void,
  existingMessage: string | undefined,
}

export interface ChatParticipantsProps {
  currentChat: IChat,
  allUsers: IUserInfo[],
  owner?: IUserInfo,
}

export interface MessageProps {
  message: IMessage,
  currentChannel: IChat,
  handleEditMessage: (_message: IMessage) => void,
  toBeEdited: boolean,
}

export interface ChatProps {
  currentChat: IChat,
}
export interface UsersListProps {
  leftSide: IUserInfo[],
  setLeftSide: Dispatch<SetStateAction<IUserInfo[]>>,
  rightSide: IUserInfo[],
  setRightSide: Dispatch<SetStateAction<IUserInfo[]>>,
}

export interface IEventsData {
  id: number;
  name: string;
  date: string;
  time: string;
  prize: string[],
}

export interface ITeachersData {
  id:string;
  email:string;
  password:string;
  name:string;
  course: ICoursesData[];
}


export interface ILesson {
  title: string,
  date:string,
  start: string,
  end: string,
  participants: string[],
  id: string,
}

export interface ScheduleLessonProps {
  currentChat: IChat,
}

export interface SelectedLessonProps {
  selectedEvent: {
    title: string,
    start: string,
    end: string,
    participants: string[],
    id: string,
  },
  setModalState: Dispatch<boolean>,
}
