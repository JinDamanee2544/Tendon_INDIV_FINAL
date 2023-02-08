import { Container } from "inversify";

import UserService from "./user_service";
import TYPES from "linkWithBackend/interfaces/TendonType";
import AuthService from "./sign_service";
import NodeService from "./node_services";
import LessonService from "./lesson_services";
import CourseService from "./course_services";
import MemoryService from "./memory_services";
import APIService from "./api_services";
import { APIServiceInterface, UserServiceInterface, CourseServiceInterface, LessonServiceInterface, MemoryServiceInterface, NodeServiceInterface, AuthServiceInterface } from "linkWithBackend/interfaces/ServiceInterface";

var container: Container = new Container();

container.bind<APIServiceInterface>(TYPES.APIService).to(APIService)
container.bind<UserServiceInterface>(TYPES.UserService).to(UserService)
container.bind<AuthServiceInterface>(TYPES.AuthService).to(AuthService)
container.bind<NodeServiceInterface>(TYPES.NodeService).to(NodeService)
container.bind<LessonServiceInterface>(TYPES.LessonService).to(LessonService)
container.bind<CourseServiceInterface>(TYPES.CourseService).to(CourseService)
container.bind<MemoryServiceInterface>(TYPES.MemoryService).to(MemoryService)

export default container;