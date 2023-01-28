import TYPES from "linkWithBackend/interfaces/TendonType";
import container from "linkWithBackend/services/inversify.config";
import MemoryService from "linkWithBackend/services/memory_services";

export default function viewModel() {
    const memService = container.get<MemoryService>(TYPES.MemoryService)
    const courseID = memService.getCourseID()
    const courseName = memService.getCourseName()
    return {
        courseID: courseID,
        courseName: courseName
    }
}