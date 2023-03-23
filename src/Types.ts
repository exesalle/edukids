

export interface IUserData {
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
  {
    id: 1,
    name:'test',
    teacher:'testtest'
  }
]