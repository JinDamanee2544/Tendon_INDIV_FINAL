import { Xwrapper } from 'react-xarrows'
import ResumeItem from './ResumeItem'
import { useTheme } from 'next-themes'
import ArrowBox from '@components/baseComponents/ArrowBox'
import Xarrow from 'react-xarrows'
import ViewModel from './ViewModel'

const ResumeList = () => {
    const { theme } = useTheme()
    const { courses } = ViewModel()

    return (
        <main className='flex flex-col justify-center gap-10'>
            <Xwrapper>
                {
                    courses.map((course, index) => {
                        return (
                            <div key={index}>
                                <ResumeItem
                                    key={course.ID}
                                    id={course.ID}
                                    courseData={course}
                                    setIsReady={() => false}
                                />
                                <ArrowBox>
                                    <Xarrow
                                        start={'dashboard'}
                                        end={course.ID}
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