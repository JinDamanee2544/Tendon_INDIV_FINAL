export interface User {
    type: string
    id: string
    firstName: string
    lastName: string
    email: string
    role: string
    createAt: string
    updateAt: string
    password: string
    accessToken: string
}

export interface Course {
    id: string
    name: string
    description: string
    access: string
    createBy?: string
    updateAt?: string
    lessons: string[]
}

export interface Lesson {
    id: string
    name: string
    description: string
    access: string
    createBy?: string
    updateAt?: string
    nodes: string[]
    nextLesson: string[]
    prevLesson: string[]
}
export interface Node {
    id: string
    type: string
    data: string
    createBy?: string
    updateAt?: string
}

export interface localStorageInterface {
    token: string
    firstName: string
    lastName: string
    courseID: string
    courseName: string
}

let TYPES = {
    UserService: Symbol("UserService"),
    AuthService: Symbol("AuthService"),
    NodeService: Symbol("NodeService"),
    LessonService: Symbol("LessonService"),
    CourseService: Symbol("CourseService"),
    MemoryService: Symbol("MemoryService"),
    APIService: Symbol("APIService")
};

export default TYPES