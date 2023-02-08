import { Course, Lesson, localStorageInterface, Node, User } from "./TendonType";

export interface APIServiceInterface {
    post<Type>(url: string, body: Type, token: string): Promise<{ response: Type, status: number, message: string }>;
    get<Type>(url: string, token: string): Promise<{ response: Type, status: number, message: string }>;
    update<Type>(url: string, body: Type, id: string, token: string): Promise<{ response: Type, status: number, message: string }>;
    delete<Type>(url: string, id: string, token: string): Promise<number>;
}

export interface CourseServiceInterface {
    postCourse(body: Course, token: string): Promise<Course>;
    getCourseById(id: string, token: string): Promise<Course>;
    updateCourse(id: string, token: string, body: Course): Promise<Course>;
    deleteCourse(id: string, token: string): Promise<number>;
}

export interface LessonServiceInterface {
    postLesson(body: Lesson, token: string): Promise<Lesson>;
    getLessonById(id: string, token: string): Promise<Lesson>;
    updateLesson(id: string, token: string, body: Lesson): Promise<Lesson>;
    deleteLesson(id: string, token: string): Promise<number>;
}

export interface NodeServiceInterface {
    postNode(body: Node, token: string): Promise<Node>;
    getNodeById(id: string, token: string): Promise<Node>;
    updateNode(id: string, token: string, body: Node): Promise<Node>;
    deleteNode(id: string, token: string): Promise<number>;
}

export interface UserServiceInterface {
    getUserByID(id: string, token: string): Promise<User>;
    updateUser(id: string, token: string, body: User): Promise<User>;
    deleteUser(id: string, token: string): Promise<number>;
}

export interface AuthServiceInterface {
    signIn(body: User): Promise<User>;
    signUp(body: User): Promise<User>;
    signOut(token: string): Promise<number>;
}

export interface MemoryServiceInterface {           
    setLocalStorage(data: localStorageInterface): void;
    getLocalStorage(item: string): string;
}