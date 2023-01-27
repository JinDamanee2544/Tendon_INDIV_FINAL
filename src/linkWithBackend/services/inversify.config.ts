import { Container } from "inversify";

import AuthService from "./user_service";
import TYPES from "linkWithBackend/interfaces/TendonType";
import SignService from "./sign_service";
import NodeService from "./node_services";
import LessonService from "./lesson_services";
import CourseService from "./course_services";
import MemoryService from "./memory_services";

var container: Container = new Container();
container.bind<AuthService>(TYPES.AuthService).to(AuthService)
container.bind<SignService>(TYPES.SignService).to(SignService)
container.bind<NodeService>(TYPES.NodeService).to(NodeService)
container.bind<LessonService>(TYPES.LessonService).to(LessonService)
container.bind<CourseService>(TYPES.CourseService).to(CourseService)
container.bind<MemoryService>(TYPES.MemoryService).to(MemoryService)

export default container;