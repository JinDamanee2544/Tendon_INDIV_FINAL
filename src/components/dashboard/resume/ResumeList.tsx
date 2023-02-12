import { Xwrapper } from 'react-xarrows'
import { Course } from 'linkWithBackend/interfaces/TendonType'
import ResumeItem from './ResumeItem'
import { useTheme } from 'next-themes'
import ArrowBox from '@components/baseComponents/ArrowBox'
import Xarrow from 'react-xarrows'
import ViewModel from './ViewModel'
import LoadingSpinner from '@components/baseComponents/LoadingSpinner'

interface propsInterface {
    body: Course
}

const ResumeList = () => {
    const { theme } = useTheme()
    const courses = ViewModel()

    if (courses.length === 0) {
        return <LoadingSpinner />
    }

    return (
        <main className='flex flex-col justify-center gap-10'>
            <Xwrapper>
                {
                    courses.map((course, index) => {

                        // if (course.id === undefined) {
                        //     return <h1 key={index}>Loading</h1>
                        // }

                        return (
                            <div key={index}>
                                <ResumeItem
                                    key={course.id}
                                    id={course.id}
                                    courseData={course}
                                    setIsReady={() => false}
                                />
                                <ArrowBox>
                                    <Xarrow
                                        start={'dashboard'}
                                        end={course.id}
                                        color={theme === 'light' ? '#475569' : '#961EFF'}
                                    />
                                </ArrowBox>
                            </div>
                        )
                    })
                }
            </Xwrapper>
        </main>
    )
}
export default ResumeList;