

export interface IUserData {
  id:string
  email:string
  password:string
  name:string
}
export interface ICoursesData {
  id: number
  name: string
  teacher: string
}

export const InitialCourses: ICoursesData[] = [
];

export const InitialTeachers: IUserData[] = [
];